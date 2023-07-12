import React from "react";
import { useEffect, useState } from "react";
import Donut, {Props as DonutProps} from "./charts/Donut";

export class EnergyType {
    name: string;
    amount: number;
    colour: string; 

    constructor(name : string, amount : number, colour : string) {
        this.name = name;
        this.amount = amount;
        this.colour = colour;
    }
}

interface EnergyTypeJSON {
    fuelType: string;
    generation: number;
}

interface EnergyData {
    startTime : string;
    settlementPeriod: number;
    data: Array<EnergyTypeJSON>;
}


const url = "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";

interface Props {
    chart: React.FC<DonutProps>;
}

const Chart : React.FC<Props> = ({ chart } : Props) => {
    const [data, setData] = useState<EnergyData[]>([]);

    const fetchInfo = () => {
        return fetch(url).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    if(data.length > 0)
    {
        console.log(data);
        let list = data[0].data;
        const donutProps : DonutProps = {energyData : list.map((d) => new EnergyType(d.fuelType, d.generation, "#FFFFFF"))};
        return chart(donutProps);
    }
    else{
        return(
            <></>
        )
    }
    
}

export default Chart;