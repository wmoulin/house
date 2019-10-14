import React from "react";
import { Responsive } from "react-grid-layout";
import css from "react-grid-layout/css/styles";
import cssResize from "react-resizable/css/styles";
import { Room } from "./device/room";
import { Connect } from "./auth/connect";
import { Home } from "./home";
import { Menu } from "./menu";
import { Http } from "../http";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { AppContext } from "../app-const";


export class App extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {rooms: []};
    this.eventSource = new EventSource('http://localhost:8181/sse');
    this.eventSource.addEventListener('message', function(e) {
      console.log("receive data :", JSON.parse(e.data));
    }, false)
 
    // this.eventSource.addEventListener('disabled', function(e) {
    //   console.log("disabled receive data :", JSON.parse(e.data));
    // }, false)

    this.eventSource.addEventListener('open', function(e) {
      console.log("Connected");
    }, false)

    this.eventSource.addEventListener('error', function(e) {
      if (e.target.readyState == EventSource.CLOSED) {
        console.log("Disconnected");
      }
      else if (e.target.readyState == EventSource.CONNECTING) {
        console.log("Connecting...");
      }
    }, false)
  }

  handleClick() {
    this.setState((prevState, props) => {
      let rooms = preventSourcevState.rooms;
      rooms.push({laeventSourceel: "room_" + rooms.length})
      return {
        rooms: roomseventSource
      };
    })
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true , error: error, info: info});
  }

  render() {
    return (
      <div>
        <AppContext.Provider value={{eventSource: this.eventSource}}>
        <BrowserRouter>
          <div>
            {/*<div className="menuPanel"/>*/}
            <div className="flex-container" style={{flexDirection: "row"}}>
              <Menu/>
              <Link to="/" className=" item-fluid" style={{textAlign: "center", margin: "10px 0px"}}><i className="fa-3x fas fa-home"/></Link>
              <Link to="/auth" style={{margin: "10px"}}><i className="fa-3x fas fas fa-user"/></Link>
            </div>
            <hr/>
      
            <Route exact path="/" component={Home}/>
            <Route path="/rooms/:id" render={(location)=>{
              return (<Room roomID={location.match.params.id}/>)}}/>
            <Route path="/rooms" exact={true} render={()=><Room edit={true}/>}/>
            <Route path="/auth" exact={true} component={Connect}/>
          </div>
        </BrowserRouter>
        </AppContext.Provider>




        {/* <Responsive className="layout" layout={layout} autoSize={true} items={20}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 5, md:4, sm: 3, xs: 2, xxs: 1}} width={1200}>
          {this.renderRooms()}
      </Responsive>*/}
        <div className="flex-container--column">
          {this.state.hasError && <h1>Something went wrong. {this.state.error}</h1>}
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
