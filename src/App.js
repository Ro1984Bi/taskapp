import { TaskForm } from "./components/TaskForm";
import "./App.css";
import { useState, useEffect } from "react";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import { Container } from "./components/Container";

function App() {
  const [taskItems, setTaskItems] = useState([]);

  const [showCompleted, setShowCompleted] = useState(false);

  function createNewTask(taskName) {
    if (!taskItems.find((task) => task.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("task");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  const cleanTask = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(taskItems));
  }, [taskItems]);

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
      <TaskForm createNewTask={createNewTask} />
      <TaskTable tasks={taskItems} toggleTask={toggleTask} />

      <VisibilityControl
        setShowCompleted={(checked) => setShowCompleted(checked)}
        isChecked={showCompleted}
        cleanTask={cleanTask}
      />

      {showCompleted === true && (
        <TaskTable
          tasks={taskItems}
          toggleTask={toggleTask}
          showCompleted={showCompleted}
        />
      )}
      </Container>
    </main>
  );
}

export default App;
