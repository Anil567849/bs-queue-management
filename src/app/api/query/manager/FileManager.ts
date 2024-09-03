import { authOptions } from "@/lib/auth/authOptions";
import connectDB from "@/lib/db/db";
import Result, { IResult, YearSemester } from "@/lib/db/models/resultSchema";
import { vision_instruction } from "@/lib/gpt/instruction";
import { getServerSession } from "next-auth";
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
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{
            role: "user",
            content: [
                {
                    type: "text",
                    text: vision_instruction
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
*/
    /*
    // Output: completion.choices[0].message.content
    const output = {
        school_code: "2695",
        school_name: "COMMON SCHOOL EXAMINATION",
        exam_name: "English",
        exam_date: "03-sept-2024",
        student_name: "Albert",
        roll_no: "58745",
        class: "10th",
        section: "B",
        total_marks: "85",
        marks_obtained: "51/85"
    }
    */
    const output = {
        exam_name: "English",
        exam_date: "03-sept-2024",
        student_name: "Albert",
        roll_no: "747474",
        class: "10th",
        section: "B",
        total_marks: "85",
        marks_obtained: "51/85"
    }


    const session = await getServerSession(authOptions);
    
    // @ts-ignore 
    const email = session.user.email;
    if(!email){
        return;
    }

    await connectDB();
    const yes = await Result.findOne({examiner_email: email});

    if(!yes){
        await createResult(email, "JULY-2024", output);
    }else{
        await upsertResult(yes, "JULY-2024", output);
    }
    
    return Math.round(Math.random()*100);
}

interface IData {
    exam_name: string,
    exam_date: string,
    student_name: string,
    roll_no: string,
    class: string,
    section: string,
    total_marks: string,
    marks_obtained: string,
}

async function createResult(email: string, yearSemester: string, output: IData) {
    try {
        // Create a new result document
        const result = new Result({
            examiner_email: email,
            year_semester: [
                {
                    year_semester: yearSemester,
                    class: [
                        {
                            class:  output.class,
                            section: [
                                {
                                    section: output.section,
                                    roll_no: [
                                        {
                                            roll_no: output.roll_no,
                                            student_name: output.student_name,
                                            exams: [
                                                {
                                                    exam: output.exam_name,
                                                    total_marks: output.total_marks,
                                                    marks_obtained: output.marks_obtained,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            userAdded: new Date() // This will be automatically set to the current date
        });

        // Save the result document to the database
        await result.save();
    } catch (error) {
        console.error('Error saving result:', error);
    }
}

async function upsertResult(existingResult: IResult, yearSemester: string, output: IData) {
    try {
        // Find the index of the year-semester
        let yearSemesterIndex = existingResult.year_semester.findIndex(ys => ys.year_semester === yearSemester);
        
        if (yearSemesterIndex === -1) {
            // Year-Semester does not exist, insert it
            existingResult.year_semester.push({
                year_semester: yearSemester,
                class: [
                    {
                        class:  output.class,
                        section: [
                            {
                                section: output.section,
                                roll_no: [
                                    {
                                        roll_no: output.roll_no,
                                        student_name: output.student_name,
                                        exams: [
                                            {
                                                exam: output.exam_name,
                                                total_marks: output.total_marks,
                                                marks_obtained: output.marks_obtained,
                                                added: new Date(),
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            return;
        }else{

            const yearSemesterEntry = existingResult.year_semester[yearSemesterIndex];

            // Check if the class exists
            let classIndex = yearSemesterEntry.class.findIndex(cls => cls.class === output.class);

            if (classIndex === -1) {
                // Class does not exist, insert it
                yearSemesterEntry.class.push({
                    class: output.class,
                    section: [
                        {
                            section: output.section,
                            roll_no: [
                                {
                                    roll_no: output.roll_no,
                                    student_name: output.student_name,
                                    exams: [
                                        {
                                            exam: output.exam_name,
                                            total_marks: output.total_marks,
                                            marks_obtained: output.marks_obtained,
                                            added: new Date(),
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
                return;
            }else{

                const classEntry = yearSemesterEntry.class[classIndex];

                // Check if the section exists
                let sectionIndex = classEntry.section.findIndex(sec => sec.section === output.section);

                if (sectionIndex === -1) {
                    // Section does not exist, insert it
                    classEntry.section.push({
                        section: output.section,
                        roll_no: [
                            {
                                roll_no: output.roll_no,
                                student_name: output.student_name,
                                exams: [
                                    {
                                        exam: output.exam_name,
                                        total_marks: output.total_marks,
                                        marks_obtained: output.marks_obtained,
                                        added: new Date(),
                                    }
                                ]
                            }
                        ]
                    });
                    return;
                }else{

                    const sectionEntry = classEntry.section[sectionIndex];

                    // Check if the roll number exists
                    let rollNoIndex = sectionEntry.roll_no.findIndex(rn => rn.roll_no === output.roll_no);

                    if (rollNoIndex === -1) {
                        // Roll number does not exist, insert it
                        sectionEntry.roll_no.push({
                            roll_no: output.roll_no,
                            student_name: output.student_name,
                            exams: [{
                                exam: output.exam_name,
                                total_marks: output.total_marks,
                                marks_obtained: output.marks_obtained,
                                added: new Date()
                            }]
                        });
                    } else {
                        // Roll number exists, update the exams array
                        const rollNoEntry = sectionEntry.roll_no[rollNoIndex];
                        const examIndex = rollNoEntry.exams.findIndex(exam => exam.exam === output.exam_name);

                        if (examIndex === -1) {
                            // Exam does not exist, insert it
                            rollNoEntry.exams.push({
                                exam: output.exam_name,
                                total_marks: output.total_marks,
                                marks_obtained: output.marks_obtained,
                                added: new Date()
                            });
                        } else {
                            // Exam exists, update it
                            rollNoEntry.exams[examIndex] = {
                                exam: output.exam_name,
                                total_marks: output.total_marks,
                                marks_obtained: output.marks_obtained,
                                added: new Date()
                            };
                        }
                    }
                }
            }
        }

        // Save the updated document
        await existingResult.save();

    } catch (error) {
        console.error('Error in upsert operation:', error);
    }
}