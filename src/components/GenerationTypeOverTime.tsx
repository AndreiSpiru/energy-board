import React from "react";
import { ChartStyle, SingleDimDataPoint, TwoDimDataPoint } from "./Chart";
import StackedArea from "./charts/StackedArea";
import { GenerationTypeDataPoint } from "./GenerationType";
import BarOverTime from "./charts/BarOverTime";
import { maxNumberofDisplayedElementsStackedArea, maxNumberofDisplayedElementsbarOverTime } from "../constants";

interface Props {
    data: GenerationTypeDataPoint[];
    chartStyle: ChartStyle;
}


function parseLabels(startTime : string) {
    return (startTime.slice(8,10) + "/" + startTime.slice(5,7) + "/" + startTime.slice(0,4) + ((startTime.length > 12) ? "~" + startTime.slice(12,16) : ""));
}


function getmaximumAllowedElements(chartStyle: ChartStyle) {
    switch(chartStyle){
        case ChartStyle.stackedArea:
            return maxNumberofDisplayedElementsStackedArea;
        case ChartStyle.barOverTime:
            return maxNumberofDisplayedElementsbarOverTime;
        default:
            return 0;
    }
}

const GenerationTypeOverTimeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length <= 0) return <></>;
    let maxElements = getmaximumAllowedElements(props.chartStyle);
    
    let list : TwoDimDataPoint[] = props.data.map((d) => new TwoDimDataPoint(parseLabels(d.startTime), d.data.map((e) => new SingleDimDataPoint(e.fuelType, e.generation, "#FFFFFF"))));
    let generationData : TwoDimDataPoint[] = [];
    if(list.length > maxElements){
        let count = 0;
        let numberOfPointsBetweenDisplays = Math.ceil(list.length / maxElements);
        console.log(numberOfPointsBetweenDisplays);
        for(let e of list){
            count = (count + 1) % numberOfPointsBetweenDisplays;
            if(count == 1){
                generationData.push(e);
            }
        }
    }
    else{
        list.map(e => generationData.push(e));
    }
    
    switch (props.chartStyle) {
                case ChartStyle.stackedArea:
                    return (<StackedArea points={generationData}/>);
                case ChartStyle.barOverTime:
                    return (<BarOverTime points={generationData}/>);
    }
    return <></>;
}

export default GenerationTypeOverTimeChart;

