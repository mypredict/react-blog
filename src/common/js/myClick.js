let startClick = 'mousedown'
let moveClick = 'mousemove'
let endClick = 'mouseup'
if ('ontouchstart' in window) {
  startClick = 'touchstart'
  moveClick = 'touchmove'
  endClick = 'touchend'
}
export {startClick, moveClick, endClick}