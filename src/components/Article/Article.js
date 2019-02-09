import React from 'react'
import Bbs from '../Bbs/Bbs'

import './Article.scss'

class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      praiseNum: 0,
      buttonStyle: {}
    }
  }
  render () {
    const { article, praiseNum, buttonStyle } = this.state
    if (article) {
      const created = this.initTime(new Date(article.created))
      return (
        <div id="article-container">
          <article className="article-show">
            <header>
              <h2>{article.title}</h2>
              <div className="article-lable">
                <i className="iconfont icon-riqi" onTouchStart={this.menuToggle}></i>
                <time>
                  {`
                    ${created.year}-${created.month}-${created.day}
                    ${created.hours}:${created.minutes}:${created.seconds}
                  `}
                </time>
                <i className="iconfont icon-chakan" onTouchStart={this.menuToggle}></i>
                <span> {article.browse}</span>
              </div>
            </header>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            <footer>
              <button title="点个赞" onClick={this.handlePraise} style={buttonStyle}>{praiseNum} 赞</button>
            </footer>
          </article>
          <Bbs index={this.props.match.params.index}></Bbs>
        </div>
      )
    }
    return <div>404</div>
  }

  componentWillMount () {
    const index = this.props.match.params.index
    fetch(`/article/${index}`, {
      method: 'Get'
    })
      .then(response => {
        if (response) {
          return response.json()
        }
      })
      .then(data => {
        this.setState({
          article: data,
          praiseNum: data.praise
        })
      })
    if (this.queryLocalStorage(index)) {
      this.setState({
        buttonStyle: {
          color: 'red',
          border: '1px solid red'
        }
      })
    }
  }

  handlePraise = () => {
    const storage = window.localStorage
    const index = this.props.match.params.index
    if (!this.queryLocalStorage(index)) {
      fetch(`/praise?index=${index}`, {
        method: 'GET'
      })
        .then(resolve => resolve.text())
        .then(data => {
          if (data === 'praiseSuccess') {
            this.setState({
              praiseNum: this.state.praiseNum + 1,
              buttonStyle: {
                color: 'red',
                border: '1px solid red'
              }
            })
            storage.indexMap = JSON.stringify([index, ...JSON.parse(storage.indexMap || '[]')])
          }
        })
    }
  }

  queryLocalStorage = (index) => {
    const storage = window.localStorage
    const indexMap = JSON.parse(storage.indexMap || '[]')
    if (indexMap.length > 0) {
      return indexMap.includes(index)
    }
    return false
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
}

export default Article