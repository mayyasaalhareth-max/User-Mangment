import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import {
    fetchUserAlbums,
    fetchAlbumPhotos,
    createPhoto,
    updatePhoto,
    deletePhoto,
} from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type PhotoType, type AlbumType } from "../types.ts";
import Card from "../components/Card/Card.tsx";
import PageHeader from "../components/PageHeader/PageHeader.tsx";
import PhotoForm from "../components/PhotoForm/PhotoForm.tsx";

type PhotoData = { title: string; url: string; albumId: number };

const MyPhotos = () => {
    const { userId } = useUser();
    const [photos, setPhotos] = useState<PhotoType[]>([]);
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [error, setError] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState<PhotoType | null>(null);

    useEffect(() => {
        if (userId === null) return;
        fetchUserAlbums(userId)
            .then(async (userAlbums) => {
                setAlbums(userAlbums); // نحتفظ بالألبومات لقائمة الإضافة
                // نجلب صور كل ألبوم ثم ندمجها في مصفوفة واحدة
                const results = await Promise.all(
                    userAlbums.map((album) => fetchAlbumPhotos(album.id))
                );
                setPhotos(results.flat());
            })
            .catch((err) => setError(err.message));
    }, [userId]);

    // ---------- Add ----------
    const handleAdd = (data: PhotoData) => {
        createPhoto(data) // الصورة تحتاج albumId فقط، لا userId
            .then((newPhoto) => {
                setPhotos((prev) => [newPhoto, ...prev]); // نضيفها فوق بدون fetch جديد
                setIsAdding(false);
            })
            .catch((err) => setError(err.message));
    };

    // ---------- Update ----------
    const handleUpdate = (data: PhotoData) => {
        if (!editingPhoto) return;
        updatePhoto(editingPhoto.id, data)
            .then((updated) => {
                setPhotos((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                );
                setEditingPhoto(null);
            })
            .catch((err) => setError(err.message));
    };

    // ---------- Delete ----------
    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this photo?")) return;
        try {
            await deletePhoto(id);
            setPhotos((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete photo");
        }
    };

    if (error) return <ErrorMessage message={error} />;

    return (
        <div>
            <PageHeader
                title="My Photos"
                addLabel="Add Photo"
                onAdd={() => {
                    setEditingPhoto(null); // نسكّر أي تعديل مفتوح
                    setIsAdding(true);
                }}
                disabled={isAdding || editingPhoto !== null}
            />

            {isAdding && (
                <div className="mb-4">
                    <PhotoForm
                        albums={albums}
                        onSave={handleAdd}
                        onCancel={() => setIsAdding(false)}
                    />
                </div>
            )}

            {photos.length === 0 && !isAdding && <p>No photos yet.</p>}

            <div className="grid gap-4 sm:grid-cols-2">
                {photos.map((photo) =>
                    editingPhoto?.id === photo.id ? (
                        // وضع التعديل: بدل الـ Card منعرض الفورم بقيم الصورة
                        <PhotoForm
                            key={photo.id}
                            albums={albums}
                            initialTitle={photo.title}
                            initialUrl={photo.url}
                            initialAlbumId={photo.albumId}
                            onSave={handleUpdate}
                            onCancel={() => setEditingPhoto(null)}
                        />
                    ) : (
                        <Card
                            key={photo.id}
                            title={photo.title}
                            subtitle={`Album #${photo.albumId}`}
                            footer={
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsAdding(false);
                                            setEditingPhoto(photo);
                                        }}
                                        className="text-sm text-emerald-700 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(photo.id)}
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            }
                        >
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full rounded border border-gray-200"
                            />
                        </Card>
                    )
                )}
            </div>
        </div>
    );
};

export default MyPhotos;