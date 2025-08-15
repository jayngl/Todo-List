import React from "react";
import { FaPlus, FaFloppyDisk } from "react-icons/fa6";

const InputWrapper = ({
  handleTodoInput,
  isEditing,
  setIsEditing,
  id,
  todoString,
  inputRef,
  handleTodoEditReq,
}) => {
  return (
    <div className="w-full  flex my-5 pr-2 bg-[#FEE8D9] justify-center items-center">
      <input
        type="text"
        ref={inputRef}
        className="w-full px-4 py-2 outline-0"
        placeholder="Add todo..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current.value !== "") {
            if (isEditing === true) {
              handleTodoEditReq(id, inputRef.current.value, "todo");
              setIsEditing(false);
            } else {
              handleTodoInput(inputRef.current.value);
            }
            inputRef.current.value = "";
          }
        }}
      />
      {isEditing ? (
        <FaFloppyDisk
          className="mb-1 text-[#EDA35A] text-[1.3rem]"
          onClick={() => {
            handleTodoEditReq(id, inputRef.current.value, "todo");
            setIsEditing(false);
            inputRef.current.value = "";
          }}
        />
      ) : (
        <FaPlus
          className="mb-1 text-[#EDA35A] text-[1.3rem] cursor-pointer"
          onClick={() => {
            if (inputRef.current.value !== "") {
              handleTodoInput(inputRef.current.value);
              inputRef.current.value = "";
            }
          }}
        />
      )}
    </div>
  );
};

export default InputWrapper;
