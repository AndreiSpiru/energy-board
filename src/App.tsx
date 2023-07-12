import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Donut from "./components/charts/Donut";
import Chart from "./components/Chart";
import Column from "./components/charts/Column";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <ul className= "flex-container">
          <li><Chart chart={Donut} /></li>
          <li><Chart chart={Donut} /></li>
          <li><Chart chart={Donut} /></li>
          <li><Chart chart={Column} /></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
