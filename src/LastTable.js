import React, { Component } from 'react';
import {lastTableArray} from './Step2';
import {partedResources} from './NewTaskTable';
import EditTaskForm from './EditTaskForm';
import GetInfo from './GetInfo';
import {step} from './Step2';

function EditTask(props) {
  if (!props.next) {
    return null;
  }
  else {
    return <GetInfo />
  }
}

function AddEdit(props) {
  if (!props.add) {
    return null;
  }
  else {
    return <EditTaskForm />
  }
}

export default class LastTable extends Component {
  constructor() {
    super();
    this.state = {
      rows : document.getElementById('rows').value,
      columns : document.getElementById('columns').value,
      showStep: false,
      showEdit: false
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
  componentDidMount() {
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
      //    this.state.info.push(document.getElementById('editedInput' + (i + 1) + (j + 1)).value);
          document.getElementById('input' + (i + 1) + (j + 1)).removeAttribute('id');
      }
    }
    document.getElementById('rows').removeAttribute('id');
    document.getElementById('columns').removeAttribute('id');
    document.getElementById('resources').removeAttribute('id');
    //partedResources.length = 0;
  }
  handleToggleClick() {
    this.setState(prevState => ({
      showEdit: !prevState.showEdit
    }));
  }
  render() {
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
        <button id='edit-tasked' className='activeButton' onClick={this.handleToggleClick.bind(this)}>
          Редактировать условие
        </button>
        <EditTask next={this.state.showStep} cols={this.state.columns} />
        <AddEdit add={this.state.showEdit} />
      </div>
    );
  }
};

export {step}
