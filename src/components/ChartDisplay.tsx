import { useEffect, useState } from "react"
import Chart, { ChartStyle, DataType, DataTypes, getDataType } from "./Chart"

interface Props {

}

function chartStyleFromString(s : string): ChartStyle {
    switch(s) {
        case "Bar":
            return ChartStyle.bar;
        case "Pie":
            return ChartStyle.pie;
        case "Stacked Area":
            return ChartStyle.stackedArea;
        default:
            return ChartStyle.stackedArea;
    }
}

const ChartDisplay : React.FC<Props> = () => {
    const [dataType, setDataType] = useState<DataType>(getDataType("generationType"));
    const [chartStyle, setChartStyle] = useState<ChartStyle>(ChartStyle.bar);

    function changeDataType(event : React.ChangeEvent<HTMLSelectElement>) {
        //console.log(event.target.value, getDataType(event.target.value))
        let newType = getDataType(event.target.value);
        setDataType(newType);
        setChartStyle(newType.supportedCharts[0]);
    }

    function changeChartStyle(event : React.ChangeEvent<HTMLSelectElement>) {
        //console.log(event.target.value, chartStyleFromString(event.target.value))
        setChartStyle(chartStyleFromString(event.target.value));
    }

    return (<>
        <select onChange={changeDataType}>
            <option value={"generationType"}>Energy Generation Type</option>
            <option value={"generationTypeOverTime"}>Energy Generation Type Over Time</option>
        </select>
        <select onChange={changeChartStyle}>
            {dataType.supportedCharts.map(style => 
                <option value={style}>{style}</option>)}
        </select>
        <Chart dataType={dataType} chartStyle={chartStyle}/>
        </>
    )
}

export default ChartDisplay;