import React from 'react';
import { connect } from 'react-redux';
import { changeShipDirection, dragShipStart } from '../../actions';
import './index.css';

function Boat(props) {
  const { size, horizont, changeShipDirection, dragShipStart } = props;
  const style = `ship ${horizont ? 'row' : 'column'}`;

  const onDragStart = () => {
    dragShipStart(size, horizont);
  };

  const onDoubleClick = () => {
    changeShipDirection(size);
  };

  const ship = [];
  for (let i = 0; i < size; i++)
    ship.push(<div className="ship__part" key={i}></div>);

  return (
    <div
      className={style}
      onDoubleClick={onDoubleClick}
      draggable
      onDragStart={onDragStart}
    >
      {ship}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    boatSize: state.boatSize,
  };
};

const mapDispatchToProps = {
  changeShipDirection,
  dragShipStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boat);
