import React, { Component } from 'react';
import Step2Control from './Step2Control';
import {step} from './Step2Control';
import LastTableControl from './LastTableControl';
import {nextColumnArray, prevColumnCopy} from './Step2Control';
import {partedResources} from './NewTaskTable';
import {lastTableArray} from './GetInfoControl';

let count = 0;
let check1 = true, check2 = true, check3 = true, check4 = true;
let maxValues = [];
let prevStep = +(step - 1);
let nextIter = true;
let line1Array = [];
let line2Array = [];
var lineValues = [];
var prevColumn = [];

function GoToNextStep(props) {
  if (!props.next) {
    return null;
  }
  if(step != props.cols) {
    return <Step2Control />
  }
  else {
    return <LastTableControl />
  }
}

export default class NextStepControl extends Component {
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
    if (nextIter) {
    for (let i = 0; i < partedResources.length; i++) {
      line1Array[i] = [];
      if (i != 0) {
        line1Array[i] = line1Array[i - 1].slice();
        line1Array[i].shift();
        line1Array[i].push("");
      } else {
        if (step == 2) {
          for (let j = 0; j < partedResources.length; j++) {
            line1Array[0].push(document.getElementById('input' + (j + 1) + 1).value);
          }
        } else {
          line1Array[0] = maxValues.slice();
        }
        line1Array[0].reverse();
        line1Array[0].push('0');
      }
    }
    console.log('step', step)
    line1Array.reverse();
    let info = [];

    info.push('0');
    for (let i = 1; i< partedResources.length + 1; i++) {
      info.push(+document.getElementById('input' + (i) + (step)).value)
      line2Array[i - 1] = [];
      for (let j = 0; j < 7; j++) {
        if (line1Array[i - 1][j] != "") {
          line2Array[i - 1].push(+line1Array[i - 1][j] + +info[j]);
        } else {
          line2Array[i - 1].push("");
        }
      }
    }
    console.log('line1Array', line1Array);
    console.log('2', line2Array);
    maxValues = [];
    for (let i = 0; i < line2Array.length; i++) {
      maxValues.push(Math.max.apply(null, line2Array[i]));
    }

}
    console.log('1', nextIter)

    if (count <= 2) {
      console.log('2', nextIter)
      console.log('length', nextColumnArray.length)
      console.log('TEST1')
      for (let i = 0; i < nextColumnArray.length; i++) {
        if (document.getElementById('header0').value !== '0' ||
            document.getElementById('header' + (i+1)).value != nextColumnArray[i]) {
              console.log(i, document.getElementById('header' + (i+1)).value, nextColumnArray[i])
              console.log('TESTALLO111')
          check1 = false;
          nextIter = false;
          console.log(nextIter)
          break;
        } else {
          check1 = true;
        }
      }
      console.log('TEST2')
      console.log('line1', line1Array)
      for (let i = 1; i < partedResources.length + 1; i++) {
        for (let j = 0; j < 7; j++) {
          if (document.getElementById('line1-' + (i) + (j)).value != line1Array[i - 1][j]) {
            console.log(i, j, document.getElementById('line1-' + (i) + (j)).value, line1Array[i - 1][j])
            check2 = false;
            nextIter = false;
            console.log(nextIter)
            break;
          } else {
            check2 = true;
          }
        }
      }
      console.log('TEST3')
      console.log('line2', line2Array)
      for (let i = 1; i < partedResources.length + 1; i++) {
        for (let j = 0; j < 7; j++) {
          if (document.getElementById('line2-' + (i) + (j)).value != line2Array[i - 1][j]) {
            console.log(i, j, document.getElementById('line2-' + (i) + (j)).value, line2Array[i - 1][j])
            check3 = false;
            nextIter = false;
            console.log(nextIter)
            break;
          } else {
            check3 = true;
          }
        }
      }
      console.log('TEST4')
      for (let i = 0; i < maxValues.length; i++) {
        if (document.getElementById('maxValue' + (i + 1)).value != maxValues[i]) {
          console.log(i, document.getElementById('maxValue' + (i + 1)).value, maxValues[i])
          console.log('TESTALLO')
          check4 = false;
          nextIter = false;
          console.log(nextIter)
          break;
        } else {
          check4 = true;
        }
      }
      console.log(nextIter);
      console.log(check1, check2, check3, check4)
      if (check1 && check2 && check3 && check4) {
        this.setState(prevState => ({
          showStep: !prevState.showStep
        }));
      } else {
        alert('Ошибка! Проверьте введенные значения');
      }
      count++;
    }
     if (count === 3 && check1 === false
      || count === 3 && check2 === false
      || count === 3 && check3 === false
      || count === 3 && check4 === false) {
      if (window.confirm("Вводятся неверные значения. Попробовать еще раз?")) {
        count = 0;
      } else {
        nextIter = true;
        check1 = true;
        check2 = true;
        check3 = true;
        check4 = true;
        for (let i = 0; i < nextColumnArray.length; i++) {
          document.getElementById('header0').setAttribute('value', '0');
          let temp = nextColumnArray[i];
          document.getElementById('header' + (i+1)).setAttribute('value', temp);
        }
        for (let i = 1; i < partedResources.length + 1; i++) {
          for (let j = 0; j < 7; j++) {
            let temp = line1Array[i - 1][j];
            document.getElementById('line1-' + (i) + (j)).setAttribute('value', temp);
          }
        }

        for (let i = 1; i < partedResources.length + 1; i++) {
          for (let j = 0; j < 7; j++) {
            let temp = line2Array[i - 1][j];
            document.getElementById('line2-' + (i) + (j)).setAttribute('value', temp);
          }
        }

        for (let i = 0; i < maxValues.length; i++) {
          let temp = maxValues[i];
          document.getElementById('maxValue' + (i + 1)).setAttribute('value', temp);
        }

        lastTableArray[step - 1] = [];
        for (let i = 0; i < partedResources.length; i++) {
          lastTableArray[step - 1].push(document.getElementById('maxValue' + (i + 1)).value);
        }
        console.log('lastTableArray', lastTableArray);

        count = 0;
        this.setState(prevState => ({
          showStep: !prevState.showStep
        }));
      }
    }
  }
  componentDidUpdate() {
    for (let j = 0; j < 6; j++) {
      document.getElementById('maxValue' + (j + 1)).removeAttribute('id');
    }
    for (let j = 0; j < 7; j++) {
      document.getElementById('header' + (j)).removeAttribute('id');
    }
    for (let i = 1; i < partedResources.length + 1; i++) {
      for (let j = 0; j < 7; j++) {
        document.getElementById('line2-' + (i) + (j)).removeAttribute('id');
        document.getElementById('line1-' + (i) + (j)).removeAttribute('id');
      }
    }
    document.getElementById('goToNextStep').removeAttribute('id');
  }
  render() {
    console.log('step = ', step);
  return (
    <div>
      <button
        className='nextButton activeButton'
        id="goToNextStep"
        onClick={this.handleToggleClick}>
          Следующий шаг
      </button>
      <GoToNextStep next={this.state.showStep} cols={this.state.columns} />
    </div>
  );
  }
};

export {step, lastTableArray, lineValues, prevColumn}
