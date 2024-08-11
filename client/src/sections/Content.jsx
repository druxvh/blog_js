import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Divider from "../components/Divider";



const Content = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/posts", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (!data) console.log("No content data");
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-container">
      <div className="mx-10">

      <h1 className="my-3 sm:my-10 text-[22px] sm:text-3xl md:text-[32px] font-montserrat font-extrabold">Latest Posts</h1>
      <Divider />
      <div className="my-6 grid place-content-center gap-8">
        {posts.map((post) => (
          <article key={post._id}>
            <Post {...post} />
          </article>
        ))}
      </div>
        </div>
    </div>
  );
};

export default Content;
