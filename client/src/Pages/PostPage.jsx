import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [postInfo, setPostInfo] = useState(null);
  const navigate = useNavigate();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4000/post/${id}`);

        if (!response.ok) {
          console.error("Failed to fetch the post");
          return;
        }

        const data = await response.json();
        setPostInfo(data);
        console.log("data", data);

        // Check if the current user is the author of the post
        if (userInfo.username === data.author.username) {
          setIsAuthor(true);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id, userInfo.username]);

  if (!postInfo) {
    return <div> Loading... </div>;
  }

  // Format date and time code snippet
  const formattedDate = new Date(postInfo.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
  const formattedTime = new Date(postInfo.createdAt).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );


  const deletePost = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:4000/post/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      alert("Post deleted successfully");
      navigate(`/`);
    } else {
      alert("Failed to delete a post");
    }
  };

  return (
    <div className="  max-w-3xl flex mx-auto px-10 ring flex-wrap">
      <div className=" ring flex justify-between w-full flex-col gap-8 my-14">
        <h1 className=" text-4xl  max-w-md sm:max-w-2xl sm:text-5xl font-bold text-wrap">
          {postInfo.title}
        </h1>
        <div className=" flex justify-between">
          <div>
            <span className="text-xs text-slate-950 font-mono font-semibold cursor-pointer">{`By- @${postInfo.author.username}`}</span>
            <span className="text-xs text-slate-600 font-mono">{` / ${formattedDate} ${formattedTime}s`}</span>
          </div>

          {isAuthor && (
            
              <div className="flex gap-6">
                <Link
                  to={`/edit/${postInfo._id}`}
                  className="text-base font-mono underline font-semibold hover:text-blue-600"
                >
                  Edit
                </Link>
                <button
                  className="text-base font-mono underline font-semibold hover:text-red-600"
                  onClick={deletePost}
                >
                  Delete
                </button>
              </div>
            
          )}
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
      {console.log("User & Post Info", { userInfo }, { postInfo })}
      {console.log(
        "user = author",
        userInfo.username === postInfo.author.username
      )}
    </div>
  );
};

export default PostPage;
