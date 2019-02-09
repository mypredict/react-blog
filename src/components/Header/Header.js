import React from 'react'
import {NavLink} from 'react-router-dom'
import Shade from '../common_components/Shade/Shade'

import './Header.scss'

class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      shadeDisplay: false
    }
  }
  render () {
    return (
      <header id="header-container">
        <Shade display={this.state.shadeDisplay} control={this.menuHidden}></Shade>
        <div className="logo">
          <NavLink to='/home' onTouchEnd={this.menuHidden}>郭良杰的博客</NavLink>
        </div>
        <div className="nav-container">
          <nav className="header-nav">
            <NavLink to='/home' onTouchEnd={this.menuHidden}>文章</NavLink>
            <NavLink to='/bbs' onTouchEnd={this.menuHidden}>留言</NavLink>
            <NavLink to='/blogger' onTouchEnd={this.menuHidden}>博主</NavLink>
          </nav>
          <i className="iconfont icon-menu" onTouchStart={this.menuToggle}></i>
        </div>
      </header>
    )
  }
  menuToggle = () => {
    let headerNav = document.querySelector('.header-nav')
    if (headerNav.offsetHeight === 0) {
      headerNav.style.height = 12 + 'rem'
      this.setState({shadeDisplay: true})
    } else {
      this.menuHidden()
    }
  }
  menuHidden = () => {
    let headerNav = document.querySelector('.header-nav')
    headerNav.style.height = 0
    this.setState({shadeDisplay: false})
  }
}

export default Header