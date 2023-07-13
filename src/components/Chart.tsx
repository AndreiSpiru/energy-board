import { useEffect, useState } from "react";
import GenerationTypeChart from "./GenerationType";
import React from "react";
import GenerationTypeOverTimeChart from "./GenerationTypeOverTime";

export enum DataType {
    generationType,
    generationTypeOverTime
}

export enum ChartStyle {
    pie,
    bar,
    stackedArea
}

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
    switch(type){
        case DataType.generationType:
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";
        case DataType.generationTypeOverTime:
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
        switch (props.dataType) {
            case DataType.generationType:
                return <GenerationTypeChart data={data} chartStyle={props.chartStyle}/>
            case DataType.generationTypeOverTime:
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