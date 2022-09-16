
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"

let sketchLayer = new GraphicsLayer();
    

//console.log(document.getElementById(sketchToolBox));
function geometryButtonsClickHandler(event, props) {
    console.log(props.view);
    props.map.addMany([sketchLayer]);
    let sketchGeometry = null;
    const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,
        view: props.view,
        pointSymbol: {
            type: "simple-marker",
            style: "circle",
            size: 10,
            color: [255, 255, 255, 0.8],
            outline: {
                color: [211, 132, 80, 0.7],
                size: 10
            }
        },
        polylineSymbol: {
            type: "simple-line",
            color: [211, 132, 80, 0.7],
            width: 6
        },
        polygonSymbol: {
            type: "polygon-3d",
            symbolLayers: [
                {
                    type: "fill",
                    material: {
                        color: [255, 255, 255, 0.8]
                    },
                    outline: {
                        color: [211, 132, 80, 0.7],
                        size: "10px"
                    }
                }
            ]
        },
        defaultCreateOptions: { hasZ: false }
    });
    const geometryType = event.target.value;
    console.log(geometryType);
    sketchViewModel.on(["create"], function (event) {
        // update the filter every time the user finishes drawing the filtergeometry
        if (event.state == "complete") {
            sketchGeometry = event.graphic.geometry;
            //updateFilter();
        }
    });
    sketchViewModel.on(["update"], function (event) {
        const eventInfo = event.toolEventInfo;
        // update the filter every time the user moves the filtergeometry
        if (eventInfo && eventInfo.type.includes("move")) {
            if (eventInfo.type === "move-stop") {
                sketchGeometry = event.graphics[0].geometry;
                //updateFilter();
            }
        }
        // update the filter every time the user changes the vertices of the filtergeometry
        if (eventInfo && eventInfo.type.includes("reshape")) {
            if (eventInfo.type === "reshape-stop") {
                sketchGeometry = event.graphics[0].geometry;
                //updateFilter();
            }
        }
    });
    console.log(sketchViewModel);
    sketchViewModel.create(geometryType);
    //console.log(sketchViewModel.create(geometryType));
    //sketchViewModel.create(geometryType);
    // sketchViewModel.on(["create"], (event) => {
    //     if (event.state == "complete") {
    //         //bufferNumSlider.values = [0];
    //         //sketchGeometry = event.graphic.geometry;
    //         //updateFilterGeometry()
    //         console.log(event.state);
    //     }
    // });
}

function drawPoint(event, props) {
    geometryButtonsClickHandler(event, props);
    console.log(props)
}

function drawPolyline(event, props) {
    geometryButtonsClickHandler(event, props);
}

function drawPolygon(event, props) {
    geometryButtonsClickHandler(event, props);
}

export { drawPoint, drawPolyline, drawPolygon }