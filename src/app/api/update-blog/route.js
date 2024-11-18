import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import Blog from "@/models/blog";

const EditBlog = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required()
})


export async function PUT(req) {
    try {
        await connectToDB();
        const {searchParams} = new URL(req.url)
        const getCurrentBlogId = searchParams.get("id")

        if (!getCurrentBlogId) {
            return NextResponse.json({
                success : false,
                message : "Blog id is not found" 
            })
        }

        const {title , description} = await req.json()

        const {error} = EditBlog.validate({
            title,description
        });

        if (error) {
            return NextResponse.json({
                success : false,
                message : error.details[0].message,
            })
        }

        const updateBlogById = await Blog.findByIdAndUpdate(
            {
                _id : getCurrentBlogId,
            },
            {title,description},
            {new : true}
        )

        if (updateBlogById) {
            return NextResponse.json({
                success : true ,
                message : "Blog is successfully updated"
            })
        }else{
            return NextResponse.json({
                success : false,
                message : "Something went wrong ! Please try again"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success : false,
            message : "Something went wrong ! Please try again"
        })
    }
}