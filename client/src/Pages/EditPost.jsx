import React, { useEffect, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import { useNavigate, useParams } from "react-router-dom";
import CustomFroalaEditor from "../components/FroalaEditorComponent";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setContent(data.content);
          setImage(data.coverImage ? `http://127.0.0.1:4000/uploads/${data.coverImage}` : null)
        } else {
          console.error("Failed to fetch the post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPost();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("description", description);
      formData.set("content", content);
      if (image) {
        formData.set("image", image);
        console.log(`new image added`);
      } // Checks if a new image is selected, sends with formdata and uploads


      const response = await fetch(`http://127.0.0.1:4000/post/${id}`, {
        method: "PUT",
        body: formData,
        credentials: 'include'
      });


      if (response.ok) {
        console.log("Post updated successfully");
        navigate(`/post/${id}`);
      } else {
        console.log("Failed to update a post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form className="max-w-3xl mx-auto mb-20" onSubmit={updatePost}>
      <h1 className="text-3xl font-semibold text-center font-serif my-8">
        Edit your Post
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
          
        />
      </div>
      <div className="mb-5 ">
        <CustomFroalaEditor content={content} setContent={setContent} />
      </div>
      <button
        type="submit"
        className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
      >
        Update Post
      </button>
    </form>
  );
};

export default EditPost;
