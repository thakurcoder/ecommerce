"use client"
import React from 'react';
import Link from "next/link";
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useStore } from '@/lib/store';
import axios from 'axios';
import { useRouter } from "next/navigation";

const Header: React.FC = () => {

  const name = useStore((state:any)=> state.name)
  const router = useRouter()
  const logout = async ()=>{
    try{
      await axios.get("/api/user/logout")
      router.push("/login")
    }catch(error){
      console.log(error)
    }
  }
  const isHomePage = typeof window !== 'undefined' && window.location.pathname === "/";
  return (
    <header className="bg-white shadow-sm py-2">
        <div className=" mx-auto px-4 flex justify-end items-center space-x-4">
        <Link href="#" className="text-gray-700 hover:text-black">Help</Link>
        <Link href="#" className="text-gray-700 hover:text-black">Orders & Returns</Link>
        <h1  className="text-gray-700 hover:text-black">{name || "Hi, John"}</h1>
      </div>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold">ECOMMERCE</div>
        <nav className="space-x-6">
          <Link href="#" className="text-gray-700 hover:text-black">Categories</Link>
          <Link href="#" className="text-gray-700 hover:text-black">Sale</Link>
          <Link href="#" className="text-gray-700 hover:text-black">Clearance</Link>
          <Link href="#" className="text-gray-700 hover:text-black">New stock</Link>
          <Link href="#" className="text-gray-700 hover:text-black">Trending</Link>
        </nav>
        <div className="flex items-center space-x-7 ">
          <FaSearch className="text-gray-700 hover:text-black cursor-pointer" />
          <FaShoppingCart className="text-gray-700 hover:text-black cursor-pointer" />
          {isHomePage && <button onClick={logout} className='m-2 p-2  text-xl bg-slate-200 shadow-2xl rounded-md' >LOGOUT</button>}
        </div>
      </div>
        <div className='m-1 flex justify-center shadow bg-gray-100'>
            <h1 className=' mx-11 cursor-pointer'> {"<"} </h1>
            <h1>Get 10% off on business sign up</h1>
            <h1 className='mx-11 cursor-pointer'>{">"}</h1>
        </div>
    </header>
  );
};

export default Header;
