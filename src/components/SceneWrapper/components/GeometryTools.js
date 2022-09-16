import React from 'react'
// import { drawPoint, drawPolyline, drawPolygon } from "../../../helpers/sketchTools";
import { drawPoint, drawPolyline, drawPolygon } from "../../../helpers/sketchTest";

const GeometryTools = (props) => {
    //console.log(props);
    return (
        <div className="geometry-options" id="sketchToolBox">
            <button
                className="esri-widget--button esri-icon-map-pin geometry-button"
                id="point-geometry-button"
                value="point"
                title="Filter by point"
                onClick={(e) => drawPoint(e, props)}
            ></button>
            <button
                className="esri-widget--button esri-icon-polyline geometry-button"
                id="line-geometry-button"
                value="polyline"
                title="Filter by line"
                onClick={(e) => drawPolyline(e, props)}
            ></button>
            <button
                className="esri-widget--button esri-icon-polygon geometry-button"
                id="polygon-geometry-button"
                value="polygon"
                title="Filter by polygon"
                onClick={(e) => drawPolygon(e, props)}
            ></button>
        </div>
    )
}


export default GeometryTools