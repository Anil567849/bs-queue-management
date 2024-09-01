
import { FileManager } from "./manager/FileManager";

export async function GET(){
}

export async function POST(request: Request){

    const formData = await request.formData();
    // console.log('form', formData);

    const myFile = formData.get('myFile');

    if (myFile instanceof File) {
        try {
            const text: string = await FileManager.getText(myFile);
            // console.log('File content:', text);
            
            const marks: number = await FileManager.getMarks(text);

            return Response.json({ message: marks }, { status: 200 });

        } catch (error) {
            console.error('Error reading file:', error);
            return Response.json({ message: 'error reading file' }, { status: 500 });
        }
    } else {
        console.error('No file found in form data.');
        return Response.json({ message: 'not file instance' }, { status: 500 });    
    }
}

