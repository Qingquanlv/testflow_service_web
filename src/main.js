import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import 'handsontable/dist/handsontable.full.css';



import moment from 'moment'
Vue.prototype.$moment = moment;
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

import CTree from './components/CTree.vue'
Vue.component('c-tree', CTree)

Vue.prototype.$prettyJs = require('js-beautify'); // also available under "js" export
Vue.prototype.$prettyCss = require('js-beautify').css;
Vue.prototype.$prettyHtml = require('js-beautify').html;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// v-dialogDrag: 弹窗拖拽属性
Vue.directive('dialogDrag', {
  bind (el, binding, vnode, oldVnode) {
    if (!binding.value) return
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (document.body.currentStyle) {
        // 在ie下兼容写法
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    if (dialogHeaderEl) {
      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
        // const screenWidth = document.body.clientWidth + 100000 // body当前宽度
        // const screenHeight = document.documentElement.clientHeight + 5550000 // 可见区域高度(应为body高度，可某些环境下无法获取)
        // const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        // const dragDomheight = dragDom.offsetHeight // 对话框高度
        // const minDragDomLeft = dragDom.offsetLeft
        // const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
        // const minDragDomTop = dragDom.offsetTop
        // const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        if (styL === 'auto') styL = '0px'
        let styT = sty(dragDom, 'top')
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100)
        } else {
          styL = +styL.replace(/px/g, '')
          styT = +styT.replace(/px/g, '')
        }
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY
          // 边界处理
          // if (-(left) > minDragDomLeft) {
          //   left = -(minDragDomLeft)
          // } else if (left > maxDragDomLeft) {
          //   left = maxDragDomLeft
          // }
          // if (-(top) > minDragDomTop) {
          //   top = -(minDragDomTop)
          // } else if (top > maxDragDomTop) {
          //   top = maxDragDomTop
          // }
          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    } else {
      return false
    }
  }
})
Vue.directive('dialogChange', {
  bind (el, binding, vnode, oldVnode) {
    // 自定义属性，判断是否可拉伸
    if (!binding.value) return
    const dragDom = el.querySelector('.el-dialog')
    let dragMouse
    // 在弹出框的右下角添加可拉伸标志 class='mouse'
    let none1 = dragDom.childNodes[2]
    let none2 = none1.childNodes[0]
    for (let i = 0; i < none2.childNodes.length; i++) {
      if (none2.childNodes[i].className === 'mouse') {
        dragMouse = none2.childNodes[i]
      }
    }
    // 鼠标拖拽
    if (dragMouse) {
      dragMouse.onmousedown = (e) => {
        // content区域
        // const content = dragDom.parentNode.parentNode.parentNode.parentNode
        // const content = window.screen
        const disX = e.clientX - dragDom.offsetWidth
        const disY = e.clientY - dragDom.offsetHeight
        document.onmousemove = function (e) {
          e.preventDefault() // 移动时禁用默认事件
          // 通过事件委托，计算移动的距离
          let width = e.clientX - disX
          let height = e.clientY - disY
          // var h = document.documentElement.clientHeight || document.body.clientHeight
          // var w = document.documentElement.clientWidth || document.body.clientWidth
          // let curHeight = h * 0.6
          // let curWidth = w * 0.5
          // if (width < '800' || height < e.clientY) {
          //   return false
          // } else {
          if (height > 400) {
            dragDom.style.height = `${height}px`
          }
          if (width > 600) {
            dragDom.style.width = `${width}px`
          }
          // if (width > content.offsetWidth && height < content.offsetHeight) {
          //   dragDom.style.height = `${height}px`
          // } else if (width < content.offsetWidth && height > content.offsetHeight) {
          //   dragDom.style.width = `${width}px`
          // } else if (width < content.offsetWidth && height < content.offsetHeight) {
          //   dragDom.style.width = `${width}px`
          //   dragDom.style.height = `${height}px`
          // }
        }
        // }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    } else {
      return false
    }
  }
})

export default {
  bind (el, binding, vnode, oldVnode) {
    // 弹框可拉伸最小宽高
    // let minWidth = 400
    // let minHeight = 300
    // 初始非全屏
    let isFullScreen = false
    // 当前宽高
    let nowWidth = 0
    let nowHight = 0
    // 当前顶部高度
    let nowMarginTop = 0
    // 获取弹框头部（这部分可双击全屏）
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    let hasSetBodyHight = false
    // 弹窗
    const dragDom = el.querySelector('.el-dialog')
    // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
    // dragDom.style.overflow = "auto"
    // 清除选择头部文字效果
    dialogHeaderEl.onselectstart = new Function('return false')
    // 头部加上可拖动cursor
    dialogHeaderEl.style.cursor = 'move'
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
    // 头部插入最大化最小化元素
    let maxMin = document.createElement('button')
    maxMin.className += ' el-dialog__headerbtn el-dialog__minmax'
    maxMin.style.right = '40px'
    maxMin.style.color = '#909399'
    maxMin.title = '最大化'
    maxMin.innerHTML = '<i class="el-icon-full-screen" onMouseOver="this.style.color=\'#409EFF\'" onMouseOut="this.style.color=\'inherit\'"></i>'
    dialogHeaderEl.insertBefore(maxMin, dialogHeaderEl.childNodes[1])
    let moveDown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop
      // 获取到的值带px 正则匹配替换
      let styL, styT
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        dragDom.style.left = `${l + styL}px`
        dragDom.style.top = `${t + styT}px`
        // 将此时的位置传出去
        // binding.value({x:e.pageX,y:e.pageY})
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
    dialogHeaderEl.onmousedown = moveDown
    let bodyHeight = 'auto'

    function setMaxMin () {
      if (isFullScreen == false) {
        let i = maxMin.querySelector('.el-icon-full-screen')
        i.classList.remove('el-icon-full-screen')
        i.classList.add('el-icon-crop')
        maxMin.title = '还原'
        bodyHeight = dragDom.querySelector('.el-dialog__body').offsetHeight + 'px'
        nowHight = dragDom.clientHeight
        nowWidth = dragDom.clientWidth
        nowMarginTop = dragDom.style.marginTop
        dragDom.style.left = 0
        dragDom.style.top = 0
        dragDom.style.height = '100VH'
        dragDom.style.width = '100VW'
        dragDom.style.marginTop = 0
        isFullScreen = true
        dialogHeaderEl.style.cursor = 'initial'
        dialogHeaderEl.onmousedown = null
        if (!hasSetBodyHight) {
          dragDom.querySelector('.el-dialog__body').style.height = 'calc(100% - ' + dialogHeaderEl.offsetHeight + 'px)'
          hasSetBodyHight = true
        }
      } else {
        let i = maxMin.querySelector('.el-icon-crop')
        i.classList.remove('el-icon-crop')
        i.classList.add('el-icon-full-screen')
        maxMin.innerHTML = '<i class="el-icon-full-screen"></i>'
        maxMin.title = '最大化'
        dragDom.style.height = 'auto'
        dragDom.style.width = nowWidth + 'px'
        dragDom.style.marginTop = nowMarginTop
        isFullScreen = false
        dialogHeaderEl.style.cursor = 'move'
        dialogHeaderEl.onmousedown = moveDown
        dragDom.querySelector('.el-dialog__body').style.height = bodyHeight
        hasSetBodyHight = false
      }
    }
    // 点击放大缩小效果
    maxMin.onclick = setMaxMin
    // 双击头部效果
    dialogHeaderEl.ondblclick = setMaxMin
  }
}
