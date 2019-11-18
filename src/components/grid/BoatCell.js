import React from 'react';
import { connect } from 'react-redux';
import { dragShipStart, moveShipStart } from '../../actions';
import './index.css';

function BoatCell(props) {
  const { x, y, size, direction, dragShipStart, moveShipStart } = props;

  const onDragStart = () => {
    dragShipStart(size, direction);
  };

  const onDragEnd = () => {
    moveShipStart([x, y]);
  };

  return (
    <div
      className="grid__cell boat"
      value={{ x, y }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

const mapDispatchToProps = {
  dragShipStart,
  moveShipStart,
};

export default connect(null, mapDispatchToProps)(BoatCell);
