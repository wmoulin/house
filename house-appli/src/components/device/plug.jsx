import * as React from 'react'
import { Device } from './device'

export class Plug extends Device {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    
  }

  renderType() {

    return(
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
        <label className="item-center" style={{fontSize:"2em"}}>{this.state.name}</label>
        <i className="fa-5x item-center fas fa-plug" style={{color:"#009900"}}></i>
      </div>
    );
  }

};
