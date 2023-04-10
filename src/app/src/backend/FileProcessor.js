import UCS from "./UCS";
import AStar from "./AStar";

function FileProcessor(file){
    const lines = file.split('\n');
    let weightstr = [];
    let weight = [];
    let i = 0
    // console.log(lines[0]);
    for (let line of lines){
        weightstr[i] = line.split(" ");
        i++;
    }
    // console.log(weight[1]);
    // console.log(i);
    for (let x = 0; x < i; x++){
        let y = 0;
        for(let el of weightstr[x]){
            weight.push([]);
            weight[x][y] = parseInt(el);
            console.log(weight[x][y])
            y++;
        }
    }
    UCS(weight);
    AStar(weight);
}
export default FileProcessor;