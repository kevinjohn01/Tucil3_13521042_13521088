import React, { useState, useEffect } from 'react';
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
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const { weight, nodenames, nodecoor } = FileProcessor(fileContent);
      setGraphData({ weight, nodenames, nodecoor});
    };
  };

  const handleSelectStartNode = (event) => {
    setSelectedStartNode(event.target.value);
  };

  const handleSelectEndNode = (event) => {
    setSelectedEndNode(event.target.value);
  };

  const handleUCSExecute = () => {
    console.log("handleUCS");
    if (!graphData || !selectedStartNode || !selectedEndNode) return;
    const start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
    const end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
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
    if (!graphData || !selectedStartNode || !selectedEndNode) return;
    const start = graphData.nodenames.findIndex((node) => node[0] === selectedStartNode);
    const end = graphData.nodenames.findIndex((node) => node[0] === selectedEndNode);
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
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <MapContainer></MapContainer>
      </div>
      <div>
        <label>Select Start Node:</label>
        {graphData && (
          <select id="options" value={selectedStartNode} onChange={handleSelectStartNode}>
            {graphData.nodenames.map(option => (
              <option key={option[0]}>{option[0]}</option>
            ))}
          </select>
        )}
      </div>
      <div>
        <label>Select End Node:</label>
        {graphData && (
          <select id="options" value={selectedEndNode} onChange={handleSelectEndNode}>
            {graphData.nodenames.map(option => (
              <option key={option[0]}>{option[0]}</option>
            ))}
          </select>
        )}
      </div>
      <div>
        <button onClick={handleUCSExecute}>UCS Execute</button>
      </div>
      <div>
        <button onClick={handleAStarExecute}>A* Execute</button>
      </div>
      <div className="graph">
        {graphData && (
          <GraphProcessor weight={graphData.weight} nodenames={graphData.nodenames} path={path} />
        )}
      </div>
      <label>Jarak: {totalVal}</label>
    </div>
  );
}

export default App;
