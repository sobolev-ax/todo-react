import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

  state = {
    done: false,
    important: this.props.important
  };

  onLabelClick = () => {
    this.setState(({done}) => {
      return {
        done: !done
      };
    });
    console.log(`onLabelClick: ${this.props.label}`);
  };

  onMarkImportant = () => {
    this.setState(({ important }) => {
      return {
        important: !important
      };
    });
    console.log(`onMarkImportant: ${this.props.label}`);
  }

  render() {
    const { label, onDeleted } = this.props;

    let classNames = 'todo-list-item';
    if (this.state.done) {
      classNames += ' done';
    }
    if (this.state.important) {
      classNames += ' important';
    }
  
    return (
      <span className={ classNames }>
        <span
          className="todo-list-item-label"
          onClick={ this.onLabelClick }>
          { label }
        </span>
  
        <button type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={ this.onMarkImportant }>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={ onDeleted }>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
};
