import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Donut from "./components/charts/Donut";
import GenerationTypeChart from "./components/GenerationType";
import Column from "./components/charts/Column";
import Chart, { DataType } from "./components/Chart";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <ul className= "flex-container">
        </ul>
      </div>
    </div>
  );
}

export default App;
