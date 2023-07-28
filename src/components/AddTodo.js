import React, { useState, useEffect } from "react";
import styles from "../css/AddTodo.module.css";
import Todo from "./Todoapp";

const AddTodo = () => {
  const [addStatus, setAddStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("https://react-todo-88b56-default-rtdb.firebaseio.com/task.json")
      .then((response) => response.json())
      .then((data) => {
        const loadedTodos = [];
        for (const key in data) {
          loadedTodos.push({ id: key, title: data[key].title, completed: data[key].completed });
        }
        setTodos(loadedTodos);
      });
  };

  const addTaskHandler = () => {
    setAddStatus(true);
    if (newTask.trim() !== "") {
      const tempTask = {
        title: newTask,
        completed: false, // New tasks are marked as not completed by default
      };

      fetch("https://react-todo-88b56-default-rtdb.firebaseio.com/task.json", {
        method: "POST",
        body: JSON.stringify(tempTask),
      })
        .then(() => {
          setAddStatus(false);
          setNewTask(""); // Clear the new task input after adding
          fetchTodos(); // Fetch updated list of todos
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          setAddStatus(false);
        });
    }
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTask = (taskId) => {
    fetch(`https://react-todo-88b56-default-rtdb.firebaseio.com/task/${taskId}.json`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== taskId);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(`Error deleting task with ID ${taskId}:`, error);
      });
  };

  return (
    <div className="container-hero">
      <div className={styles.container}>
        <h1>
          Manage your tasks <span className={styles.gray}>@Himanshu</span>
        </h1>
        <p className={addStatus === false ? "" : styles["display-none"]}>
          Start by adding your first task #taskmanager #productivity
        </p>
        {/* Render todos */}
        <div className={styles.todoContainer}>
          {todos.map((todo) => (
            <div key={todo.id} className={styles.todoItem}>
              <input
              className={styles.taskDone}
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTaskCompletion(todo.id)}
              />
              <span className={todo.completed ? styles.completed : ""}>{todo.title}</span>
              {todo.completed && (
                <button className={styles.deleteBtn} onClick={() => handleDeleteTask(todo.id)}>
                  Delete Task
                </button>
              )}
            </div>
          ))}
        </div>

        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="e.g. complete unit assignments"
          className={styles.input}
        />
        <button className={styles.btn} onClick={addTaskHandler}>
          Add New Task <div className={addStatus ? styles.loader : ""}></div>
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
