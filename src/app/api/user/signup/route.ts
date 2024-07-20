import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/db";
import bcryptjs from "bcryptjs"
import { SendEmail } from "@/healper/sendemail";

function getRandomEightDigitNumber(): number {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const {email,name,password} = body

        const existingUser = await prisma.user.findUnique({
            where:{email:email}
        })

        if (existingUser){
            return NextResponse.json({
                message:"email already exist",
                status:400
            })
        }
        // ckecking email verification 
        const otp = getRandomEightDigitNumber()
        SendEmail(otp,email)

        const findexisting = await prisma.emailverification.findUnique({
            where:{email:email}
        })
        if (findexisting){
            const updatedUser = await prisma.emailverification.update({
                where: { email: email },
                data: {
                  otp: otp   
                },
              });
        }
        else{

            const otpcheck = await prisma.emailverification.create({
                data:{
                    email:email,
                    otp:otp
                }
            })
        }   

        const hashpassword = await bcryptjs.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashpassword
            }
        })
        const {password:newuserpassword,...rest} = newUser;

        return NextResponse.json({user:rest,message:"created user",status:200})


        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:400
        })
    }
}