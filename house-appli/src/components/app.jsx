import React from "react"
import { Responsive } from "react-grid-layout";
import css from "react-grid-layout/css/styles";
import cssResize from "react-resizable/css/styles";
import { Room } from "./room";
import { Home } from "./home";
import { Menu } from "./menu";
import { Http } from "../http";
import { BrowserRouter, Route, Link } from "react-router-dom";

export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rooms: []};
    let eventSource = new EventSource('http://localhost:4000/updates');
 
    eventSource.addEventListener('connected', (e) => {
        console.log(e.data);
        // => Hello world! 
    });
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

  componentDidCatch(error, info) {
    this.setState({ hasError: true , error: error, info: info});
  }

  render() {
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
          {this.state.hasError && <h1>Something went wrong. {this.state.error}</h1>}

          {this.renderRooms()}
        </div>
      </div>
    )
  }

  componentDidMount() {
    Http.get("rooms")
    .then((data) => {
      this.setState({rooms: data});
    })
  }

  renderRooms() {
   return this.state.rooms.map((room, index)=> {
      return (<Room name={room.name} key={room._id} roomID={room._id} devicesId={room.devicesId}/>)
    });
  }

}
