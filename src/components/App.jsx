import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = filterCategory 
    ? tasks.filter(task => task.category === filterCategory) 
    : tasks;

  function addTask(name, category) {
    setTasks(prev => [...prev, { name: name, category: category, done: false }]);
  }

  function removeTask(indexToRemove) {
    setTasks(prev => prev.filter((_, index) => index !== indexToRemove));
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function updateTaskCategory(index, newCategory) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].category = newCategory;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return 'Try to do at least one! ';
    }
    if (percentage === 100) {
      return 'Nice job for today! ';
    }
    return 'Keep it going! ';
  }

  return (
    <main>
      <h1>To-do List Manager</h1>
      <h2>{numberComplete}/{numberTotal} Complete</h2>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      <div className="category-filter">
        <input 
          type="text" 
          value={filterCategory} 
          onChange={ev => setFilterCategory(ev.target.value)} 
          placeholder="Filter by category..."
        />
      </div>
      {filteredTasks.map((task, index) => (
        <Task
          key={index}
          {...task}
          onRename={newName => renameTask(index, newName)}
          onCategoryChange={newCategory => updateTaskCategory(index, newCategory)}
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
