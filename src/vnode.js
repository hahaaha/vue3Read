import { isString, isObject, isFunction } from "./shared"
import {ShapeFlags} from './shared/shapeFlags'
import { normalizeClass, normalizeStyle } from "./shared/normalizeProp"
const normalizeKey = ({ key }) => (key != null ? key : null)

export const isVNode = (value) => {
  return value ? value.__v_isVNode === true : false
}

// VNProps[]
const mergeProps = (...args) => {
  const ret = {}
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i]
    for (const key in toMerge) {
      if (key === "class") {
        ret.class = normalizeClass([ret.class, toMerge.class])
      } else if (key === "style") {
        // ret.style = normalizeStyle()
      } else if (key !== "") {
        ret[key] = toMerge[key]
      }
    }
  }
  return ret
}

const cloneVNode = (vnode, extraProps) => {
  const { props, shapeFlag } = vnode
  const mergedProps = extraProps ? mergeProps(props, extraProps) : props
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: vnode.props && normalizeKey(vnode.props),
    // ref: props && normalizeRef(props),
    // scopeId: currentScopeId,
    slotScopeIds: vnode.slotScopIds,
    children: vnode.children,
    component: vnode.component,
    suspense: vnode.suspense,
    // ssContent: vnode.ssContent,
    // ssFallback: null,
    dirs: vnode.dirs,
    transition: vnode.transition,
    el: vnode.el,
    anchor: vnode.anchor,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag,
    // patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicProps,
    appContext: vnode.appContext,
  }

  return cloned
}

const normalizeChildren = (vnode, children) => {
  // 暂时只考虑string 的情况
  children = String(children)
  vnode.children = children
}

export const createVNode = (type, props, children) => {
  // 中间加一层方便对数据进行处理
  // 已经是vnode的情况下需要进行合并
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props)
    if (children) {
      normalizeChildren(cloned, children)
    }
    return cloned
  }

  if (props) {
    const { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      props.style = normalizeStyle(style)
    }
  }

  // 开始计算shapeFlag
  const shapeFlag = isString(type) 
  ? ShapeFlags.ELEMENT
  : isObject(type)
  ? ShapeFlags.STATEFUL_COMPONENT
  : isFunction(type)
  ? ShapeFlags.FUNCTIONAL_COMPONENT
  : 0

  return createBaseVNode(type, props, children, 0, null, shapeFlag)
}

export const createBaseVNode = (
  type,
  props = null,
  children = null,
  patchFlag = 0,
  dynamicProps = null,
  shapeFlag = 0 
  //   isBlockNode = false,
  //   needFullChildrenNormalization = false
) => {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props,
    key: props && normalizeKey(props),
    // ref: props && normalizeRef(props),
    // scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
  }

  return vnode
}
