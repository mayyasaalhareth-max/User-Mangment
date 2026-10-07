/* export const fetchUsers = () =>
  fetch("http://localhost:3000/users").then((response) => response.json());
 */
const BASE_URL = "http://localhost:3000";

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