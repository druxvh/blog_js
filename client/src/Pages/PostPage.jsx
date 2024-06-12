import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
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
  return (
    <div className=" flex px-10  flex-wrap">
      <div className=" flex flex-col  gap-8 my-14">
        <h1 className=" text-5xl  max-w-2xl  font-bold ">
          {postInfo.title}
        </h1>
        <div className="">
            <span className="text-xs text-slate-950 font-mono font-semibold cursor-pointer">{`By- @${postInfo.author.username}`}</span>
            <span className="text-xs text-slate-600 font-mono">{` / ${formattedDate} ${formattedTime}s`}</span>
        </div>
      </div>
      <div className="mb-10 ring">
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
      {console.log(postInfo)}
    </div>
  );
};

export default PostPage;