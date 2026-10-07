import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import { fetchUserAlbums } from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type AlbumType } from "../types.ts";
import Card from "../components/Card/Card.tsx";

const MyAlbums = () => {
  const { userId } = useUser();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId === null) return;
    fetchUserAlbums(userId)
      .then(setAlbums)
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">My Albums</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {albums.length === 0 && <p>No albums yet.</p>}
        <ul className="list-disc ps-5">
          {albums.map((album) => (
            <Card
              key={album.id}
              title={album.title}
              subtitle={`Album #${album.id}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAlbums;
