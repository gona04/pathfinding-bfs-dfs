import logo from './logo.svg';
import './App.css';

let maze  = [['start', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
              ['wall', 'path', 'path', 'path', 'path', 'wall', 'path', 'wall','wall', 'path', 'path', 'path', 'wall', 'path', 'wall'],
              ['wall', 'wall', 'wall', 'wall', 'path', 'wall', 'path', 'end','wall', 'wall', 'path', 'path', 'path', 'wall', 'path',],
              ['path', 'path', 'path', 'path', 'path', 'path', 'path', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall']]


function MazeGrid() {
  return (
    <div>
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
  );
}

export default MazeGrid;
