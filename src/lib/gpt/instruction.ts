

export const vision_instruction: string = `Read the image carefully. First extract these data: school code, school name, exam name, exam date, student name, roll no., class, section, and total marks.
Now you task is to evaluate the each answer written by the student in following pages and give marks out of total marks as per the student performance.

Output Format: 
{
    school_code:
    school_name:
    exam_name:
    exam_date:
    student_name:
    roll_no:
    class:
    section:
    total_marks:
    marks_obtained:
}
`;