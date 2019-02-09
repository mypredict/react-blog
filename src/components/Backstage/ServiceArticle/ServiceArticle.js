import React from 'react'
import {Link} from 'react-router-dom'
import PopUp from '../../common_components/PopUp/PopUp'
import './ServiceArticle.scss'

class ServiceArticle extends React.Component {
  constructor () {
    super()
    this.deleteArticle = ''
    this.state = {
      articles: [],
      popupDisplay: 'none'
    }
  }
  render () {
    let propsObj = {
      popupDisplay: this.state.popupDisplay,
      popupDelete: this.popupDelete,
      popupClose: this.popupClose
    }
    return (
      <div id="service-article-container">
        <PopUp {...propsObj}></PopUp>
        <header className="article-header">
          <span className="min">id</span>
          <span className="title">标题</span>
          <span className="times">发布时间</span>
          <span className="times">更新时间</span>
          <span className="min">浏览</span>
          <span className="min">回复</span>
          <span className="min">更新</span>
          <span className="min delete1">删除</span>
        </header>
        <ul>
          {
            this.state.articles.map((article, index) => {
              const created = this.initTime(new Date(article.created))
              const updated = this.initTime(new Date(article.updated))
              return (
                <li key={index}>
                  <span className="min">{index + 1}</span>
                  <Link
                    to={{pathname: `/article/${article.index}`, state: article}}
                    style={{flex: 3, borderRight: '1px solid #ccc', textAlign: 'center'}}>
                    <span className="title" title={article.title} style={{borderRight: 'none'}}>
                      {article.title}
                    </span>
                  </Link>
                  <span className="times">
                    {`
                      ${created.year}-${created.month}-${created.day}
                      ${created.hours}:${created.minutes}:${created.seconds}
                    `}
                  </span>
                  <span className="times">
                  {`
                    ${updated.year}-${updated.month}-${updated.day}
                    ${updated.hours}:${updated.minutes}:${updated.seconds}
                  `}
                  </span>
                  <span className="min">{article.browse}</span>
                  <span className="min">{article.words}</span>
                  <Link
                    to={{pathname: '/backstage/article/publish', state: article}}
                    style={{flex: 1, borderRight: '1px solid #ccc', textAlign: 'center'}}>
                    <span className="min update" style={{borderRight: 'none'}}>更新</span>
                  </Link>
                  <span className="min delete1 delete" onClick={() => this.handleDelete(index)}>删除</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
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
  handleDelete = (index) => {
    this.setState({
      popupDisplay: 'block'
    })
    this.deleteArticle = this.state.articles[index]._id
  }
  popupDelete = (_id) => {
    this.popupClose()
    fetch(`/deleteRestoreArticle?_id=${this.deleteArticle}`, {
      method: 'Get'
    })
      .then(response => response.text())
      .then((data) => {
        if (data === 'deleteRestoreSuccess') {
          window.location.reload()
        } else {
          alert('删除失败')
        }
      })
  }
  popupClose = () => {
    this.setState({popupDisplay: 'none'})
  }
  componentWillMount () {
    fetch('/getArticle', {
      method: 'Get'
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          articles: data
        })
      })
  }
}

export default ServiceArticle