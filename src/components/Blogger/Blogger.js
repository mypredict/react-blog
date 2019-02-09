import React from 'react'
import {Link} from 'react-router-dom'
// import cyCutImage from '../../common/js/cy-cut-image.js'
import './Blogger.scss'

class Blogger extends React.Component {
  render () {
    return (
      <article id="blogger-container">
        <header className="head">
          <figure>
            <img src="https://gljblog.com/image/head.jpg" alt="头像"/>
            <div>给他换头像</div>
          </figure>
          <figcaption>
            <Link to={'/backstage'}>后台</Link>
          </figcaption>
        </header>
        <div className="contact-way">
          <figure>
            <a target="_blank" rel="noopener noreferrer" href="http://wpa.qq.com/msgrd?v=3&uin=1367950207&site=qq&menu=yes">
              <img src="https://gljblog.com/image/qqcode2.png" alt="qq"/>
            </a>
            <figcaption>qq</figcaption>
          </figure>
          <figure>
            <img src="https://gljblog.com/image/wechatcode2.png" alt="微信"/>
            <figcaption>微信</figcaption>
          </figure>
          <figure>
            <a target="_blank" rel="noopener noreferrer" href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=Q3JwdXR6dnNxc3QDMjJtICwu">
              <img src="https://gljblog.com/image/emailcode2.png" alt="邮箱"/>
            </a>
            <figcaption>邮箱</figcaption>
          </figure>
        </div>
      </article>
    )
  }
}

export default Blogger