import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Chart, { DataType, ChartStyle } from "./components/Chart";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>National grid: Live</h1>
        <ul className= "flex-container">
          <li><Chart dataType={DataType.generationType} chartStyle={ChartStyle.pie}/></li>
          <li><Chart dataType={DataType.generationForecastType} chartStyle={ChartStyle.pie}/></li>
          <li><Chart dataType={DataType.generationType} chartStyle={ChartStyle.bar}/></li>
          <li><Chart dataType={DataType.generationTypeOverTime} chartStyle={ChartStyle.stackedArea}/></li>
          <li><Chart dataType={DataType.generationForecastOverTimeType} chartStyle={ChartStyle.stackedArea}/></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
