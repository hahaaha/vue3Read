const normalizeKey = ({ key }) => (key != null ? key : null)
export const createBaseVNode = (
  type,
  props = null,
  children = null,
  patchFlag = 0,
  dynamicProps = null,
//   shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
//   isBlockNode = false,
//   needFullChildrenNormalization = false
) => {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
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
    // shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
  }

  return vnode
}
