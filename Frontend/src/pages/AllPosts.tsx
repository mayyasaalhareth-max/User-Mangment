import { useEffect, useState } from "react";
import { fetchAllPosts } from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.js";
import { type PostType } from "../types.js";
import Card from "../components/Card/Card.js";

const AllPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">All Posts</h2>
      <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <Card
          title={post.title}
          subtitle={`By user #${post.userId}`}
          badgeColor="green"
          footer={<span>Post #{post.id}</span>}
          className="max-w-xl"
        >
          {post.body}
        </Card>
      ))}
      </div>
    </div>
  );
};

export default AllPosts;
