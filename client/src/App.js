import React, { Component, NavLink } from 'react';
import './App.css';
import {
        Menu,
      
       } from 'semantic-ui-react'
   




export default class MenuExampleHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
//Make sign in conditional on existing sessions
    return (
            
      <Menu inverted massive>
        <Menu.Item  header as='h3' >Edify Bridge</Menu.Item>
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

           as={NavLink} to='Signin'
          name='Sign in'
          active={activeItem === 'Sign in'}
          onClick={this.handleItemClick}
        />
      </Menu>
      
     
             
                
    )
  }
 }


