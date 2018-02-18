import * as React from 'react'

export class Light extends React.Component {

  constructor(props, context) {
      super(props, context);
  }

  render() {

    return(
      <div className={"flex-container"}>
        <div style={{margin: "20px"}} className={"flex-container--column item-fluid"}>
          <label className="item-center" style={{fontSize:"2em"}}>veilleuse</label>
          <i className="fa-5x item-center fas fa-lightbulb" style={{color:"#009900"}}></i>
        </div>
        <div className={""} style={{verticalAlign: "bottom", display: "inline", width: "40px", position: "relative", margin: "30px 10px"}}>
        <i className="fa-2x fas fa-pencil-alt" style={{color:"#009900", position: "absolute", top: 0}} onClick={() => this.handleClick()}></i>
          <i className="fa-2x fas fa-trash-alt item-fluid" style={{position: "absolute", bottom: 0}}></i>
        </div>
      </div>
    );
  }

};
