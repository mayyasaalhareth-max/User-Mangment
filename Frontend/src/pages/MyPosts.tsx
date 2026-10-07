import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import { fetchUserPosts } from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type PostType } from "../types.ts";
import Card from "../components/Card/Card.tsx";

const MyPosts = () => {
  const { userId } = useUser();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId === null) return;
    fetchUserPosts(userId)
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">My Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.id} title={post.title}>
            {post.body}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
