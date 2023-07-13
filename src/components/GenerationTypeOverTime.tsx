import React from "react";
import { ChartStyle, SingleDimDataPoint, TwoDimDataPoint } from "./Chart";
import StackedArea from "./charts/StackedArea";
import { GenerationTypeDataPoint } from "./GenerationType";

interface Props {
    data: GenerationTypeDataPoint[];
    chartStyle: ChartStyle;
}

function parseLabels(startTime : string) {
    return (startTime.slice(2,4) + "/" + startTime.slice(5,7) + "/" + startTime.slice(8,10) + "~" + startTime.slice(12,16))
}
const GenerationTypeOverTimeChart : React.FC<Props> = (props : Props) => {
    if (props.data.length <= 0) return <></>;

    let list : TwoDimDataPoint[] = props.data.map((d) => new TwoDimDataPoint(parseLabels(d.startTime), d.data.map((e) => new SingleDimDataPoint(e.fuelType, e.generation, "#FFFFFF"))));
    let generationData : TwoDimDataPoint[] = [];
    list.map(e => generationData.push(e));
    switch (props.chartStyle) {
                case ChartStyle.stackedArea:
                    return (<StackedArea points={generationData}/>);
    }
    return <></>;
}

export default GenerationTypeOverTimeChart;