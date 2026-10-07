import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import { fetchUserTodos } from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type TodoType } from "../types.ts";
import Card from "../components/Card/Card.tsx";

const MyTodos = () => {
  const { userId } = useUser();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId === null) return;
    fetchUserTodos(userId)
      .then(setTodos)
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">My Todos</h2>
      {todos.length === 0 && <p>No todos yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
          {todos.map((todo) => (
            <Card
              key={todo.id}
              title={todo.title}
              badge={todo.completed ? "Done" : "Pending"}
              badgeColor={todo.completed ? "green" : "gray"}
            />
          ))}
      </div>
    </div>
  );
};

export default MyTodos;
