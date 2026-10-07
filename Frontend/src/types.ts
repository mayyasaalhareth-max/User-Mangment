export type UserType = { id: number; name: string; email: string };
export type PostType = { id: number; userId: number; title: string; body: string };
export type AlbumType = { id: number; userId: number; title: string };
export type TodoType = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
