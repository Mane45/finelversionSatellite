import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";
import { getSatelliteLocation } from "../../../helpers/satelliteCoords";
import { twoline2satrec } from "satellite.js";
//let array
const SatelliteTest = (props) => {
  let line1 = props.graphicProperties.line1;
  let line2 = props.graphicProperties.line2;
  let satrec = twoline2satrec(line1, line2);
  const [graphicState, setGraphicState] = useState(null);
  //const [polygonState, setPolygonState] = useState(null);
  //const [lineState, setLineState] = useState(null);
  //let polyline;
  useEffect(() => {
    let interval;
    loadModules(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/layers/support/LabelClass"])
      .then(([Graphic, GraphicsLayer, LabelClass]) => {
        interval = setInterval(() => {
          let loc = getSatelliteLocation(satrec, new Date());
          const graphic = new Graphic({
            geometry: {
              type: "point",
              x: loc.x,
              y: loc.y,
              z: loc.z,
            },
            symbol: {
              type: "picture-marker",
              url: "https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/satellite.png",
              //url: "https://satellite-demo-geoVibe.netlify.app/assets/satellite.png",
              width: 30,
              height: 30

            },
            popupTemplate:{title: "drgadgrad"},
            // symbol: {
            //   type: "point-3d",
            //   symbolLayers: [{
            //     type: "object",
            //     width: 200000,
            //     height: 200000,
            //     resource: {
            //       //href: "https://geo-vibe.com/demos/sattelite/assets/satellite_1/scene.gltf"
            //       href: "https://satellite-demo-geoVibe.netlify.app/assets/satellite_1/scene.gltf",
            //       //href: "https://satellite-demo-geoVibe.netlify.app/assets/satellite_3/scene.gltf",
            //     },
            //   }]
            // },
          });
          //console.log(graphic)
          setGraphicState(graphic);
        },
          1000
        );
        //console.log(props.view);
        graphicState && props.view.graphics.add(graphicState);
        //polygonState && props.view.graphics.add(polygonState);
        //lineState && props.view.graphics.add(lineState);

      })
      .catch((err) => console.error(err));

    setInterval(
      () => {
        graphicState && props.view.graphics.remove(graphicState);
      },
      1000
    );
    return () => {
      clearInterval(interval);
      clearInterval(
        () => {
          graphicState && props.view.graphics.remove(graphicState);
        },
        1000
      );
    };
  }, [graphicState,
    props.view.graphics, satrec]);

  return null;
};

export default SatelliteTest;
