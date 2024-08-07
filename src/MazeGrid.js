import './App.css';
import { useState } from 'react';

const initialMaze = [
['wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
['start', 'path', 'path', 'path', 'path', 'wall', 'path', 'wall','wall', 'path', 'path', 'path'],
['wall', 'path', 'wall', 'path', 'wall','wall', 'wall', 'path', 'path', 'path', 'wall', 'path',],
['path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'wall', 'path', 'wall', 'wall'],
['path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'wall'],
['path', 'path', 'path', 'path', 'path', 'path', 'path', 'end', 'wall', 'wall', 'wall', 'wall']]

function MazeGrid() {
  const [maze, setMaze] = useState(initialMaze);
  const [width, setWidth] = useState(maze[0].length);
  const [height, setHeight] = useState(maze.length);
  const [timeoutIds, setTimeoutIds] = useState([]);

  function bfs(startNode) {
    console.log('bfs');
    let queue = [startNode];
    //[1,0] => '1,0'
    let visited = new Set(`${startNode[0]},${startNode[1]}`);
    function visitCell([x, y]) {
      setMaze((prevMaze) => 
        prevMaze.map((row, rowIndex) => 
          row.map((cell, cellIndex) => {
            if(rowIndex === y && cellIndex === x) {
              return cell === 'end' ? 'end' : 'visited';
            }
            return cell;
          }),
        ),
      );
      console.log('visit cell - bfs', x, y);
      if(maze[y][x] === 'end') {
       console.log('found end');
       return true;
      } else {
        return false;
      }
    }

    function step() {
      if(queue.length === 0) return;
      //takes the first element of the queue
      const [x, y] = queue.shift();
       //[xaxis, yaxis]
       const dirs = [[0,1], [1,0], [0, -1], [-1, 0]];

       for(const [dx, dy] of dirs)  {
          const nx = x + dx; 
          const ny = y + dy; 

          if(nx >= 0 && ny >=0 && nx < width && ny < height && !visited.has(`${nx},${ny}`)) {
            //Checking whether the cell a path
            if(maze[ny][nx] === 'end' || maze[ny][nx] === 'path') {
              visited.add(`${nx},${ny}`);
              if(visitCell([nx, ny])) {
                return true;
              }
              queue.push([nx, ny]);
            }
          }
       }
      console.log('new step');
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
    }
    step();
    return false;
    //return true || false
  }

  function dfs(startNode) {
    console.log('dfs');
    let stack = [startNode];
    //[1,0] => '1,0'
    let visited = new Set(`${startNode[0]},${startNode[1]}`);
    function visitCell([x, y]) {
      setMaze((prevMaze) => 
        prevMaze.map((row, rowIndex) => 
          row.map((cell, cellIndex) => {
            if(rowIndex === y && cellIndex === x) {
              return cell === 'end' ? 'end' : 'visited';
            }
            return cell;
          }),
        ),
      );
      console.log('visit cell - dfs', x, y);
      if(maze[y][x] === 'end') {
       console.log('found end');
       return true;
      } else {
        return false;
      }
    }

    function step() {
      if(stack.length === 0) return;
      //takes the first element of the stack
      const [x, y] = stack.pop();
       //[xaxis, yaxis]
       const dirs = [[0,1], [1,0], [0, -1], [-1, 0]];

       for(const [dx, dy] of dirs)  {
          const nx = x + dx; 
          const ny = y + dy; 

          if(nx >= 0 && ny >=0 && nx < width && ny < height && !visited.has(`${nx},${ny}`)) {
            //Checking whether the cell a path
            if(maze[ny][nx] === 'end' || maze[ny][nx] === 'path') {
              visited.add(`${nx},${ny}`);
              if(visitCell([nx, ny])) {
                return true;
              }
              stack.push([nx, ny]);
            }
          }
        }
      const timeoutId = setTimeout(step, 100);
      setTimeoutIds((previousTimeoutIds) => [...previousTimeoutIds, timeoutId]);
      console.log('new step');
    }
    step();
    return false;
    //return true || false
  }
  function generateMaze(height, width) { 
    let matrix = [];
  
    for(let i = 0; i < height; i++) {
      let row = [];
      for(let j = 0; j <width; j++) {
        row.push('wall');
      }
      matrix.push(row);
    }
      //[xaxis, yaxis]
      const dir = [[0,1], [1,0], [0, -1], [-1, 0]];
      
      /*
        Checking if the cell is not out 
        of bound and has not been assigned a path
      */
      function isCellValid(x, y) {
        return y >= 0 && x >=0 && x < width && y < height && matrix[y][x] === 'wall';
      }

      function carvePath(x, y) {
        matrix[y][x] = 'path';
         /*
          if the math.random is negative value it
          will swap them if not it will not swap them
          that is randomly shuffles dir array and 
          puts them in random order
        */
        const directions = dir.sort(() => Math.random() - 0.5);
        
        for(let [dx, dy] of directions) {
          //new path to move to
          const nx = x + dx * 2;
          const ny = y + dy * 2;

          if(isCellValid(nx, ny)) {
            matrix[y + dy][x + dx] = 'path';
            carvePath(nx, ny);
          }
      }
      }

      carvePath(1, 1);
      matrix[1][0] = 'start';
      matrix[height - 2][width - 1] = 'end';
      setMaze(matrix);
      console.log(matrix);
  }

  return (
    <div className="maze-grid">
      <div className="btn-group"> 
      <button className='btn' onClick={() => generateMaze(height,width)}>Reset</button>
      <button className='btn bfs'  onClick={() => bfs([1,0])} >BFS</button>
      <button className='btn dfs'  onClick={() => dfs([1,0])} >DFS</button>
      </div>
      <div className='maze'>
        {maze.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((cell, j) => {
                return <div className={`cell ${cell}`} key={j}> </div>
              })}
            </div>
          )
        })}
      </div> 
    </div>
  );
}

export default MazeGrid;
