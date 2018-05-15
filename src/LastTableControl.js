import React, { Component } from 'react';
import {lastTableArray} from './NextStepControl';
import {partedResources} from './NewTaskTable';
import EditTaskForm from './EditTaskForm';
import GetInfo from './GetInfoControl';
import {step} from './Step2Control';

export default class LastTable extends Component {
  constructor() {
    super();
    this.state = {
      rows : document.getElementById('rows').value,
      columns : document.getElementById('columns').value
    }
  }
  drawHeader() {
    let headerArray = [];
    headerArray.push('');
    for (let i = 0; i < this.state.columns; i++) {
      headerArray.push('B' + (i + 1));
    }
    return headerArray.map(item => <td>{item}</td>);
  }
  drawTable() {
    let resultArray = [];
    for (let j = 0; j < lastTableArray[0].length; j++) {
      resultArray[j] = [];
    }
    for (let i = 0; i < 6; i++) {
      resultArray[i].push(partedResources[i]);
      for (let j = 0; j < 5; j++) {
        resultArray[i].push(lastTableArray[j][i]);
      }
    }
    console.log(resultArray)
    return resultArray.map(item => <tr>{item.map(it => <td>{it}</td>)}</tr>);
  }
  render() {
    console.log('lastlast', lastTableArray)
    return (
      <div>
        <p>Конечный результат:</p>
        <table className='stepTable' id='lastTable'>
          <thead>
            <tr>
              {this.drawHeader()}
            </tr>
          </thead>
          <tbody>
            {this.drawTable()}
          </tbody>
        </table>
      </div>
    );
  }
};

export {step}
