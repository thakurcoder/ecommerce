"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useStore } from '@/lib/store';

const Signup: React.FC= () => {

  const addEmail = useStore((state:any) => state.addEmail);
  const addName = useStore((state:any) => state.addName);
  const [buttonValue,setButtonValue] = useState("CREATE ACCOUNT")
    const router = useRouter()
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    
    const [error,setError] = useState("")

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

    const onSignup = async ()=>{ 
      if (!validateEmail(data.email)) {
        toast.error('Please enter a valid email address');
        return;
      }

        try{
          setButtonValue("LOADING...")
            const response = await axios.post("/api/user/signup",data)
            if (response.data.status===200){

              // console.log("signup success",response.data)
              addEmail(response.data.user.email)
              addName(response.data.user.name) 
              router.push("/verify")
            }
            else{
              setButtonValue("CREATE ACCOUNT")
              setError(response.data.message)
            }
        }catch(error:any){
          setButtonValue("CREATE ACCOUNT")
            console.log("signup failed",error)
            toast.error(error.massage)
        }
    }


  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md p-8 rounded-lg  outline outline-1 outline-gray-500 bg-white">
        <h1 className="text-2xl font-bold text-center mb-8">Create your account</h1>
        <form onSubmit={(e)=>  e.preventDefault()}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              onChange={(e)=>setData({...data,name:e.target.value})}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none  focus:border-black placeholder-gray-500 text-gray-800"
              placeholder="Enter "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e)=>setData({...data,email:e.target.value})}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black placeholder-gray-500 text-gray-800"
              placeholder="Enter "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e)=>setData({...data,password:e.target.value})}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black placeholder-gray-500 text-gray-800"
              placeholder="Enter "
            />
          </div>
          <button
            type="submit"
            onClick={onSignup}
            className="w-full py-2 rounded-md bg-black hover:bg-gray-700 text-center text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonValue}
          </button>
          <p className='text-red-600' >{error}</p>
        </form>
        <p className="text-center text-sm text-gray-500 mt-8">
        Have an Account? {" "}
          <Link href="/login" className=" text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
