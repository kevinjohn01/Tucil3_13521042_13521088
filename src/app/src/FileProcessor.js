function FileProcessor(fileContent) {
    try {
      const lines = fileContent.split('\n');
      let weightstr = [];
      let weight = [];
      let nodenames = [];
      let nodecoor = [];
      const nodenums = parseInt(lines[0]);
      let j = 0;
      for (let i = 1; i <= nodenums; i++) {
        let splitnodecoor;
        try {
          splitnodecoor = lines[i].split(" : ");
          nodenames[j] = [splitnodecoor[0]];
          const coordinates = splitnodecoor[1].split(",");
          if (coordinates.length !== 2) {
            throw new Error('Invalid coordinate format');
          }
          nodecoor[j] = [parseFloat(coordinates[0]), parseFloat(coordinates[1])];
          j++;
        } catch (error) {
          console.error('An error occurred while processing node data:', error);
        }
      }
      let k = 0;
      for (let i = nodenums + 1; i <= 2 * nodenums; i++) {
        try {
          weightstr[k] = lines[i].split(" ");
          k++;
        } catch (error) {
          console.error('An error occurred while processing weight data:', error);
        }
      }
      for (let i = 0; i < nodenums; i++) {
        weight.push([]);
        for (let j = 0; j < nodenums; j++) {
          try {
            weight[i][j] = parseFloat(weightstr[i][j]);
            console.log(weightstr[i][j]);
          } catch (error) {
            console.error('An error occurred while processing weight data:', error);
          }
        }
      }
      console.log("w:");
      console.log(weight);
      console.log(nodenames);
      console.log(nodecoor);
      return ({ weight, nodenames, nodecoor });
    } catch (error) {
      console.error('An error occurred while processing the file:', error);
    }
  }
  
  export default FileProcessor;
  