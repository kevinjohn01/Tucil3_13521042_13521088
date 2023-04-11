function FileProcessor(fileContent){
    const lines = fileContent.split('\n');
    let weightstr = [];
    let weight = [];
    let nodenames = [];
    let i = 0
    // console.log(lines[0]);
    for (let line of lines){
        weightstr[i] = line.split(" ");
        // console.log("length:" + weightstr[i].length);
        if(weightstr[i].length === 1){
            nodenames.push(weightstr[i])
        }
        i++;
    }
    // console.log(weight[1]);
    // console.log(i);
    let z = 0;
    for (let x = 0; x < i; x++){
        let y = 0;
        if(weightstr[x].length !== 1){
            weight.push([]);
            for(let el of weightstr[x]){
                weight[z][y] = parseInt(el);
                // console.log(z, y, weight[z][y])
                y++;
            }
            z++;
        }
    }
    return ({weight, nodenames});
    // console.log(weight);
    // console.log(nodenames);
}
export default FileProcessor;