import React, {Component} from 'react'
//测试单redux文件，因为它redux可以脱离任何前端框架运行
import s from "../../PureRedux";
s()

class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>这是测试页面</h1>
            </div>
        )
    }
}

export default Index;