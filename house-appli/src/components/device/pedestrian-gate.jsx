import * as React from 'react'
import { Device } from './device'

export class PedestrianGate extends Device {

  constructor(props, context) {
      super(props, context);
  }

  renderType() {
    let style = {
      stroke: this.state.active ? "#009900" : "#990000",
      fill: this.state.active ? "#009900" : "#990000"
    };
    return(
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
        <label className="item-center" style={{fontSize:"2em"}}>{this.state.name}</label>
        {this.state.active ? ( 
        <svg className="portal portal-foreground" style={style} onClick={() => {this.handleActiveChange()}}>
          <use href="http://localhost:8081/static/img/portal_half.svg#portal" />
        </svg>) : (
        <svg className="portal portal-foreground" style={style} preserveAspectRatio="xMidYMid meet" onClick={() => {this.handleActiveChange()}}>
          <use href="http://localhost:8081/static/img/portal.svg#portal"/>
        </svg>)}
      </div>
    );
  }

};
