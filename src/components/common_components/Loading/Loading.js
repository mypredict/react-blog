import React from 'react'
import './Loading.scss'

class Loading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      types: 'more',
      loadingContainer: null,
      loadingMore: null,
      loadingAnimation: null,
      loadingComplete: null
    }
  }
  render () {
    return (
      <div className="loadingContainer" id="loading">
        <span className="loadingMore">加载更多...</span>
        <ul className="loadingAnimation">
          <li className="li1"></li>
          <li className="li2"></li>
          <li className="li3"></li>
          <li className="li4"></li>
          <li className="li5"></li>
        </ul>
        <span className="loadingComplete">没有更多了...</span>
      </div>
    )
  }
  componentDidMount () {
    this.setState({
      loadingContainer: document.querySelector('.loadingContainer'),
      loadingMore: document.querySelector('.loadingMore'),
      loadingAnimation: document.querySelector('.loadingAnimation'),
      loadingComplete: document.querySelector('.loadingComplete')
    })
    if (this.props.type) {
      this.setState({types: this.props.type}, () => {
        this.showType()
      })
    } else {
      this.showType()
    }
  }
  componentDidUpdate () {
    this.showType()
  }
  showType = () => {
    let { types, loadingContainer, loadingMore, loadingAnimation, loadingComplete } = this.state
    if (types === 'more') {
      loadingMore.style.display = 'flex'
      loadingAnimation.style.display = 'none'
      loadingComplete.style.display = 'none'
    } else if (types === 'loading') {
      loadingMore.style.display = 'none'
      loadingAnimation.style.display = 'flex'
      loadingComplete.style.display = 'none'
    } else if (types === 'complete') {
      loadingMore.style.display = 'none'
      loadingAnimation.style.display = 'none'
      loadingComplete.style.display = 'flex'
    } else {
      loadingContainer.style.display = 'none'
    }
  }
}

export default Loading