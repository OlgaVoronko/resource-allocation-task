import React, { Component } from 'react';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import GetInfo from './GetInfo';
import GetInfoControl from './GetInfoControl';
import {info} from './NewTaskTable';

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return <GetInfo />
}

function Control(prop) {
  if (!prop.control) {
    return null;
  }
  return <GetInfoControl />
}

export default class Nav extends Component {

  constructor() {
		super()
		this.state = {
			showArea: false,
      showWarning: false,
      showControl: false
		}
    this.handleToggleClick = this.handleToggleClick.bind(this);
	}
  handleToggleClick() {
    if (info.length === 0) {
      alert("Вы не ввели новое условие!")
    } else {
      this.setState(prevState => ({
        showWarning: !prevState.showWarning
      }));
    }
}
controlClick() {
  if (info.length === 0) {
    alert("Вы не ввели новое условие!")
  } else {
    this.setState(prevState => ({
      showControl: !prevState.showControl
    }));
  }
}
  componentDidMount() {
    document.getElementById('new-task').setAttribute("onClick", "{document.getElementById('new-task-form').classList.remove('hidden')}");
  }
  render() {
    return (
      <div>
        <div className="nav">
          <div className="icon">
            <button id="new-task">
              <img
                src="./new-task.PNG"
                title="Новое условие"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="calculate"
                    onClick={this.handleToggleClick}
                    >
              <img
                src="./calculate.PNG"
                title="Решить"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="teach" disabled>
              <img
                src="teach.PNG"
                title="Режим обучения"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="control"
                    onClick={this.controlClick.bind(this)}>
              <img
                src="./control.PNG"
                title="Режим контроля"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="about">
              <img
                src="./about.PNG"
                title="О программе"
                alt=""
              />
            </button>
          </div>
        </div>
        <div>
          <NewTaskForm />
        </div>
        <div>
        <WarningBanner warn={this.state.showWarning} />
        <Control control={this.state.showControl} />
      </div>
      </div>
    );
  }
};
