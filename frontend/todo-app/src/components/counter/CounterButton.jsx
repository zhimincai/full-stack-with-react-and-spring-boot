import React, {Component} from 'react';
import PropTypes from 'prop-types'

// function component is easier to create but No [internal state]
class CounterButton extends Component {
    // Define the initial state in a constructor
    constructor() {
        super(); // for using 'this' keyword
        // in order to be able to use setState()
    }

    render () {
        // block/local scope: const/ let; function scope: var
        // const style = {fontSize : "50px", padding: "15x 30px"} // can embed style in DOM
        return (
            <button onClick={() => this.props.method(this.props.by)}>{this.props.sign}{this.props.by}</button>
        )
    }
}

CounterButton.defaultProps = {
    by : 1,
    sign : '+'
}

CounterButton.propTypes = {
    by : PropTypes.number
}

export default CounterButton