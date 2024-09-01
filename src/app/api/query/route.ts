
import { FileManager } from "./manager/FileManager";

export async function GET(){
}

export async function POST(request: Request){

    const formData = await request.formData();
    // console.log('form', formData);

    const myFile = formData.getAll('myFile') as File[];

    // console.log('this is ', myFile);    

    if (myFile && myFile.length > 0){

            // ToDo: use websocket to send marks to client 
            let result = [];
            for(let i = 0; i < myFile.length; i++){
                try {
                    const text: string = await FileManager.getText(myFile[i]);
                    // console.log('File content:', text);
                    
                    const marks: number = await FileManager.getMarks(text);
                    
                    result.push({name: myFile[i].name, marks});
        
                } catch (error) {
                    console.error('Error reading file:', error);
                    return Response.json({ message: 'error reading file' }, { status: 500 });
                }
            }
            const csvContent = FileManager.convertToCSV(result);
            // Create a Blob and Response to send CSV to the client
            return new Response(csvContent, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': 'attachment; filename="results.csv"',
                },
            });
            // return Response.json({ message: result }, { status: 200 });

    } else {
        console.error('No file found in form data.');
        return Response.json({ message: 'not file instance' }, { status: 500 });    
    }
}

