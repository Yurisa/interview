import React, {Component} from 'react'
import List from './list/index'
import Input from './input';
class Todo extends Component{
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    render(){
        return(
            <div>
                <Input addTitle={this.addTitle.bind(this)}/>
                <List data={this.state.list}></List>
            </div>
        )
    }
    addTitle(title){
        // const currentList = this.state.list
        this.setState({
            list:this.state.list.concat(title)
        })
        // patch(vnode, newvnode)
    }
}

export default Todo