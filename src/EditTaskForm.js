import React, { Component } from 'react';
import EditTaskTable from './EditTaskTable';

export default class EditTaskForm extends Component {
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
    return <EditTaskTable />
  }
  render() {
    let areaNodes;
    if(this.state.showArea) {
      areaNodes = this._getChild();
    }
    return (
      <div id="edit-task-formed">
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
