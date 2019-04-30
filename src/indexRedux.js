import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';



import loadable from 'react-loadable'
const Index = loadable({
    loader: () => import(`./redux/pages/index/`),
    loading: () => <div>loading</div>
});

class App extends Component {
    render() {
        return (
            <div>
                <h1>RouterTest</h1>

                <Router>
                    <div>
                        <Link to="/">返回</Link>
                        <Link to="/index">首页</Link>
                        <Route path="/index" component={Index}/>
                    </div>
                </Router>
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
