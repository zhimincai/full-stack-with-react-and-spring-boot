import React, {Component} from 'react';
import './counter.css'
import CounterButton from './CounterButton.jsx'

class Counter extends Component {
    // Define the initial state in a constructor
    constructor() {
        super(); // for using 'this' keyword
        // manage all internal states here
        this.state = {
            counter : 0
        }
        // in order to be able to use setState()
        this.reset = this.reset.bind(this)
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }
    render() {
        return (
            <div className="counter">
                {/* 'by' pass in property (prop) */}
                <div className='button-in-line'>
                    <CounterButton method={this.increment}/>
                    <CounterButton sign='-' by={1} method={this.decrement}/>
                </div>

                <div className='button-in-line'>
                    <CounterButton by={5} method={this.increment}/>
                    <CounterButton sign='-' by={5} method={this.decrement}/>
                </div>

                <div className='button-in-line'>
                    <CounterButton by={10} method={this.increment}/>
                    <CounterButton sign='-' by={10} method={this.decrement}/>
                </div>
                
                <span className='count'>{this.state.counter}</span>
                <div>
                    <button className='reset' onClick={this.reset}>RESET</button>
                </div>
            </div>
        )
    }

    increment (by)  { // Update state
        // efficiently update internal states
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        )
    }

    decrement (by)  { // Update state
        // efficiently update internal states
        this.setState(
            (prevState) => {
                return {counter: prevState.counter - by}
            }
        )
    }

    reset () {
        this.setState({ counter : 0 })
    }
}

export default Counter