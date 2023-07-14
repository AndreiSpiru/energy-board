import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartArea,
  } from "@progress/kendo-react-charts";
import { TwoDimProps } from "../Chart";
import { COLORS, maxNumberofDisplayedElementsStackedArea } from "../../constants";

interface StackedAreaSeries {
    label: string;
    data: number[];
}

const StackedArea: React.FC<TwoDimProps> = ({ points } : TwoDimProps) => {

    const labels = points.map((d) => d.label);

    const serieses : StackedAreaSeries[] = [];

    for (let p of points) {
        for (let type of p.data) {
            if (serieses.find(s => s.label === type.name) == null) {
                serieses.push({label: type.name, data: []});
            }
        }
    }

    for (let p of points) {
        for (let type of p.data) {
            serieses.find(s => s.label === type.name)?.data.push(type.amount);
        }
    }

    return (
      points && 
      <>
      <Chart style={{ 
        height: '30vw',
        width: '80vw', 
        }}>
            <ChartArea background={COLORS.chartBg}/>
            <ChartTitle text="Stacked area chart" color={COLORS.chartTitle}/>
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={labels} max={maxNumberofDisplayedElementsStackedArea} color={COLORS.chartLabels} labels={{rotation:"auto"}}/>
            </ChartCategoryAxis>
            <ChartSeries>
              {serieses.map((d, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="area"
                  stack={true}
                  tooltip={{ visible: true} }
                  data={d.data}
                  name={d.label}
                />
              ))}
            </ChartSeries>
          </Chart>
      </>
    );
  };
  
  export default StackedArea;