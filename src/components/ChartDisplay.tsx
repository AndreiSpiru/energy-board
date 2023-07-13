import { useState } from "react"
import Chart, { ChartStyle, DataType } from "./Chart"

interface Props {

}

function dataTypeFromString(s : string): DataType {
    switch(s) {
        case "generationType":
            return DataType.generationType;
        case "generationTypeOverTime":
            return DataType.generationTypeOverTime;
        default:
            return DataType.generationType;
    }
}

function chartStyleFromString(s : string): ChartStyle {
    switch(s) {
        case "bar":
            return ChartStyle.bar;
        case "pie":
            return ChartStyle.pie;
        case "stackedArea":
            return ChartStyle.stackedArea;
        default:
            return ChartStyle.stackedArea;
    }
}

const ChartDisplay : React.FC<Props> = () => {
    const [dataType, setDataType] = useState<DataType>(DataType.generationType);
    const [chartStyle, setChartStyle] = useState<ChartStyle>(ChartStyle.pie);

    function changeDataType(event : React.ChangeEvent<HTMLSelectElement>) {
        setDataType(dataTypeFromString(event.target.value));
    }

    function changeChartStyle(event : React.ChangeEvent<HTMLSelectElement>) {
        setChartStyle(chartStyleFromString(event.target.value));
    }

    return (<>
        <select onChange={changeDataType}>
            <option value={"generationType"}>Energy Generation Type</option>
            <option value={"generationTypeOverTime"}>Energy Generation Type Over Time</option>
        </select>
        <select onChange={changeChartStyle}>
            <option value={"pie"}>Pie</option>
            <option value={"bar"}>Bar</option>
            <option value={"stackedArea"}>Stacked Area</option>
        </select>
        <Chart dataType={dataType} chartStyle={chartStyle}/>
        </>
    )
}

export default ChartDisplay;