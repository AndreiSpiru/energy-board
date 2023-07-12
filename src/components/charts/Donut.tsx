import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
  } from "@progress/kendo-react-charts";
import { COLORS } from "../../constants";
import { GenerationType } from "../ChartComponents";
  
export const energyTypeDataExample = new Array<GenerationType>(
    new GenerationType("Green", 150, COLORS.green),
    new GenerationType("Fossil", 100, COLORS.orange),
    new GenerationType("Nuclear", 75, COLORS.blue),
    new GenerationType("Wind", 50, COLORS.blue)
)
  
  // Show category label for each item in the donut graph
  const labelContent = (e: { category: any; }) => e.category;

export interface Props {
    energyData: GenerationType[];
}
  
  const Donut: React.FC<Props> = ({ energyData } : Props) => {
    
    return (
      energyData && 
      <>
      <Chart style = {{
        height: '50vw',
        width: '50vw',
      }}>
        <ChartTitle text="Energy source distribution" />
        <ChartLegend visible={false} />
        <ChartSeries>
          <ChartSeriesItem
            type="donut"
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