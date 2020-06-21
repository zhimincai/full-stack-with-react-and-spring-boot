import React, { Component } from 'react';

// Class Component
class FirstComponent extends Component {
    render() {
      return (
        // <div className="FirstComponent">
        //   <p id = 'firstComp'>FirstComponent</p>
  
        //   <img src = "https://www.agencymabu.com/wp-content/uploads/2016/07/Mobile_Apps-745x354.jpg" alt=" Best App!" width="400" height="200"></img>
          
        // </div>
        React.createElement("div", {
          className: "FirstComponent"
        }, /*#__PURE__*/React.createElement("p", {
          id: "firstComp"
        }, "FirstComponent"), /*#__PURE__*/React.createElement("img", {
          src: "https://www.agencymabu.com/wp-content/uploads/2016/07/Mobile_Apps-745x354.jpg",
          alt: " Best App!",
          width: "400",
          height: "200"
        }))
      );
    }
  }
  export default FirstComponent;

