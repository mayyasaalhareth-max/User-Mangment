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

// Todos
export const fetchUserTodos = (userId: number) =>
  fetch(`${BASE_URL}/todos?userId=${userId}`).then(handleResponse);