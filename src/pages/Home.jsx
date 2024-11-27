import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const getBlogs = async () => {
    const blogs = await axios.get(
      "https://blog-mern-backend-2s77.onrender.com/api/v1/getblog"
    );
    console.log(blogs.data.data);
    setBlog(blogs.data.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {blog.map((lol) => {
          return (
            <div key={lol._id}>
              <Card props={lol} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
