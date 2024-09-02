import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAIAPIKEY,
});

export class FileManager {

    static async getText(myFile: File): Promise<string> {
        try {
            // Read the file as a Buffer, then convert to string
            const buffer = Buffer.from(await myFile.arrayBuffer());
            return buffer.toString('utf-8');
        } catch (error) {
            throw new Error('Error reading the file: ');
        }
    }

    static async getMarksFromText(text: string){
        return await askGPT_Text(text);
    }

    static async getBase64Encoded(file: File) {
        try {
            // Read the file as a Buffer, then convert to string
            const buffer = Buffer.from(await file.arrayBuffer());
            return buffer.toString('base64');
        } catch (error) {
            throw new Error('Error reading the image file: ');
        }
    }

    static async getMarksFromVision(text: string){
        return await askGPT_Vision(text);
    }

    static convertToCSV(array: { name: string; marks: number }[]): string {
        // Header for the CSV file
        const header = 'Sno,Name,Roll No.,Total Marks,Marks Obtained,Percentage\n';
        
        // Mapping each object to a CSV row
        const rows = array.map((obj, index) => `${index+1},${obj.name},${index+11},100,${obj.marks},${(obj.marks/100)*100}`).join('\n');
    
        // Combine header and rows
        return header + rows;
    }
    
}

async function askGPT_Text(text: string){
    /*
    // TODO:  try to use Batch API - below is not Batch API
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a expert teacher." },
            {
                role: "user",
                content: `Read this file and give me marks out of 100: ${text}`,
            },
        ],
    });
    if(!completion.choices[0].message.content) return 0;
    const res: number = parseInt(completion.choices[0].message.content);
    console.log(res);
    return res;
    */
    return Math.round(Math.random()*100);
}

async function askGPT_Vision(base64_image: string){
    /*
    // TODO:  try to use Batch API - below is not Batch API
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "user",
            content: [
                {
                    type: "text",
                    text: "Read the text on image carefully and return marks out of 100"
                },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${base64_image}`
                    }
                }
            ]
        }]
    });

    if(!completion.choices[0].message.content) return 0;
    const res: number = parseInt(completion.choices[0].message.content);
    console.log(res);
    return res;
    */
    return Math.round(Math.random()*100);
}

