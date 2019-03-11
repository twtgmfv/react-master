import React, {Component} from 'react'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dtList:['twt','abc22','asdfs']
        }
        this.handlerAdd = this.handlerAdd.bind(this)
    }

    handlerList(){
        return this.state.dtList.map((item,key) => <li key={key}>{item}</li>)
    }

    handlerAdd(){
        this.setState({
            dtList:[...this.state.dtList,'OK']
        })
    }
    render() {

        return (
            <div>
                <h2 className='red'>this is Index!12166 </h2>
                <button onClick={this.handlerAdd}>添加</button>
                <ul>
                    {
                        // this.state.dtList.map((item,key) => <li key={key}>{item}</li>)
                        this.handlerList()
                    }
                </ul>
            </div>
        )
    }
}

export default Index
