import React from "react";
import { Link } from "react-router-dom";
const Post = ({
  _id,
  title,
  description,
  content,
  coverImage,
  author,
  createdAt,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="w-72 min-w-72 h-96 p-2 flex flex-col gap-1 border border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.5)]">
      <div className="">
        <Link
          to={`/post/${_id}`}
          // target="_blank"
        >
          <img
            src={`http://127.0.0.1:4000/uploads/${coverImage}`}
            alt={title}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="  h-full flex flex-col justify-between w-full">
        
          <div className="flex flex-col">
            <div className="flex flex-col  gap-4">
              <h2 className="text-xl font-montserrat font-bold leading-none">
                {title}
              </h2>
              <p className="text-[12px]  tracking-tight font-montserrat">
                {description}
              </p>
            </div>

          </div>
            <div className="flex justify-between mb-2">
              <span className="text-[9px] text-black font-space_mono font-bold">{`@${author?.username}`}</span>
              <div className="flex gap-2">
                <span className="text-[8px] text-black font-space_mono">{`${formattedDate}`}</span>
                <span className="text-[8px] text-black font-space_mono">{` ${formattedTime}`}</span>
              </div>
            </div>
      </div>
    </div>
  );
};
export default Post;
