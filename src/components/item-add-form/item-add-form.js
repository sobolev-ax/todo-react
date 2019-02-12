import React, { Component } from 'react';

import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
        console.log(`onLabelChange: ${e.target.value}`);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState(({ label }) => {
            if (!label.length) return false;
            this.props.onItemAdded(label);

            return {
                label: ''
            };
        });
        console.log(`onSubmit`);
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                  onSubmit={ this.onSubmit }>
                <input type="text"
                       className="form-control search-input"
                       placeholder="What needs to be done"
                       onChange={ this.onLabelChange }
                       value={ this.state.label }/>
                <button className="btn btn-outline-secondary">Add item</button>
            </form>
        );
    };
};
