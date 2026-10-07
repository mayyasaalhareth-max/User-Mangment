/* import { useEffect, useState } from "react";
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
 */


import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import {
  fetchUserPosts,
  createPost,
  updatePost,
  deletePost,
  // fetchPostComments,
  // deleteComment,
} from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type PostType } from "../types.ts";
import Card from "../components/Card/Card.tsx";
import PageHeader from "../components/PageHeader/PageHeader.tsx"; // عدّل المسار حسب مكان الملف عندك
import PostForm from "../components/PostForm/PostForm.tsx";

type PostData = { title: string; body: string };

const MyPosts = () => {
  const { userId } = useUser();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (userId === null) return;
    fetchUserPosts(userId)
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, [userId]);

  // ---------- Add ----------
  const handleAdd = (data: PostData) => {
    if (userId === null) return;
    createPost({ ...data, userId }) 
      .then((newPost) => {
        setPosts((prev) => [newPost, ...prev]); 
        setIsAdding(false);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Update ----------
  const handleUpdate = (data: PostData) => {
    if (!editingPost) return;
    updatePost(editingPost.id, data)
      .then((updated) => {
        setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setEditingPost(null);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Delete  ----------
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this post and its comments?")) return;
    try {
    //  const comments = await fetchPostComments(id);
     // await Promise.all(comments.map((c: { id: number }) => deleteComment(c.id)));
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="My Posts"
        addLabel="Add Post"
        onAdd={() => {
          setEditingPost(null); 
          setIsAdding(true);
        }}
        disabled={isAdding || editingPost !== null}
      />

      {isAdding && (
        <div className="mb-4">
          <PostForm onSave={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {posts.length === 0 && !isAdding && <p>No posts yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) =>
          editingPost?.id === post.id ? (
            <PostForm
              key={post.id}
              initialTitle={post.title}
              initialBody={post.body}
              onSave={handleUpdate}
              onCancel={() => setEditingPost(null)}
            />
          ) : (
            <Card
              key={post.id}
              title={post.title}
              footer={
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingPost(post);
                    }}
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              }
            >
              {post.body}
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default MyPosts;