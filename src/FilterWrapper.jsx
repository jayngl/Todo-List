import React, { useEffect, useState } from "react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";

const FilterWrapper = ({ handleSearch, handleFilter }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="w-full flex justify-between items-center relative ">
      <div className={`w-full    ${isShown ? "flex" : "hidden"}`}>
        <div className="w-full px-4 bg-[#FEE8D9]  flex justify-center  items-center">
          <input
            type="text"
            className=" w-full py-2 outline-0 "
            placeholder="Search todos..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <select
          name=""
          id=""
          className="ml-2 px-2 outline-0 bg-[#FEE8D9] p-2 text-[#EDA35A]"
          onChange={(e) => {
            handleFilter(e.target.value);
          }}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="ascending">A-Z</option>
          <option value="descending">Z-A</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
        </select>
      </div>

      <FaMagnifyingGlass
        className={`${isShown ? "hidden" : "block"} cursor-pointer`}
        onClick={() => {
          setIsShown(!isShown);
        }}
      />
      {/* <FaFilter className="cursor-pointer ml-2" /> */}
    </div>
  );
};

export default FilterWrapper;
