import React from "react";
import { useEffect, useState } from "react";
import { ChartStyle, SingleDimDataPoint } from "./Chart";
import Pie from "./charts/Pie";
import Bar from "./charts/Bar";


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


interface Props {
    data: GenerationTypeDataPoint[];
    chartStyle: ChartStyle;
}

const GenerationTypeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length > 0) {
        let list : SingleDimDataPoint[] = props.data[0].data.map((d) => new SingleDimDataPoint(d.fuelType, d.generation, "#FFFFFF"));
        let generationData : SingleDimDataPoint[] = [];
        let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
        for (let e of list) {
            if (e.amount / totalGenerated < smallestPercentageDisplayed) {
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
                return <Pie data={generationData}/>;
            case ChartStyle.bar:
                return <Bar data={generationData}/>;
        }
    }   else {
        return <></>
    }
}

export default GenerationTypeChart;