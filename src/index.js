import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
/*测试treesharking*/
import {Math_add,Math_sub} from '@jianlc/tools'
let sum =Math_add(3,3);
let sum1 =Math_sub(3,3);
/*i*/
console.log(sum,sum1);
// import Index from './views/Index';
// import Index from './pages/Index'
// 异步按需加载component


import './pages/common.scss'

/*function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = {Component: AsyncComponent.Component};

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component
                    this.setState({Component})
                })
            }
        }

        render() {
            const {Component} = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

function load(component) {
    return import(/!*webpackChunkName:"app/Index"*!/`./pages/Index.js`)
    // return import(`./pages/${component}/`)
}

const Index = asyncComponent(() => import(/!*webpackChunkName:"app/Index"*!/`./pages/Index.js`));
const Counter = asyncComponent(() => import(/!*webpackChunkName:"app/Counter"*!/`./pages/Counter.js`));*/


import loadable from 'react-loadable'
const Index = loadable({
    loader: () => import(/*webpackChunkName:"app/Index"*/`./pages/Index.js`),
    loading: () => <div>loading</div>
});
const Counter = loadable({
    loader: () => import(/*webpackChunkName:"app/Counter"*/`./pages/Counter.js`),
    loading: () => <div>loading</div>
});
const Login = loadable({
    loader: () => import(/*webpackChunkName:"app/Login"*/`./pages/Login/Login.js`),
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
                        <Link to="/counter">计算器</Link>
                        <Link to="/login">登录</Link>
                        <Route path="/index" component={Index}/>
                        <Route path="/counter" component={Counter}/>
                        <Route path="/login" component={Login}/>
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
