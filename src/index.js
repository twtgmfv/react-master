


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
// let a = new Map();
// let b = Promise.resolve();
import img from '../static/img.png'
Object.assign({},{1:1});
console.log("foobar".includes('foo'));

import style from './style.scss'
class App extends React.Component {
    render() {
        return (
            <div>
                <h1 className={style.green}>Hello React!!!</h1>
                <p>我是tools计算的值：{Math_add(6,2)}</p>
                <p>测试ES6-API:{"foobar".includes('foo')+""}</p>
                {/*<img src="../static/img.png" alt=""/>*/}
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


