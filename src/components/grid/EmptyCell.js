import React from 'react';
import { connect } from 'react-redux';
import { dropShip } from '../../actions';
import './index.css';

function EmptyCell(props) {
  const { x, y, dropShip } = props;

  const onDragOver = e => {
    e.preventDefault();
  };

  const onDrop = () => {
    dropShip([x, y]);
  };

  return (
    <div
      className="grid__cell"
      value={{ x, y }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    />
  );
}

const mapDispatchToProps = {
  dropShip,
};

export default connect(null, mapDispatchToProps)(EmptyCell);
