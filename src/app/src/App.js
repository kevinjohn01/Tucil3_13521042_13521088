import React, { useState } from 'react';
import MapContainer from "./MapContainer";
import GraphProcessor from "./GraphProcessor";
import FileProcessor from "./FileProcessor";
import UCS from "./algorithm/UCS";
import AStar from './algorithm/AStar';
import "./App.css";

function App() {
  const [graphData, setGraphData] = useState(null);
  const [selectedStartNode, setSelectedStartNode] = useState('');
  const [selectedEndNode, setSelectedEndNode] = useState('');
  const [path, setPath] = useState([]);
  const [totalVal, setTotalVal] = useState(null);

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
        <button onClick={handleUCSExecute}>UCS Execute</button>
        <button onClick={handleAStarExecute}>A* Execute</button>
        <label>Total distance: {totalVal}</label>
      </div>
      <div className="graph">
        {graphData && (
          <GraphProcessor weight={graphData.weight} nodenames={graphData.nodenames} path={path} />
        )}
      </div>
      <MapContainer></MapContainer>
      <div>
    </div>
    </div>
  );
}

export default App;
