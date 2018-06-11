import React, { Component } from 'react';
import NewTaskForm from './NewTaskForm';
import EditTaskForm from './EditTaskForm';
import GetInfo from './GetInfo';
import GetInfoControl from './GetInfoControl';
import GetInfoTeach from './GetInfoTeach';
import AboutProgram from './AboutProgram';
import {info} from './NewTaskTable';

function Calculate(props) {
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

function Teach(prop) {
  if (!prop.teach) {
    return null;
  }
  return <GetInfoTeach />
}

function About(prop) {
  if (!prop.about) {
    return null;
  }
  return <AboutProgram />
}

export default class Nav extends Component {

  constructor() {
		super()
		this.state = {
			showArea: false,
      showCalc: false,
      showControl: false,
      showTeach: false,
      showAbout: false
		}
    this.handleToggleClick = this.handleToggleClick.bind(this);
	}
  handleToggleClick() {
    if (info.length === 0) {
      alert("Вы не ввели новое условие!")
    } else {
      this.setState(prevState => ({
        showCalc: !prevState.showCalc
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

teachClick() {
  if (info.length === 0) {
    alert("Вы не ввели новое условие!")
  } else {
    this.setState(prevState => ({
      showTeach: !prevState.showTeach
    }));
  }
}

aboutClick() {
  this.setState(prevState => ({
    showAbout: !prevState.showAbout
  }));
}
  componentDidMount() {
    document.getElementById('new-task').setAttribute("onClick", "{document.getElementById('new-task-form').classList.remove('hidden')}");
  }
  render() {
    return (
      <div>
        <div className="nav">
          <div className="icon">
            <button id="new-task"
              className="none">
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
                    className="none"
                    >
              <img
                src="./calculate.PNG"
                title="Решить"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="control"
                    className="none"
                    onClick={this.teachClick.bind(this)}>
              <img
                src="./teach.PNG"
                title="Режим обучения"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="control"
                    className="none"
                    onClick={this.controlClick.bind(this)}>
              <img
                src="./control.PNG"
                title="Режим контроля"
                alt=""
              />
            </button>
          </div>
          <div className="icon">
            <button id="about"
                className="none"
                onClick={this.aboutClick.bind(this)}>
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
        <Calculate warn={this.state.showCalc} />
        <Control control={this.state.showControl} />
        <Teach teach={this.state.showTeach} />
        <About about={this.state.showAbout} />
      </div>
      </div>
    );
  }
};
