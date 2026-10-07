import { useState, type FormEvent } from "react";

type Props = {
  initialTitle?: string;
  initialBody?: string;
  onSave: (data: { title: string; body: string }) => void;
  onCancel: () => void;
};

const PostForm = ({
  initialTitle = "",
  initialBody = "",
  onSave,
  onCancel,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onSave({ title, body });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 rounded border border-gray-300 p-4"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded border px-2 py-1"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
        rows={3}
        className="w-full rounded border px-2 py-1"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;