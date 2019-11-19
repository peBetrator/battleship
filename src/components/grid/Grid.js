import React from 'react';
import { GRID_SIZE } from '../shared';
import './index.css';
import Row from './Row';

function Grid(props) {
  const grid = new Array(GRID_SIZE).fill(0);

  return (
    <div className="grid">
      {grid.map((el, i) => (
        <Row key={i} x={i} />
      ))}
    </div>
  );
}

export default Grid;
