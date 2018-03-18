import * as React from "react"
import { Link } from "react-router-dom";

export class Popin extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.state = {
        open: props.open | false
      };

    }

    componentWillReceiveProps(nextProps) {
      if(this.props.open !== nextProps.open) {
        this.setState({open: nextProps.open});
      }
    }

    render() {
      if(!this.state.open) return null;
      return(
        <React.Fragment>
        { this.state.open && 
          <div id="popin">
            <div id="light" className="popin_content flex-container" style={{flexDirection: "column"}}><button type="button" className="popin_close" onClick={()=>{if(this.props.onClose) {this.props.onClose()}this.setState({open: false})}}>Close</button>
              {this.props.children}
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
