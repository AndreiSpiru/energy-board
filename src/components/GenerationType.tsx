import React from "react";
import { useEffect, useState } from "react";
import { ChartStyle, SingleDimDataPoint } from "./Chart";
import Pie from "./charts/Pie";
import Bar from "./charts/Bar";


export interface GenerationTypeJSON {
    fuelType: string;
    generation: number;
}

export interface GenerationTypeDataPoint {
    startTime : string;
    settlementPeriod: number;
    data: Array<GenerationTypeJSON>;
}

const smallestProportionDisplayed = 0.01;

interface Props {
    data: GenerationTypeDataPoint[];
    chartStyle: ChartStyle;
}

const GenerationTypeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length <= 0) return <></>;
    let list : SingleDimDataPoint[] = props.data[0].data.map((d) => new SingleDimDataPoint(d.fuelType, d.generation, "#FFFFFF"));
    let generationData : SingleDimDataPoint[] = [];
    let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
    for (let e of list) {
        if (e.amount / totalGenerated < smallestProportionDisplayed) {
            let other = generationData.find(d => d.name === "Other");
            if (other == null) {
                generationData.push(new SingleDimDataPoint("Other", e.amount, "#000000"));
            } else {
                other.amount += e.amount;
            }
        } else {
            generationData.push(e);
        }
    }
    switch (props.chartStyle) {
        case ChartStyle.pie:
            return (<Pie data={generationData}/>);
        case ChartStyle.bar:
            return (<Bar data={generationData}/>);
    }
    return <></>;
}

export default GenerationTypeChart;