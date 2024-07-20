"use client";
import { useStore } from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";

const Verify: React.FC = () => {

  const email = useStore((state:any)=> state.email)
  const [buttonValue,setButtonValue] = useState("VERIFY")
  const [otp, setOtp] = useState(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    setButtonValue("LOADING...")
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input field
      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }

  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const otpCode = otp.join("");
      // console.log("OTP Code:", otpCode);
      const response = await axios.post("/api/user/verify",{otp:otpCode,email:email})
      if (response.data.status === 200){

        router.push("/login")
      }
      else{
        router.push("/signup")
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const maskEmail = (email: string): string => {
    const [user, domain] = email.split('@');
    const maskedUser = user.slice(0, 3) +'*'.repeat(user.length);
    return `${maskedUser}@${domain}`;
  };

  return (
    <div className="flex items-center justify-center mt-11">
      <div className="w-full max-w-md p-8 rounded-lg outline outline-gray-500 outline-1 bg-white">
        <h1 className="text-2xl font-bold text-center mb-8">Verify your email</h1>
        <p className="text-center text-gray-700 text-base mb-8">
          Enter the 8-digit code you have received on {maskEmail(email)}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center mb-6 space-x-2">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index]}
                required
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-10 text-center border border-gray-300 rounded"
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-80 h-12 m-4 rounded-md bg-black hover:bg-gray-700 text-center text-white font-medium"
            >
              {buttonValue}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verify;
