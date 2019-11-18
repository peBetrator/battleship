import React from 'react';
import { GRID_SIZE } from '../shared';
import './index.css';
import Row from './Row';

function Grid(props) {
  const renderRows = () => {
    const grid = [];

    for (let i = 0; i < GRID_SIZE; i++) grid.push(<Row key={i} x={i} />);
    return grid;
  };

  return <div className="grid">{renderRows()}</div>;
}

export default Grid;
