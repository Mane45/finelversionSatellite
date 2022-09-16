// import {propagate, gstime, eciToGeodetic, radiansToDegrees } from 'satellite.js';
import { getSatelliteLocation } from "../helpers/satelliteCoords";
import { twoline2satrec } from "satellite.js";
//import Graphic from "esri/Graphic";
import Graphic from "@arcgis/core/Graphic";
import { intersects } from "@arcgis/core/geometry/geometryEngine"
let satelliteData = require("../configs/config.json")
//let layer = props.map.layers.items[0];

function overlap(text, layers) {
    //document.getElementById("text").style.display = "block";
    let isIntersecting0, isIntersecting1;
    //let isIntersectingEstimate;
    setInterval(() => {
        // function namesEstimateArr(name) {
        //     namesEstimate.push(name);
        // }
        let names = [];
        //layers.forEach(layer1 => {   
        //let namesEstimate = [];
        function namesArr(name) {
            names.push(name);
        }
        layers[0].queryFeatures().then(result => {
            let arr = result.features;
            // console.log(arr);
            arr.forEach((geoItem) => {
                let geometry0 = geoItem.geometry;
                //console.log(geometry0)

                // let geometry0 = result.features[0].geometry;
                // let geometry1 = result.features[1].geometry;
                // console.log(geometry0)
                // console.log(geometry1)
                //console.log(result)
                satelliteData.forEach(item => {
                    let loc = getSatelliteLocation(twoline2satrec(item.lines.line1, item.lines.line2), new Date());
                    //let locEstimate = getSatelliteLocation(twoline2satrec(item.lines.line1, item.lines.line2), new Date(Date.now() + 600000));
                    //console.log(loc);
                    let x1, x2, y1, y2;
                    //let xEstimate1, xEstimate2, yEstimate1, yEstimate2;
                    if (loc.x < 0) {
                        x1 = loc.x + +item.area.width;
                        x2 = loc.x - +item.area.width;
                    } else {
                        x1 = loc.x - +item.area.width;
                        x2 = loc.x + +item.area.width;
                    }
                    if (loc.y < 0) {
                        y1 = loc.y - +item.area.height;
                        y2 = loc.y + +item.area.height;
                    } else {
                        y1 = loc.y + +item.area.height;
                        y2 = loc.y - +item.area.height;
                    }
                    // if (locEstimate.x < 0) {
                    //     xEstimate1 = locEstimate.x + +item.area.width;
                    //     xEstimate2 = locEstimate.x - +item.area.width;
                    // } else {
                    //     xEstimate1 = locEstimate.x - +item.area.width;
                    //     xEstimate2 = locEstimate.x + +item.area.width;
                    // }
                    // if (locEstimate.y < 0) {
                    //     yEstimate1 = locEstimate.y - +item.area.height;
                    //     yEstimate2 = locEstimate.y + +item.area.height;
                    // } else {
                    //     yEstimate1 = locEstimate.y + +item.area.height;
                    //     yEstimate2 = locEstimate.y - +item.area.height;
                    // }
                    let polygon = new Graphic({
                        geometry: {
                            type: "polygon",
                            rings: [
                                [x1, y2],
                                [x1, y1],
                                [x2, y1],
                                [x2, y2]
                            ]
                        },
                        symbol: {
                            type: "simple-fill",
                            color: [227, 139, 79, 0],
                            outline: {
                                //color: props.graphicProperties.color,
                                color: [176, 252, 56],
                                //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
                                width: 2
                            }
                        }
                    });
                    // let polygonEstimate = new Graphic({
                    //     geometry: {
                    //         type: "polygon",
                    //         rings: [
                    //             [xEstimate1, yEstimate2],
                    //             [xEstimate1, yEstimate1],
                    //             [xEstimate2, yEstimate1],
                    //             [xEstimate2, yEstimate2]
                    //         ]
                    //     },
                    //     symbol: {
                    //         type: "simple-fill",
                    //         color: [227, 139, 79, 0],
                    //         outline: {
                    //             color: [176, 252, 56],
                    //             //color: [Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), Math.floor(Math.random() * 250), 0.7],
                    //             width: 2
                    //         }
                    //     }
                    // });
                    let geometrySat = polygon.geometry;
                    //let geometryEstimate = polygonEstimate.geometry;
                    isIntersecting0 = intersects(geometry0, geometrySat);
                    //isIntersecting1 = intersects(geometry1, geometrySat);

                    //isIntersecting0 ? namesArr(item.lines.name) : document.getElementById("messageBox").style.display = "none";
                    //isIntersecting0 ? namesArr(item.lines.name) : isIntersecting1 ? namesArr(item.lines.name): document.getElementById("messageBox").style.display = "none";
                    if (isIntersecting0) {
                        namesArr(item.lines.name)
                    }
                    // if(isIntersecting1){
                    //     namesArr(item.lines.name)
                    // }

                    //isIntersecting ? console.log(item.lines.name) : document.getElementById("messageBox").style.display = "none";
                    //isIntersectingEstimate = intersects(geometry0, geometryEstimate);
                    //isIntersectingEstimate ? document.getElementById("messageBox").style.display = "none" : namesEstimateArr(item.lines.name);
                });
            });
            //console.log(names);
            //console.log([...new Set(names)].toString().replace(/,/g, ", "))
            if (names.length !== 0) {
                document.getElementById("messageBox").style.display = "flex";
                document.getElementById("putText1Box").style.display = "block";
                //document.getElementById("putText1").innerHTML = `${names.toString().replace(/,/g, ", ")} satellites are overlapping you boundary`;
                document.getElementById("putText1").innerHTML = `${[...new Set(names)].toString().replace(/,/g, ", ")}`;
            }

        })
        //})

    }, 1000)


}

export { overlap }