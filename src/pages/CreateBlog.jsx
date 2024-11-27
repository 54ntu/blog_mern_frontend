import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    // console.log(name, value);
    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };
  // console.log(data);

  const submitdata = async (e) => {
    e.preventDefault();
    // console.log("form submitted");
    try {
      const response = await axios.post(
        "https://blog-mern-backend-2s77.onrender.com/api/v1/addblog",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("blog added successfully.!");
        navigate("/");
      } else {
        toast.error("something went wrong.!");
      }
    } catch (error) {
      toast.error("error while creating blog.!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
        <div className="mt-3 text-center text-3xl font-bold">Create Blog</div>
        <form onSubmit={submitdata}>
          <div className="p-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Title *"
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder=""
                onChange={handleChange}
              />
            </div>

            <div className="mt-10">
              <textarea
                name="description"
                type="text"
                cols="30"
                rows="10"
                className=" mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
                placeholder="description *"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
