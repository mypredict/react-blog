import React from 'react'
import './Stick.scss'

class Stick extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      scrollTop: 500
    }
  }
  render () {
    return (
      <figure id="stick-container">
        <i onClick={this.stick} className="iconfont icon-stick" onTouchStart={this.menuToggle}></i>
      </figure>
    )
  }
  componentDidMount () {
    let {scrollTop, callBack} = this.props
    scrollTop !== undefined && this.setState({scrollTop})
    callBack && window.addEventListener('scroll', this.listeningScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.listeningScroll)
  }
  listeningScroll = () => {
    let {scrollTop} = this.state
    let distanceBottom = parseInt(document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight)
    if (distanceBottom < scrollTop) {
      this.props.callBack()
    }
  }
  stick () {
    document.documentElement.scrollTop = 0
  }
}

export default Stick