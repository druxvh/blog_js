import React from "react";
import { Link } from "react-router-dom";
const Post = ({_id, title, description, content, coverImage, author,  createdAt }) => {
  // Format date and time code snippet from ChatGPT
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(createdAt).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="ring my-5 flex flex-col md:flex-row gap-4 overflow-hidden">
      <div className="w-full max-h-48 md:w-1/3  flex-shrink-0 overflow-hidden ">
        <Link to={`/post/${_id}`} target="_blank">
          <img
            src={`http://127.0.0.1:4000/uploads/${coverImage}`}
            alt={title}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between w-full md:w-2/3 p-4 ">
        <Link to={`/post/${_id}`} target="_blank">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold ">
              {title}
            </h2>
            <span className="text-xs text-slate-600 font-mono">{`@${author?.username} ${formattedDate} ${formattedTime}`}</span>
            <p className="mt-3 text-sm md:text-base">{description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Post;
