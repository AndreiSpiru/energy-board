import React from "react";
import { useEffect, useState } from "react";
import { ChartProps } from "./Chart";
import Donut from "./charts/Donut";

export class GenerationType {
    name: string;
    amount: number;
    colour: string; 

    constructor(name : string, amount : number, colour : string) {
        this.name = name;
        this.amount = amount;
        this.colour = colour;
    }
}

interface GenerationTypeJSON {
    fuelType: string;
    generation: number;
}

interface GenerationTypeDataPoint {
    startTime : string;
    settlementPeriod: number;
    data: Array<GenerationTypeJSON>;
}


const url = "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";

const smallestPercentageDisplayed = 0.01;

export interface GenerationTypeChartProps extends ChartProps{
    data: GenerationType[];
}

interface Props {
    data: GenerationTypeDataPoint[];
    children: JSX.Element;
}

const GenerationTypeChart : React.FC<Props> = (props : Props) => {
    let list : GenerationType[] = props.data[0].data.map((d) => new GenerationType(d.fuelType, d.generation, "#FFFFFF"));
    let generationData : GenerationType[] = [];
    let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
    for (let e of list) {
        if (e.amount / totalGenerated < smallestPercentageDisplayed) {
            let other = generationData.find(d => d.name === "Other");
            if (other == null) {
                generationData.push(new GenerationType("Other", e.amount, "#000000"));
            } else {
                other.amount += e.amount;
            }
        } else {
            generationData.push(e);
        }
    }
    return React.cloneElement(props.children, { generationData });
}

export default GenerationTypeChart;