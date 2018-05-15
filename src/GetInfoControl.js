import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import Step2Control from './Step2Control';
import {info} from './EditTaskTable'

let countStep = 1; // для экспорта
let lastTableArray = []; // для последней таблицы
let count = 0;

function NextStep(props) {
  if (!props.next) {
    return null;
  }
  return <Step2Control />
}

  export default class GetInfoControl extends Component {
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
      let n = 0;
      let check = true;
      if (count <= 2) {
        for (let i = 0; i < partedResources.length; i++) {
          if (document.getElementById('inp' + (i)).value != info[n]) {
            check = false;
            break;
          }
          n += partedResources.length-1;
        }
        if (check) {
          this.setState(prevState => ({
            showStep: !prevState.showStep
          }));
        } else {
          alert('Ошибка! Проверьте введенные значения');
        }
        count++;
      }
      if (count === 3 && check === false) {
        if (window.confirm("Вводятся неверные значения. Попробовать еще раз?")) {
          count = 0;
        } else {
          let n = 0;
          for (let i = 0; i < partedResources.length; i++) {
            let currentInfo = info[n];
            document.getElementById('inp' + (i)).setAttribute('value', currentInfo); 
            n += partedResources.length-1;
            }
          this.setState(prevState => ({
            showStep: !prevState.showStep
          }));
        }
      }
    }
    buildFirstStep() {
      lastTableArray[0] = [];
      let tempArray = [];
      let tempArrayControl = [];
      let n = 0;
      console.log('partedResources', partedResources)
      for (let i = 0; i < partedResources.length; i++) {
        tempArray.push('B' + (i+1) + ' (' + partedResources[i] + ') = ' + info[n]);
        tempArrayControl.push('B' + (i+1) + ' (' + partedResources[i] + ') = ');
        lastTableArray[0].push(info[n]);
        n += partedResources.length-1;
      }
      return tempArrayControl.map((item, index) => <p>{item}<input id={'inp' + index} required /></p>);
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
