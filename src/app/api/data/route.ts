import connectDB from "@/lib/db/db";
import Result from "@/lib/db/models/resultSchema";

export async function GET(){
}

export async function POST(request: Request){
    const {query, email} = await request.json();
    // console.log(email);

    await connectDB();
    if(query === "semester"){
        const examiner = await Result.findOne({examiner_email: email});
        return Response.json({result: examiner?.year_semester});
    }

    return Response.json({result: []});
}