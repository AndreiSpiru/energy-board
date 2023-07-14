import { useEffect, useState } from "react"
import Chart, { ChartStyle, DataType, DataTypes, getDataType } from "./Chart"

interface Props {

}

function chartStylesFromString(s : string): ChartStyle[] {
    switch(s) {
        case "Bar":
            return [ChartStyle.bar];
        case "Pie":
            return [ChartStyle.pie];
        case "Stacked Area":
            return [ChartStyle.stackedArea];
        case "All":
            return [ChartStyle.bar, ChartStyle.pie, ChartStyle.stackedArea];
        default:
            return [ChartStyle.stackedArea];
    }
}


function getUrl(type: DataType): string {
    switch(type.name){
        case "generationTypeOverTime":
        case "generationType":
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary";
        case "generationForecastOverTimeType":    
        case "generationForecastType":
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/availability/summary/14D";
        case "generationForecastOverLongTimeType":
        case "generationForecastLongType":
            return "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/availability/summary/3YW";
        default:
            return "";
    }
}

const ChartDisplay : React.FC<Props> = () => {
    const [dataType, setDataType] = useState<DataType>(getDataType("generationType"));
    const [chartStyle, setChartStyle] = useState<string>("Bar");
    const [data, setData] = useState();

    const fetchInfo = () => {
        return fetch(getUrl(dataType)).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, [dataType]);


    function changeDataType(event : React.ChangeEvent<HTMLSelectElement>) {
        //console.log(event.target.value, getDataType(event.target.value))
        let newType = getDataType(event.target.value);
        setData(undefined);
        setDataType(newType);
        setChartStyle(newType.supportedCharts[0]);
    }

    function changeChartStyle(event : React.ChangeEvent<HTMLSelectElement>) {
        setChartStyle(event.target.value);
    }

    return (<>
        <ul className= "flex-container"> 
            <label className="select" htmlFor="slct">
                <select id="slct" onChange={changeDataType}>
                    {DataTypes.map(type => 
                            <option value={type.name}>{type.prettyName}</option>)}
                </select>
                <svg>
                    <use xlinkHref="#select-arrow-down"></use>
                </svg>
            </label>
            <label className="select" htmlFor="slct">
                <select value={chartStyle} onChange={changeChartStyle}>
                    {dataType.supportedCharts.map(style => 
                        <option value={style}>{style}</option>)}
                    <option value={"All"}>All</option>
                </select>
                <svg>
                    <use xlinkHref="#select-arrow-down"></use>
                </svg>
            </label>
            <svg className="sprites">
                <symbol id="select-arrow-down" viewBox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                </symbol>
            </svg>
        </ul>
        {chartStylesFromString(chartStyle).map(cs =>
            <Chart dataType={dataType} chartStyle={cs} data={data}/>)}
        </>
    )
}

export default ChartDisplay;