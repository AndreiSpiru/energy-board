import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
import { SingleDimProps } from "../Chart";

  
  // Show category label for each item in the donut graph
  const labelContent = (e: { category: any; }) => e.category;


  
const Pie: React.FC<SingleDimProps> = ({ data } : SingleDimProps) => {
    
    return (
      data && 
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
            data={data}
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
  
  export default Pie;