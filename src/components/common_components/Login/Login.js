import React from 'react'
import Shade from '../Shade/Shade'
import './Login.scss'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      display: 'block',
      shadeDisplay: true,
      prompty: '',
      url: ''
    }
  }
  render () {
    const { display, shadeDisplay, prompty, url } = this.state
    return (
      <div id="login" style={{display}}>
        <Shade display={shadeDisplay}></Shade>
        <div className="login-container">
          <div className="login-close">
            <i className="iconfont icon-close" onClick={this.closeLogin}></i>
          </div>
          <div className="login-prompty">{prompty}</div>
          <form className="login-form">
            <div className="login-input-container">
              <i className="iconfont icon-username"></i>
              <input className="login-username" type="text" placeholder="用户名"/>
            </div>
            <div className="login-input-container">
              <i className="iconfont icon-password"></i>
              <input className="login-password" type="password" placeholder="密码"/>
            </div>
            <input className="login-submit" type="button" value="登录"/>
          </form>
          <div className="third-party-logins">
            <a href={`https://github.com/login/oauth/authorize?client_id=a9a11fbab7c3d5fe46e9&state=${url}`}>
              <i className="iconfont icon-githublogin" title="github快捷登录"></i>
            </a>
          </div>
        </div>
      </div>
    )  
  }

  componentWillMount () {
    this.setState({
      url: window.location.href
    })
  }

  closeLogin = () => {
    this.setState({ display: 'none' })
  }
}

export default Login