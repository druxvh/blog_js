import React from 'react'

const Post = ({ title, description, content, coverImage, createdAt }) => {

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
    <div className="ring max-h-48 my-5 flex flex-col md:flex-row gap-4 overflow-hidden">
      <div className="ring ring-slate-800 h-40 w-full md:w-1/3 flex-shrink-0 overflow-hidden">
        <img
          src={`http://127.0.0.1:4000/uploads/${coverImage}`}
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between w-full md:w-2/3">
        <div>
          <h2 className="text-2xl font-serif font-bold">{title}</h2>
          <span className="text-xs text-slate-600 font-mono">{`${formattedDate} ${formattedTime}`}</span>
          <p className="mt-3 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};
export default Post