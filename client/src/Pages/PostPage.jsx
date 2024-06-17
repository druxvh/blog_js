import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo, setUserInfo} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPostInfo(data);
        } else {
          console.error("Failed to fetch the post");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);
  if (!postInfo) {
    return <div>Loading...</div>;
  }
// Format date and time code snippet from ChatGPT
const formattedDate = new Date(postInfo.createdAt).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const formattedTime =new Date(postInfo.createdAt).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const deletePost = async (e) => {
  e.preventDefault()
  
      const response = await fetch(`http://127.0.0.1:4000/post/${id}`,{
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        navigate(`/`);
      } else {
        console.log("Failed to delete a post");
      }
  };

  return (
    <div className="  max-w-3xl flex mx-auto px-10  flex-wrap">
      <div className=" flex flex-col  gap-8 my-14">
        <h1 className=" text-4xl  max-w-md sm:max-w-2xl sm:text-5xl font-bold ">
          {postInfo.title}
        </h1>
        <div className="flex justify-between">
          <div>

            <span className="text-xs text-slate-950 font-mono font-semibold cursor-pointer">{`By- @${postInfo.author.username}`}</span>
            <span className="text-xs text-slate-600 font-mono">{` / ${formattedDate} ${formattedTime}s`}</span>
          </div>
          <div className="flex gap-6">

    {userInfo && userInfo.username === postInfo.author.username}

          <Link to={`/edit/${postInfo._id}`} className="text-base font-mono underline font-semibold hover:text-blue-600">Edit</Link>
          <button className="text-base font-mono underline font-semibold hover:text-red-600" onClick={deletePost}>Delete</button>
          </div>
        </div>
      </div>
      <div className="mb-10 ">
        <img
          src={`http://127.0.0.1:4000/uploads/${postInfo.coverImage}`}
          alt="Post Cover"
          className="object-contain w-full h-full"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        className="pb-28 text-base"
      />
      {console.log("HEY",userInfo,postInfo)}
      {console.log(userInfo.username === postInfo.author.username)}
    </div>
  );
};

export default PostPage;
