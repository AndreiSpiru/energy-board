import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Donut, { energyTypeDataExample } from "./components/charts/Donut";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <div className="section">
          <Donut energyData = {energyTypeDataExample} />
        </div>
      </div>
    </div>
  );
}

export default App;
