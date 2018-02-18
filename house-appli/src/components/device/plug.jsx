import * as React from 'react'

export class Plug extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {active: false};
  }

  componentWillMount() {
    
  }

  render() {

    return(
      <div style={{margin: "20px"}} className={"flex-container"}>
        <i className="fa-5x item-center fas fa-plug" style={{color:"#009900"}}></i>
      </div>
    );
  }

};
