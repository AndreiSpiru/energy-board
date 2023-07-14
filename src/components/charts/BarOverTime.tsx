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
import { SingleDimProps, TwoDimProps } from "../Chart";
import { COLORS, maxNumberofDisplayedElementsbarOverTime } from "../../constants";

interface BarOverTimeSerieses {
    label: string;
    data: number[];
}

const Bar: React.FC<TwoDimProps> = ({ points } : TwoDimProps) => {
    
    const labels = points.map((d) => d.label);

    const serieses : BarOverTimeSerieses[] = [];

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
        height: '40vw',
        width: '80vw',  
        }}>
            <ChartTitle text="Column Chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={labels} max = {maxNumberofDisplayedElementsbarOverTime} />
            </ChartCategoryAxis>
            <ChartSeries>
              {serieses.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="column"
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
  
  export default Bar;