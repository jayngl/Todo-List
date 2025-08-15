import React, { useContext, useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa6";

const TodoItem = ({
  todoString,
  id,
  date,
  handleDelete,
  handleEdit,
  inputRef,
  isChecked,
  handleCheckBox,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showMore, setShowMore] = useState(false);
  const [formatedString, setFormatedString] = useState("");
  useEffect(() => {
    function resizeWindow() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", resizeWindow);

    return () => {
      removeEventListener("resize", resizeWindow);
    };
  }, []);

  const handleString = () => {
    if (screenWidth <= 450 && todoString.split(" ").length >= 5) {
      return todoString.substring(0, 10) + "...";
    } else if (screenWidth >= 450 && todoString.split(" ").length >= 10) {
      return `${todoString.substring(0, 20).trimEnd()}...`;
    }
    return todoString;
  };

  useEffect(() => {
    setFormatedString(handleString());
  }, [screenWidth, todoString]);
  return (
    <div className="w-full  py-4 flex justify-between items-center px-3 bg-[#FEE8D9]">
      <div className="flex justify-center items-center">
        <div
          className="p-1   border border-[#EDA35A] mr-5 cursor-pointer"
          onClick={() => {
            const checkBoxState = isChecked === 0 ? 1 : 0;
            handleCheckBox(id, "checkbox", checkBoxState);
          }}
          onKeyDown={(e) => {
            if (e.key === " ") {
              const checkBoxState = isChecked === 0 ? 1 : 0;
              handleCheckBox(id, "checkbox", checkBoxState);
            }
          }}
          tabIndex={0}
          role="checkbox"
        >
          <div
            className={`bg-[#EDA35A]  p-2 ${
              Boolean(isChecked) ? "visible" : "invisible"
            }`}
          ></div>
        </div>
        <div className="flex justify-center items-start flex-col  w-full">
          <p className="text-[clamp(.6rem,3vw,.8rem)] text-[#EDA35A]">{date}</p>
          <p className="text-[clamp(.8rem,3vw,.9rem)] w-full">
            {showMore ? todoString : formatedString}
            <span
              onClick={() => {
                setShowMore(!showMore);
              }}
              className={`text-blue-400 cursor-pointer ${
                formatedString !== todoString ? "inline" : "hidden"
              }`}
            >
              {showMore ? " Less" : " More"}
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-4 text-[#EDA35A] text-[clamp(.8rem,3vw,.9rem)]">
        <div
          className=" border p-2 hover:bg-[#EDA35A] hover:text-white"
          onClick={() => {
            handleEdit(true, id, todoString);
            inputRef.current.focus();
            inputRef.current.value = todoString;
          }}
        >
          <FaPen className="cursor-pointer " />
        </div>
        <div
          className=" border p-2 hover:bg-[#EDA35A] hover:text-white"
          onClick={() => {
            handleDelete(id, "single");
          }}
        >
          <FaTrash className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
