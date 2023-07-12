import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Donut from "./components/charts/Donut";
import GenerationTypeChart from "./components/GenerationType";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <div className="section">
          <GenerationTypeChart chart={Donut} />
        </div>
      </div>
    </div>
  );
}

export default App;
