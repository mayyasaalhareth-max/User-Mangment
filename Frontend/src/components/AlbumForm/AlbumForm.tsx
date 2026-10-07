import { useState, type FormEvent } from "react";

type Props = {
  initialTitle?: string;
  onSave: (data: { title: string }) => void;
  onCancel: () => void;
};

const AlbumForm = ({ initialTitle = "", onSave, onCancel }: Props) => {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // نمنع reload الصفحة
    if (!title.trim()) return; // ما نقبل حقول فاضية
    onSave({ title });
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

export default AlbumForm;
