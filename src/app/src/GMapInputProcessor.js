function GMapInputProcessor(selectedPlaces, path){
    const weight = adjMatrixConverter(selectedPlaces)
    const pathCoor = path.map(node => selectedPlaces[node]);
    return ({weight, pathCoor});
}

function adjMatrixConverter(selectedPlaces) {
    const n = selectedPlaces.length;
    const matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j) {
            const [x1, y1] = [selectedPlaces[i].lat, selectedPlaces[i].lng];
            const [x2, y2] = [selectedPlaces[j].lat, selectedPlaces[j].lng];
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            matrix[i][j] = distance;
            matrix[j][i] = distance; 
        }
        else matrix[i][j] = 0;
      }
    }
    return matrix;
}
export default GMapInputProcessor;