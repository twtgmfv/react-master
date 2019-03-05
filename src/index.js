// let test ='ISES6'
// // Object.assign({},{name:'twt'})
// window.test =test;
// console.log(test);


import React from 'react';
import ReactDom from 'react-dom';


//测试treeShaking

import {Math_add} from '@jianlc/tools'

console.log(Math_add(3, 5));

// import {square, cube} from './lib/math'
//
// let temSquare = square(2);
// let temCube = cube(2);
// console.log(temSquare + 1);
// console.log(temCube + 2);

// let render = ReactDom.render(
//     <div>Hello world  55566</div>,
//     document.getElementById("app")
// );

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React 6562</h1>
            </div>
        )
    }
}

if (module.hot) {
    module.hot.accept(() => {
        ReactDom.render(
            <App/>,
            document.getElementById('app')
        )
    })
}

ReactDom.render(
    <App/>,
    document.getElementById('app')
)