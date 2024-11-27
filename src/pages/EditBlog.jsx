import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trimmedId = id.trim(); //to remove the unwanted trailing data
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };

  //   console.log(data);

  //function to edit the blog
  const editBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/update/${trimmedId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("blog updated successffully....!!");
        navigate("/");
      } else {
        toast.error("error while updating blog.!");
      }
    } catch (error) {
      toast.error("something went wrong...!");
    }
  };

  const getBlogById = async () => {
    const response = await axios.get(
      `http://localhost:4000/api/v1/blog/${trimmedId}`
    );
    // console.log(response.data.data);
    setData({
      title: response.data.data.title,
      description: response.data.data.description,
    });
  };

  useEffect(() => {
    getBlogById();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
        <div className="mt-3 text-center text-3xl font-bold">Edit Blog</div>
        <form onSubmit={editBlog}>
          <div className="p-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Title *"
                value={data.title}
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
                value={data.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-center">
              <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
                Edit blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
