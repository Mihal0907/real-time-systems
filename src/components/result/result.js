import React, {Component} from 'react'
import './result.css'

export default class Result extends Component {

    render() {

        const {results} = this.props;

        return (
            <div className={"mx-auto"}>
                <h4>{results.name}</h4>
                <ul className={"list-group"}>
                    <li className={"list-group-item"}>Math expectation is: {results.expectation.toFixed(4)}</li>
                    <li className={"list-group-item"}>Dispersion is: {results.dispersion.toFixed(4)}</li>
                    <li className={"list-group-item"}>Time is: {results.time.toFixed(4)} (ms)</li>
                </ul>
            </div>


        );
    }
}