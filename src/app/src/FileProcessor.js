function FileProcessor(fileContent){
    const lines = fileContent.split('\n');
    let weightstr = [];
    let weight = [];
    let nodenames = [];
    let nodecoor = [];
    console.log(lines[0]);
    const nodenums = parseInt(lines[0]);
    let j = 0;
    for (let i = 1; i <= nodenums; i++){
        let splitnodecoor = lines[i].split(" : ");
        nodenames[j] = [splitnodecoor[0]];
        nodecoor[j] = parseFloat(splitnodecoor[1].split(","));
        j++;
    }
    let k = 0;
    for (let i = nodenums + 1; i <= 2 * nodenums; i++){
        weightstr[k] = lines[i].split(" ");
        k++;
    }
    // console.log(weight[1]);
    // console.log(i);
    for (let i = 0; i < nodenums; i++){
        weight.push([]);
        for(let j = 0; j < nodenums; j++){
            weight[i][j] = parseFloat(weightstr[i][j]);
            console.log(weightstr[i][j])
        }
    }
    console.log("w:")
    console.log(weight);
    console.log(nodenames);
    console.log(nodecoor);
    return ({weight, nodenames, nodecoor});
}
export default FileProcessor;