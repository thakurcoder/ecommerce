import {prisma} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";




export async function POST(requiest:NextRequest) {
  try {
   const body:any = await requiest.json()
   const email = body.email
   const otp = body.otp
    
   const existingemail = await prisma.emailverification.findUnique({
    where:{email:email}
})

  if(existingemail?.otp == otp){

    await prisma.emailverification.delete({
      where: { email },
    });

    return NextResponse.json({
      message:"user verified",
      status:200
    })
  }
  else{

    await prisma.user.delete({
      where: { email },
    });

    await prisma.emailverification.delete({
      where: { email },
    });
    
    return NextResponse.json({
      message: "Invalid OTP",
      error: new Error("Invalid OTP"),
      status:400
    })
  }

  } catch (error) {
    return NextResponse.json({
      message:error
    
    })
  }

}
