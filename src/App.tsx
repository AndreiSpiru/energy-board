import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Donut, { energyTypeDataExample } from "./components/charts/Donut";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <div className="section">
          <Chart chart={Donut} />
        </div>
      </div>
    </div>
  );
}

export default App;
