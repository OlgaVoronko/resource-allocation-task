import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import NextStepTeach from './NextStepTeach';
import {lastTableArray} from './GetInfoTeach';
// import {step} from './LastTableTeach'

var step = 1;
let nextColumnArray = [];
let prevColumn = [];
let tableBody = [];
let resourcesCopy = partedResources.slice();
let lineValues = [];
// let lastTableArray[step] = [];

export default class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows : document.getElementById('rows').value,
      columns : document.getElementById('columns').value,
      resources : document.getElementById('resources').value
    }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  drawHeader() {
    let headerArray = partedResources.slice();
    return headerArray.map(item => <td>{item}</td>);
  }
  getNextColumn() {
    nextColumnArray = [];
    for (let i = 0; i < this.state.rows; i++) {
      nextColumnArray.push(document.getElementById('input' + (i+1) + (step)).value)
    }
    return nextColumnArray.map((item, index) => <td id={'header' + (+index + 1)}>{item}</td>);
  }
  formTableBody() {
    // prevColumn = [];
    // tableRow = [];
    tableBody = [];
    resourcesCopy = partedResources.slice();
    resourcesCopy.reverse();
    if (prevColumn.length === 0) {
      for (let i = 0; i < this.state.rows; i++) {
        prevColumn.push(document.getElementById('input' + (i+1) + (step - 1)).value)
      }
    }
      // console.log('prev2', prevColumn)
    prevColumn.reverse();
    for (let i = 0; i < partedResources.length; i++) {
      tableBody[i] = [];
      tableBody[i].push(resourcesCopy[i]);
      for (let j = 0; j < prevColumn.length; j++) {
        tableBody[i].push(prevColumn[j]);
      }
        tableBody[i].push(0);
        let n = 0;
        for (n; n < i; n++) {
          tableBody[i].push('');
      }
      n = 0;
      prevColumn.shift();
    }
    tableBody.reverse();
    return tableBody.map((item, index) => <tr>{item.map((it, ind) => <td><p className='line1' id={'line1-' + (+index + 1) + (+ind)}>{it}</p><p className='line2' id={'line2-' + (+index + 1) + (+ind)}></p></td>)}<td id={'maxValue' + (+index + 1)}></td></tr>);
}
handleToggleClick() {
  this.setState(prevState => ({
    showStep: !prevState.showStep
  }));
}
componentDidMount() {
    lineValues = [];
    prevColumn = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6 + 1; j++) {
          if (document.getElementById('line1-' + (i + 1) + (j + 1)).innerHTML) {
            document.getElementById('line2-' + (i + 1) + (j + 1)).innerHTML = +document.getElementById('line1-' + (i + 1) + (j + 1)).innerHTML +
            +document.getElementById('header' + (j)).innerHTML;
            let test = document.getElementById('line1-' + (i + 1) + (j + 1));
            test.removeAttribute('id');
          }
          if (document.getElementById('line2-' + (i + 1) + (j + 1)).innerHTML) {
            lineValues.push(document.getElementById('line2-' + (i + 1) + (j + 1)).innerHTML);
            document.getElementById('maxValue' + (i + 1)).innerHTML = Math.max.apply(null, lineValues);
            let test = document.getElementById('line2-' + (i + 1) + (j + 1));
            test.removeAttribute('id');
          }
      }
        prevColumn.push(document.getElementById('maxValue' + (i + 1)).innerHTML);
        document.getElementById('maxValue' + (i + 1)).removeAttribute('id');
  }
  for (let j = 0; j < 7; j++) {
    document.getElementById('header' + (j)).removeAttribute('id');
  }
  lastTableArray[step - 1] = [];
  lastTableArray[step - 1] = prevColumn.slice();
  console.log('last', lastTableArray)
}
  render() {
    step++;
    if (step == +(this.state.columns) + 1) {
      step = 1;
    }
    return (
      <div>
        <table className='stepTable' id='stepTable'>
          <thead>
            <tr>
              <td rowspan='2'>Z{step}</td>
              <td>0</td>
              {this.drawHeader()}
              <td rowspan='2'>B{step}(y)</td>
            </tr>
            <tr>
              <td id="header0">0</td>
              {this.getNextColumn()}
            </tr>
          </thead>
          <tbody>
            {this.formTableBody()}
          </tbody>
        </table>
        <div id="currentTable"></div>
        <NextStepTeach />
      </div>
    );
  }
};

export {step, lastTableArray}
