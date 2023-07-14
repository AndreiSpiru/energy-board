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
import { COLORS, maxNumberofDisplayedElementsLine } from "../../constants";

interface LineSeries {
    label: string;
    data: number[];
}

const Line: React.FC<TwoDimProps> = ({ points } : TwoDimProps) => {

    const labels = points.map((d) => d.label);

    const serieses : LineSeries[] = [];

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
    console.log(serieses);
    return (
      points && 
      <>
     <Chart style={{ 
        height: '30vw',
        width: '80vw', 
        }}>
            <ChartArea background={COLORS.chartBg}/>
            <ChartTitle text="Line Chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={labels} max={maxNumberofDisplayedElementsLine} color={COLORS.chartLabels} labels={{rotation:"auto"}}/>
            </ChartCategoryAxis>
            <ChartSeries>
              {serieses.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="line"
                  tooltip={{ visible: true }}
                  data={item.data}
                  name={item.label}
                />
              ))}
            </ChartSeries>
          </Chart>
      </>
    );
  };
  
  export default Line;