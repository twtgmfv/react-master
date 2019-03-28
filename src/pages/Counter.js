import React, {Component} from 'react';
import {createStore, bindActionCreators, combineReducers} from "redux";
import {Provider, connect} from "react-redux";


let initailState = {
    count: 1
};
let person = {
    name: 'twt'
}
//reducer
const reducerCounter = (state = initailState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
            break;
        case 'DECREMENT':
            return {
                count: state.count - 1
            }
            break;
        default:
            return state;
            break;
    }
};
const reducerPerson = (state = person, action) => state;


let store = createStore(reducerCounter);
// let store = createStore(combineReducers({reducerCounter, reducerPerson}));

let inc = function () {
    return {
        type: 'INCREMENT'
    }
}
// inc = bindActionCreators(inc, store.dispatch)
let dec = function () {
    return {
        type: 'DECREMENT'
    }
}
// dec = bindActionCreators(dec, store.dispatch)
store.subscribe(() => {
    console.log('state', store.getState());
})
// store.dispatch(inc())
// inc();
// store.dispatch(dec())
// dec();

import Style from './Counter.scss'

export class Counter extends React.Component {
    render() {
        const {count, inc, dec} = this.props;
        console.log(this.props);
        return (
            <div>
                <h1>Counter Demo</h1>
                数量 ：{count}
                <button onClick={inc}>+</button>
                <button onClick={dec}>-</button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        count: state.count
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({inc,dec},dispatch)
}

const ConnectedCounter = connect(mapStateToProps,mapDispatchToProps)(Counter);

export default class CounterSample extends React.Component{
    render() {
        return (
            <Provider store={store}>
                <ConnectedCounter/>
            </Provider>
        )
    }

}
