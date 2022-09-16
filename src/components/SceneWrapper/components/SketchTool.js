//import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
//import GraphicsLayer from "esri/layers/GraphicsLayer";
//import Sketch from "@arcgis/core/widgets/Sketch";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import "./SketchTool.css";


function SketchTool(props) {
    console.log(document.getElementById("point-geometry-button"));
    // document.getElementById("point-geometry-button").addEventListener("click", () => {
    //     console.log(4545)
    // })
    const sketchLayer = new GraphicsLayer();
    // console.log(props)
    // props.map.addMany([sketchLayer]);
    let sketchGeometry = null;
    const sketchViewModel = new SketchViewModel({
        layer: sketchLayer,
        view: props,
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
    })
    
    return (null)
    // sketchViewModel.on(["create"], (event) => {
    //     // update the filter every time the user finishes drawing the filtergeometry
    //     if (event.state === "complete") {
    //         sketchGeometry = event.graphic.geometry;
    //         //updateFilter();
    //     }
    // });
    // //console.log(props);
    // // const graphicsLayer = new GraphicsLayer();

    // // const sketch = new Sketch({
    // //     layer: graphicsLayer,
    // //     view: props.view
    // // })
    // // props.map.layers.add([graphicsLayer])
    // // props.view.ui.add(sketch, "top-right");
    // //console.log()
    // // document.getElementById("point-geometry-button").onclick(() => {
    // //     console.log(10004)
    // // })
    // console.log(document.getElementById("point-geometry-button"))
    // return (
    //     456
    // )
}
export default SketchTool