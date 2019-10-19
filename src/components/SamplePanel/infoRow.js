import React from 'react';
import { ContextMenuTrigger } from "react-contextmenu";
import { MdReorder } from "react-icons/md";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import Menu from "./menu";
import {makeTimeFormatter} from "../../utils/commonFunctions";

/* the icon on the far left which opens the panel */
const TriggerPanelExpand = ({sampleColour, isExpanded, handleClick}) => {
    return (
        <IconContext.Provider value={{color: sampleColour}}>
            { isExpanded ? (
                <IoIosArrowDropupCircle className="icon120 clickable" onClick={handleClick} />
            ) : (
                <IoIosArrowDropdownCircle className="icon120 clickable" onClick={handleClick} />
            )}
        </IconContext.Provider>
    );
}

/**
 * InfoRow -- the thin line of text / icons at the top of a sample panel
 * the info row is rendered when the panel is collapsed and when open
 */
const InfoRow = ({sampleName, sampleData, sampleColour, menuItems, handleClick, isExpanded}) => {
    const summaryTitle = `${sampleName}`;
    const timeFormatter = makeTimeFormatter();

    console.log(sampleData);
    const summaryText = `${sampleData.mappedCount} reads mapped | ` +
        `${sampleData.temporal.length > 0 ? Math.round(sampleData.temporal[sampleData.temporal.length - 1].mappedRate) : "N/A"} reads/sec | ` +
        `read last seen ${timeFormatter(sampleData.readsLastSeen)} ago`;

    return (
        <div className="infoRow" style={{color: sampleColour}}>
            <div>
                <TriggerPanelExpand isExpanded={isExpanded} handleClick={handleClick} sampleColour={sampleColour}/>
                <span style={{whiteSpace: "nowrap"}}>{summaryTitle}</span>
            </div>

            <span style={{whiteSpace: "nowrap"}}>{summaryText}</span>

            <div>
                <ContextMenuTrigger id={`panelRightClickMenu-${sampleName}`} holdToDisplay={0}>
                    <IconContext.Provider value={{color: sampleColour}}>
                        <MdReorder className="icon150 iconCenterVertically clickable" style={{paddingTop: "3px"}}/>
                    </IconContext.Provider>
                </ContextMenuTrigger>
                <Menu id={`panelRightClickMenu-${sampleName}`} items={menuItems}/>
            </div>

        </div>
    );
};


export default InfoRow;