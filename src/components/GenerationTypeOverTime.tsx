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


const intervalBetweenDisplayedDataPoints = 2;

function parseLabels(startTime : string) {
    return (startTime.slice(5,7) + "/" + startTime.slice(8,10) + "~" + startTime.slice(12,16))
}
const GenerationTypeOverTimeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length > 0){
        let list : TwoDimDataPoint[] = props.data.map((d) => new TwoDimDataPoint(parseLabels(d.startTime), d.data.map((e) => new SingleDimDataPoint(e.fuelType, e.generation, "#FFFFFF"))));
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