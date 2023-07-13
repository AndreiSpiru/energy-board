import React from "react";
import { ChartStyle, SingleDimDataPoint } from "./Chart";
import GenerationTypeChart, {GenerationTypeDataPoint, GenerationTypeJSON} from "./GenerationType";
import GenerationTypeOverTimeChart from "./GenerationTypeOverTime";

interface GenerationForecastTypeJSON {
    fuelType: string;
    outputUsable: number;
}

interface GenerationForecastTypeDataPoint {
    forecastDate : string;
    settlementPeriod: number;
    data: Array<GenerationForecastTypeJSON>;
}

interface Props {
    data: GenerationForecastTypeDataPoint[];
    chartStyle: ChartStyle;
    overTime: boolean
}
const GenerationForecastTypeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length <= 0) return <></>;
    let newData : GenerationTypeDataPoint[] = [];
    for(let point of props.data){
        let newPoint : GenerationTypeDataPoint = {startTime: point.forecastDate, settlementPeriod: 0, data: []}
        for(let element of point.data){
            newPoint.data.push({fuelType: element.fuelType, generation: element.outputUsable});
        }
        newData.push(newPoint);
    }
    if(!props.overTime){
        return <GenerationTypeChart data={newData} chartStyle={props.chartStyle}/>
    }
    else{
        return <GenerationTypeOverTimeChart data={newData} chartStyle={props.chartStyle}/>
    }
}

export default GenerationForecastTypeChart;