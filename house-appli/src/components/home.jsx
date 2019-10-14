import React from "react"
import { Room } from "./device/room";
import { Http } from "../http";

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
       return (<Room name={room.name} key={room._id} roomID={room._id} devicesId={room.devicesId}/>)
     });
   }

  componentDidMount() {
    Http.get("rooms")
    .then((data) => {
      this.setState({rooms: data});
    })
  }

}
