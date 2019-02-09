import React from 'react'
import './BbsFrame.scss'

class BbsFrame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render () {
    return (
      <div id="bbs-frame">
        <textarea className="textareaContent" onChange={this.showCount} id="textarea" maxLength="200" placeholder="给博主留言:"></textarea>
        <div className="count-submit">
          <span className="count">最多200字符: {this.state.count}</span>
          <button className="submit" onClick={this.clickSubmit}>提交</button>
        </div>
      </div>
    )
  }
  showCount = (e) => {
    this.setState({ count: document.querySelector('.textareaContent').value.length })
    e.target.style.height = 4 + 'rem'
    e.target.style.height = e.target.scrollHeight + 'px'
  }
  clickSubmit = () => {
    let values = document.querySelector('.textareaContent').value
    if (values.length >= 1) {
      this.props.submitWords(values)
    } else {
      alert('请输入内容')
    }
  }
}

export default BbsFrame