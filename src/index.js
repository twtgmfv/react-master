import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
// import Index from './views/Index';
// import Index from './pages/Index'
// 异步按需加载component

import common from './pages/common.scss'
function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}
function load(component) {
    return import(/*webpackChunkName:"app/Index"*/`./pages/Index.js`)
    // return import(`./pages/${component}/`)
}
const Index = asyncComponent(() => import(/*webpackChunkName:"app/Index"*/`./pages/Index.js`));

class App extends Component{
    render() {
        return (
            <div>
                <h1>RouterTest</h1>

                <Router>
                        <div>
                            <Link to="/">返回</Link>
                            <Link to="/index">首页</Link>
                            <Route path="/index" component={
                                Index
                                // import( /* webpackChunkName: "app/Index" */ './pages/Index').default
                            }/>
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
