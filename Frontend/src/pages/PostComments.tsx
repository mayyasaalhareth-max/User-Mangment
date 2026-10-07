import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
    fetchPostComments,
    createComment,
    updateComment,
    deleteComment,
} from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type CommentType } from "../types.ts";
import Card from "../components/Card/Card.tsx";
import PageHeader from "../components/PageHeader/PageHeader.tsx";
import CommentForm from "../components/CommentForm/CommentForm.tsx";

type CommentData = { name: string; email: string; body: string };

const PostComments = () => {
    const { postId } = useParams(); // نأخذه من الرابط: /posts/5/comments
    const [comments, setComments] = useState<CommentType[]>([]);
    const [error, setError] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editingComment, setEditingComment] = useState<CommentType | null>(null);

    useEffect(() => {
        if (!postId) return;
        fetchPostComments(Number(postId)) // نجلب تعليقات هذا البوست فقط
            .then(setComments)
            .catch((err) => setError(err.message));
    }, [postId]);

    // ---------- Add ----------
    const handleAdd = (data: CommentData) => {
        if (!postId) return;
        createComment({ ...data, postId: Number(postId) }) // postId من الرابط
            .then((newComment) => {
                setComments((prev) => [newComment, ...prev]);
                setIsAdding(false);
            })
            .catch((err) => setError(err.message));
    };

    // ---------- Update ----------
    const handleUpdate = (data: CommentData) => {
        if (!editingComment) return;
        updateComment(editingComment.id, data)
            .then((updated) => {
                setComments((prev) =>
                    prev.map((c) => (c.id === updated.id ? updated : c))
                );
                setEditingComment(null);
            })
            .catch((err) => setError(err.message));
    };

    // ---------- Delete ----------
    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await deleteComment(id);
            setComments((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete comment");
        }
    };

    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <PageHeader
                title={`Comments - Post #${postId}`}
                addLabel="Add Comment"
                onAdd={() => {
                    setEditingComment(null); // نسكّر أي تعديل مفتوح
                    setIsAdding(true);
                }}
                disabled={isAdding || editingComment !== null}
            />

            {isAdding && (
                <div className="mb-4">
                    <CommentForm onSave={handleAdd} onCancel={() => setIsAdding(false)} />
                </div>
            )}

            {comments.length === 0 && !isAdding && <p>No comments yet.</p>}

            <div className="grid gap-4 sm:grid-cols-2">
                {comments.map((comment) =>
                    editingComment?.id === comment.id ? (
                        // وضع التعديل: بدل الـ Card منعرض الفورم بقيم التعليق
                        <CommentForm
                            key={comment.id}
                            initialName={comment.name}
                            initialEmail={comment.email}
                            initialBody={comment.body}
                            onSave={handleUpdate}
                            onCancel={() => setEditingComment(null)}
                        />
                    ) : (
                        <Card
                            key={comment.id}
                            title={comment.name}
                            subtitle={comment.email}
                            footer={
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAdding(false);
                                            setEditingComment(comment);
                                        }}
                                        className="text-sm text-emerald-700 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            }
                        >
                            {comment.body}
                        </Card>
                    )
                )}
            </div>
        </div>
    );
};

export default PostComments;