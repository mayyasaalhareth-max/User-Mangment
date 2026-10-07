import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import {
  fetchUserAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type AlbumType } from "../types.ts";
import Card from "../components/Card/Card.tsx";
import PageHeader from "../components/PageHeader/PageHeader.tsx";
import AlbumForm from "../components/AlbumForm/AlbumForm.tsx";

type AlbumData = { title: string };

const MyAlbums = () => {
  const { userId } = useUser();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<AlbumType | null>(null);

  useEffect(() => {
    if (userId === null) return;
    fetchUserAlbums(userId)
      .then(setAlbums)
      .catch((err) => setError(err.message));
  }, [userId]);

  // ---------- Add ----------
  const handleAdd = (data: AlbumData) => {
    if (userId === null) return;
    createAlbum({ ...data, userId })
      .then((newAlbum) => {
        setAlbums((prev) => [newAlbum, ...prev]); 
        setIsAdding(false);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Update ----------
  const handleUpdate = (data: AlbumData) => {
    if (!editingAlbum) return;
    updateAlbum(editingAlbum.id, data)
      .then((updated) => {
        setAlbums((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
        setEditingAlbum(null);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Delete (مع حذف الفوتوغرافس) ----------
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this album and its photos?")) return;
    try {
      await deleteAlbum(id);
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete album");
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="My Albums"
        addLabel="Add Album"
        onAdd={() => {
          setEditingAlbum(null); 
          setIsAdding(true);
        }}
        disabled={isAdding || editingAlbum !== null}
      />

      {isAdding && (
        <div className="mb-4">
          <AlbumForm onSave={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {albums.length === 0 && !isAdding && <p>No albums yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {albums.map((album) =>
          editingAlbum?.id === album.id ? (
            <AlbumForm
              key={album.id}
              initialTitle={album.title}
              onSave={handleUpdate}
              onCancel={() => setEditingAlbum(null)}
            />
          ) : (
            <Card
              key={album.id}
              title={album.title}
              subtitle={`Album #${album.id}`}
              footer={
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingAlbum(album);
                    }}
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(album.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              }
            />
          )
        )}
      </div>
    </div>
  );
};

export default MyAlbums;
