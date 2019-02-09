import React from 'react'
import ReactMarkdown from 'react-markdown'

import './PubArticle.scss'

class PubArticle extends React.Component {
  constructor (props) {
    super(props)
    this.pubWrite = null
    this.pubWriteWidth = 0
    this.dragLine = null
    this.isDrag = false
    this.mouseX = 0
    this.state = {
      _id: '',
      title: '',
      label: '',
      describe: '',
      content: ''
    }
  }
  render () {
    const { title, label, describe, content } = this.state
    return (
      <div id="pub-article-container">
        <article className="pub-write">
          <header className="pub-write-header">
            <input placeholder="请输入标题..." onChange={this.handleTitle} value={title} />
            <input className="pub-write-label" placeholder="请输入标签..." value={label} onChange={this.handleLabel} />
            <textarea maxLength="150" placeholder="描述字段(150)..." value={describe} onChange={this.handleDescribe}></textarea>
            <textarea className="pub-write-content" placeholder="正文..." value={content} onChange={this.handleContent}></textarea>
          </header>
          <footer className="pub-write-footer">
            <button className="pub-submit" onClick={this.handleSubmit}>提交</button>
          </footer>
        </article>
        <div className="drag-line"></div>
        <article className="pub-preview">
          <h2>{title || '预览区'}</h2>
          <div className="preview-content">
            <ReactMarkdown source={content}></ReactMarkdown>
          </div>
        </article>
      </div>
    )
  }
  componentDidMount () {
    document.documentElement.addEventListener('mousedown', this.handleMousedown);
    document.documentElement.addEventListener('mousemove', this.handleMousemove);
    document.documentElement.addEventListener('mouseup', this.handleMouseup);
    this.pubWrite = document.querySelector('.pub-write')
    this.dragLine = document.querySelector('.drag-line')
    const articleState = this.props.location.state
    if (articleState) {
      fetch(`/getUpdateArticle?_id=${articleState._id}`, {
        method: 'Get'
      })
        .then(response => response.json())
        .then((data) => {
          const {_id, title, label, describe, content} = data
          this.setState({
            _id,
            title,
            label,
            describe,
            content
          })
        })
    }
  }
  componentWillUnmount () {
    document.documentElement.removeEventListener('mousedown', this.handleMousedown);
    document.documentElement.removeEventListener('mousemove', this.handleMousemove);
    document.documentElement.removeEventListener('mouseup', this.handleMouseup);
  }
  handleMousedown = (e) => {
    if (e.target === this.dragLine) {
      this.isDrag = true
      this.mouseX = e.clientX
      this.pubWriteWidth = this.pubWrite.offsetWidth
    }
  }
  handleMousemove = (e) => {
    if (this.isDrag) {
      this.pubWrite.style.width = (this.pubWriteWidth + e.clientX - this.mouseX) + 'px'
      this.handleHeight()
    }
  }
  handleMouseup = () => {
    this.isDrag = false
  }
  handleTitle = (e) => {
    this.setState({ title: e.target.value })
  }
  handleLabel = (e) => {
    this.setState({ label: e.target.value })
  }
  handleDescribe = (e) => {
    this.handleHeight(e)
    this.setState({ describe: e.target.value })
  }
  handleContent = (e) => {
    this.handleHeight(e)
    this.setState({ content: e.target.value })
  }
  handleHeight (e) {
    let theTarget = document.querySelector('.pub-write-content')
    if (e) {
      theTarget = e.target
    }
    theTarget.style.height = 4 + 'rem'
    theTarget.style.height = theTarget.scrollHeight + 'px'
  }
  handleSubmit = () => {
    const { _id, title, label, describe, content } = this.state
    if (title && label && describe && content) {
      const postURL = _id ? `/updateArticle?_id=${_id}` : '/pubArticle'
      fetch(postURL, {
        method: 'Post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(this.state)
      }).then((response) => {
        return response.text()
      }).then((data) => {
        alert(data)
      })
    } else {
      alert('请填写完整')
    }
  }
}

export default PubArticle