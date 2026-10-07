import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.ts";
import {
  fetchUserTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/api.js";
import ErrorMessage from "../components/ErrorMesseg/Error.tsx";
import { type TodoType } from "../types.ts";
import Card from "../components/Card/Card.tsx";
import PageHeader from "../components/PageHeader/PageHeader.tsx";
import TodoForm from "../components/TodoForm/TodoForm.tsx";

type TodoData = { title: string; completed: boolean };

const MyTodos = () => {
  const { userId } = useUser();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    if (userId === null) return;
    fetchUserTodos(userId)
      .then(setTodos)
      .catch((err) => setError(err.message));
  }, [userId]);

  // ---------- Add ----------
  const handleAdd = (data: TodoData) => {
    if (userId === null) return;
    createTodo({ ...data, userId }) 
      .then((newTodo) => {
        setTodos((prev) => [newTodo, ...prev]); 
        setIsAdding(false);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Update ----------
  const handleUpdate = (data: TodoData) => {
    if (!editingTodo) return;
    updateTodo(editingTodo.id, data)
      .then((updated) => {
        setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        setEditingTodo(null);
      })
      .catch((err) => setError(err.message));
  };

  // ---------- Delete ----------
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this todo?")) return;
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="My Todos"
        addLabel="Add Todo"
        onAdd={() => {
          setEditingTodo(null); 
          setIsAdding(true);
        }}
        disabled={isAdding || editingTodo !== null}
      />

      {isAdding && (
        <div className="mb-4">
          <TodoForm onSave={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      )}

      {todos.length === 0 && !isAdding && <p>No todos yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {todos.map((todo) =>
          editingTodo?.id === todo.id ? (
            <TodoForm
              key={todo.id}
              initialTitle={todo.title}
              initialCompleted={todo.completed}
              onSave={handleUpdate}
              onCancel={() => setEditingTodo(null)}
            />
          ) : (
            <Card
              key={todo.id}
              title={todo.title}
              badge={todo.completed ? "Done" : "Pending"}
              badgeColor={todo.completed ? "green" : "gray"}
              footer={
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingTodo(todo);
                    }}
                    className="text-sm text-emerald-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo.id)}
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

export default MyTodos;
