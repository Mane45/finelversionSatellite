import "./ListSatellite.css";
import { twoline2satrec } from "satellite.js";
import { getSatelliteLocation } from "../../helpers/satelliteCoords";
import { overlap } from "../../helpers/overlap&estimate";
import { loadModules } from "esri-loader";
import React, { useState } from "react";

let satelliteData = require("../../configs/config.json");

function ListSatellite(props) {
  function dropDownSatellite() {
    document.querySelector(".list").classList.toggle("showList");
    document.querySelector(".down-arrow").classList.toggle("rotate180");
  }

  const handleItemClick = (e) => {
    let layer = props.map.layers.items
    props.setSelectedSatellite((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked
    }));
    if (!e.target.checked) {
      removeTrack(e.target.parentElement.children[3].children[1]);
      removePolygonPolyline(e.target.parentElement.children[4].children[1])
      //e.target.parentElement.children[4].children[1].checked = e.target.checked;
      props.view.goTo({
        zoom: 1
      },);
    }
    overlap("overlap", layer)
  };
  const handelItemChange = (e) => {
    if (e.target.parentElement.parentElement.children[0].checked) {
      props.setSelectedSatellite1((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.checked
      }));
    } else {
      alert("Please choose te satelliet");
      e.target.checked = !e.target.checked;
    }
    // if (!e.target.checked) {
    //   document.getElementById("text").style.display = "none";
    // }

  }
  // const handleItemClickAll = (e) => {
  //   let checkboxes = document.getElementsByClassName('checkbox');
  //   function checkedAll() {
  //     //let layer = props.map.layers.items[0]
  //     for (let i = 0; i < checkboxes.length; i++) {
  //       if (checkboxes[i].checked) {
  //         checkboxes[i].checked = !!checkboxes[i].checked
  //       } else checkboxes[i].checked = !checkboxes[i].checked
  //     }
  //   }
  //   function removeCheckedAll() {
  //     props.view.goTo({
  //       zoom: 1
  //     },);
  //     document.getElementById("text").style.display = "none";
  //     for (let i = 0; i < checkboxes.length; i++) {
  //       if (checkboxes[i].checked) {
  //         checkboxes[i].checked = !checkboxes[i].checked
  //       } else checkboxes[i].checked = !!checkboxes[i].checked
  //     }
  //     //props.map.removeAll();
  //     props.map.layers.removeAll();
  //     let traksBtns = document.getElementsByClassName('toggle-button');
  //     const entries = Object.values(traksBtns);
  //     entries.forEach((item) => {
  //       //console.log(item.checked)
  //       item.checked = "false"
  //       if(item.checked){
  //         item.checked = !item.checked
  //       } else item.checked = !!item.checked
  //     })

  //   }
  //   if (e.target.checked) {
  //     checkedAll()
  //   } else removeCheckedAll()

  //   for (let i = 0; i < checkboxes.length; i++) {
  //     props.setSelectedSatellite((prevState) => ({
  //       ...prevState,
  //       [checkboxes[i].name]: e.target.checked,
  //     }));
  //   }
  // }
  const handleZoom = (e) => {
    let name = e.target.parentElement.children[1].textContent;
    if (e.target.parentElement.children[0].checked) {
      satelliteData.forEach((item) => {
        if (item.lines.name === name) {
          let satrec = twoline2satrec(item.lines.line1, item.lines.line2);
          let loc = getSatelliteLocation(satrec, new Date());
          props.view.goTo({
            position: {
              x: loc.x,
              y: loc.y,
              z: loc.z * 2
            }
          })
        }

      });
      // } else {
      //   props.view.goTo({
      //     zoom: 1
      //   },
      //     // {speedFactor: 0.1, easing: "out-guit"}
      //   );
      // }

    } else {
      alert("Please choose te satelliet");
    }
  };
  const [trackingIds, setTrackingIds] = useState({});
  // function removeObjectWithId(arr, id) {
  //   const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  //   arr.splice(objWithIdIndex, 1);
  //   return arr;
  // }
  const handleTrack = (e) => {
    let btnID = e.target.name + "";
    let name = e.target.parentElement.parentElement.children[1].textContent;
    if (e.target.parentElement.parentElement.children[0].checked) {
      let trackFeatures = [];
      loadModules([
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ])
        .then(([Graphic, GraphicsLayer,]) => {
          const graphicLayer = new GraphicsLayer();
          let color;
          satelliteData.forEach((item) => {
            if (item.lines.name === name) {
              //console.log(name);
              color = item.color;
              let satrec = twoline2satrec(item.lines.line1, item.lines.line2);
              for (let i = 0; i < 60 * 24; i++) {
                let loc = null;
                try {
                  loc = getSatelliteLocation(satrec, new Date(Date.now() + i * 1000 * 60));
                } catch (error) { }
                if (loc != null) {
                  trackFeatures.push([loc.x, loc.y, loc.z])
                }
              }
            }
          })
          const track = new Graphic({
            geometry: {
              type: "polyline",
              paths: [trackFeatures]
            },
            symbol: {
              type: "simple-line",
              style: "dot",
              color: color,
              width: 1
            }
          });
          if (e.target.checked) {
            graphicLayer.graphics.add(track);
            props.map.add(graphicLayer);
            let uid = props.map.layers.items[props.map.layers.items.length - 1]["uid"];
            setTrackingIds((prevState) => ({
              ...prevState,
              [btnID]: uid,
            }));
          } else {
            /*working vat code */
            // removeObjectWithId(props.map.layers.items, trackingIds?.btnID);
            // setTrackingIds((prevState) => ({
            //   ...prevState,
            //   btnID: "",
            // }));
            // graphicLayer.graphics.add(new Graphic());
            // props.map.add(graphicLayer);
            let removebleLayer = props.map.layers.items.filter((item) => item.uid === trackingIds[btnID]);
            console.log(removebleLayer)
            props.map.layers.remove(removebleLayer[0]);
            setTrackingIds((prevState) => ({
              ...prevState,
              [btnID]: null,
            }));
          }
        })

    } else {
      alert("Please choose te satelliet");
      e.target.checked = !e.target.checked;
    }
    // e.target.parentElement.parentElement.children[0].addEventListener("change", () => {
    //   props.map.removeAll();
    // })
  }
  function removeTrack(arg1) {
    let btnID = arg1.name + "";
    arg1.checked = false;
    //console.log(props.map.layers.items);
    let removebleLayer = props.map.layers.items.filter((item) => item.uid === trackingIds[btnID]);
    //console.log(removebleLayer)
    props.map.layers.remove(removebleLayer[0]);
  }
  function removePolygonPolyline(arg1) {
    arg1.checked = false;
    props.setSelectedSatellite1((prevState) => ({
      ...prevState,
      [arg1.name]: false
    }));
  }

  let renderedOutput = satelliteData.map((item) => (
    <div className="select-item" key={item.id}>
      <input type="checkbox" className="checkbox" name={item.id} onClick={(e) => handleItemClick(e)} />
      <label>
        <p className="satName">{item.lines.name}</p>
      </label>
      <button className="zoom" onClick={(e) => handleZoom(e)} >
        Zoom
      </button>
      {/* <div className="toggle-button-wraper" onChange={(e) => handleZoom(e)}>
        <p className="btnName">Zoom</p>
        <input type="checkbox" className="toggle-button" name={item.id} />
      </div> */}
      {/* <button className="track" onClick={(e) => handleTrack(e)}>
        Track
      </button> */}
      <div id="track" className="toggle-button-wraper" onChange={(e) => handleTrack(e)}>
        <p className="btnName">Track</p>
        <input type="checkbox" className="toggle-button" name={item.id} />
      </div>
      {/* <button className="polygon" >
        Extent view
      </button> */}
      <div className="toggle-button-wraper" onChange={(e) => handelItemChange(e)}>
        <p className="btnName">Area</p>
        <input type="checkbox" className="toggle-button" name={item.id} />
      </div>
    </div>
  ));
  return (
    <div className="multi-selector">
      <div className="select-field" onClick={dropDownSatellite}>
        <input
          type="text"
          placeholder="Select Satellite"
          className="input-selector"
        />
        <span className="down-arrow">&#9660;</span>
      </div>
      <div className="list">
        {/* <div className="select-item">
          <input type="checkbox" name="" onChange={handleItemClickAll}></input>
          <label>
            <p id="selectall" className="satName">Select All</p>
          </label>
        </div> */}
        {renderedOutput}
      </div>
    </div>
  );
}
export default ListSatellite;
