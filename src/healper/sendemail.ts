import nodemailer from "nodemailer";
import { NextRequest,NextResponse } from "next/server";
export const SendEmail = async (otp:number,email:string)=>{
    
    let config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      };
    
      let transporter = nodemailer.createTransport(config);
      
     
      try {
        const info = await transporter.sendMail({
          from: `"Aman " <${process.env.EMAIL}>`, // sender address
          to: email, // list of receivers
          subject: " verification otp ", // Subject line
          text: `your otp for varification ${otp}`, // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);
        return NextResponse.json({ message: "Email sent successfully", info });
      } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
      }
} 