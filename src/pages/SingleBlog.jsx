import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  console.log("id value is : ", id);

  const trimmedId = id.trim();
  const getSingleblog = async () => {
    const response = await axios.get(
      `https://blog-mern-backend-2s77.onrender.com/api/v1/blog/${trimmedId}`
    );

    console.log("response value is : ", response.data.data);
    setBlog(response.data.data);
  };

  const deleteBlog = async () => {
    try {
      const response = await axios.delete(
        `https://blog-mern-backend-2s77.onrender.com/api/v1/deleteblog/${trimmedId}`
      );

      console.log(`response getting after deleting blog...`, response);

      if (response.status === 200) {
        toast.success("blog deleted successfully.!");
        navigate("/");
      } else {
        toast.error("error deleting blog");
      }
    } catch (error) {
      toast.error("something went wrong...!!");
    }
  };

  useEffect(() => {
    getSingleblog();
  }, []);

  return (
    <>
      <Navbar />

      <div className="my-10 mx-20 flex flex-col items-center  border  w-[400px] h-[450px] border-gray-200 rounded-lg shadow  md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-40  md:rounded-none md:rounded-s-lg"
          src={blog.image}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {blog.description}
          </p>
        </div>
        <Link
          to={`/edit/${blog._id}`}
          className="w-full bg-red-700 p-2 rounded-md text-xl font-bold text-center"
        >
          <button>Edit</button>
        </Link>
        <button className="w-full bg-red-800 mt-2 p-3" onClick={deleteBlog}>
          delete
        </button>
      </div>
    </>
  );
};

export default SingleBlog;
