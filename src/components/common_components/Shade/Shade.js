import React from 'react'
import {startClick} from '../../../common/js/myClick.js'

class Shade extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      control: false,
      display: false
    }
  }
  render () {
    const { display } = this.state
    return (
      <div
        className="global-shade"
        ref="globalShade"
        style={{
          display: display ? 'block' : 'none',
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          opacity: 0.4,
          background: "#000",
          transition: "background 0.3s",
          zIndex: 10
        }}
      ></div>
    )
  }
  static getDerivedStateFromProps (props, state) {
    const { display } = props
    if (display !== state.display) {
      return {
        display
      }
    }
    return null
  }
  componentDidMount () {
    if (this.props.control !== undefined) {
      this.setState({control: true}, () => {
        this.closeShade()
      })
    }
  }
  componentDidUpdate () {
    this.closeShade()
  }
  closeShade = () => {
    const globalShade = this.refs.globalShade
    if (this.props.display) {
      globalShade.addEventListener(startClick, this.controlSelf)
    } else {
      globalShade.removeEventListener(startClick, this.controlSelf)
    }
  }
  controlSelf = (e) => {
    e.preventDefault()
    if (this.state.control) {
      this.props.control()
    }
  }
}

export default Shade