import React from 'react'
import {Link} from 'react-router-dom'
import Loading from '../common_components/Loading/Loading'
import Stick from '../common_components/Stick/Stick'
import './Home.scss'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: [],
      loadingType: 'loading'
    }
  }
  render () {
    let { articles } = this.state
    return (
      <div id="home-article">
        <div className="articles-list">
          {
            articles.map((article, index) => {
              return (
                <article className="article-item" key={index}>
                  <header className='article-header'>
                    <Link to={`/article/${article.id}`}>
                      <h2>{article.title}</h2>
                    </Link>
                  </header>
                  <p>
                    <Link to={`/article/${article.id}`}>{article.describe}</Link>
                  </p>
                  <footer className="article-footer">
                    <label className="article-lable">{article.label}</label>
                    <time>{article.time}</time>
                    <span>浏览: {article.browse}</span>
                    <span>回复: {article.reply}</span>
                  </footer>
                </article>
              )
            })
          }
          <div className="loading-container">
            <Loading type={this.state.loadingType}></Loading>
          </div>
        </div>
        <aside>
        </aside>
        <Stick scrollTop='100' callBack={this.gainContent}></Stick>
      </div>
    )
  }
  componentWillMount () {
    fetch(`/getArticle`, {
      method: 'Get'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.setState({
          articles: data
        })
      })
  }
  gainContent () {
    console.log('懒加载内容')
  }
}

export default Home