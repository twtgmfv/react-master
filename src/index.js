import React,{Component} from 'react';
import ReactDOM from 'react-dom';
// import Index from './views/Index';

class App extends Component{
    render() {
        return (
            <div>
                <h1>hah99944078787</h1>
            </div>
        )
    }
}

if (module.hot) {
    module.hot.accept(() => {
        ReactDOM.render(
            <App/>,
            document.getElementById('app')
        )
    })
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
