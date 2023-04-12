import React, { useState } from 'react';
import { Map, Marker} from 'google-maps-react';

import GraphProcessor from "./GraphProcessor";
import FileProcessor from "./FileProcessor";
import UCS from "./algorithm/UCS";
import AStar from './algorithm/AStar';
import GMapInputProcessor from './GMapInputProcessor';
import "./App.css";

function App() {
  const [graphData, setGraphData] = useState(null);
  const [selectedStartNode, setSelectedStartNode] = useState('');
  const [selectedEndNode, setSelectedEndNode] = useState('');
  const [path, setPath] = useState([]);
  const [totalVal, setTotalVal] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  
  const handleMapClick = (mapProps, map, event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPlaces(prevState => [...prevState, { lat, lng }]);
  };
  const handleMarkerClick = (place) => {
    const updatedPlaces = selectedPlaces.filter((p) => p !== place);
    setSelectedPlaces(updatedPlaces);
  };
  const handleFileChange = (event) => {
    try {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(selectedFile);
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const { weight, nodenames, nodecoor } = FileProcessor(fileContent);
        setGraphData({ weight, nodenames, nodecoor});
      };
    } catch (err) {
      console.error(err);
    }
  };

  const handleGMapProcess = (event) => {
    const {weight, pathCoordinates} = GMapInputProcessor(selectedPlaces, path);
    const nodenames = selectedPlaces.map(place => [`${place.lat.toFixed(4)}_${place.lng.toFixed(4)}`]);
    setPathCoordinates(pathCoordinates);
    setGraphData({weight, nodenames});
  }

  console.log("pathCoordinates", pathCoordinates);
  const handleSelectStartNode = (event) => {
    setSelectedStartNode(event.target.value);
  };

  const handleSelectEndNode = (event) => {
    setSelectedEndNode(event.target.value);
  };

  const handleUCSExecute = () => {
    console.log("handleUCS");
    if(!graphData) return;
    let start, end;
    if (selectedEndNode && selectedStartNode){
      start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
      end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
    }
    else if(!selectedStartNode){
      start = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
      if(!selectedEndNode){
        end = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
      }
      else{
        end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
      }
    }
    else{
      start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
      end = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
    }
    console.log(start, end, graphData.weight);
    const result = UCS(start, end, graphData.weight);
    let totalVal = 0;
    for(let i = 0; i < result.length - 1; i++){
      totalVal += graphData.weight[result[i]][result[i + 1]];
    }
    setTotalVal(totalVal);
    setPath(result);  
  };
  const handleAStarExecute = () => {
    console.log("handleAStar");
    let start, end;
    if (!graphData) return;
    if (selectedEndNode && selectedStartNode){
      start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
      end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
    }
    else if(!selectedStartNode){
      start = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
      if(!selectedEndNode){
        end = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
      }
      else{
        end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
      }
    }
    else{
      start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
      end = graphData.nodenames.findIndex((node) => node[0] === graphData.nodenames[0][0]);
    }
    const result = AStar(start, end, graphData.weight, graphData.nodecoor);
    let totalVal = 0;
    for(let i = 0; i < result.length - 1; i++){
      totalVal += graphData.weight[result[i]][result[i + 1]];
    }
    setTotalVal(totalVal);
    setPath(result);
  };
  console.log("totalVal");
  console.log(totalVal);
  console.log(path);
  return (
    <div className="App">
        <input className="input" type="file" onChange={handleFileChange} />
      <div className="input1">
          <label>Select Start Node:</label>
          {graphData && (
            <select id="options" value={selectedStartNode} onChange={handleSelectStartNode}>
              {graphData.nodenames.map(option => (
                <option key={option[0]}>{option[0]}</option>
              ))}
            </select>
          )}
          <label>Select End Node:</label>
          {graphData && (
            <select id="options" value={selectedEndNode} onChange={handleSelectEndNode}>
              {graphData.nodenames.map(option => (
                <option key={option[0]}>{option[0]}</option>
              ))}
            </select>
          )}
      </div>
      <div className="input2">
        <button onClick={handleGMapProcess}>Process GMap Input</button>
        <button onClick={handleUCSExecute}>UCS Execute</button>
        <button onClick={handleAStarExecute}>A* Execute</button>
        <label>Total distance: {totalVal}</label>
      </div>
      <div className="graph">
        {graphData && (
          <GraphProcessor weight={graphData.weight} nodenames={graphData.nodenames} path={path} />
        )}
      </div>
      <div className="map_container">
      {/* <div className="pos_display">
        {selectedPlaces.map((place, index) => (
          <div key={index}>
            <p>Marker {index+1}</p>
            <p>Latitude: {place.lat}</p>
            <p>Longitude: {place.lng}</p>
            <button onClick={() => handleMarkerClick(place)}>Delete Marker</button>
          </div>
        ))}
      </div> */}
      <div>
      <Map
        google={window.google}
        zoom={18}
        initialCenter={{ lat: -6.890585, lng: 107.609806 }}
        onClick={handleMapClick}
      >
        {selectedPlaces.map((place) => (
          <Marker key={`${place.lat}_${place.lng}`} position={place} onClick={() => handleMarkerClick(place)} />
        ))}
        {/* {pathCoordinates && pathCoordinates.length >= 2 && (
          <Polyline
            path={pathCoordinates.map((coordinate) => ({ lat: coordinate.lat, lng: coordinate.lng }))}
            strokeColor="#0000FF"
            strokeWeight={3}
          />
        )} */}
      </Map>
    </div>
    </div>
      <div>
    </div>
    </div>
  );
}

export default App;
