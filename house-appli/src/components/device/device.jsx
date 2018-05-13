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
      id: this.props.id || "",
      type: this.props.type
    };
    this.form = null;
    
  }

  render() {
    return (
      <React.Fragment>
        <div className={"flex-container"} style={{flexDirection: "row"}}>
          {this.renderType()}
          <div className={""} style={{verticalAlign: "bottom", display: "inline", width: "40px", position: "relative", margin: "30px 10px"}}>
            <i className="fa-2x fas fa-pencil-alt" style={{color:"#009900", position: "absolute", top: 0}} onClick={() => this.handleEditClick()}></i>
            <i className="fa-2x fas fa-trash-alt item-fluid" style={{position: "absolute", bottom: 0}} onClick={() => this.handleDeleteClick()}></i>
          </div>
        </div>
        <Popin open={this.state.edit} onClose={this.handleCloseClick.bind(this)}>
        <form ref={(form) => this.form = form}>
          <div className={"flex-container"} style={{flexDirection: "column", flexGrow: 2}}>
            <div className={"flex-container"} style={{flexDirection: "column", padding: "10px", flexGrow: 2}}>
              <label className={"entry"}>nom
                <input type="text" name="name"
                  defaultValue={this.state.name} placeholder={"device name"} />
              </label>
              <label className={"entry"}>custom id
                <input type="text" name="customId"
                  defaultValue={this.state.customId} placeholder={"device custom id"} />
              </label>
              <label className={"entry"}>type
                <select name="type" defaultValue={this.props.type} >
                  <option value="">None</option>
                  {Device.devicesTypes.map(deviceType => <option value={deviceType.id}>{deviceType.label}</option>)}
                </select>
              </label>
              <label className={"entry"}>actif
                <input type="checkbox" name="active" checked={this.state.active} onChange={()=> {this.setState({active: !this.state.active})}}/>
              </label>
            </div>
            <div className={"flex-container"} style={{flexDirection: "row", justifyContent: "flex-end"}}>
              <button type="button" onClick={this.handleValidateClick.bind(this)}>Validate</button>
              <button type="button" onClick={this.handleDiscardClick.bind(this)}>Discard</button>
            </div>
          </div>
          </form>
        </Popin>
      </React.Fragment>
    )
  }

  renderType() {
    let style = {
      color: this.state.active ? "#009900" : "#990000"
    }
    return(
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
        <label className="item-center" style={{fontSize:"2em"}}>{this.state.name}</label>
        <i className="fa-5x item-center fas fa-question" style={style}></i>
      </div>
    );
  }

  handleEditClick() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleCloseClick() {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleDeleteClick() {
    Http.del("devices/" + this.props.deviceId)
    .then(()=>{
      if (this.props.delete) {
        this.props.delete({name: this.props.name, _id: this.props.deviceId, type: this.props.type});
      }
    });
  }


  handleValidateClick() {
    this.handleCloseClick();
    if (this.props.validate) {
      this.props.validate({name: this.form.name.value, customId: this.form.customId.value, _id: this.props.deviceId, type: this.form.type.value, active: this.form.active.checked});
    }
  }


  handleDiscardClick() {
    this.handleCloseClick();
    if (this.props.validate) {
      this.props.discard({id: this.props.deviceId});
    }
  }

  handleActiveChange() {
    Http.patch("devices/" + this.props.deviceId, {active: !this.state.active})
    .then(()=>{
      this.setState({active: !this.state.active});
    });
  }

  valid() {
    
    if(this.input.value.trim()) {
    
      this.setState({
        edit: !this.state.edit,
        name: this.form.name.value
      });
    } else {
      alert("Veuillez renseigner un nom !");
    }
  }

}


Device.devicesTypes = [{label: "light", id: 1}, {label: "plug", id: 2}, {label: "portal", id: 3}];