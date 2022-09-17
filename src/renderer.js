// options 各种dom操纵方法集合
const baseCreateRenderer = (options) => {
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    cloneNode: hostCloneNode,
    insertStaticContent: hostInsertStaticContent,
  } = options

  const processText = (n1, n2, container, anchor) => {
    if(n1 == null) {
        hostInsert(((n2.el = hostCreateText(n2.children)), container, anchor))
    } else {
        const el = (n2.el = n1.el)
        if(n2.children !== n1.children) {
            hostSetText(el, n2.children)
        }
    }
  }

  const patch = (n1, n2, container) => {
    if (n1 === n2) return

    const { type } = n2
    switch (type) {
      case "Text":
        processText()
    }
  }

  const render = (vnode, container) => {
    if (vnode !== null) {
      patch(container._vnode || null, vnode, container)
    }
    container._vnode = vnode
  }

  return {
    render,
  }
}
