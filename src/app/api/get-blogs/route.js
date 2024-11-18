import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Blog from "@/models/blog";



export async function GET() {
    try {
        await connectToDB();
        const extractAllBlogsFromDB = await Blog.find({});
        
        if (extractAllBlogsFromDB) {
            return NextResponse.json({
                success : true,
                data : extractAllBlogsFromDB
            })
            
        }
        else{
            return NextResponse.json({
                success : false,
                message : "Something went wrong! Please try again later"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong! Please try again later"
        })
    }
}