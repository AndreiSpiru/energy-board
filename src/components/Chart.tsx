import { useEffect, useState } from "react";
import GenerationTypeChart from "./GenerationType";
import React from "react";
import GenerationTypeOverTimeChart from "./GenerationTypeOverTime";

export interface DataType {
    name: string;
    supportedCharts: ChartStyle[];
}

export enum ChartStyle {
    pie = "Pie",
    bar = "Bar",
    stackedArea = "Stacked Area"
}

export const DataTypes = [
    {name: "generationType", supportedCharts: [ChartStyle.bar, ChartStyle.pie]},
    {name: "generationTypeOverTime", supportedCharts: [ChartStyle.stackedArea]}
];

export function getDataType(name:string) {return DataTypes.find(d => d.name === name) ?? DataTypes[0];}

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
    chartStyle: ChartStyle
}

function getUrl(type: DataType): string{
    switch(type.name){
        case "generationType":
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";
        case "generationTypeOverTime":
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary";
        default:
            return "";
    }
}

const Chart : React.FC<Props> = (props : Props) => {
    const [data, setData] = useState();

    const fetchInfo = () => {
        return fetch(getUrl(props.dataType)).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    if(!(data == null))
    {
        switch (props.dataType.name) {
            case "generationType":
                return <GenerationTypeChart data={data} chartStyle={props.chartStyle}/>
            case "generationTypeOverTime":
                return <GenerationTypeOverTimeChart data={data} chartStyle={props.chartStyle}/>
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