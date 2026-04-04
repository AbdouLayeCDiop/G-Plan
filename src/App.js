import {useState} from "react";

function App() {
  const [tasks, setTasks] = useState(["Pushups", "Pull-ups", "Squats"]) //default list are these things
  const [input, setInput] = useState(""); //default state of input box is ""

  function addTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, input]); //the ... is like a tuple here, multiple entries which are the previous tasks, pretend they're seperated by comments like (task, task, task) but instead its just written like ...tasks to represent all the older tasks
    setInput("");
  }

  function deleteTask(indexToRemove) {
    console.log(indexToRemove);
    setTasks(tasks.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div>
      <h1>GYM Planner nigga</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>+</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            [Index {index}] {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;