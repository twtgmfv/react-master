// let test ='ISES6'
// // Object.assign({},{name:'twt'})
// window.test =test;
// console.log(test);


import React from 'react';
import ReactDom from 'react-dom';

// let render = ReactDom.render(
//     <div>Hello world  55566</div>,
//     document.getElementById("app")
// );

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello React 666</h1>
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