import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Chart, { DataType, ChartStyle } from "./components/Chart";
import ChartDisplay from "./components/ChartDisplay";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <ul className= "flex-container">
          <li><ChartDisplay/></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
