import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import Step2 from './Step2';
import {info} from './EditTaskTable'

let countStep = 1; // для экспорта
let lastTableArray = []; // для последней таблицы


function NextStep(props) {
  if (!props.next) {
    return null;
  }
  return <Step2 />
}

  export default class Test extends Component {
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
    buildFirstStep() {
      lastTableArray[0] = [];
      let tempArray = [];
      let n = 0;
      for (let i = 0; i < partedResources.length; i++) {
        tempArray.push('B' + (i+1) + ' (' + partedResources[i] + ') = ' + info[n]);
        lastTableArray[0].push(info[n]);
        n += partedResources.length-1;
      }
      return tempArray.map(item => <p>{item}</p>);
    }
    render() {
    return (
      <div className='block'>
        {this.buildFirstStep()}
        <button
          className='nextButton activeButton'
          id="goToNextStep"
          onClick={this.handleToggleClick}>
            Следующий шаг
        </button>
        <NextStep next={this.state.showStep} />
      </div>
    );
    }
  };

  export {countStep, lastTableArray}
