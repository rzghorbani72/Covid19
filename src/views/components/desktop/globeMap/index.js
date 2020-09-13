import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import "./style.css";

export default function GlobeMap() {
    const [content, setContent] = useState("");
    return (
        <>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
        </>
    )
}