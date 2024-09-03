import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Exam {
    exam: string;
    total_marks: string;
    marks_obtained: string;
    added: Date;
}

export interface RollNo {
    roll_no: string;
    student_name: string;
    exams: Exam[];
}

export interface Section {
    section: string;
    roll_no: RollNo[];
}

export interface Class {
    class: string;
    section: Section[];
}

export interface YearSemester {
    year_semester: string;
    class: Class[];
}

export interface IResult extends Document {
    examiner_email: string,
    year_semester: YearSemester[];
    userAdded: Date,
}



const ResultSchema: Schema<IResult> = new Schema({
    examiner_email:{
        type: String,
        required: true,
    },
    year_semester: [
        {
            year_semester: {
                type: String,
                required: true,
            },
            class: [
                    {
                        class: {
                            type: String,
                            required: true,
                        },
                        section: [
                            {
                                section: {
                                    type: String,
                                    required: true,
                                },
                                roll_no: [
                                    {
                                        roll_no: {
                                            type: String,
                                            required: true,
                                        },
                                        student_name: {
                                            type: String,
                                            required: true,
                                        },
                                        exams: [
                                            {
                                                exam: {
                                                    type: String,
                                                    required: true,
                                                },
                                                total_marks: {
                                                    type: String,
                                                    required: true,
                                                },
                                                marks_obtained: {
                                                    type: String,
                                                    required: true,
                                                    },
                                                added: {
                                                    type: Date,
                                                    default: Date.now,
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
            ]
        }
    ],
    userAdded: {
        type: Date,
        default: Date.now,
    }
});

// Check if the model already exists before creating it
const Result: Model<IResult> = mongoose.models.Results || mongoose.model<IResult>('Results', ResultSchema);

export default Result;
