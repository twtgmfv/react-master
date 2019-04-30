import React, {Component} from 'react'
import {Login} from '../../Modules/Login/Login'
// import Style from './style.scss'
import Style from './proA.scss'

/**
 * 继承注册模块
 * 可根据项目特点进行重写和扩展
 * */
class LoginSNB extends Login {
    constructor() {
        super()
    }

    handleLoginSNB() {
        //do....
        if (!this.handleLogin()) {
            console.log('手机号错误');
            return false
        }
        return this.handleLogin()
    }
}


const SNB = new LoginSNB();
const SNB2 = new LoginSNB();


class Mycom extends React.Component{
    render() {
        return (
            <h2>你好:{this.props.userName}</h2>
        )
    }
}

export default class Loginer extends React.Component {
    constructor() {
        super();
        this.state = Object.assign({}, {type: false, message: ''}, SNB.data);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * 登录
     * @params {}
     * @return void
     * */
    async handleLogin() {
        let checkResult = SNB.handleLogin()
        let checkResult2 = SNB2.handleLogin()
        await this.setState({
            type: checkResult.type,
            message: checkResult.message
        })
        console.log(checkResult);
        console.log(checkResult2);
    }

    /**
     * up state
     * @params {Object} event
     * @return void
     * */
    async handleChange(event) {
        await this.setState({phoneNumber: event.target.value});
        SNB.data = this.state;
    }

    render() {
        return (
            <div className={Style.login}>
                <h1>Loginner Demo</h1>
                <Mycom userName="张三"/>
                <span>手机号：</span>
                <input type="tel" maxLength={11} onChange={this.handleChange} value={this.state.phoneNumber}/> <br/>

                <div>{this.state.phoneNumber}</div>

                {!!this.state.phoneNumber.length ? <button onClick={this.handleLogin}>登录</button> : null}

                <div className={this.state.type ? Style.success : Style.warning}>
                    {this.state.message}
                </div>
            </div>
        )
    }
}

