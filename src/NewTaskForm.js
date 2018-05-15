import React, { Component } from 'react';
import NewTaskTable from './NewTaskTable';

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      showArea: false
    }
  }
  _showChild(e) {
    this.setState({
      showArea: !this.state.showArea
    })
    e.preventDefault();
  }
  _getChild() {
    return <NewTaskTable />
  }
  render() {
    let areaNodes;
    if(this.state.showArea) {
      areaNodes = this._getChild();
    }
    return (
      <div
        id="new-task-form"
         className="hidden"
        >
          <form>
            Количество ресурсов: <input
                                    type="text"
                                    id="resources"
                                    defaultValue="60"
                                    autoFocus
                                    required
                                  /> единиц <br />
            Количество предприятий: <input
                                    type="text"
                                    id="columns"
                                    defaultValue="5"
                                    required
                                  /><br />
            Количество строк в таблице: <input
                                          type="text"
                                          id="rows"
                                          defaultValue="6"
                                          required
                                        /><br />
            <input
            type="submit"
            id="create"
            onClick={this._showChild.bind(this)}
            value="OK" />
          </form>
          {areaNodes}
      </div>
    );
  }
};
