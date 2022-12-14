import { isString, isObject, isArray } from "./index"
//[vnode1.class , vnode2.class]
export const normalizeClass = (value) => {
  // 暂时只有array的判断 其实还有string / object
  let res = ""
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i])
      if (normalized) {
        res += normalized + " "
      }
    }
  } else if (isObject(value)) {
    for (let name in value) {
      if (value[name]) res += value[name] + " "
    }
  }

  return res.trim()
}

export const normalizeStyle = (value) => {
  if (isArray(value)) {
    const res = {}
    for (let i = 0; i < value.length; i++) {
      const item = value[i]
      const normalized = isString(item) ? null : normalizeStyle(item)
      if(normalized) {
        for(const name in normalized) {
          res[name] = normalized[name]
        }
      }
    }
    return res
  } else if(isObject(value)) {
    return value
  }
}
