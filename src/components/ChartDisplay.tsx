import { useEffect, useState } from "react"
import Chart, { ChartStyle, DataType, DataTypes, getDataType } from "./Chart"
import DatePicker from "react-datepicker";
import { DateSelector } from "./DateSelector";
import "react-datepicker/dist/react-datepicker.css";

interface Props {

}

function chartStyleFromString(s : string): ChartStyle {
    switch(s) {
        case "Bar":
            return ChartStyle.bar;
        case "Pie":
            return ChartStyle.pie;
        case "Bar Over Time":
            return ChartStyle.barOverTime;
        case "Stacked Area":
            return ChartStyle.stackedArea;
        default:
            return ChartStyle.stackedArea;
    }
}


function getDateFormat(date: Date){
    return date.toJSON().slice(0,10);
}
function getUrl(type: DataType, startTime: Date, endTime: Date): string {
    console.log(getDateFormat(startTime));
    console.log(`https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?startTime=${getDateFormat(startTime)}&endTime=${getDateFormat(endTime)}`);
    switch(type.name){
        case "generationTypeOverTime":
        case "generationType":
            return `https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?startTime=${getDateFormat(startTime)}&endTime=${getDateFormat(endTime)}`;
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
    const [chartStyle, setChartStyle] = useState<ChartStyle>(ChartStyle.bar);
    const [data, setData] = useState();
    const [startDate, setStartDate] = useState(new Date("01/01/2023"));
    const [endDate, setEndDate] = useState(new Date("01/01/2024"));


    const fetchInfo = () => {
        return fetch(getUrl(dataType, startDate, endDate)).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, [dataType, startDate, endDate]);


    function changeDataType(event : React.ChangeEvent<HTMLSelectElement>) {
        //console.log(event.target.value, getDataType(event.target.value))
        let newType = getDataType(event.target.value);
        setData(undefined);
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
                    {DataTypes.map(type => 
                            <option value={type.name}>{type.name}</option>)}
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
        
        <ul className= "flex-container"> 
            <li>
                <h3>Start Date</h3>
                <DatePicker 
                    dateFormat="dd/MM/yyyy"
                    selected={startDate} 
                    onChange={date =>date && setStartDate(date)}
                    includeDateIntervals={[{start: new Date("01/01/2023"),end:  new Date("01/01/2024")}]}
                />
            </li>
            <li>
            <h3>End Date</h3>
                <DatePicker 
                    dateFormat="dd/MM/yyyy"
                    selected={endDate} 
                    onChange={date =>date && setEndDate(date)}
                    includeDateIntervals={[{start: new Date("01/01/2023"),end:  new Date("01/01/2024")}]}
                />
            </li>
        </ul>
       
        <Chart dataType={dataType} chartStyle={chartStyle} data={data}/>
        <svg className="sprites">
            <symbol id="select-arrow-down" viewBox="0 0 10 6">
                <polyline points="1 1 5 5 9 1"></polyline>
            </symbol>
        </svg>
        </>
    )
}

export default ChartDisplay;