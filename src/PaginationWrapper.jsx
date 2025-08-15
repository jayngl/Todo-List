import React, { useState } from "react";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";

const PaginationWrapper = ({ pageNumbers, handleCurrentPage }) => {
  return (
    <div className="w-full flex justify-between items-center my-5 relative bottom-0 px-5">
      <div
        className="bg-[#FEE8D9] px-5 py-2 text-[#EDA35A] cursor-pointer flex justify-center items-center hover:brightness-75"
        onClick={() => {
          handleCurrentPage("prev");
        }}
      >
        <FaCaretLeft />
        Prev
      </div>
      <div className="md:flex justify-center items-center gap-x-5 w-full text-[#EDA35A] hidden">
        {pageNumbers.map((num) => (
          <div
            className="bg-[#FEE8D9] px-5 py-2 cursor-pointer hover:brightness-75"
            key={num}
            onClick={() => {
              handleCurrentPage(num);
            }}
          >
            {num}
          </div>
        ))}
      </div>
      <div
        className="bg-[#FEE8D9] px-5 py-2 text-[#EDA35A]  cursor-pointer flex justify-center items-center hover:brightness-75"
        onClick={() => {
          handleCurrentPage("next");
        }}
      >
        Next
        <FaCaretRight />
      </div>
    </div>
  );
};

export default PaginationWrapper;
