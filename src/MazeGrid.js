import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const initialMaze = [
['wall', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
['start', 'path', 'path', 'path', 'path', 'wall', 'path', 'wall','wall', 'path', 'path', 'path'],
['wall', 'path', 'wall', 'path', 'end','wall', 'wall', 'path', 'path', 'path', 'wall', 'path',],
['path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'wall', 'wall', 'wall', 'wall']]

function MazeGrid() {
  const [maze, setMase] = useState(initialMaze);

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
      setMase(matrix);
      console.log(matrix);
  }

  return (
    <div className="maze-grid">
      <div className="btn-group"> 
      <button className='btn' onClick={() => generateMaze(6,10)}>Reset</button>
      <button className='btn bfs'>BFS</button>
      <button className='btn dfs'>DFS</button>
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
