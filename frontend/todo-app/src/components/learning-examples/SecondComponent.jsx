import React, { Component } from 'react';

// Class Component
class SecondComponent extends Component {
    render() {
      return (
        <div className="SecondComponent">
          {/* <p id = "secondComp">SecondComponent</p> */}
          {/* <script>
          document.getElementById("secondComp").style.color = "red";
          </script> */}
          {/* React.createElement("button", {type: "button",
            onClick: "document.getElementById('secondComp').style.color = 'green'"}, "Change color to green!"); */}
        </div>
      )
    }
  }

  export default SecondComponent