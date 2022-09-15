// 把一些列的dom操纵能力统一
export const nodeOps = {
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  },
  remove: (child) => {
    const parent = child.parentNode
    if (parent) {
      parent.removeChild(child)
    }
  },
  createElement(tag, is) {
    // svg 先不加入
    const el = document.createElement(tag, is ? { is } : undefined)
    // select multiple的判断 后续doing
    return el
  },

  createText: (text) => doc.createTextNode(text),

  createComment: (text) => doc.createComment(text),

  setText: (node, text) => {
    node.nodeValue = text
  },

  setElementText: (el, text) => {
    el.textContent = text
  },

  parentNode: (node) => node.parentNode,

  nextSibling: (node) => node.nextSibling,

  querySelector: (selector) => doc.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, "")
  },

  cloneNode(el) {
    const cloned = el.cloneNode(true)
    if (`_value` in el) {
        cloned._value = el._value
      }
    return cloned
  },
}