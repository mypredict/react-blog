import React from 'react';

class ScrollBar extends React.Component {
  constructor (props) {
    super(props);
    this.containerObserver = null;
    this.contentObserver = null;
    this.mouseY = 0;
    this.propNode = {
      container: null,
      containerHeight: 0,
      containerScrollTop: 0,
      content: null,
      contentHeight: 0
    };
    this.scrollBar = {
      slideWay: null,
      slideWayHeight: 0,
      slideBlock: null,
      slideBlockHeight: 0,
      slideBlockMove: false
    };
    this.state = {
      slideWayOptions: {
        position: 'absolute',
        width: '1rem',
        height: '100%',
        top: 0,
        right: 0,
        background: '#ddd',
        zIndex: 10
      },
      slideBlockOptions: {
        position: 'absolute',
        width: '100%',
        height: 0,
        background: '#ccc',
        cursor: 'pointer'
      }
    };
  }
  render () {
    const { slideWayOptions, slideBlockOptions } = this.state;
    return (
      <div className="slide-way" style={{ ...slideWayOptions }} >
        <div className="slide-block" style={{ ...slideBlockOptions }} ></div>
      </div>
    );
  }
  componentDidMount () {
    document.documentElement.addEventListener('mousedown', this.handleMousedown);
    document.documentElement.addEventListener('mousemove', this.handleMousemove);
    document.documentElement.addEventListener('mouseup', this.handleMouseup);
    this.scrollBar.slideWay = document.querySelector('.slide-way');
    this.scrollBar.slideBlock = document.querySelector('.slide-block');
  }
  componentWillUnmount () {
    document.documentElement.removeEventListener('mousedown', this.handleMousedown);
    document.documentElement.removeEventListener('mousemove', this.handleMousemove);
    document.documentElement.removeEventListener('mouseup', this.handleMouseup);
    this.propNode.container.removeEventListener('scroll', this.handleScroll);
    this.containerObserver.disconnect();
    this.contentObserver.disconnect();
  }
  static getDerivedStateFromProps (props, state) {
    const { styleOptions } = props;
    if (JSON.stringify(styleOptions) !== JSON.stringify(state)) {
      const newOptions = state;
      (function (options) {
        function resetOptions (newOptions, options) {
          for (let item in options) {
            if (newOptions[item] !== undefined) {
              newOptions[item].constructor !== Object ? newOptions[item] = options[item] : resetOptions(newOptions[item], options[item]);
            } else {
              newOptions[item] = options[item];
            }
          }
        }
        resetOptions(newOptions, options);
      })(styleOptions);
      return {
        slideWayOptions: newOptions.slideWayOptions,
        slideBlockOptions: newOptions.slideBlockOptions
      };
    }
    return null;
  }
  componentDidUpdate () {
    const { container, content } = this.props;
    this.propNode.container = container;
    this.propNode.content = content;
    container.style.overflowY = 'auto';
    container.addEventListener('scroll', this.handleScroll);
    this.containerObserver = new MutationObserver(() => {
      this.handleDisplay();
    });
    this.containerObserver.observe(container, {
      attributes: true,
      childList: true
    });
    this.contentObserver = new MutationObserver(() => {
      this.handleDisplay();
    });
    this.contentObserver.observe(content, {
      attributes: true,
      childList: true,
      characterData: true
    });
    this.handleDisplay();
  }
  handleDisplay = () => {
    const { container, content } = this.propNode;
    const { slideWay } = this.scrollBar;
    if (content.offsetHeight > container.offsetHeight) {
      this.handleScroll();
    } else {
      slideWay.style.display = 'none';
    }
  }
  handleScroll = () => {
    const { container, content, contentHeight } = this.propNode;
    const { slideWay, slideWayHeight, slideBlock } = this.scrollBar;
    slideWay.style.display = 'block';
    this.propNode.containerHeight = container.offsetHeight;
    this.propNode.contentHeight = content.offsetHeight;
    this.scrollBar.slideWayHeight = slideWay.offsetHeight;
    this.scrollBar.slideBlockHeight = container.offsetHeight / content.offsetHeight * slideWay.offsetHeight;
    slideBlock.style.height = this.scrollBar.slideBlockHeight + 'px';
    slideBlock.style.top = container.scrollTop / contentHeight * slideWayHeight + 'px';
  }
  handleMousedown = (e) => {
    const { container, contentHeight } = this.propNode;
    const { slideWay, slideWayHeight, slideBlock, slideBlockHeight } = this.scrollBar;
    if (e.target === slideBlock) {
      this.scrollBar.slideBlockMove = true;
      this.mouseY = e.clientY;
      this.propNode.containerScrollTop = container.scrollTop;
    }
    if (e.target === slideWay) {
      container.scrollTop = (e.offsetY - slideBlockHeight / 2) / slideWayHeight * contentHeight;
    }
  }
  handleMousemove = (e) => {
    if (this.scrollBar.slideBlockMove) {
      const { container, containerScrollTop, contentHeight } = this.propNode;
      const { slideWayHeight } = this.scrollBar;
      const moveY = (e.clientY - this.mouseY) * contentHeight / slideWayHeight;
      container.scrollTop = containerScrollTop + moveY;
    }
  }
  handleMouseup = () => {
    this.scrollBar.slideBlockMove = false;
  }
}

export default ScrollBar;