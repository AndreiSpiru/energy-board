import React from "react";
import { useEffect, useState } from "react";

export class GenerationType {
    name: string;
    amount: number;
    colour: string; 

    constructor(name : string, amount : number, colour : string) {
        this.name = name;
        this.amount = amount;
        this.colour = colour;
    }
}

interface GenerationTypeJSON {
    fuelType: string;
    generation: number;
}

interface GenerationTypeDataPoint {
    startTime : string;
    settlementPeriod: number;
    data: Array<GenerationTypeJSON>;
}


const url = "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";

const smallestPercentageDisplayed = 0.01;

export interface ChartProps{
    energyData: GenerationType[];
}

interface Props {
    chart: React.FC<ChartProps>;
}

const GenerationTypeChart : React.FC<Props> = ({ chart } : Props) => {
    const [data, setData] = useState<GenerationTypeDataPoint[]>([]);

    const fetchInfo = () => {
        return fetch(url).then((res) => res.json()).then((res) => setData(res));
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    if(data.length > 0)
    {
        //console.log(data);
        let list : GenerationType[] = data[0].data.map((d) => new GenerationType(d.fuelType, d.generation, "#FFFFFF"));
        let props : ChartProps = {energyData: []};
        let totalGenerated = list.reduce((acc, e) => acc + e.amount, 0);
        for (let e of list) {
            if (e.amount / totalGenerated < smallestPercentageDisplayed) {
                let other = props.energyData.find(d => d.name === "Other");
                if (other == null) {
                    props.energyData.push(new GenerationType("Other", e.amount, "#000000"));
                } else {
                    other.amount += e.amount;
                }
            } else {
                props.energyData.push(e);
            }
        }
        return chart(props);
    }
    else{
        return(
            <></>
        )
    }
    
}

export default GenerationTypeChart;