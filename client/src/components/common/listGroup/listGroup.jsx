import React, { Component } from "react";
import'./../../../App.css';

class ListGroup extends Component {
  render() {
    const {currentGenre,onGenreChange,items,textProperty,valueProperty} = this.props;
    return (
      <ul className="list-group pointer">
        {items.map(item=>(
            <li key={item[valueProperty]} 
                onClick={()=>{onGenreChange(item)}} 
                className={currentGenre===item?"list-group-item active":"list-group-item"}>
                {item[textProperty]}
            </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

export default ListGroup;
