import React from 'react'
import PopUp from '../../common_components/PopUp/PopUp'
import {startClick} from '../../../common/js/myClick.js'
import './ServiceWords.scss'

class ServiceWords extends React.Component {
  #nodeState = {
    ulHeightNode: null,
    iSpreadNode: null
  }
  constructor () {
    super()
    this.state = {
      articles: [],
      popupDisplay: 'none',
      popupData: null
    }
  }
  render () {
    let propsObj = {
      popupDisplay: this.state.popupDisplay,
      popupDelete: this.popupDelete,
      popupClose: this.popupClose,
      popupData: this.state.popupData
    }
    return (
      <div id="service-words-container">
        <PopUp {...propsObj}></PopUp>
        <header className="words-header">
          <span className="min">id</span>
          <span className="title">标题</span>
          <span className="times">发布时间</span>
          <span className="times">更新时间</span>
          <span className="min">浏览</span>
          <span className="min">回复</span>
          <span className="min">展开</span>
        </header>
        <ul>
          {
            this.state.articles.map((article, index) => {
              return (
                <li key={index}>
                  <span className="min">{article.id}</span>
                  <span className="title" title={article.title}>{article.title}</span>
                  <span className="times">{article.time}</span>
                  <span className="times">{article.update}</span>
                  <span className="min">{article.browse}</span>
                  <span className="min">{article.reply}</span>
                  <span className="min spread">
                    <i className="iconfont icon-zhankai"></i>
                  </span>
                  <ul className="words-list">
                    {
                      article.replyList.map((reply, index) => {
                        return (
                          <li key={index}>
                            <span className="reply-user">{reply.user}</span>
                            <span className="reply-time">{reply.time}</span>
                            <span className="reply-content" title={reply.words}>{reply.words}</span>
                            <span className="reply-delete">删除</span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  componentDidMount () {
    this.setState({
      articles: [
        {
          id: 1,
          title: '这是第一篇文章',
          time: '2018-10-23 16:16',
          update: '2018-10-23 16:17',
          browse: 324,
          reply: 23,
          replyList: [
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            }
          ]
        },
        {
          id: 2,
          title: '这是第一篇文章都快疯了独守空房范德萨发生大了',
          time: '2018-10-23 16:16',
          update: '2018-10-23 16:17',
          browse: 324,
          reply: 23,
          replyList: [
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            },
            {
              user: '小明',
              time: '2018-10-27 13:36',
              words: '京东方可拉萨市交付的李开复家里的事'
            }
          ]
        },
        {
          id: 3,
          title: '这是第一篇文章',
          time: '2018-10-23 16:16',
          update: '2018-10-23 16:17',
          browse: 324,
          reply: 23,
          replyList: []
        },
        {
          id: 4,
          title: '这是第一篇文章',
          time: '2018-10-23 16:16',
          update: '2018-10-23 16:17',
          browse: 324,
          reply: 23,
          replyList: []
        },
        {
          id: 5,
          title: '这是第一篇文章',
          time: '2018-10-23 16:16',
          update: '2018-10-23 16:17',
          browse: 324,
          reply: 23,
          replyList: []
        }
      ]
    })
  }
  spreadWords = (e) => {
    let iNode = e.target.children[0] || e.target
    let ulNode = iNode.parentNode.parentNode.children[7]
    if (iNode.style.transform === 'none' || !iNode.style.transform) {
      if (this.#nodeState.iSpreadNode) {
        this.#nodeState.iSpreadNode.style.transform = 'none'
        this.#nodeState.ulHeightNode.style.height = 0
      }
      iNode.style.transform = 'rotate(90deg)'
      ulNode.style.height = ulNode.children.length * 3 + 'rem'
      this.#nodeState.iSpreadNode = iNode
      this.#nodeState.ulHeightNode = ulNode
    } else {
      iNode.style.transform = 'none'
      ulNode.style.height = 0
    }
  }
  handleDelete = (e) => {
    this.setState({
      popupDisplay: 'block',
      popupData: e.target
    })
  }
  popupDelete = (data) => {
    this.popupClose()
  }
  popupClose = () => {
    this.setState({popupDisplay: 'none'})
  }
  componentDidUpdate () {
    Array.from(document.querySelectorAll('.spread')).forEach((spreadNode) => {
      spreadNode.addEventListener(startClick, this.spreadWords)
    })
    Array.from(document.querySelectorAll('.reply-delete')).forEach((deleteNode) => {
      deleteNode.addEventListener(startClick, this.handleDelete)
    })
  }
  componentWillUnmount () {
    Array.from(document.querySelectorAll('.spread')).forEach((spreadNode) => {
      spreadNode.removeEventListener(startClick, this.spreadWords)
    })
    Array.from(document.querySelectorAll('.reply-delete')).forEach((deleteNode) => {
      deleteNode.removeEventListener(startClick, this.handleDelete)
    })
  }
}

export default ServiceWords