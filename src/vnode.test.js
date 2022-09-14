import { createBaseVNode } from "./vnode"
test("create node only type", () => {
    const vnode = createBaseVNode("p")
  expect(vnode.type).toBe('p')
})
