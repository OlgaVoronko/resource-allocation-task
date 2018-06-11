import React, { Component } from 'react';
import Step2 from './Step2';
import {step} from './Step2';
import LastTable from './LastTable';

function GoToNextStep(props) {
  if (!props.next) {
    return null;
  }
  if(step != props.cols) {
    // document.getElementById('goToNextStep').classList.add('hidden');
    document.getElementById('goToNextStep').removeAttribute('id');
    return <Step2 />
  }
  else {
    return <LastTable />
  }
}

export default class NextStepComponent extends Component {
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
