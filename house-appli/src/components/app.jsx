import React from "react"
import { Responsive } from "react-grid-layout";
import css from "react-grid-layout/css/styles";
import cssResize from "react-resizable/css/styles";
import { Room } from "./room";
import { Home } from "./home";
import { Menu } from "./menu";
import { BrowserRouter, Route, Link } from "react-router-dom";

export class App extends React.Component {

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

    let layout = {"lg":[
      {i: "1", x: 0, y: 3, w: 1, h: 1},
      {i: "2", x: 1, y: 2, w: 1, h: 1},
      {i: "3", x: 2, y: 1, w: 1, h: 1}
    ],"md":[
      {i: "1", x: 0, y: 2, w: 1, h: 1},
      {i: "2", x: 1, y: 1, w: 1, h: 1},
      {i: "3", x: 2, y: 0, w: 1, h: 1}
    ],"sm":[
      {i: "1", x: 0, y: 0, w: 1, h: 1},
      {i: "2", x: 1, y: 0, w: 1, h: 1},
      {i: "3", x: 2, y: 0, w: 1, h: 1}
    ]};

    return (
      <div>

        <BrowserRouter>
          <div>
            {/*<div className="menuPanel"/>*/}
            <div className="flex-container" style={{flexDirection: "row"}}>
              <Menu/>
              <Link to="/" className=" item-fluid" style={{textAlign: "center", margin: "10px 0px"}}><i className="fa-3x fas fa-home"/></Link>
              <Link to="/rooms/1" style={{margin: "10px"}}><i className="fa-3x fas fas fa-user"/></Link>
            </div>
            <hr/>
      
            <Route exact path="/" component={Home}/>
            <Route path="/rooms/:id" render={(location)=>{
              return (<Room roomID={location.match.params.id}/>)}}/>
            <Route path="/rooms" exact={true} render={()=><Room edit={true}/>}/>
          </div>
        </BrowserRouter>




        {/* <Responsive className="layout" layout={layout} autoSize={true} items={20}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 5, md:4, sm: 3, xs: 2, xxs: 1}} width={1200}>
          {this.renderRooms()}
      </Responsive>*/}
        <div className="flex-container--column">
          {this.renderRooms()}
        </div>
      </div>
    )
  }

  renderRooms() {
   return this.state.rooms.map((room, index)=> {
      return (<Room label={room.label} key={index+1}/>)
    });
  }

}
