import * as React from 'react'

export class Tweets extends React.Component {

  constructor(props, context) {
      super(props, context);
  }

  render() {

    return(
      <div >
        <div className="grid-2 w100" >
          <span className="push title">Latest Tweets</span>
        </div>
        <div className="grid-6 w100">
          <span style={{height: "5px"}}></span>
          <span style={{borderTop: "2px solid #6ECCDD"}} className="two-thirds" ></span>
          <span ></span>
          <span style={{borderTop: "2px solid #6ECCDD"}} ></span>
          <span style={{paddingRight: "5px"}} className="two-thirds" >
            <div style={{borderTop: "2px solid #6ECCDD"}} className="w100" ></div>
          </span>
          <span ></span>
        </div>
        <div className="grid-6 tweet-grid w100" style={{marginTop: "10px"}}>
          <span style={{height: "50px"}}></span>
          <span className="two-thirds grid-2 tweet" >
            <div style={{marginBottom: "10px"}} className="two-thirds" >John Doe @johndoe</div>
            <div className="one-sixth inbl push" >17 m</div>
            <div className="full">Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero #MFN2017 !</div>
          </span>
          <span ></span>
          <span style={{height: "50px"}}></span>
          <span className="two-thirds grid-2 tweet" >
            <div style={{marginBottom: "10px"}} className="two-thirds" >John Doe @johndoe</div>
            <div className="one-sixth inbl push" >24 m</div>
            <div className="full">Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero #MFN2017 !</div>
          </span>
          <span ></span>
          <span style={{height: "50px"}}></span>
          <span className="two-thirds grid-2 tweet" >
            <div style={{marginBottom: "10px"}} className="two-thirds" >John Doe @johndoe</div>
            <div className="one-sixth inbl push" >2 h</div>
            <div className="full">Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero #MFN2017 !</div>
          </span>
          <span ></span>
        </div>
      </div>
    );
  }

};

