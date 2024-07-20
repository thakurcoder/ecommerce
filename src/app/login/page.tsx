"use client"

import React,{useState} from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from "react-hot-toast";


const Login: React.FC = () => {

  const router = useRouter()
  const [data,setData] = useState({
    email:"",
    password:""
})
  const [buttonValue,setButtonValue] = useState("LOGIN")
  const [error,setError] = useState("")
  const [showPassword,setShowPassword] = useState(false)

const onLogin = async ()=>{
  try {
    setButtonValue("LOADING...")
      const response = await axios.post("/api/user/login",data)
      
      if(response.data.status === 200){
        router.push("/")    
      }
      else{
        setButtonValue("LOGIN")
        setError(response.data.message)
      }
  } catch (error:any) {
    setButtonValue("LOGIN")
      console.log(error)
      toast.error(error.massage)
  }
}
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-md p-8 rounded-lg  outline outline-1 outline-gray-500 bg-white">
        <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
        <h1 className="text-xl font-semibold text-center">Welcome back to ECOMMERCE</h1>
        <h2 className=" font-light text-center mb-10">The next gen business marketplace</h2>
        <form onSubmit={(e)=>  e.preventDefault()}>
     
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange = {(e)=>{setData({...data,email:e.target.value})} }
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black placeholder-gray-500 text-gray-800"
              placeholder="Enter "
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="flex justify-end relative mb-6">
              <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black placeholder-gray-500 text-gray-800"
                  placeholder="Enter "
              />
              <span
                  onClick = {()=>setShowPassword(!showPassword)}
                  className="absolute right-3 p-3 cursor-pointer text-gray-500"
              >
                  {showPassword ? 'Hide' : 'Show'}
              </span>
          </div>

          </div>
          <button
            type="submit"
            onClick={onLogin}
            className="w-full py-2 rounded-md bg-black hover:bg-gray-700 text-center text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonValue}
          </button>
          <p className='text-red-600'>{error}</p>
        </form>
        <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an Account? {" "}
          <Link href="/signup" className=" text-black">
          Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
