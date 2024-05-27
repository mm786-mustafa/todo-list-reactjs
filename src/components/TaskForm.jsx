import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName, category);
    setTaskName('');
    setCategory('');
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Your next task..."
      />
      <input
        type="text"
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        placeholder="Category..."
      />
      <button type="submit">+</button>
    </form>
  );
}
