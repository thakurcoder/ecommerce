import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import {prisma} from "@/lib/db";
import jwt from 'jsonwebtoken'

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody;

        // check if user exist
        const existingUser = await prisma.user.findUnique({
            where:{email:email}
        })

        if (!existingUser){
            return NextResponse.json({
                message:"email does not exist",
                status:400
            })
        }

        const validPassword = await bcryptjs.compare(password,existingUser.password)

        if(!validPassword){
            return NextResponse.json({
                message:"worng password",
                status:400
            })
        }

        // create token data
        const tokenData = {
            id:existingUser.id,
            name:existingUser.name,
            email:existingUser.email
        }

        // create token
        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d" })

        const response = NextResponse.json({
            massage:"login successful",
            success:true,
            status:200
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response

    } catch (error) {
        return NextResponse.json({
            message:error
        })
    }
}