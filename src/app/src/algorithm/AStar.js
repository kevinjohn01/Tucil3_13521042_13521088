function AStar(startNode, endNode, weight,arrayOfCoordinat){ //weight -> int[][]
    const queue = new PriorityQueue();
    const visited = new Set();
    const distance = Array(weight.length).fill(Infinity);
    const path = Array(weight.length).fill(null);
    
    distance[startNode] = 0;
    queue.enqueue(startNode, heuristic(startNode,endNode,arrayOfCoordinat)); //arrayOfCoordinat berisi kelas koordinat, atribut x,y
    
    while (!queue.isEmpty()) {
      const currentNode = queue.dequeue();
      if (currentNode === endNode) {
        return getPath(path, startNode, endNode);
      }
      if (visited.has(currentNode)) {
        continue;
      }
      visited.add(currentNode);
      
      for (let neighbor = 0; neighbor < weight.length; neighbor++) {
        if (weight[currentNode][neighbor] === 0) {
          continue;
        }
        const neighborDistance = distance[currentNode] + weight[currentNode][neighbor];
        if (neighborDistance < distance[neighbor]) {
          distance[neighbor] = neighborDistance;
          path[neighbor] = currentNode;
          queue.enqueue(neighbor, neighborDistance + heuristic(neighbor,endNode,arrayOfCoordinat));
        }
      }
    }
    
    return null;
}
  
function getPath(path, startNode, endNode) {
    const result = [];
    let currentNode = endNode;
    while (currentNode !== startNode) {
      result.unshift(currentNode);
      currentNode = path[currentNode];
    }
    result.unshift(startNode);
    return result;
}

function heuristic(currNode,endNode,arrayOfCoordinat) {
    let currX = arrayOfCoordinat[currNode][0];
    let currY = arrayOfCoordinat[currNode][1];
    let endX = arrayOfCoordinat[endNode][0];
    let endY = arrayOfCoordinat[endNode][1];

    return ((currX-endX)**2 + (currY-endY)**2)**(0.5);
}
  
class PriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(item, priority) {
      this.items.push({ item, priority });
      this.items.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      return this.items.shift().item;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
}
export default AStar;