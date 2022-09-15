import { createVNode } from "./vnode"
test("create node only type", () => {
  const vnode = createVNode("p")
  expect(vnode.type).toBe("p")
})

test("create with tag and props", () => {
  const vnode = createVNode("p", {})
  expect(vnode.type).toBe("p")
  expect(vnode.props).toMatchObject({})
})

test("create with tag, props and children", () => {
  const vnode = createVNode("p", {}, ["foo"])
  expect(vnode.type).toBe("p")
  expect(vnode.props).toMatchObject({})
  expect(vnode.children).toMatchObject(["foo"])
})

test("create from an existing vnode", () => {
  const vnode1 = createVNode("p", { id: "foo" })
  const vnode2 = createVNode(vnode1, { class: "bar" }, "baz")
  expect(vnode2).toMatchObject({
    type: "p",
    props: {
      id: "foo",
      class: "bar",
    },
    children: "baz",
    // shapeFlag: ShapeFlags.ELEMENT | ShapeFlags.TEXT_CHILDREN
  })
})

// describe('style normalization', () => {
//   test('array', () => {
//     const vnode = createVNode('p', {
//       style: [{ foo: 'foo' }, { baz: 'baz' }]
//     })
//     expect(vnode.props).toMatchObject({ style: { foo: 'foo', baz: 'baz' } })
//   })

//   test('object', () => {
//     const vnode = createVNode('p', { style: { foo: 'foo', baz: 'baz' } })
//     expect(vnode.props).toMatchObject({ style: { foo: 'foo', baz: 'baz' } })
//   })
// })

describe('class normalization', () => {
  test('string', () => {
    const vnode = createVNode('p', { class: 'foo baz' })
    expect(vnode.props).toMatchObject({ class: 'foo baz' })
  })

  test('array<string>', () => {
    const vnode = createVNode('p', { class: ['foo', 'baz'] })
    expect(vnode.props).toMatchObject({ class: 'foo baz' })
  })

  test('array<object>', () => {
    const vnode = createVNode('p', {
      class: [{ foo: 'foo' }, { baz: 'baz' }]
    })
    expect(vnode.props).toMatchObject({ class: 'foo baz' })
  })

  test('object', () => {
    const vnode = createVNode('p', { class: { foo: 'foo', baz: 'baz' } })
    expect(vnode.props).toMatchObject({ class: 'foo baz' })
  })
})
