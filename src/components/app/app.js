import React, { Component } from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  nextId = 1;
  filters = {
    all: 'All',
    active: 'Active',
    done: 'Done',
  };

  returnObjTodoItem = (label) => {
    return { label,
             important: false,
             done: false,
             id: this.nextId++ }
  };

  state = {
    todoData: [
      this.returnObjTodoItem('Drink Coffee'),
      this.returnObjTodoItem('Make Awesome App'),
      this.returnObjTodoItem('Have a lunch')
    ],
    term: '',
    currentFilter: this.filters.all,
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((item) => item.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArray
      };
    });
    console.log(`deleted element (id): ${id}`);
  };

  addItem = (label) => {
    this.setState(({ todoData }) => {
      return { todoData: [
        ...todoData,
        this.returnObjTodoItem(label)]
      };
    });
    console.log(`added element (label): ${label}`)
  }

  onToggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const newItem = {...arr[idx],
      [propName]: !oldItem[propName]};

    const newArray = [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ];


    console.log(`onToggleProperty (id, propName): ${id} ${propName}`);
    return newArray
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'important')
      };
    });
    console.log(`onToggleImportant (id): ${id}`);
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'done')
      };
    });
    console.log(`onToggleDone (id): ${id}`);
  };

  onSearchChange = (e) => {
    const term = e.target.value;

    this.setState({ term });

    console.log(`onSearchChange: ${term}`);
  }

  search = (data, term, currentFilter) => {
    console.log(`search: ${term}`);

    return data.filter((item) => {
      if (this.isFiltered(item, currentFilter) &&
         (!term.length || ~item.label.toLowerCase().indexOf(term.toLowerCase()))) return true
      return false;
    });
  } 

  onFilterChanged = ( newFilter ) => {
    this.setState({
      currentFilter: newFilter
    })
    console.log(`onFilterChanged: ${ newFilter }`);
  };

  isFiltered = (item, currentFilter) => {
    console.log(`isFiltered: ${currentFilter}`);

    switch (currentFilter) {
      case this.filters.all:
        return true;
      case this.filters.done:
        return item.done ? true : false;
      case this.filters.active:
        return item.done ? false : true;
      default:
        break;
    };
  }

  render() {
    const { todoData, term, currentFilter } = this.state;

    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount}
                   done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange } term={ term }/>
          <ItemStatusFilter filters={ this.filters }
                            currentFilter={ currentFilter }
                            onFilterChanged={ this.onFilterChanged } />
        </div>
        <TodoList todos={ this.search(todoData, term, currentFilter) }
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone }/>
        <ItemAddForm onItemAdded={ this.addItem } />
      </div>
    );
  }
};
