import React from "react"
import { Device } from "./device/device";
import { Light } from "./device/light";
import { Plug } from "./device/plug";
import { Shutter } from "./device/shutter";
import { Http } from "../http";

export class Room extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: this.props.edit || false,
      name: this.props.name || "",
      roomID: this.props.roomID,
      devices: [],
      newDevice: undefined
    };
    this.input = null;
    this.loadDevices();
  } 

  render() {
    return (
      <React.Fragment>
        <div className={"flex-container--column"} style={{borderBottom: "1px solid black"}}>        
          <label>{this.state.roomID}</label>
          {this.state.edit ? ( 
            <React.Fragment>
              <div style={{padding: "10px"}}>
                <label>nom
                  <input type="text" className="item-center" style={{maxWidth: "300px", marginLeft: "20px"}}
                    defaultValue={this.state.name} placeholder={"nom de la pièce"} ref={(input) => this.input = input} />
                </label>
                <i className="fa-2x fas fa-check"  style={{color:"#009900", marginLeft: "20px", verticalAlign: "top"}} onClick={() => this.valid()}></i>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={"flex-container"} style={{flexDirection: "row"}}>
                <label className="item-center" style={{fontSize: "3em"}}>{this.state.name}</label>
                <i className="fa-2x fas fa-pencil-alt" style={{color:"#009900", margin: "10px", verticalAlign: "top"}} onClick={() => this.edit()}></i>
              </div>
            </React.Fragment>
          )
        }
        </div>
        {this.state.roomID &&
          <React.Fragment>
            <button className="btn" onClick={() => this.addDevice()}>Ajouter un device</button>
            <div className={"flex-container--column"} style={{borderBottom: "1px solid black"}}>  
              {this.state.devices.map(device => {
                let props = {
                  name: device.name,
                  type: device.type,
                  deviceId: device._id,
                  customId: device.customId,
                  active: device.active,
                  edit: !device._id,
                  validate: this.validDevice.bind(this),
                  discard: this.cancelDevice.bind(this),
                  delete: this.deleteDevice.bind(this)
                };
                if(device.type == 1) {
                  return (<Light {...props} />);
                } else if(device.type == 2) {
                  return (<Plug {...props} />);
                } else {
                  return (<Device {...props} />);
                }
              })}   
              {this.state.newDevice && <Device edit={true} validate={this.validDevice.bind(this)} discard={this.cancelDevice.bind(this)}/>}   
            </div>
          </React.Fragment>
        }
      </React.Fragment>
    )
  }

  edit() {
    this.setState({
      edit: !this.state.edit
    });
  }

  addDevice() {
    this.setState({newDevice: {name: "", type: 0}});
  }

  valid() {
    if(this.input.value.trim()) {

      if (!this.state.roomID) {
        Http.post("rooms", {name: this.input.value.trim()})
        .then((data) => {
          this.setState({
            edit: !this.state.edit,
            name: this.input.value,
            roomID: data._id,
          });
        });
      }

    } else {
      alert("Veuillez renseigner un nom !");
    }
  }

  getDevice(id) {
    return Http.get("devices/" + id);
  }


  loadDevices() {
    let devices = [];
    let p = Promise.resolve(true);
    if(this.props.roomID) {
      Http.get("devices?roomId=" + this.props.roomID)
      .then((data) => {
        this.setState({devices: data})
      });
    }
  }

  validDevice(device) {
    if (!device._id) {
      device.roomId = this.props.roomID;
      return Http.post("devices", device)
      .then((data) => {
        this.setState((prevState, props) => {
          return {devices: prevState.devices.concat([data]), newDevice: undefined};
        });
      });
    } else {
      Http.patch("devices/" + device._id, device).then(()=>{
        return this.loadDevices();
      });
    }
  }

  deleteDevice(device) {
    this.loadDevices();
  }

  cancelDevice(device) {
    if (!device.id) {
      this.setState((prevState, props) => {
        return {newDevice: undefined};
      });
    }
  };
}
