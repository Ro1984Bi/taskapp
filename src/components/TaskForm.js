import { useState } from "react";

export const TaskForm = ({ createNewTask }) => {
  
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTask(newTask)
    setNewTask("");
  };
  return (
    <form onSubmit={handleSubmit} className="my-2 row">
      <div className="col-9">
      <input
        type="text"
        placeholder="New task"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        className="form-control"
      />
      </div>
      <div className="col-3">

      <button className="btn btn-primary btn-sm">Save</button>
      </div>
    </form>
  );
};
