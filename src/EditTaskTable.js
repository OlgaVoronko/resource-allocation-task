import React, { Component } from 'react';
import {info} from './NewTaskTable';
import GetInfo from './GetInfo';

let partedResources = []; // для экспорта данных

function Test(props) {
  console.log('ooo', info);
  console.log('props.next', props.next);

  if (!props.next) {
    return null;
  }
  else {
    return <GetInfo />
  }
}

export default class EditTaskTable extends Component {
  constructor(props) {
            super(props);

            this.state = {
              birthdays: [],
              rows : document.getElementById('rows').value,
              columns : document.getElementById('columns').value,
              resources : document.getElementById('resources').value,
              delRow : [],
          //    info : [],
              showStep: false
            }
            this.formInfoArray = this.formInfoArray.bind(this);
          }
  calcTable() {
    let del = this.state.resources / this.state.rows;
    let delRow = 0;
    let inputsArray = [];
    let tdArray = [];
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
          tdArray.push('');
      }
      inputsArray.push(tdArray);
      delRow += del;
      this.state.delRow.push(delRow);
      partedResources.push(delRow);
      tdArray = [];
    }
    this.state.birthdays = inputsArray;
    partedResources = this.state.delRow.slice();
  }
  drawTable() {
    let infoCopy=info.slice();
    this.calcTable();
    return this.state.birthdays.map((bday, ind) => (
      <tr><td>{this.state.delRow.shift()}</td>{bday.map((item, index) => <td><input
        id={'input' + (+ind + 1) + (+index + 1)} defaultValue={infoCopy.shift()}
        required/>{item}</td>)}</tr>
    ));
  }
  drawHeader() {
    let headerArray = [];
    for (let i = 1; i <= this.state.columns; i++) {
      headerArray.push('Z' + i);
    }
    return headerArray.map(item => <td>{item}</td>);
  }
  formInfoArray() {
    info.length = 0;
    let rows = this.state.rows;
    let columns = this.state.columns;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
      //    this.state.info.push(document.getElementById('editedInput' + (i + 1) + (j + 1)).value);
          info.push(document.getElementById('input' + (i + 1) + (j + 1)).value);
      }
    }
    document.getElementById('setReadyButton').setAttribute('disabled', '');
    this.setState(prevState => ({
      showStep: !prevState.showStep
    }));
  }
  render() {
    return (
      <div>
        <div id="NewTaskTable">
          <table>
            <thead>
              <tr>
                <td></td>
                {this.drawHeader()}
              </tr>
            </thead>
            <tbody>
              {this.drawTable()}
            </tbody>
          </table>
          <button
            id="setReadyButton"
            title="Готово"
            onClick={this.formInfoArray.bind(this)}>
              Готово
          </button>
        </div>
        <Test next={this.state.showStep} />
      </div>
    );
  }
};

export {info, partedResources}
