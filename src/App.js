import "./App.css";
import {useState} from "react";
import {Save, X, CircleX, CirclePlus} from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([{name: "Pushups", reps: 10, sets: 3}]) //default list are these things
  const [exercise, setExercise] = useState(""); //default state of input box is ""
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  function addTask() {
    if (exercise.trim() === "" || reps.trim() === "" || sets.trim() === "") {
      alert("Make sure to fill all input boxes!");
      return; //all inputs have to be filled to be valid
    }
    setTasks([...tasks, {name: exercise, reps: reps, sets: sets}]); //the ... is like a tuple here, multiple entries which are the previous tasks, pretend they're seperated by comments like (task, task, task) but instead its just written like ...tasks to represent all the older tasks
    setExercise("");
    setReps("");
    setSets("");
  }

  function deleteTask(indexToRemove) {
    console.log(indexToRemove);
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <div>
      <h1 id="header">G-Plan</h1>
      <h2 id="subheader">hi timmy</h2>
      <div id="main">
        <div id="input_controls">
          <div className="input_row">
            <input value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder="Add a new exercise..." maxLength={30}/>
          </div>
          <div className="input_row">
            <input value={sets} onChange={(e) => {if (e.target.value === "" || (1 <= e.target.value && e.target.value <= 10)) setSets(e.target.value)}} placeholder="In sets of..." type="number"/>
          </div>
          <div className="input_row">
            <input value={reps} onChange={(e) => {if (e.target.value === "" || (1 <= e.target.value && e.target.value <= 100)) setReps(e.target.value)}} placeholder="With reps of..." type="number" />
          </div>
          <div>
            <button id="button_add_task" className="invisible_button" title="Add Exercise" onClick={addTask}><CirclePlus size="24"/></button>
            <button id="button_clear_task" className="invisible_button" title="Clear Exercises" onClick={clearTasks}><CircleX size="24"/></button>
          </div>
        </div>
        <hr className="rounded"></hr>
        <ul className="exercise_list">
          {tasks.map((task, index) => (
            <li className="list_item" key={index}>
              <button className="button_del" title="Delete" onClick={() => deleteTask(index)}><X size="16" strokeWidth="4"/></button>
              {task.name} - {task.reps} x {task.sets}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;