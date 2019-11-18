import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GRID_SIZE } from '../shared';
import BoatCell from './BoatCell';
import EmptyCell from './EmptyCell';
import './index.css';

class Row extends Component {
  checkShipPresence = (x, y) => {
    const { battlefield } = this.props;
    return battlefield[x][y] > 0;
  };

  findDirection = (x, y) => {
    const { battlefield } = this.props;

    if (battlefield[x][y + 1] > 0 || battlefield[x][y - 1] > 0) return true;
    return false;
  };

  render() {
    const { battlefield, x } = this.props;

    const renderCells = () => {
      const row = [];

      for (let i = 0; i < GRID_SIZE; i++)
        row.push(
          this.checkShipPresence(x, i) ? (
            <BoatCell
              key={i}
              x={x}
              y={i}
              size={battlefield[x][i]}
              direction={this.findDirection(x, i)}
            />
          ) : (
            <EmptyCell key={i} x={x} y={i} />
          )
        );
      return row;
    };

    return <div className="grid__row">{renderCells()}</div>;
  }
}

const mapStateToProps = ({ boats }) => {
  return {
    battlefield: boats.battlefield,
    coords: boats.coords,
  };
};

export default connect(mapStateToProps)(Row);
