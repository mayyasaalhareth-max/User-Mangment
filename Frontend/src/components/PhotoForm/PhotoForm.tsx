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
        e.preventDefault(); 
        if (!title.trim() || !url.trim() || !albumId) return; 
        onSave({ title, url, albumId });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-700/80 bg-slate-900 p-5 shadow-lg shadow-black/10"        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"            />
            <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Image URL"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"            />
            <select
                value={albumId}
                onChange={(e) => setAlbumId(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"            >
                {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                        Album #{album.id} - {album.title}
                    </option>
                ))}
            </select>
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/20"                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PhotoForm;