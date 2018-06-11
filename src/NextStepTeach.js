import React, { Component } from 'react';
import Step2Teach from './Step2Teach';
import {step} from './Step2Teach';
import LastTableTeach from './LastTableTeach';

function GoToNextStep(props) {
  if (!props.next) {
    return null;
  }
  if(step != props.cols) {
    // document.getElementById('goToNextStep').classList.add('hidden');
    document.getElementById('goToNextStep').removeAttribute('id');
    return <Step2Teach />
  }
  else {
    return <LastTableTeach />
  }
}

export default class NextStepTeach extends Component {
  constructor() {
    super();
    this.state = {
      rows : document.getElementById('rows').value,
      columns : document.getElementById('columns').value,
      resources : document.getElementById('resources').value,
      showStep: false
    }
      this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {

    this.setState(prevState => ({
      showStep: !prevState.showStep
    }));
  }
  render() {
  return (
    <div>
      <button
        className=''
        id="goToNextStep"
        onClick={this.handleToggleClick}>
          Следующий шаг
      </button>
      <GoToNextStep next={this.state.showStep} cols={this.state.columns} />
    </div>
  );
  }
};

export {step}
