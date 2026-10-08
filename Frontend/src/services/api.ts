/* export const fetchUsers = () =>
  fetch("http://localhost:3000/users").then((response) => response.json());
 */
/* const BASE_URL = "http://localhost:3000";

const request = (path) =>
  fetch(`${BASE_URL}${path}`).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong while loading data");
    }
    return response.json();
  });

export const fetchUsers = () => request("/users");

export const fetchAllPosts = () => request("/posts");
export const fetchUserPosts = (userId) => request(`/posts?userId=${userId}`);
export const fetchUserAlbums = (userId) => request(`/albums?userId=${userId}`);
export const fetchUserTodos = (userId) => request(`/todos?userId=${userId}`);

 */


const BASE_URL = "http://localhost:3000";

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Server Error (${response.status})`);
  }
  return response.json();
};

const jsonHeaders = { "Content-Type": "application/json" };

// Users
export const fetchUsers = () =>
  fetch(`${BASE_URL}/users`).then(handleResponse);

// Posts
export const fetchAllPosts = () =>
  fetch(`${BASE_URL}/posts`).then(handleResponse);

export const fetchUserPosts = (userId: number) =>
  fetch(`${BASE_URL}/posts?userId=${userId}`).then(handleResponse);

export const createPost = (post: {
  title: string;
  body: string;
  userId: number;
}) =>
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(post),
  }).then(handleResponse);

export const updatePost = (
  id: number,
  data: { title: string; body: string }
) =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deletePost = (id: number) =>
  fetch(`${BASE_URL}/posts/${id}?_dependent=comments`, {
    method: "DELETE",
  }).then(handleResponse);

// Albums
export const fetchUserAlbums = (userId: number) =>
  fetch(`${BASE_URL}/albums?userId=${userId}`).then(handleResponse);

export const createAlbum = (album: { title: string; userId: number }) =>
  fetch(`${BASE_URL}/albums`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(album),
  }).then(handleResponse);

export const updateAlbum = (id: number, data: { title: string }) =>
  fetch(`${BASE_URL}/albums/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteAlbum = (id: number) =>
  fetch(`${BASE_URL}/albums/${id}?_dependent=photos`, {
    method: "DELETE",
  }).then(handleResponse);

// Todos
export const fetchUserTodos = (userId: number) =>
  fetch(`${BASE_URL}/todos?userId=${userId}`).then(handleResponse);

export const createTodo = (todo: {
  title: string;
  completed: boolean;
  userId: number;
}) =>
  fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(todo),
  }).then(handleResponse);

export const updateTodo = (
  id: number,
  data: { title: string; completed: boolean }
) =>
  fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteTodo = (id: number) =>
  fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  }).then(handleResponse);

 
// Photos
export const fetchAlbumPhotos = (albumId: number) =>
  fetch(`${BASE_URL}/photos?albumId=${albumId}`).then(handleResponse);

export const createPhoto = (photo: {
  title: string;
  url: string;
  albumId: number;
}) =>
  fetch(`${BASE_URL}/photos`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(photo),
  }).then(handleResponse);

export const updatePhoto = (
  id: number,
  data: { title: string; url: string; albumId: number }
) =>
  fetch(`${BASE_URL}/photos/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deletePhoto = (id: number) =>
  fetch(`${BASE_URL}/photos/${id}`, {
    method: "DELETE",
  }).then(handleResponse);

  // Comments
export const fetchPostComments = (postId: number) =>
  fetch(`${BASE_URL}/comments?postId=${postId}`).then(handleResponse);

export const createComment = (comment: {
  postId: number;
  userId: number;
  name: string;
  email: string;
  body: string;
}) =>
  fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(comment),
  }).then(handleResponse);

export const updateComment = (
  id: number,
  data: { name: string; email: string; body: string }
) =>
  fetch(`${BASE_URL}/comments/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteComment = (id: number) =>
  fetch(`${BASE_URL}/comments/${id}`, {
    method: "DELETE",
  }).then(handleResponse);