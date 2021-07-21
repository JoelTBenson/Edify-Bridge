import React, { Component } from 'react';
import {input,list} from semantic-ui-React;

class Student extends Component {
 constructor(props) {
     super(props)
     this.props.findAllItems()

     this.state = {
         text:''
     }
 

 this.handleKeyDown = this.handleKeyDown.bind(this)
 this.listItem = this.listItem.bind(this)

}

    render() {
        return (
    
    <div>
        <input
        fluid
        placeholder='what needs to be done'
        value={this.setState}
        onChange={(e) => this.setState {text: e.target.value})}
        onKeyDown= {this.handleKeyDown} />
        <list


    </div>
        );
 }
}

export default Student;

