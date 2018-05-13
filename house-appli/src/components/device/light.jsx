import * as React from 'react'
import { Device } from './device'

export class Light extends Device {

  constructor(props, context) {
      super(props, context);
  }

  renderType() {
    let style = {
      color: this.state.active ? "#009900" : "#990000"
    };
    return(
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
        <label className="item-center" style={{fontSize:"2em"}}>{this.state.name}</label>
        <i className="fa-5x item-center fas fa-lightbulb" style={style} onClick={() => {this.handleActiveChange()}}></i>
      </div>
    );
  }

};
