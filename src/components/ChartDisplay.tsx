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
        <ul className= "flex-container">
            <label className="select" htmlFor="slct">
                <select id="slct" onChange={changeDataType}>
                    <option value={"generationType"}>Energy Generation Type</option>
                    <option value={"generationTypeOverTime"}>Energy Generation Type Over Time</option>
                </select>
                <svg>
                    <use xlinkHref="#select-arrow-down"></use>
                </svg>
            </label>
            <label className="select" htmlFor="slct">
                <select onChange={changeChartStyle}>
                    {dataType.supportedCharts.map(style => 
                        <option value={style}>{style}</option>)}
                </select>
                <svg>
                    <use xlinkHref="#select-arrow-down"></use>
                </svg>
            </label>
        </ul>
        <Chart dataType={dataType} chartStyle={chartStyle}/>
        <svg className="sprites">
            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                <polyline points="1 1 5 5 9 1"></polyline>
            </symbol>
        </svg>
        </>
    )
}

export default ChartDisplay;