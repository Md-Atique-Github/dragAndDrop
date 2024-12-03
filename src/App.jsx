import { useState } from "react";
import "./App.css";
import { closestCorners, DndContext } from "@dnd-kit/core";
import Column from "./components/column/Column";
import { arrayMove } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Add tests to homepage" },
    { id: 2, title: "Fix styling in about page." },
    { id: 3, title: "finally center the div." },
  ]);
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="App">
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
