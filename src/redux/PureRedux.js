import {createStore,combineReducers, bindActionCreators} from "redux";

export default function () {
    const initialState = {count: 0};

    /*reducer*/
    const reducerCounter = (state = initialState, action) => {
        switch (action.type) {
            case 'PLUS_ONE':
                return {
                    count: state.count + 1
                };
            case 'MINUS_ONE':
                return {
                    count: state.count - 1
                };
            default:
                break;
        }
        return state;
    };
    //reducer
    const reducerTodos = (state={name:'ok'},action) => state;

    //store
    //合并多个reducer 使用combineReducers工具函数
    const store = createStore(combineReducers({
        reducerCounter,
        reducerTodos
    }));

    //Action-creator
    function plusOne() {
        //action
        return {type: 'PLUS_ONE'}
    }

    function minusOne() {
        return {type: 'MINUS_ONE'}
    }

    //包装一层，实现简单调用
    let plusOneDispatch = bindActionCreators(plusOne, store.dispatch);

    store.subscribe(() => console.log(store.getState()));
    plusOneDispatch();
    plusOneDispatch();
    plusOneDispatch();
    // store.dispatch(plusOne());
    // store.dispatch(plusOne());

}