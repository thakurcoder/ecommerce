import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getDtataFromToken(requiest:NextRequest){
    try {
        // console.log("in get help")
        const token = requiest.cookies.get('token')?.value || ""
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        // console.log("token decode ",decodedToken)
        // console.log("in get help user id",decodedToken.id)
        return decodedToken.id;
        
    } catch (error:any) {
        return NextResponse.json({
            message:error
        })
    }
}