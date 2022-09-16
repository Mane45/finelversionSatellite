import { Scene, Map as Arcgis } from "@esri/react-arcgis";
import React, { useState } from "react";
import MyFeatureLayer from "../../MyFeatureLayer";
import ListSatellite from "../ListSatellite/ListSatellite";
// import GeometryTools from "./components/GeometryTools";
import SatelliteTest from "./components/SatelliteTest";
import SatelliteTest1 from "./components/SatelliteTest1";
import SatelliteTrack from "./components/SatelliteTrack";
import "./SceneWrapper.css";

let satelliteData = require("../../configs/config.json");
const map = new Arcgis({
  basemap: "hybrid",
});

function seeMessage() {
  document.querySelector("#text").classList.toggle("showtext");
  document.querySelector("#more-arrow").classList.toggle("rotate1");

}

export const SceneWrapper = () => {
  const [selectedSatellite, setSelectedSatellite] = useState({});
  const [selectedSatellite1, setSelectedSatellite1] = useState({});
  const [selectedSatellite2, setSelectedSatellite2] = useState({});

  const generateSatelliteTest = (satelliteList, selectedListIds) => {
    const selectedIds = Object.keys(selectedListIds).filter(
      (k) => selectedSatellite[k]
    );
    const selectedSatellites = satelliteList.filter((item) =>
      selectedIds.includes(item.id.toString())

    );

    let components = [];
    selectedSatellites.length &&
      selectedSatellites.forEach((item) =>
        components.push(
          <SatelliteTest
            key={item.id}
            graphicProperties={{
              line1: item.lines.line1,
              line2: item.lines.line2
            }}
          />
        )
      );
    return components;
  };

  const generateSatelliteTest1 = (satelliteList1, selectedListIds1) => {
    const selectedIds1 = Object.keys(selectedListIds1).filter(
      (k) => selectedSatellite1[k]
    );
    const selectedSatellites1 = satelliteList1.filter((item) =>
      selectedIds1.includes(item.id.toString())
    );
    let components1 = [];
    selectedSatellites1.length &&
      selectedSatellites1.forEach((item) =>
        components1.push(
          <SatelliteTest1
            key={item.id}
            graphicProperties={{
              color: item.color,
              line1: item.lines.line1,
              line2: item.lines.line2,
              name: item.lines.name,
              width: item.area.width,
              height: item.area.height
            }}
          />
        )
      );
    return components1;

  }

  const generateSatelliteTest2 = (satelliteList2, selectedListIds2) => {
    const selectedIds2 = Object.keys(selectedListIds2).filter(
      (k) => selectedSatellite2[k]
    );
    const selectedSatellites2 = satelliteList2.filter((item) =>
      selectedIds2.includes(item.id.toString())
    );
    let components2 = [];
    selectedSatellites2.length &&
      selectedSatellites2.forEach((item) =>
        components2.push(
          <SatelliteTrack
            key={item.id}
            graphicProperties={{
              color: item.color,
              line1: item.lines.line1,
              line2: item.lines.line2,
            }}
          />
        )
      );
    return components2;

  }

  return (
    <div>
      <div id="logo-div">
        <a href="https://geo-vibe.com/" target="_blank"><img src={require('./components/logo.png')} /></a>
        {/* <p>GEOVIBE</p> */}
      </div>
      <Scene
        style={{ width: "100vw", height: "100vh" }}
        mapProperties={map}
        viewProperties={{
          //map: map,
          center: [40.02, 42.02],
          zoom: 2,
          environment: {
            lighting: {
              type: "sun",
              date: new Date(),
              cameraTrackingEnabled: false
            }
          }
        }}
      >
        {/* <div id="container"> */}
        <ListSatellite setSelectedSatellite={setSelectedSatellite} setSelectedSatellite1={setSelectedSatellite1} setSelectedSatellite2={setSelectedSatellite2} />

        {generateSatelliteTest(satelliteData, selectedSatellite)}
        {generateSatelliteTest1(satelliteData, selectedSatellite1)}
        {generateSatelliteTest2(satelliteData, selectedSatellite2)}
        <MyFeatureLayer
          featureLayerProperties={{
            //url: "https://services4.arcgis.com/XZEtqni2CM1tP1ZM/arcgis/rest/services/Armenia_Boundary_Satellite_Demo_view/FeatureServer",
            url: "https://services4.arcgis.com/XZEtqni2CM1tP1ZM/arcgis/rest/services/Armenia_Boundary_Satellite_Demo_view/FeatureServer",
            renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [255, 0, 0, 0],
                outline: {
                  color: [255, 0, 0, 1],
                  width: 2,
                },
              },
            },
          }}
        />
        {/* <GeometryTools /> */}
        {/* //<SketchTool /> */}

      </Scene>
      {/* </div> */}
      {/* <div id="text">
        <p id="putText"></p>
        <p id="putText1"></p>
      </div> */}
      <div id="messageBox">
        <div id="more" onClick={seeMessage}>
          <span id="more-arrow" className="down-arrow more-arrow">▼</span>
        </div>
        <div id="text" className="text">
          {/* <div id="putTextBox">
            <h3>Overlap satellites from 10 minutes</h3>
            <p id="putText"></p>
          </div> */}
          <div id="putText1Box">
            {/* <h3>Overlaping satellites</h3> */}
            {/* <p>Overlaping satellites</p> */}
            <input className="titleAlert" placeholder="Overlaping satellites"/>
            <p id="putText1"></p>
          </div>
        </div>
      </div>

    </div>
  );
};
