import React from 'react'
import Shade from '../Shade/Shade'
import {startClick} from '../../../common/js/myClick.js'
import './PopUp.scss'

class PopUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shadeDisplay: true,
      popupDisplay: 'none'
    }
  }
  render () {
    const { shadeDisplay, popupDisplay } = this.state
    return (
      <div id="popup-container" style={{display: popupDisplay}}>
        <Shade display={shadeDisplay}></Shade>
        <article className="popup-content">
          <header className="popup-header">{this.props.proupWords || 'Are you sure ?'}</header>
          <footer className="popup-footer">
            <button className="close">取消</button>
            <button className="sure">确定</button>
          </footer>
        </article>
      </div>
    )
  }
  componentDidMount () {
    document.querySelector('.close').addEventListener(startClick, this.handleClose)
    document.querySelector('.sure').addEventListener(startClick, this.handleSure)
  }
  componentWillUnmount () {
    document.querySelector('.close').removeEventListener(startClick, this.handleClose)
    document.querySelector('.sure').removeEventListener(startClick, this.handleSure)
  }
  static getDerivedStateFromProps (props, state) {
    if (props.popupDisplay !== state.popupDisplay) {
      return {
        popupDisplay: props.popupDisplay
      }
    } else {
      return null
    }
  }
  handleClose = () => {
    this.props.popupClose()
  }
  handleSure = () => {
    this.props.popupDelete()
  }
}

export default PopUp