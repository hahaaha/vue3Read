// isArray 优于 instanceof
export const isArray = Array.isArray

export const isString = (value) => typeof value === 'string'

export const isObject = (value) => value !== null && typeof value === 'object'

export const isFunction = (value) => typeof value === 'function'