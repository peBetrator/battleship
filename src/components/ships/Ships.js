import React, { Component } from 'react';
import { connect } from 'react-redux';
import Boat from './Boat';
import './index.css';

class Ships extends Component {
  render() {
    const { boats } = this.props;
    const ships = [];

    boats.forEach(({ size, qty, horizontally }) => {
      if (qty)
        ships.push(
          <div className="ship__row">
            <h3>x{qty}</h3>
            <Boat size={size} horizont={horizontally} />
          </div>
        );
      return ships;
    });

    return <div className="ships__menu">{ships}</div>;
  }
}

const mapStateToProps = ({ boats }) => {
  return {
    boats: boats.boats,
  };
};
export default connect(mapStateToProps)(Ships);
