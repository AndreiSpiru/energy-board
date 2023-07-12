import React from "react";
import { useEffect, useState } from "react";

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


export default function Chart (chart : React.FC) {
    const [data, setData] = useState<EnergyData[]>([]);
    const [types, setTypes] = useState<EnergyType[]>([]);

    function fetchInfo() {
        return fetch(url).then((res) => res.json()).then((res) => setData(res))
    }

    useEffect(() => {
        fetchInfo()
    }, []);

    useEffect(() => {
        let list = data[0].data;
        setTypes(list.map((d) => new EnergyType(d["fuelType"], d["generation"], "#FFFFFF")));
    }, [data]);

    return chart(types);
}