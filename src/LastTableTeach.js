import React, { Component } from 'react';
import {lastTableArray} from './Step2Teach';
import {partedResources} from './NewTaskTable';
import EditTaskForm from './EditTaskForm';
import GetInfo from './GetInfoTeach';
import {step} from './Step2';

export default class LastTableTeach extends Component {
  constructor() {
    super();
    this.state = {
      rows : document.getElementById('rows').value,
      columns : document.getElementById('columns').value,
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
    return resultArray.map(item => <tr>{item.map(it => <td>{it}</td>)}</tr>);
  }
  componentDidMount() {
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
          document.getElementById('input' + (i + 1) + (j + 1)).removeAttribute('id');
      }
    }
    document.getElementById('rows').removeAttribute('id');
    document.getElementById('columns').removeAttribute('id');
    document.getElementById('resources').removeAttribute('id');
  }
  render() {
    return (
      <div className='block'>
        <div className='teachingBlock'>
          <p className='teaching'>
            На этом прямой ход метода динамического программирования по решению задачи об оптимальном распределении ресурсов окончен.
            Полученные значения функции Bk(y) можно собрать в таблицу:
          </p>
        </div>
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
