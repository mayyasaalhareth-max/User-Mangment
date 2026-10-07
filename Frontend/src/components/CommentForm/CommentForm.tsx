import { useState, type FormEvent } from "react";

type Props = {
    initialName?: string;
    initialEmail?: string;
    initialBody?: string;
    onSave: (data: { name: string; email: string; body: string }) => void;
    onCancel: () => void;
};

const CommentForm = ({
    initialName = "",
    initialEmail = "",
    initialBody = "",
    onSave,
    onCancel,
}: Props) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [body, setBody] = useState(initialBody);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // نمنع reload الصفحة
        if (!name.trim() || !email.trim() || !body.trim()) return; // ما نقبل حقول فاضية
        onSave({ name, email, body });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-2 rounded border border-gray-300 p-4"
        >
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded border px-2 py-1"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

export default CommentForm;