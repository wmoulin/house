import React from "react";
import { Popin } from "../popin";
import { AppContext } from "../../app-const";
import { Menu } from "../simple-menu";
import { Spinner } from "../spinner";
import { Http } from "../../http";

export class Device extends React.Component {

  constructor(props, context) {
    super(props);
    this.state = {
      active: this.props.active || false,
      disabled: false,
      edit: this.props.edit || false,
      name: this.props.name || "",
      id: this.props.id || "",
      type: this.props.type
    };
    this.form = null;
  }

  componentDidMount() {
    if(this.props.disabledTime) {
      //console.log(this.context);
      this.context.eventSource.addEventListener('disabled', (e) => {
        let device = JSON.parse(e.data);
        if(this.props.deviceId == device._id) {
          this.setState({disabled : true}, () => {
            setTimeout(()=> {
              this.setState({disabled : false});
            }, this.props.disabledTime*1000)
          });
          console.log("disabled receive data :", device);
        }
      }, false);
    }
  }

  render() {

    return (
      <React.Fragment>
        <div className={"device-card"}>
        <div className={"flex-container content"} style={{flexDirection: "row"}}>
          {this.renderType()}
          <div>
            <Menu className={"menu"}>
              <button class="btn" onClick={() => this.handleEditClick()}><i className="fas fa-pencil-alt" ></i> Editer</button>
              <button class="btn" onClick={() => this.handleDeleteClick()}><i className="fas fa-trash-alt item-fluid" ></i> Supprimer</button>
            </Menu>
          </div>
          
        </div>
        {this.state.disabled ? <div id="disab" className="disabled_overlay"><Spinner/></div> : null}
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
              <label className={"entry"}>temps de désactivation
              <input type="number" name="disabledTime" step={1} min={0} max={30}
                defaultValue={this.props.disabledTime} placeholder={"disabled time"} />
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
      <div style={{margin: "20px"}} className={"flex-container--column item-fluid device"}>
        <label className="item-center" >{this.state.name}</label>
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
      this.props.validate({name: this.form.name.value, customId: this.form.customId.value, _id: this.props.deviceId, type: this.form.type.value, active: this.form.active.checked, disabledTime: this.form.disabledTime.value});
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

Device.contextType = AppContext;
Device.devicesTypes = [{label: "light", id: 1}, {label: "plug", id: 2}, {label: "gate", id: 3}, {label: "pedestrian gate", id: 4}];