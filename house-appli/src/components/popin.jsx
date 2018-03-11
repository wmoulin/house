import * as React from "react"
import { Link } from "react-router-dom";

export class Popin extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.state = {
        open: props.open | false
      };

    }

    render() {
      if(!this.state.open) return null;
      return(
        <React.Fragment>
        { this.state.open && 
          <div id="popin">
            <div id="light" className="popin_content">{this.props.children}<a href="javascript:void(0)" onClick={()=>{this.setState({open: false})}}>Close</a>
          </div>
            <div id="fade" className="black_overlay">
            </div>
          </div>
          }
        </React.Fragment>
        );
  }

  handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

};
