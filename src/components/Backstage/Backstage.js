import React from 'react'
import {NavLink, Route, Switch, Redirect} from 'react-router-dom'

import ServiceArticle from './ServiceArticle/ServiceArticle'
import PubArticle from './PubArticle/PubArticle'
import ServiceWords from './ServiceWords/ServiceWords'
import UnseenWords from './UnseenWords/UnseenWords'
import User from './User/User'
import Log from './Log/Log'
import RbArticle from './RecycleBin/RbArticle'
import RbBbs from './RecycleBin/RbBbs'
import RbUser from './RecycleBin/RbUser'
import RbLog from './RecycleBin/RbLog'
import Shade from '../common_components/Shade/Shade'

import {startClick} from '../../common/js/myClick.js'
import './Backstage.scss'

class Backstage extends React.Component {
  constructor () {
    super()
    this.state = {
      shadeDisplay: false
    }
  }
  render () {
    return (
      <div id="backstage-container">
        <Shade display={this.state.shadeDisplay} control={this.menuHidden}></Shade>
        <aside className="subnav-container">
          <i ref="showMenu" className="show-menu"></i>
          <nav ref="subnav">
            <div className="subnav">
              <NavLink className="subnav-show" to={'/backstage/article'}>文章</NavLink>
              <NavLink className="threenav" to={'/backstage/article/service'} onTouchEnd={this.menuHidden}>管理文章</NavLink>
              <NavLink className="threenav" to={'/backstage/article/publish'} onTouchEnd={this.menuHidden}>发表文章</NavLink>
            </div>
            <div className="subnav">
              <NavLink className="subnav-show" to={'/backstage/bbs'}>留言</NavLink>
              <NavLink className="threenav" to={'/backstage/bbs/service'} onTouchEnd={this.menuHidden}>管理留言</NavLink>
              <NavLink className="threenav" to={'/backstage/bbs/unseen'} onTouchEnd={this.menuHidden}>未看留言</NavLink>
            </div>
            <NavLink className="subnav" to={'/backstage/user'} onTouchEnd={this.menuHidden}>用户</NavLink>
            <NavLink className="subnav" to={'/backstage/log'} onTouchEnd={this.menuHidden}>日志</NavLink>
            <div className="subnav">
              <NavLink className="subnav-show" to={'/backstage/rb'}>回收站</NavLink>
              <NavLink className="threenav" to={'/backstage/rb/article'} onTouchEnd={this.menuHidden}>文章</NavLink>
              <NavLink className="threenav" to={'/backstage/rb/bbs'} onTouchEnd={this.menuHidden}>留言</NavLink>
              <NavLink className="threenav" to={'/backstage/rb/user'} onTouchEnd={this.menuHidden}>用户</NavLink>
              <NavLink className="threenav" to={'/backstage/rb/log'} onTouchEnd={this.menuHidden}>日志</NavLink>
            </div>
          </nav>
        </aside>
        <div className="backstage-content">
          <Switch>
            <Route path="/backstage/article/service" component={ServiceArticle}></Route>
            <Route path="/backstage/article/publish" component={PubArticle}></Route>
            <Route exact path="/backstage/bbs" component={ServiceWords}></Route>
            <Route path="/backstage/bbs/service" component={ServiceWords}></Route>
            <Route path="/backstage/bbs/unseen" component={UnseenWords}></Route>
            <Route path="/backstage/user" component={User}></Route>
            <Route path="/backstage/log" component={Log}></Route>
            <Route exact path="/backstage/rb" component={RbArticle}></Route>
            <Route path="/backstage/rb/article" component={RbArticle}></Route>
            <Route path="/backstage/rb/bbs" component={RbBbs}></Route>
            <Route path="/backstage/rb/user" component={RbUser}></Route>
            <Route path="/backstage/rb/log" component={RbLog}></Route>
            <Redirect to="/backstage/article/service"></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
  componentDidMount () {
    this.refs.subnav.style.height = document.documentElement.clientHeight + 'px'
    this.refs.showMenu.addEventListener(startClick, this.menuToggle)
    Array.from(document.querySelectorAll('.subnav-show')).forEach((item) => {
      item.addEventListener(startClick, this.menuShow)
    })
    document.querySelector('.subnav').style.height = 'auto'
  }
  componentWillUnmount () {
    this.refs.showMenu.removeEventListener(startClick, this.menuToggle)
    Array.from(document.querySelectorAll('.subnav-show')).forEach((item) => {
      item.removeEventListener(startClick, this.menuShow)
    })
  }
  menuToggle = (e) => {
    e.preventDefault()
    this.refs.subnav.style.transform = 'translateX(0)'
    this.setState({shadeDisplay: true})
  }
  menuHidden = (e) => {
    this.refs.subnav.style.transform = 'translateX(-100%)'
    this.setState({shadeDisplay: false})
  }
  menuShow (e) {
    e.preventDefault()
    Array.from(document.querySelectorAll('.subnav-show')).forEach((item) => {
      item.parentNode.style.height = 3 + 'rem'
    })
    e.target.parentNode.style.height = 'auto'
  }
}

export default Backstage