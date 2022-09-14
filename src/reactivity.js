const targetMap = new WeakMap()
let activeEffect = null

function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

function track(target, key) {
    if (activeEffect) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        // effect add into dep
        dep.add(activeEffect)
    }
}

function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach((effect) => {
            effect()
        })
    }
}

const reactive = (target) => {
    const handler = {
        get: (target, key, receiver) => {
            let result = Reflect.get(target, key, receiver)
            track(target, key)
            return result
        },
        set: (target, key, value, receiver) => {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            console.log(oldValue)
            console.log(target[key])
            if(oldValue != target[key]) {
                trigger(target, key)
            }
            return result
        },
    }
    return new Proxy(target, handler)
}

function ref(raw) {
    // return reactive({value: initValue})
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            if(newVal != raw) {
                raw = newVal
                trigger(r, 'value')
            }
            
        }
    }
    return r
}

const r = {
    get value() {
        track(r, 'value')
        return raw
    },
    set value(newVal) {
        if(newVal != raw) {
            raw = newVal
            trigger(r, 'value')
        }
        
    }
}
console.log(r)

let product = reactive({
    price: 5,
    quantity: 2
})

let total = 0
let salePrice = ref(0)
console.log(salePrice)

effect(() => {
    total = salePrice.value * product.quantity
})

effect(() => {
   salePrice.value = product.price * 0.9
})

console.log(total)

product.quantity = 5

console.log(total)
console.log(salePrice)
