"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

export default function Home() {
  const addEmail = useStore((state: any) => state.addEmail);
  const addName = useStore((state: any) => state.addName);
  const [userId, setUserId] = useState<number | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [checkedProductIds, setCheckedProductIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchdata = async () => {
    const res = await axios.get("/api/user/userdata");

    addEmail(res.data.data.email);
    addName(res.data.data.name);
    setProducts(res.data.products);
    setCheckedProductIds(res.data.checkedProductIds);
    setUserId(res.data.data.id);
  };

  useEffect(() => {
    fetchdata();
  },[]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = async (productId: number, isChecked: boolean) => {
    const newCheckedProductIds = isChecked
      ? [...checkedProductIds, productId]
      : checkedProductIds.filter(id => id !== productId);

    setCheckedProductIds(newCheckedProductIds);

    try {
      const data = { userId, productId, value: isChecked };
      await axios.post("/api/userproduct", data);
    } catch (error) {
      console.error('Error updating user product:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex justify-center items-center my-7">
      <div className="w-full max-w-md p-8 rounded-lg border border-gray-200 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Please mark your interests!</h1>
        <p className="text-center text-gray-600 mb-4">We will keep you notified.</p>
        <h2 className="text-lg font-semibold mb-4">My saved interests!</h2>
        <div className="space-y-3">
          {currentItems.map((product) => (
            <div key={product.id} className="flex items-center">
              <input
                id={product.id.toString()}
                type="checkbox"
                className="custom-checkbox h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                checked={checkedProductIds.includes(product.id)}
                onChange={(e) => handleCheckboxChange(product.id, e.target.checked)}
              />
              <label htmlFor={product.id.toString()} className="ml-2 text-sm font-medium text-gray-700">
                {product.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="text-gray-500"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-1 text-gray-700 ${page === currentPage ? 'font-bold' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            className="text-gray-500"
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
