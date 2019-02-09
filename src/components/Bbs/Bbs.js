import React from 'react'
import BbsFrame from '../common_components/BbsFrame/BbsFrame'
import './Bbs.scss'

class Bbs extends React.Component {
  constructor () {
    super()
    this.state = {
      words: []
    }
  }
  render () {
    return (
      <div id="bbs-container">
        <BbsFrame submitWords={this.submitWords}></BbsFrame>
        <div className="cut-header">
          <h3>留言内容...</h3>
        </div>
        <div className="words-container">
          {
            this.state.words.map((word, index) => {
              return (
                <article key={index} className="word-article">
                  <header>
                    <span>{word.name}:</span>
                    <span>#{index + 1}</span>
                  </header>
                  <p>{word.replyContent}</p>
                  <footer>
                    <time>{word.time}</time>
                  </footer>
                </article>
              )
            })
          }
        </div>
      </div>
    )
  }
  componentWillMount () {
    const index = this.props.index || -1
    fetch(`/reply?index=${index}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          words: data.content || []
        })
      })
  }
  initTime = (date) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      week: `星期${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}`
    }
  }
  submitWords = (value) => {
    const index = this.props.index || -1
    const created = this.initTime(new Date())
    const time = `${created.year}-${created.month}-${created.day} ${created.hours}:${created.minutes}:${created.seconds}`
    const id = document.cookie.split('=')[1]
    const postData = {
      time,
      id,
      replyContent: value
    }
    fetch(`/updateReply?index=${index}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.text())
      .then(data => {
        if (data === 'replySuccess') {
          window.location.reload()
        } else {
          alert('回复失败')
        }
      })
  }
}

export default Bbs