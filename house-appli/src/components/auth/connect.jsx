import React from "react"
import { Http } from "../../http";

export class Connect extends React.Component {

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
        <label>{this.state.error}</label>
        <form id="auth" >
          <div className={"flex-container row"} style={{flexDirection: "row"}}>
            <label>username
              <input type="text" className="item-center" style={{maxWidth: "300px", marginLeft: "20px"}}
                      placeholder={"username"} name="name" required/>
            </label>
          </div>
          <div className={"flex-container row"} style={{flexDirection: "row"}}>
            <label>password
              <input type="password" className="item-center" style={{maxWidth: "300px", marginLeft: "20px"}}
                    placeholder={"password"} name="password" required/>
            </label>
          </div>
          <div className={"flex-container row"} style={{flexDirection: "row-reverse"}}>
            <button className="btn" type="button" onClick={(e)=> {
              e.stopPropagation();
              Http.submitPost("login", {name: document.forms.auth.elements.name.value, password: document.forms.auth.elements.password.value}).then((res)=> {
                if(res.status !== 204) return this.setState({error: `${res.status} - ${res.body.message}`});
                Http.token = res.header["authorization"];
                this.props.history.push('/'); 
                return ;
              });
          }}>Login</button>
          </div>
        </form>
        
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
