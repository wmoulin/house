import React from "react"
import { Room } from "./room";

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rooms: []};

  }

  handleClick() {
    this.setState((prevState, props) => {
      let rooms = prevState.rooms;
      rooms.push({label: "room_" + rooms.length})
      return {
        rooms: rooms
      };
    })
  }

  render() {

    return (

      <div className="flex-container--column">
        {this.renderRooms()}
      </div>
    )
  }

  renderRooms() {
   return this.state.rooms.map((room, index)=> {
      return (<Room label={room.label} key={index+1}/>)
    });
  }

}
