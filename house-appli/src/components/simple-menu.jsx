import * as React from "react"
import { Popin } from "./popin";

export class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: this.props.active || false,
    };
    
  }

  render() {
    return(
      <button id={"menu-action" + this.props.id}
              className={this.props.className} type="button" id="btn-menu" onClick={() => this.handleClick()}>
        <i className="fas fa-ellipsis-v fa-lg"></i>
        {this.state.active?
        <React.Fragment>
          <div id="popin" className="popin-action" >
            <div  className="popin-action-content flex-container" onClick={this.handleClick.bind(this)} >
              <ul className="menu-action">
                {React.Children.map(this.props.children, child=> { return <li><child.type {...child.props} /></li>})}
              </ul>
            </div>
          </div>
          <div id="fade" className="black_overlay">
          </div>
        </React.Fragment>:null}
      </button>
    );
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    });
  }
}