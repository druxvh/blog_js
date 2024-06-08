import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const Content = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/posts");
        if (response.ok) {
          const data = await response.json();
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
    <div className="ring max-container max-w-5xl mx-auto ">
      {posts.map((post) => (
        <div key={post._id}>
          <Post {...post} />
        </div>
      ))}
    </div>
  );
};

export default Content;
