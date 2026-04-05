import "./App.css";
import {useState,useEffect} from "react";
import {Check, X, CircleX, CirclePlus} from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([{name: "Pushups", reps: 10, sets: 3, color:"rgb(255,255,255)"}]);
  const [completed, setCompleted] = useState([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [c_color, setColor] = useState("rgb(255,255,255)");
  const [quote, setQuote] = useState("");

  async function randomizeQuote() {
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      setQuote(data[0].q);
    }
    catch(err) {
      console.error("Failed to fetch quote. Using default quote instead.");
      const default_quotes = ["The only bad workout is one that didn't happen!","No pain, no gain!","You got this!","Make this one count!","Push yourself when no one else can!"];
      setQuote(default_quotes[Math.floor(Math.random() * default_quotes.length)]);
    }
  }
  useEffect(() => {randomizeQuote();}, []);

  function playSound(sound, vol) {
    let sfx = new Audio("/sounds/" + sound);
    sfx.volume = vol;
    sfx.addEventListener("ended", function() {sfx.remove();});
    sfx.play();
  }

  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  function darken(color, amount = 0.6) {
    const [r, g, b] = color.match(/\d+/g).map(Number);
    return `rgb(${Math.round(r * amount)}, ${Math.round(g * amount)}, ${Math.round(b * amount)})`;
  }

  function addTask() {
    if (exercise.trim() === "" || reps.trim() === "" || sets.trim() === "") {
      alert("Make sure to fill all input boxes!");
      return;
    }
    setTasks([...tasks, {name: exercise, reps: reps, sets: sets, color: c_color}]);
    playSound("add.mp3",0.2);
  }

  function deleteTask(indexToRemove, success) {
    if (success) {setCompleted([...completed, tasks[indexToRemove]])}
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  function clearTasks() {
    setTasks([]);
  }

  return (
    <div>
      <h1 id="header">G-Plan</h1>
      <h2 id="subheader">{quote}</h2>
      <div id="main">
        <div id="input_controls">
          <div className="input_row">
            <input id="exercise_input" value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder="Add a new exercise..." maxLength={30}/>
            <input id="exercise_color_input" value={c_color} onChange={(e) => setColor(hexToRGB(e.target.value))} type="color"/>
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
          {tasks.length === 0 && <p id="exercise_list_placeholder">No exercises yet. Add one?</p>}
          {tasks.map((task, index) => (
            <li className="list_item" key={index} style={{backgroundColor: task.color, boxShadow: `0px 4px 0px ${darken(task.color)}`}}>
              <button className="button_comp" title="Complete" onClick={() => {deleteTask(index,true); playSound("complete.mp3",0.2)}}><Check size="16" strokeWidth="4"/></button>
              <button className="button_del" title="Delete" onClick={() => {deleteTask(index,false); playSound("delete.mp3",0.3)}}><X size="16" strokeWidth="4"/></button>
              {task.name} - {task.reps} x {task.sets}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;