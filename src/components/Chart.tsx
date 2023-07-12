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

const smallestPercentageDisplayed = 0.01;

interface Props {
    chart: React.FC<DonutProps>;
}

const GenerationTypeChart : React.FC<Props> = ({ chart } : Props) => {
    const [data, setData] = useState<EnergyData[]>([]);

    const fetchInfo = () => {
        return fetch(url).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    if(data.length > 0)
    {
        //console.log(data);
        let list : EnergyType[] = data[0].data.map((d) => new EnergyType(d.fuelType, d.generation, "#FFFFFF"));
        let donutProps : DonutProps = {energyData: []};
        let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
        for (let e of list) {
            if (e.amount / totalGenerated < smallestPercentageDisplayed) {
                let other = donutProps.energyData.find(d => d.name === "Other");
                if (other == null) {
                    donutProps.energyData.push(new EnergyType("Other", e.amount, "#000000"));
                } else {
                    other.amount += e.amount;
                }
            } else {
                donutProps.energyData.push(e);
            }
        }
        return chart(donutProps);
    }
    else{
        return(
            <></>
        )
    }
    
}

export default GenerationTypeChart;