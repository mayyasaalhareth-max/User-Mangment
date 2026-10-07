import { useState, type FormEvent } from "react";

type Props = {
  initialTitle?: string;
  initialCompleted?: boolean;
  onSave: (data: { title: string; completed: boolean }) => void;
  onCancel: () => void;
};

const TodoForm = ({
  initialTitle = "",
  initialCompleted = false,
  onSave,
  onCancel,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [completed, setCompleted] = useState(initialCompleted);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    if (!title.trim()) return; 
    onSave({ title, completed });
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
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        Completed
      </label>
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

export default TodoForm;
