import React, { createContext, useState } from "react";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";

const TodoWrapper = ({
  todoData,
  isLoaded,
  handleDelete,
  handleEdit,
  inputRef,
  handleCheckBox,
  itemsPerPage,
  indexOfFirst,
  indexOfLast,
}) => {
  const currentItems = todoData.slice(indexOfFirst, indexOfLast);

  return (
    <div
      className={`w-full flex justify-center min-h-[15rem] ${
        todoData.length !== 0 && "justify-start"
      } items-center flex-col gap-y-5 mt-5`}
    >
      {isLoaded ? (
        todoData.length === 0 ? (
          <h1 className="text-[#EDA35A]">Nothing Found...</h1>
        ) : (
          currentItems.map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                todoString={todo.todo}
                id={todo.id}
                date={new Date(todo.created_at).toLocaleDateString()}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                inputRef={inputRef}
                isChecked={todo.isChecked}
                handleCheckBox={handleCheckBox}
              />
            );
          })
        )
      ) : (
        <Spinner isLoading={isLoaded} />
      )}
    </div>
  );
};

export default TodoWrapper;
