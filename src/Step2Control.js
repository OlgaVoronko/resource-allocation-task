import React, { Component } from 'react';
import {partedResources} from './NewTaskTable';
import NextStepControl from './NextStepControl';
import {lastTableArray} from './GetInfo';
import {prevColumn} from './NextStepControl';

var step = 1;
let nextColumnArray = [];
let tableBody = [];
let resourcesCopy = partedResources.slice();
let headerArray = [];
let prevColumnCopy = [];

export default class Step2Control extends Component {
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
    headerArray = partedResources.slice();
    return headerArray.map(item => <td>{item}</td>);
  }
  getNextColumn() {
    nextColumnArray = [];
    for (let i = 0; i < this.state.rows; i++) {
      nextColumnArray.push(document.getElementById('input' + (i+1) + (step)).value);
    }
    return nextColumnArray.map((item, index) => <td><input id={'header' + (+index + 1)} /></td>);
  }
  formTableBody() {
    tableBody = [];
    resourcesCopy.reverse();
    resourcesCopy = partedResources.slice();
    if (prevColumn.length === 0) {
      for (let i = 0; i < this.state.rows; i++) {
        prevColumn.push(document.getElementById('input' + (i+1) + (step - 1)).value)
      }
    }
    prevColumnCopy = prevColumn.slice();
    prevColumn.reverse();
    for (let i = 0; i < partedResources.length; i++) {
      tableBody[i] = [];
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
    return tableBody.map((item, index) => <tr><td>{partedResources[index]}</td>{item.map((it, ind) => <td><p className='line1'><input id={'line1-' + (+index + 1) + (+ind)} /></p><p className='line2'><input id={'line2-' + (+index + 1) + (+ind)} /></p></td>)}<td><input id={'maxValue' + (+index + 1)} /></td></tr>);
}
handleToggleClick() {
  this.setState(prevState => ({
    showStep: !prevState.showStep
  }));
}
  render() {
    step++;
    if (step == +(this.state.columns) + 1) {
      step = 1;
    }
    return (
      <div>
        <table className='stepTable stepTableControl' id='stepTable'>
          <thead>
            <tr>
              <td rowspan='2'>Z{step}</td>
              <td>0</td>
              {this.drawHeader()}
              <td rowspan='2'>B{step}(y)</td>
            </tr>
            <tr>
              <td><input id="header0" /></td>
              {this.getNextColumn()}
            </tr>
          </thead>
          <tbody>
            {this.formTableBody()}
          </tbody>
        </table>
        <div id="currentTable"></div>
        <NextStepControl />
      </div>
    );
  }
};

export {step, lastTableArray, nextColumnArray, prevColumnCopy}
