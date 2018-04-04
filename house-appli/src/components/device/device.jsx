import React from "react"
import { Popin } from "../popin";
import { Http } from "../../http";


export class Device extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active || false,
      edit: this.props.edit || false,
      name: this.props.name || "",
      type: this.props.type
    };
    this.input = null;
    this.select = null;
  }

  render() {
    return (
      <React.Fragment>
        <div className={"flex-container"} style={{flexDirection: "row"}}>
          {this.renderType()}
          <div className={""} style={{verticalAlign: "bottom", display: "inline", width: "40px", position: "relative", margin: "30px 10px"}}>
            <i className="fa-2x fas fa-pencil-alt" style={{color:"#009900", position: "absolute", top: 0}} onClick={() => this.handleClick()}></i>
            <i className="fa-2x fas fa-trash-alt item-fluid" style={{position: "absolute", bottom: 0}} onClick={() => this.handleDeleteClick()}></i>
          </div>
        </div>
        <Popin open={this.state.edit} onClose={this.handleCloseClick.bind(this)}>
          <div className={"flex-container"} style={{flexDirection: "column", flexGrow: 2}}>
            <div className={"flex-container"} style={{flexDirection: "column", padding: "10px", flexGrow: 2}}>
              <label className={"entry"}>nom
                <input type="text"
                  defaultValue={this.state.name} placeholder={"device name"} ref={(input) => this.input = input} />
              </label>
              <label className={"entry"}>type
                <select name="type" defaultValue={this.props.type} ref={(select) => this.select = select}>
                  <option value="">None</option>
                  {Device.devicesTypes.map(deviceType => <option value={deviceType.id}>{deviceType.label}</option>)}
                </select>
              </label>
            </div>
            <div className={"flex-container"} style={{flexDirection: "row", justifyContent: "flex-end"}}>
              <button type="button" onClick={this.handleValidateClick.bind(this)}>Validate</button>
              <button type="button" onClick={this.handleDiscardClick.bind(this)}>Discard</button>
            </div>
          </div>
        </Popin>
      </React.Fragment>
    )
  }

  renderType() {
    return(
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
        <label className="item-center" style={{fontSize:"2em"}}>{this.state.name}</label>
        <i className="fa-5x item-center fas fa-question" style={{color:"#009900"}}></i>
      </div>
    );
  }

  handleCloseClick() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleDeleteClick() {
    Http.del("devices/" + this.props.deviceId);
  }


  handleValidateClick() {
    this.handleCloseClick();
    if (this.props.validate) {
      this.props.validate({name: this.input.value, _id: this.props.deviceId, type: this.select.value});
    }
  }


  handleDiscardClick() {
    this.handleCloseClick();
    if (this.props.validate) {
      this.props.discard({id: this.props.deviceId});
    }
  }

  valid() {
    
    if(this.input.value.trim()) {
    
      this.setState({
        edit: !this.state.edit,
        name: this.input.value
      });
    } else {
      alert("Veuillez renseigner un nom !");
    }
  }

}


Device.devicesTypes = [{label: "light", id: 1}, {label: "plug", id: 2}];