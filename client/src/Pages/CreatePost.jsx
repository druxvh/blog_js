import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TipTapEditor from "../components/TipTapEditor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !image || !content) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("image", image);
      formData.set("content", content);

      const response = await fetch("http://127.0.0.1:4000/post", {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        console.log("Post created successfully");
        navigate("/");
      } else {
        console.log("Failed to create a post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form className="max-w-3xl mx-auto mb-20" onSubmit={createNewPost}>
      <h1 className="text-3xl font-semibold text-center font-serif my-8">
        Write it up!
      </h1>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Title
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Description
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Upload Image
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </div>
      <div className="mb-5  outline">
        <TipTapEditor value={content} onChange={setContent} />
      </div>
      <button
        type="submit"
        className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
