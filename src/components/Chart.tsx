import { useState } from "react";

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
/*
const url = "https://data.dev.elexon.co.uk/bmrs/api/v1/generation/outturn/summary?from=2023-07-12&to=2023-07-12";

export default function Chart ({ chart }) {
    const [data, setData] = useState([]);

    function fetchInfo() {
        return fetch(url).then((res) => res.json()).then((res) => setData(res))
    }


}*/