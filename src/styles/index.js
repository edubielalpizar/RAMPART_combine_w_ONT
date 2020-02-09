/*
 * Copyright (c) 2019 ARTIC Network http://artic.network
 * https://github.com/artic-network/rampart
 *
 * This file is part of RAMPART. RAMPART is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version. RAMPART is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 * See the GNU General Public License for more details. You should have received a copy of the GNU General Public License
 * along with RAMPART. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * RAMPART used (until around v1.0.5) a single CSS stylesheet.
 * This was problematic for a few reasons:
 * (1) we dynamically create some colours (e.g. panel colours, reference
 * colours) so we were already mixing-and-matching global CSS and CSS-in-JS
 * (2) The global CSS sheet was becoming hard to maintain, due to never
 * starting with a clear set of elements
 * (3) It couldn't support using UI themes (e.g. light vs dark themes).
 * 
 * Moving to styled components allows all CSS to be via JS, whilst
 * still being able to use CSS syntax. This starts by simply porting everything
 * to `createGlobalStyle`. In the future, element specific things (e.g. header,
 * sidebar, charts etc) can move to their own styled component.
 */

import { createGlobalStyle } from 'styled-components';

/* Theme variables used in both light & dark UI */
export const mainTheme = {
    articRed: "#e06962",
    articGreen: "#005c68",
    headerTextColour: "#F6EECA",
    // articRedDark: "#803c38", // never used in CSS
};

/* Theme variables only used with "light" UI */
export const lightTheme = {
    foregroundColour: "#02292e",
    backgroundColour: "#fffcf2",
    headerTextColour: "#F6EECA",
    themeTextColour: "#333330"
}

/* Theme variables only used with "dark" UI */
export const darkTheme = {
    foregroundColour: "#fffcf2",
    backgroundColour: "#02292e",
    themeTextColour: "#F6EECA"
};


export const GlobalStyle = createGlobalStyle`


  /* ----------- GLOBALS (BODY) --------------*/
  body {
    overflow-x: hidden;
    font-family: "Lato", serif;
    background: ${(props) => props.theme.backgroundColour};
    color: ${(props) => props.theme.foregroundColour};
  }

  /* ----------- BASIC ELEMENTS  &  CLASSES--------------*/
  a {
    text-decoration: none;
    color: #5097BA;
    cursor: pointer;
    font-weight: 600;
    font-size: 94%;
  }
  h1 {
    font-weight: 600;
    font-size: 2em;
  }
  h1 {
    font-weight: 600;
    font-size: 1.5em;
  }
  div {
    font-weight: normal;
    font-size: 1em;
  }
  .clickable {
    cursor: pointer;
  }
  .mainContainer {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }


  /* ------------- TOGGLE  SWITCH ---------------*/
  div.toggle {
    margin: 0 auto;
    font-weight: 100;
    /* width: 50%; */
  }
  div.toggle > label { /* the box around the slider */
    display: inline-block;
    position: relative;
    width: 30px;
    height: 18px;
    top: 3px;
  }
  div.toggle > :first-child {
    padding-right: 10px;
    font-size: 1em;
  }
  div.toggle > :last-child {
    padding-left: 10px;
    font-size: 1em;
  }
  div.toggle > label > input { /* Hide default HTML checkbox */
    display: none;
  }
  div.toggle > label > span {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 18px;
    border-radius: 18px;
  }
  div.toggle > label > span.background {
    width: 34px;
    background-color: ${(props) => props.theme.themeTextColour};
    cursor: pointer;
  }
  div.toggle > label > span.slider {
    width: 18px;
    right: 0px;
    background-color: ${(props) => props.theme.articGreen};
    -webkit-transition: .4s;
    transition: .4s;
    cursor: pointer;
  }
  div.toggle > label > input:checked + span.slider {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }


  /* --------------- SIDEBARS --------------- */
  div.sidebar {
    position: absolute;
    max-width: 85%;
    overflow-x: scroll;
    height: 95%;
    color: ${(props) => props.theme.foregroundColour};
    background-color: ${(props) => props.theme.backgroundColour};
    padding: 10px;
    border: 3px solid ${(props) => props.theme.articRed};
    border-radius: 10px;
    transition: 0.5s ease-out;
    -webkit-transition: 0.5s ease-out;
  }
  div.sidebar.closed {
    right: -500px;
  }
  div.sidebar.open {
    right: 5px;
  }
  .sidebar input.hidden {
    display: none;
  }
  .sidebar .inner {
    height: 100%;
    overflow: scroll;
  }
  .sidebar .topRight {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  /* ------------ CONFIG SIDEBAR -------------------- */
  .sidebar div.fileDropZone {
    width: 200px;
    height: 24px;
    border: 1px dashed ${(props) => props.theme.foregroundColour};
    display: inline-block;
    margin-right: 20px;
    text-align: center;
    padding-top: 4px;
    font-weight: 600;
  }
  .sidebar div.fileDropZone.dragging {
    background-color: ${(props) => props.theme.articRed};
  }
  .sidebar div + button {
    display: inline-block;
  }
  .sidebar .config input {
    border-radius: 3px;
    border: 2px solid ${(props) => props.theme.articRed};
    background-color: ${(props) => props.theme.backgroundColour};
    color: ${(props) => props.theme.foregroundColour};
    font-size: 16px;
    margin-left: 10px;
    height: 22px;
    padding: 4px;
  }
  .sidebar .config label {
    display: block;
    padding: 5px;
  }
  .sidebar .config .bcLabel {
    display: inline-block;
    min-width: 100px;
  }
  input.wide {
    width: 90%;
  }

  /* ------------------ VIEW OPTIONS SIDEBAR ------------ */
  .swatches-picker > div > div {
    background: inherit !important; /* override the inline styles provided by the component */
    box-shadow: none !important;
  }
  .colorPickerContainer {
    padding-top: 50px;
  }
  .viewOptions {
    width: 400px;
    min-width: 400px;
  }
  .viewOptions > div.colourSwatch {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 3px;
  }
  .viewOptions > div.colourSwatch > div:nth-child(1) {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .viewOptions > div.colourSwatch > div:nth-child(2) {
    /* display: inline-block; */
    padding-left: 10px;
    font-size: 1.2em;
    font-weight: 400;
  }


  /* -------------------- HEADER --------------------- */
  div.header {
    width: 100%;
    margin: auto;
    background-color: ${(props) => props.theme.articGreen};
    color: ${(props) => props.theme.headerTextColour};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 155px;
  }
  div.header .logo {
    float: left;
    margin: 5px;
    margin-right: 20px;
  }
  div.header .title {
    white-space: nowrap;
    overflow: hidden;
  }
  div.header .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: auto;
    padding: 20px 10px 20px 0;
  }
  div.header h3 {
    margin: 2px;
    font-weight: normal;
  }
  div.header .log {
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    padding-top: 5px;
    -moz-transition: height 1s ease-in-out;
    -webkit-transition: height 1s ease-in-out;
    -o-transition: height 1s ease-in-out;
    transition: height 1s ease-in-out;
  }
  div.header .log h3 {
    margin: -3px 20px 0px 10px;
    display: inline;
  }
  div.header span.chevron {
    cursor: pointer;
    padding-left: 10px;
  }
  /* Individual messages are paragraphs */
  div.header .log p {
    margin: 0;
  }
  div.header .log p > span {
    display: inline-block;
    width: 100px;
  }


  /* -------------- PIPELINE LOGS / CONTROL -------------- */
  /* could be somewhat joined with .log above */
  div.header .pipeline {
    border: thin solid ${(props) => props.theme.themeTextColour};
    width: 99%;
    border-radius: 5px;
    padding: 5px 0px 3px 0px;
    margin-bottom: 5px;
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 200px;
  }
  div.header .pipeline.error {
      background-color: ${(props) => props.theme.articRed};
  }
  div.header .pipeline.running {
      background-color: #22968b;
  }
  div.header .pipeline h3 {
    margin: -3px 20px 0px 7px;
    width: 20%;
    overflow-x: hidden;
  }
  div.header .pipeline .topRow {
    display: flex;
    flex-direction: row;
  }
  div.header .pipeline .msg {
    padding-left: 40px;
  }
  div.header .pipeline .padright {
    padding-right: 20px;
  }
  div.header .pipeline .rightIcon {
    margin-left: auto;
    padding-right: 10px;
  }

  /* ---------------- FOOTER ---------------------------- */
  .footer {
    width: 80%;
    margin: auto;
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 300;
  }


  /* -------------- PIPELINE LOGS / CONTROL -------------- */
  /* could be somewhat joined with .log above */
  div.header .pipeline {
    border: thin solid ${(props) => props.theme.themeTextColour};
    width: 99%;
    border-radius: 5px;
    padding: 5px 0px 3px 0px;
    margin-bottom: 5px;
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 200px;
  }
  div.header .pipeline.error {
      background-color: ${(props) => props.theme.articRed};
  }
  div.header .pipeline.running {
      background-color: #22968b;
  }
  div.header .pipeline h3 {
    margin: -3px 20px 0px 7px;
    width: 20%;
    overflow-x: hidden;
  }
  div.header .pipeline .topRow {
    display: flex;
    flex-direction: row;
  }
  div.header .pipeline .msg {
    padding-left: 40px;
  }
  div.header .pipeline .padright {
    padding-right: 20px;
  }
  div.header .pipeline .rightIcon {
    margin-left: auto;
    padding-right: 10px;
  }

  /* ---------------- FOOTER ---------------------------- */
  .footer {
    width: 80%;
    margin: auto;
    font-size: 18px;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 300;
  }

  /* ----------------- MODERN BUTTONS --------------------- */
  button.modernButton {
    display: block;
    background: ${(props) => props.theme.articRed};
    color: ${(props) => props.theme.headerTextColour};
    border: 1px solid ${(props) => props.theme.headerTextColour};
    border-radius: 3px;
    text-decoration: none;
    text-transform: uppercase;
    transition: background 0.3s, color 0.3s;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.2em;
    padding: 5px;
    margin: 5px;
  }
  button.modernButton:hover {
    border: 1px solid ${(props) => props.theme.headerTextColour};
    background: ${(props) => props.theme.headerTextColour};
    color: ${(props) => props.theme.articRed};
  }
  button.modernButton > div {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  button.modernButton > div > svg {
    transform: scale(1.4);
    padding: 0px 5px 0px 5px;
  }
  button.modernButton > div > span {
    padding-right: 5px;
  }

  /* -------------------   UNKNOWN --------------------- */

  /* config stuff */
  div.sidebar {
    position: absolute;
    right: 0px;
  }


  /* ------------- F I L T E R S    S I D E B A R ------------------- */
  .filters .references {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0px 20px;
  }
  .filters .references .item {
    padding-right: 30px;
  }
  .filters .references .item > input:checked {
      background-color: ${(props) => props.theme.articRed};
  }


  /* -------------------- REPORT -------------------------- */
  .report {
    min-width: 70vw; /* sidebar's max width */
  }
  .report caption {
    padding-top: 40px;
    text-align: left;
  }
  .report table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .report td {
    border-top: 1px solid ${(props) => props.theme.foregroundColour};
    border-bottom: 1px solid ${(props) => props.theme.foregroundColour};
  }
  .report th {
    border: none;
    padding: 2px 3px 2px 3px;
  }
  .report td {
    padding: 2px 4px 2px 4px;
  }
  .report .spaceLeft {
    padding-left: 50px
  }
  .report div.caption,
  .report caption {
    color: ${(props) => props.theme.articRed};
    font-size: 1.5em;
    font-weight: 600;
  }
  th.rotate > div {
    /* see https://css-tricks.com/rotated-table-column-headers/ */
    transform: translate(27px, -16px) rotate(315deg); /* magic numbers */
    width: 45px;
  }
  th.rotate > div > span {
    /* the underlining of rotated labels */
    padding: 0px 0px 10px 0px;
    border-bottom: 0.5px dashed ${(props) => props.theme.foregroundColour};
    font-weight: 600;
  }
  th.rotate {
    padding-top: 135px; /* must calculate */
    border: none
  }


  /* -----------S U M M A R Y   P A N E L ---------- */
  #overallSummaryContainer {
    width: calc(100% - 30px);
    height: 350px;       /* adjusting will also adjust the graphs */
    min-height: 350px;   /* as they calculate via document selector query */
    margin: 10px 10px 0px 10px;
  }


  /* ---------------  P A N E L S  ----------------- */
  .panelContainer {
    position: relative;
    width: 98%;
    margin: 0px 10px 10px 10px;
    transition: 0.5s ease-in;
    -webkit-transition: 0.5s ease-in;
    border: 1px solid gray;
    border-radius: 5px;
    border-left: 5px solid gray;
    overflow: hidden;
  }
  .panelContainer.collapsed {
    height: 30px;
    min-height: 30px;
  }
  .panelContainer.expanded {
    height: 370px;
    min-height: 370px;
    /*making space for second row of plots (not needed at the moment):*/
    /*height: 720px;*/
    /*min-height: 720px;*/
  }
  .panelContainer > .infoRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .panelContainer > .infoRow > span,
  .panelContainer > .infoRow > div {
    font-weight: normal;
    font-size: 1.3em;
  }
  .panelContainer > .infoRow > *:first-child {
    padding-top: 2px;
    padding-left: 10px;
    flex-basis: 15%; /* it's a child of a flexbox */
    display: flex; /* to align the icon & text nicely */
    align-items: center;
  }
  .panelContainer > .infoRow > *:first-child > span {
    padding-left: 5px; /* space between sample text & icon */
  }

  .panelContainer > .infoRow > *:last-child {
    padding-right: 10px;
  }
  .panelFlexRow {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(100% - 26px);
  }
  .panelFlexColumn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 26px);
  }

  /* ---------------  C H A R T S ----------------- */
  .graphContainer {
    margin: auto;
    height: 100%;
    max-height: 350px;
    position: relative;
  }
  .chartTitle {
    text-align: center;
    font-weight: 100;
    font-size: 1.0em;
    white-space: nowrap;
    color: ${(props) => props.theme.themeTextColour};
    padding-right: 25px; /* to stop icon overlap */
  }
  .hoverInfo {
    z-index: 20;
    position: absolute;
    border-radius: 5px;
    padding: 5px;
    margin: auto;
    /* background-color: hsla(0,0%,0%,.8); */
    background-color: ${(props) => props.theme.articRed};
    color: ${(props) => props.theme.themeTextColour};
    pointer-events: none;
    visibility: hidden;
    font-size: 14px;
    font-weight: 700;
    overflow-wrap: break-word;
  }
  .chartExpandContractIcon {
    color: ${(props) => props.theme.themeTextColour};
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    transform: scale(1.3);
  }

  /* --------------------- D3 --------------------- */
  .axis text,
  text.axis {
    fill: ${(props) => props.theme.themeTextColour}; /* not color as it's SVG */
    font-size: 12px;
  }
  .legend > text {
    fill: ${(props) => props.theme.themeTextColour}; /* not color as it's SVG */
  }
  rect.amplicon {
    stroke: white;
    stroke-width: 0.5px;
    fill: darkgray;
  }
  rect.amplicon + text, rect.gene + text {
  }

  rect.gene {
    stroke: ${(props) => props.theme.themeTextColour};
    stroke-width: 0.5px;
    fill: ${(props) => props.theme.articGreen};
  }
  rect.gene + text {
      fill: ${(props) => props.theme.foregroundColour};
      font-size: 11px;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: ${(props) => props.theme.themeTextColour};
    stroke-width: 1px;
    shape-rendering: auto;
  }

  /* used in the reference stream graph hover box */
  span.hoverColourSquare {
    display: inline-block;
    width: 30px;
    height: 15px;
  }
  span.hoverColourSquare + span {
    display: inline-block;
  }

  .maxCoverageLine {
      stroke: ${(props) => props.theme.themeTextColour};
      stroke-width: 0.75px;
  }


  /* -------------- BASECALLED DIR ---------------- */
  .centerVertically {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .centerHorizontally {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .startUp > label {
    display: block;
    padding: 5px;
  }
  .startUp input {
    border-radius: 3px;
    border: 2px solid ${(props) => props.theme.articRed};
    background-color: ${(props) => props.theme.foregroundColour};
    color: ${(props) => props.theme.articRed};
    font-size: 16px;
    margin-left: 10px;
    height: 22px;
    padding: 4px;
    width: 80vw;
    max-width: 800px;
  }
  .startUp > button {
    margin-top: 50px;
    margin-bottom: 100px;
  }



  /* -------------- RIGHT CLICK MENU ---------------------*/
  .react-contextmenu--visible > .react-contextmenu-item {
    background-color: ${(props) => props.theme.foregroundColour};
    border: 1px solid ${(props) => props.theme.articRed};
    color: ${(props) => props.theme.articRed};
    font-weight: 600;
    padding: 2px 4px 2px 4px;
    cursor: pointer;
  }
  .react-contextmenu-item:hover {
    background-color: ${(props) => props.theme.articRed};
    color: ${(props) => props.theme.foregroundColour};
  }
  .react-contextmenu--visible > .react-contextmenu-item:first-of-type {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .react-contextmenu--visible > .react-contextmenu-item:last-of-type {
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  /* ------------------------ I C O N S --------------------- */
  .icon150 {
    transform: scale(1.5);
  }
  .icon120 {
    transform: scale(1.2);
  }
  .iconCenterVertically {
    height: 100%;
  }


  /* ------------------------- MODAL ----------------------------- */
  .modal-background {
    position: fixed;
    left: 0px;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    overflow: hidden;
  }
  .modal-foreground {
    min-width: 40vw;
    max-width: 60vw;
    min-height: 20vh;
    max-height: 60vh;
    background: ${(props) => props.theme.themeTextColour};
    border-radius: 10px;
    color: ${(props) => props.theme.backgroundColour};
    position: relative;
    padding: 10px;
    overflow-x: scroll;
  }
  .modal-foreground > button.close-modal {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .not-clickable {
    cursor: auto;
  }
  .modal-foreground.warning {
    background: ${(props) => props.theme.articRed};
    color: ${(props) => props.theme.themeTextColour};
  }

  /* ---------- SLIDERS ---------- */
  .slider .rc-slider-track {
      background-color: ${(props) => props.theme.articRed};
  }
  .slider .rc-slider-mark-text-active {
      color: ${(props) => props.theme.articRed};
  }
  .slider .rc-slider-handle {
      border-color: ${(props) => props.theme.articRed};
  }
  .slider .rc-slider-handle:hover {
      border-color: ${(props) => props.theme.articRed};
      background-color: ${(props) => props.theme.articRed};
  }
  .slider .rc-slider-dot-active {
      border-color: ${(props) => props.theme.articRed};
  }
`;