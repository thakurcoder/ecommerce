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
      
      await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
     
      try {
        const info = await transporter.sendMail({
          from: `"Aman " <${process.env.EMAIL}>`, // sender address
          to: email, // list of receivers
          subject: " verification otp ", // Subject line
          text: `your otp for varification ${otp}`, // plain text body
        });
        await new Promise((resolve, reject) => {
          // send mail
          transporter.sendMail(info, (err, info) => {
              if (err) {
                  console.error(err);
                  reject(err);
              } else {
                  console.log(info);
                  resolve(info);
              }
          });
      })
    
        console.log("Message sent: %s", info.messageId);
        return NextResponse.json({ message: "Email sent successfully", info });
      } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ message: "Error sending email", error }, { status: 500 });
      }
} 