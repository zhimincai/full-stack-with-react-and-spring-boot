import React from 'react';

// function component is easier to create but No [internal state]
function ThirdComponent(){
    return (
      // <div className="ThirdComponent">
      //   <p id = "thirdCom">Third Component</p>
      //   <script>
      //   document.getElementById("thirdCom").style.color = "red";
      //   </script>
      //   <button type="button"
      //   onClick="document.getElementById('thirdCom').style.color = 'green'">Change color to green!</button>
      // </div>
      React.createElement("div", {
        className: "ThirdComponent"
      }, /*#__PURE__*/React.createElement("p", {
        id: "thirdCom"
      }, "Third Component"), /*#__PURE__*/React.createElement("script", null, "document.getElementById(\"thirdCom\").style.color = \"red\";"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        onClick: "document.getElementById('thirdCom').style.color = 'green'"
      }, "Change color to green!"))
    )
  }

export default ThirdComponent