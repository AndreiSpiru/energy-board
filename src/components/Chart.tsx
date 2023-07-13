import { useEffect, useMemo, useState } from "react";
import GenerationTypeChart from "./GenerationType";
import React from "react";
import GenerationTypeOverTimeChart from "./GenerationTypeOverTime";
import GenerationForecastTypeChart from "./GenerationForecastType";

export interface DataType {
    name: string;
    supportedCharts: ChartStyle[];
}

export enum ChartStyle {
    pie = "Pie",
    bar = "Bar",
    stackedArea = "Stacked Area",
    barOverTime = "Bar Over Time"
}

export const DataTypes = [
    {name: "generationType", supportedCharts: [ChartStyle.bar, ChartStyle.pie]},
    {name: "generationForecastType", supportedCharts: [ChartStyle.bar, ChartStyle.pie]},
    {name: "generationForecastLongType", supportedCharts: [ChartStyle.bar, ChartStyle.pie]},
    {name: "generationTypeOverTime", supportedCharts: [ChartStyle.stackedArea, ChartStyle.barOverTime]},
    {name: "generationForecastOverTimeType", supportedCharts: [ChartStyle.stackedArea, ChartStyle.barOverTime]},
    {name: "generationForecastOverLongTimeType", supportedCharts: [ChartStyle.stackedArea, ChartStyle.barOverTime]}
];

export function getDataType(name:string) {return DataTypes.find(d => d.name === name) ?? DataTypes[0];}

// export function getDataType(name:string) 
// {
//     switch(name)
//     {
//         case "generationTypeOverTime":
//             return DataTypes[3];
//         case "generationType":
//             return DataTypes[0];
//         case "generationForecastOverTimeType": 
//             return DataTypes[4];   
//         case "generationForecastType":
//             return DataTypes[1];
//         case "generationForecastOverLongTimeType":
//             return DataTypes[5];
//         case "generationForecastLongType":
//             return DataTypes[2];
//         default:
//             return DataTypes[2];
//     }
// }

export class SingleDimDataPoint {
    name: string;
    amount: number;
    colour: string; 

    constructor(name : string, amount : number, colour : string) {
        this.name = name;
        this.amount = amount;
        this.colour = colour;
    }
}

export interface SingleDimProps {
    data: SingleDimDataPoint[];
}

export class TwoDimDataPoint {
    label: string;
    data:SingleDimDataPoint[];
    constructor(label : string, data : SingleDimDataPoint[]) {
        this.label = label;
        this.data = data;
    }
}

export interface TwoDimProps {
    points: TwoDimDataPoint[];
}

interface Props {
    dataType: DataType,
    chartStyle: ChartStyle,
    data: any
}


const Chart : React.FC<Props> = (props : Props) => {
    

    if(!(props.data == null))
    {
        console.log(props.data, props.dataType);

        switch (props.dataType.name) {
            case "generationType":
                return <GenerationTypeChart data={props.data} chartStyle={props.chartStyle}/>
            case "generationTypeOverTime":
                return <GenerationTypeOverTimeChart data={props.data} chartStyle={props.chartStyle}/>
            case "generationForecastLongType":
            case "generationForecastType":
                return <GenerationForecastTypeChart data={props.data} chartStyle={props.chartStyle} overTime={false}/>
            case "generationForecastOverLongTimeType":
            case "generationForecastOverTimeType":
                return <GenerationForecastTypeChart data={props.data} chartStyle={props.chartStyle} overTime={true}/>
            default:
                return (<></>)
        }
    }
    else{
        return(
            <></>
        )
    }
    
}

export default Chart;