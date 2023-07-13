import { useEffect, useState } from "react";
import GenerationTypeChart from "./GenerationType";
import React from "react";

export enum DataType {
    generationType = "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12"
}

export enum ChartStyle {
    donut,
    column
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

export interface SingleDimProps{
    data: SingleDimDataPoint[];
}
interface Props {
    dataType: DataType,
    chartStyle: ChartStyle
}

const Chart : React.FC<Props> = (props : Props) => {
    const [data, setData] = useState();

    const fetchInfo = () => {
        return fetch(props.dataType).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    if(!(data == null))
    {
        switch (props.dataType) {
            case DataType.generationType:
                return <GenerationTypeChart data={data} chartStyle={props.chartStyle}/>
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