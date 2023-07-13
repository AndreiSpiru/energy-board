import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
  } from "@progress/kendo-react-charts";
import { SingleDimProps } from "../Chart";

  
const Bar: React.FC<SingleDimProps> = ({ data } : SingleDimProps) => {
    return (
      data && 
      <>
      <Chart style={{ 
        height: '30vw',
        width: '30vw', 
        }}>
            <ChartTitle text="Bar chart" />
            <ChartLegend position="top" orientation="horizontal" />
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={[]} startAngle={45} />
            </ChartCategoryAxis>
            <ChartSeries>
              {data.map((item, idx) => (
                <ChartSeriesItem
                  key={idx}
                  type="column"
                  tooltip={{ visible: true }}
                  data={[item.amount]}
                  name={item.name}
                />
              ))}
            </ChartSeries>
          </Chart>
      </>
    );
  };
  
  export default Bar;