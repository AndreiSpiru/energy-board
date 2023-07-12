import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
import { ChartProps, EnergyType } from "../Chart";

  
  // Show category label for each item in the donut graph
  const labelContent = (e: { category: any; }) => e.category;
  
const Donut: React.FC<ChartProps> = ({ energyData } : ChartProps) => {
    return (
      energyData && 
      <>
      <Chart style = {{
        height: '30vw',
        width: '30vw',
      }}>
        <ChartTitle text="Energy source distribution" />
        <ChartLegend visible={false} />
        <ChartSeries>
          <ChartSeriesItem
            type="pie"
            data={energyData}
            categoryField="name"
            field="amount"
          >
            <ChartSeriesLabels
              color="colour"
              background="none"
              content={labelContent}
            />
          </ChartSeriesItem>
        </ChartSeries>
      </Chart>
      </>
    );
  };
  
  export default Donut;