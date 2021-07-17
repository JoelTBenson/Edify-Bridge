import React, { Component } from 'react';
import './App.css';
import {
        Menu,
        Button,
        Form,
        Input
       } from 'semantic-ui-react'



export default class MenuExampleHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
//Make sign in conditional on existing sessions
    return (
            
      <Menu inverted >
        <Menu.Item header as='h3' >Edify Bridge</Menu.Item>
        <Menu.Item
          name='Classes'
          active={activeItem === 'Classes'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Tutors'
          active={activeItem === 'Tutors'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Contact us'
          active={activeItem === 'Contact us'}
          onClick={this.handleItemClick}
        />
        
        <Menu.Item
           
          name='Sign in'
          active={activeItem === 'Sign in'}
          onClick={this.handleItemClick}
        />
      </Menu>
      
     
             
                
    )
  }
 }
 class MyComponent extends React.Component {
  render() {
    return (
      <Form>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <Input name="name" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="email">Email</label>
          <Input name="email" />
        </Form.Field>
        <Button primary>Submit</Button>
      </Form>
    );
  }
}



