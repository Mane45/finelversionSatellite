import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

//console.log(grapgicLayer);
const sketchLayer = new GraphicsLayer();
//let sketchViewModel = null;
let sketchGeometry = null;
function geometryButtonsClickHandler(e, props) {
    const geometryType = e.target.value;
    console.log(props.view); 
    //props.view.map.addMany([sketchLayer]);  
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
    //sketchViewModel.create(geometryType);
    sketchViewModel.on("create-complete", (e) => {console.log(e)});
    // sketchViewModel.on(["create"], (e) => {
    //     //console.log(e)
    //     if (e.state === "complete") {
    //         sketchGeometry = e.graphic.geometry;
    //     }
    // });
    // sketchViewModel.on(["update"], (event) => {
    //     //console.log(event)
    //     const eventInfo = event.toolEventInfo;
    //     if (eventInfo && eventInfo.type.includes("move")) {
    //       if (eventInfo.type === "move-stop") {
    //         sketchGeometry = event.graphics[0].geometry;
    //       }
    //     }
    //     if (eventInfo && eventInfo.type.includes("reshape")) {
    //       if (eventInfo.type === "reshape-stop") {
    //         sketchGeometry = event.graphics[0].geometry;
    //       }
    //     }
    // });
    
    
}

function drawPoint(e, props) {
    geometryButtonsClickHandler(e, props);
    //console.log(props)
}

function drawPolyline(e, props) {
    geometryButtonsClickHandler(e, props);
}

function drawPolygon(e, props) {
    geometryButtonsClickHandler(e, props);
}

export { drawPoint, drawPolyline, drawPolygon }