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

    static async getMarks(text: string){
        return await askGPT(text);
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

async function askGPT(text: string){
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

