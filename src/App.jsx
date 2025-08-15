import { useState, useEffect, useRef } from "react";
import axios from "axios";
import InputWrapper from "./InputWrapper";
import TodoWrapper from "./TodoWrapper";
import FilterWrapper from "./FilterWrapper";
import PaginationWrapper from "./PaginationWrapper";
import { FaTrash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";
import { FaTasks } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null);
  const [todoString, setTodoString] = useState("");
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleCurrentPage = (currentPage) => {
    if (currentPage === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else if (currentPage === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else {
      setCurrentPage(currentPage);
    }
  };

  const API_URL = "http://localhost:8000";

  // function to fetch data from backend api
  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setData(res.data);
      console.log("fetched");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoaded(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // function to handle post req to backend api
  const postTodo = async (data) => {
    const newTodo = { todo: data, isChecked: 0 };
    const res = await axios.post(API_URL, newTodo);
    setData(res.data);
  };

  const handleTodoInput = (data) => {
    postTodo(data);
    console.log(data);
    toast("Added Successfully");
  };

  const handleDeleteReq = async (id, type) => {
    try {
      let option = window.confirm("Do you really want to delete todo");
      if (option === true) {
        const deleteObj = { id: id, type: type };
        const res = await axios.delete(API_URL, { data: deleteObj });
        setData(res.data);
        toast("Deleted Successfully");
      } else {
        toast("Operation Canceled");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAll = async () => {
    try {
      let option = window.confirm("Do you really want to delete all todos");

      if (option === true) {
        const res = await axios.delete(API_URL, { data: { type: "all" } });
        setData(res.data);
        toast("deleted Successfully");
      } else {
        toast("Operation Canceled");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoEditReq = async (id, todo, type) => {
    const updatedTodo = { id: id, todo: todo, type: type };
    const res = await axios.patch(API_URL, updatedTodo);
    setData(res.data);
    toast("Edited successfully");
  };

  const handleEdit = (editFlag, id, todoString) => {
    setIsEditing(editFlag);
    setId(id);
    setTodoString(todoString);

    console.log(editFlag, id, todoString);
  };

  const handleCheckBox = async (id, type, checkBoxState) => {
    const res = await axios.patch(API_URL, {
      id: id,
      type: type,
      isChecked: checkBoxState,
    });

    setData(res.data);
  };

  const handleSearch = (searchString) => {
    // console.log(searchString);
    setSearch(searchString);
    console.log(search);

    setFilteredData(
      (prev) =>
        (prev = data.filter((item) =>
          item.todo.toLowerCase().includes(searchString.toLowerCase())
        ))
    );
  };

  const handleFilter = (filterString) => {
    let result;
    switch (filterString) {
      case "newest":
        result = [...data].sort((a, b) => a.created_at - b.created_at);
        break;

      case "oldest":
        result = [...data].sort((a, b) => b.created_at - a.created_at);
        break;

      case "ascending":
        result = [...data].sort((a, b) => a.todo.localeCompare(b.todo));
        break;

      case "descending":
        result = [...data].sort((a, b) => b.todo.localeCompare(a.todo));
        break;

      case "completed":
        result = [...data].sort((a, b) => b.isChecked - a.isChecked);
        break;

      case "incompleted":
        result = [...data].sort((a, b) => a.isChecked - b.isChecked);
        break;
    }

    console.log(result);

    setFilteredData(result);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <section className="bg-[#EDA35A] lg:py-4 w-full min-h-screen">
      <ToastContainer />
      <div className=" w-full relative px-4 lg:px-8 bg-white  shadow-2xl lg:min-h-[94vh] min-h-screen py-3 flex justify-start items-center flex-col lg:max-w-[58.75rem] lg:mx-auto">
        <h1 className="text-[clamp(1.2rem,3vw,1.5rem)] font-bold text-[#EDA35A] my-2">
          TODO
        </h1>
        <FilterWrapper
          handleSearch={handleSearch}
          handleFilter={handleFilter}
        />
        <InputWrapper
          handleTodoInput={handleTodoInput}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          id={id}
          todoString={todoString}
          inputRef={inputRef}
          handleTodoEditReq={handleTodoEditReq}
        />

        <div className="flex w-full justify-between gap-y-4 gap-x-4 items-start lg:items-center  flex-col  lg:flex-row text-[clamp(.6rem,3vw,.8rem)]">
          <div
            className=" w-full flex  justify-between bg-[#FEE8D9] px-2 py-1  items-center 
           "
          >
            <h1
              className="
              flex justify-center items-center
            "
            >
              <FaTasks className="mr-2" /> Total tasks
            </h1>{" "}
            <p className=" font-bold">{data.length}</p>{" "}
          </div>

          <div className="  w-full flex  justify-between bg-[#FEE8D9] px-2 py-1  items-center ">
            <h1 className="flex justify-center items-center">
              <IoMdCheckmarkCircleOutline className="mr-2" />
              Completed tasks
            </h1>{" "}
            <p className=" font-bold">
              {
                data.filter((el) => {
                  return el.isChecked === 1;
                }).length
              }
              /{data.length}
            </p>{" "}
          </div>
        </div>

        <TodoWrapper
          todoData={filteredData}
          isLoaded={isLoaded}
          handleDelete={handleDeleteReq}
          handleEdit={handleEdit}
          inputRef={inputRef}
          handleCheckBox={handleCheckBox}
          itemsPerPage={itemsPerPage}
          indexOfLast={indexOfLast}
          indexOfFirst={indexOfFirst}
        />
        <div
          className={`w-full my-2 justify-center items-center   ${
            data.length === 0 ? "hidden" : "flex"
          } cursor-pointer`}
          onClick={() => {
            handleDeleteAll();
          }}
        >
          <h1 className="text-[#EDA35A] relative hover:brightness-75 after:absolute after:bottom-0 after:left-0 after:w-full after:bg-red-500 after:border">
            Delete All <FaTrash className="inline ml-2 mb-1" />
          </h1>{" "}
        </div>
        <PaginationWrapper
          pageNumbers={pageNumbers}
          handleCurrentPage={handleCurrentPage}
        />
      </div>
    </section>
  );
}

export default App;
