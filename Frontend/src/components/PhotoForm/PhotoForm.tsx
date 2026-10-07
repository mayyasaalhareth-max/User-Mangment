import { useState, type FormEvent } from "react";

type Props = {
    albums: { id: number; title: string }[];
    initialTitle?: string;
    initialUrl?: string;
    initialAlbumId?: number;
    onSave: (data: { title: string; url: string; albumId: number }) => void;
    onCancel: () => void;
};

const PhotoForm = ({
    albums,
    initialTitle = "",
    initialUrl = "",
    initialAlbumId,
    onSave,
    onCancel,
}: Props) => {
    const [title, setTitle] = useState(initialTitle);
    const [url, setUrl] = useState(initialUrl);
    const [albumId, setAlbumId] = useState<number>(
        initialAlbumId ?? albums[0]?.id ?? 0
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // نمنع reload الصفحة
        if (!title.trim() || !url.trim() || !albumId) return; // ما نقبل حقول فاضية
        onSave({ title, url, albumId });
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
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Image URL"
                className="w-full rounded border px-2 py-1"
            />
            <select
                value={albumId}
                onChange={(e) => setAlbumId(Number(e.target.value))}
                className="w-full rounded border px-2 py-1"
            >
                {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                        Album #{album.id} - {album.title}
                    </option>
                ))}
            </select>
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

export default PhotoForm;