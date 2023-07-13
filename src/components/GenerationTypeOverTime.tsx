import React from "react";
import { useEffect, useState } from "react";
import { ChartStyle, SingleDimDataPoint, TwoDimDataPoint } from "./Chart";
import StackedArea from "./charts/StackedArea";



interface GenerationTypeJSON {
    fuelType: string;
    generation: number;
}

interface GenerationTypeDataPoint {
    startTime : string;
    settlementPeriod: number;
    data: Array<GenerationTypeJSON>;
}



interface Props {
    data: GenerationTypeDataPoint[];
    chartStyle: ChartStyle;
}


const intervalBetweenDisplayedDataPoints = 10;

const GenerationTypeOverTimeChart : React.FC<Props> = (props : Props) => {
    // if (props.data.length > 0) {
    //     let list : SingleDimDataPoint[] = props.data[0].data.map((d) => new SingleDimDataPoint(d.fuelType, d.generation, "#FFFFFF"));
    //     let generationData : SingleDimDataPoint[] = [];
    //     let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
    //     for (let e of list) {
    //         if (e.amount / totalGenerated < smallestProportionDisplayed) {
    //             let other = generationData.find(d => d.name === "Other");
    //             if (other == null) {
    //                 generationData.push(new SingleDimDataPoint("Other", e.amount, "#000000"));
    //             } else {
    //                 other.amount += e.amount;
    //             }
    //         } else {
    //             generationData.push(e);
    //         }
    //     }
    //     switch (props.chartStyle) {
    //         case ChartStyle.pie:
    //             return <Pie data={generationData}/>;
    //         case ChartStyle.bar:
    //             return <Bar data={generationData}/>;
    //     }
    // }   else {
    //     return <></>
    // }
    if (props.data.length > 0){
        let list : TwoDimDataPoint[] = props.data.map((d) => new TwoDimDataPoint(d.startTime, d.data.map((e) => new SingleDimDataPoint(e.fuelType, e.generation, "#FFFFFF"))));
        let generationData : TwoDimDataPoint[] = [];
        let counter = 0;
        for (let e of list){
            counter = (counter + 1) % intervalBetweenDisplayedDataPoints;
            if(counter != 1) continue;
            generationData.push(e);
        }
        switch (props.chartStyle) {
                    case ChartStyle.stackedArea:
                        return (<StackedArea points={generationData}/>);
        }
    } 
    return <></>;
}

export default GenerationTypeOverTimeChart;