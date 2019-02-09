import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Bbs from './components/Bbs/Bbs'
import Blogger from './components/Blogger/Blogger'
import Article from './components/Article/Article'
import Backstage from './components/Backstage/Backstage'
import Login from './components/common_components/Login/Login'

class App extends React.Component {
  render () {
    return (
      <div id="app">
        <Header />
        <Login />
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/bbs" component={Bbs}></Route>
          <Route path="/blogger" component={Blogger}></Route>
          <Route path="/article/:index" component={Article}></Route>
          <Route path="/backstage" component={Backstage}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App