import React, {Component} from 'react'
import './form.css'

export default class Form extends Component {

    state = {
        harmonicsNum: '',
        frequency: '',
        discreteNum: ''
    };

    onFirstChange = (event) => {
        this.setState({
            harmonicsNum: event.target.value
        })
    };

    onSecondChange = (event) => {
        this.setState({
            frequency: event.target.value
        })
    };

    onThirdChange = (event) => {
        this.setState({
            discreteNum: event.target.value
        })
    };

    onPush = (event) => {
        event.preventDefault();
        this.props.onValuesPushed(this.state);
    };

    render() {
        return (
            <div className={'form-group row d-flex'}>
                <h4>Input values</h4>
                <form className={'form'}>
                    <input type={'text'}
                           className={'form-control input'}
                           onChange={this.onFirstChange}
                           placeholder={'Harmonics number'}/>
                    <input type={'text'}
                           className={'form-control input'}
                           onChange={this.onSecondChange}
                           placeholder={'Frequency'}/>
                    <input type={'text'}
                           className={'form-control input'}
                           onChange={this.onThirdChange}
                           placeholder={'Discrete samples number'}/>
                    <button className={"btn btn-outline-success bt-lg push"}
                            onClick={this.onPush}>
                        Push
                    </button>
                </form>
            </div>
        )
    }
}