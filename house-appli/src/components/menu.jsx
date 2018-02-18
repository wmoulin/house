import * as React from "react"
import { Link } from "react-router-dom";

export class Menu extends React.Component {

    constructor(props, context) {
      super(props, context);

      let now = new Date();
      this.state = {
        active: false
      };
      this.menuPanel = null;
    }

    render() {
      return(
        <React.Fragment>
          <div className="menuPanel" ref={(elt) => {this.menuPanel = elt;}} style={{width: this.state.active ? "250px" : 0}}onClick={() => this.handleClick()} >
            <i className="fa-3x fas fa-times txtright" style={{padding: "10px"}}></i>
            <Link to="/rooms" style={{margin: "10px"}}><button className="btn">Ajouter une pièce</button></Link>
          </div>
          <i className="fa-3x fas fa-bars" style={{padding: "10px"}} id="menu" onClick={() => this.handleClick()}/>
        </React.Fragment>
      );
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }

};
