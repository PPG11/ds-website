/* eslint no-underscore-dangle: 0 */
const DEG_TO_RAD = 0.017453292519943295

const rounded = (value, i) => {
  i = 10 ** (i || 15)
  return Math.round(value * i) / i
}

const arrayWrap = (arr) => {
  return window.Float32Array ? new Float32Array(arr) : arr
}

function isElement(o) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string'
}

function watch(target, prop, callback) {
  Object.defineProperty(target, prop, {
    get: function () {
      return this['_' + prop]
    },
    set: function (value) {
      this['_' + prop] = value
      callback()
    },
  })
}

function observe(target, props, callback) {
  for (let i = 0, len = props.length; i < len; i += 1) {
    let prop = props[i]
    watch(target, prop, callback)
  }
}

let Matrix3D = function (
  n11,
  n12,
  n13,
  n14,
  n21,
  n22,
  n23,
  n24,
  n31,
  n32,
  n33,
  n34,
  n41,
  n42,
  n43,
  n44
) {
  this.elements = window.Float32Array ? new Float32Array(16) : []
  let te = this.elements
  te[0] = n11 !== undefined ? n11 : 1
  te[4] = n12 || 0
  te[8] = n13 || 0
  te[12] = n14 || 0
  te[1] = n21 || 0
  te[5] = n22 !== undefined ? n22 : 1
  te[9] = n23 || 0
  te[13] = n24 || 0
  te[2] = n31 || 0
  te[6] = n32 || 0
  te[10] = n33 !== undefined ? n33 : 1
  te[14] = n34 || 0
  te[3] = n41 || 0
  te[7] = n42 || 0
  te[11] = n43 || 0
  te[15] = n44 !== undefined ? n44 : 1
}
Matrix3D.prototype = {
  set: function (
    n11,
    n12,
    n13,
    n14,
    n21,
    n22,
    n23,
    n24,
    n31,
    n32,
    n33,
    n34,
    n41,
    n42,
    n43,
    n44
  ) {
    let te = this.elements
    te[0] = n11
    te[4] = n12
    te[8] = n13
    te[12] = n14
    te[1] = n21
    te[5] = n22
    te[9] = n23
    te[13] = n24
    te[2] = n31
    te[6] = n32
    te[10] = n33
    te[14] = n34
    te[3] = n41
    te[7] = n42
    te[11] = n43
    te[15] = n44
    return this
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    return this
  },
  multiplyMatrices: function (a, be) {
    let ae = a.elements
    let te = this.elements
    let a11 = ae[0]
    let a12 = ae[4]
    let a13 = ae[8]
    let a14 = ae[12]
    let a21 = ae[1]
    let a22 = ae[5]
    let a23 = ae[9]
    let a24 = ae[13]
    let a31 = ae[2]
    let a32 = ae[6]
    let a33 = ae[10]
    let a34 = ae[14]
    let a41 = ae[3]
    let a42 = ae[7]
    let a43 = ae[11]
    let a44 = ae[15]
    let b11 = be[0]
    let b12 = be[1]
    let b13 = be[2]
    let b14 = be[3]
    let b21 = be[4]
    let b22 = be[5]
    let b23 = be[6]
    let b24 = be[7]
    let b31 = be[8]
    let b32 = be[9]
    let b33 = be[10]
    let b34 = be[11]
    let b41 = be[12]
    let b42 = be[13]
    let b43 = be[14]
    let b44 = be[15]
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
    return this
  },
  appendTransform: function (
    x,
    y,
    z,
    scaleX,
    scaleY,
    scaleZ,
    rotateX,
    rotateY,
    rotateZ,
    skewX,
    skewY,
    originX,
    originY,
    originZ
  ) {
    let rx = rotateX * DEG_TO_RAD
    let cosx = rounded(Math.cos(rx))
    let sinx = rounded(Math.sin(rx))
    let ry = rotateY * DEG_TO_RAD
    let cosy = rounded(Math.cos(ry))
    let siny = rounded(Math.sin(ry))
    let rz = rotateZ * DEG_TO_RAD
    let cosz = rounded(Math.cos(rz * -1))
    let sinz = rounded(Math.sin(rz * -1))
    this.multiplyMatrices(
      this,
      arrayWrap([1, 0, 0, x, 0, cosx, sinx, y, 0, -sinx, cosx, z, 0, 0, 0, 1])
    )
    this.multiplyMatrices(
      this,
      arrayWrap([cosy, 0, siny, 0, 0, 1, 0, 0, -siny, 0, cosy, 0, 0, 0, 0, 1])
    )
    this.multiplyMatrices(
      this,
      arrayWrap([
        cosz * scaleX,
        sinz * scaleY,
        0,
        0,
        -sinz * scaleX,
        cosz * scaleY,
        0,
        0,
        0,
        0,
        1 * scaleZ,
        0,
        0,
        0,
        0,
        1,
      ])
    )
    if (skewX || skewY) {
      this.multiplyMatrices(
        this,
        arrayWrap([
          rounded(Math.cos(skewX * DEG_TO_RAD)),
          rounded(Math.sin(skewX * DEG_TO_RAD)),
          0,
          0,
          -1 * rounded(Math.sin(skewY * DEG_TO_RAD)),
          rounded(Math.cos(skewY * DEG_TO_RAD)),
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        ])
      )
    }
    if (originX || originY || originZ) {
      this.elements[12] -=
        originX * this.elements[0] +
        originY * this.elements[4] +
        originZ * this.elements[8]
      this.elements[13] -=
        originX * this.elements[1] +
        originY * this.elements[5] +
        originZ * this.elements[9]
      this.elements[14] -=
        originX * this.elements[2] +
        originY * this.elements[6] +
        originZ * this.elements[10]
    }
    return this
  },
}

let Matrix2D = function (a, b, c, d, tx, ty) {
  this.a = a == null ? 1 : a
  this.b = b || 0
  this.c = c || 0
  this.d = d == null ? 1 : d
  this.tx = tx || 0
  this.ty = ty || 0
  return this
}
Matrix2D.prototype = {
  identity: function () {
    this.a = 1
    this.d = 1
    this.b = 0
    this.c = 0
    this.tx = 0
    this.ty = 0
    return this
  },
  appendTransform: function (
    x,
    y,
    scaleX,
    scaleY,
    rotation,
    skewX,
    skewY,
    originX,
    originY
  ) {
    let sin
    let cos
    if (rotation % 360) {
      let r = rotation * DEG_TO_RAD
      cos = Math.cos(r)
      sin = Math.sin(r)
    } else {
      cos = 1
      sin = 0
    }
    if (skewX || skewY) {
      skewX *= DEG_TO_RAD
      skewY *= DEG_TO_RAD
      this.append(
        Math.cos(skewY),
        Math.sin(skewY),
        -Math.sin(skewX),
        Math.cos(skewX),
        x,
        y
      )
      this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0)
    } else {
      this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y)
    }
    if (originX || originY) {
      this.tx -= originX * this.a + originY * this.c
      this.ty -= originX * this.b + originY * this.d
    }
    return this
  },
  append: function (a, b, c, d, tx, ty) {
    let a1 = this.a
    let b1 = this.b
    let c1 = this.c
    let d1 = this.d
    this.a = a * a1 + b * c1
    this.b = a * b1 + b * d1
    this.c = c * a1 + d * c1
    this.d = c * b1 + d * d1
    this.tx = tx * a1 + ty * c1 + this.tx
    this.ty = tx * b1 + ty * d1 + this.ty
    return this
  },
}

export function Transform(obj) {
  if (obj.___mixCSS3Transform) {
    return
  }
  let observeProps = [
    'translateX',
    'translateY',
    'translateZ',
    'scaleX',
    'scaleY',
    'scaleZ',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skewX',
    'skewY',
    'originX',
    'originY',
    'originZ',
    'perspective',
  ]
  let objIsElement = isElement(obj)
  obj.___mixCSS3Transform = true
  observe(obj, observeProps, function () {
    let mtx = obj.matrix3d
      .identity()
      .appendTransform(
        obj.translateX,
        obj.translateY,
        obj.translateZ,
        obj.scaleX,
        obj.scaleY,
        obj.scaleZ,
        obj.rotateX,
        obj.rotateY,
        obj.rotateZ,
        obj.skewX,
        obj.skewY,
        obj.originX,
        obj.originY,
        obj.originZ
      )
    let transform =
      'perspective(' +
      obj.perspective +
      'px) ' +
      'matrix3d(' +
      Array.prototype.slice.call(mtx.elements).join(',') +
      ')'
    if (objIsElement) {
      obj.style.transform = transform
      obj.style.msTransform = transform
      obj.style.OTransform = transform
      obj.style.MozTransform = transform
      obj.style.webkitTransform = transform
    } else {
      obj.transform = transform
    }
  })
  obj.matrix3d = new Matrix3D()
  obj.perspective = 500
  obj.scaleX = 1
  obj.scaleY = 1
  obj.scaleZ = 1
  obj.translateX = 0
  obj.translateY = 0
  obj.translateZ = 0
  obj.rotateX = 0
  obj.rotateY = 0
  obj.rotateZ = 0
  obj.skewX = 0
  obj.skewY = 0
  obj.originX = 0
  obj.originY = 0
  obj.originZ = 0
}

Transform.getMatrix3D = function (option) {
  let defaultOption = {
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skewX: 0,
    skewY: 0,
    originX: 0,
    originY: 0,
    originZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
  }
  Object.keys(option).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(option, 'key')) {
      defaultOption[key] = option[key]
    }
  })
  return new Matrix3D()
    .identity()
    .appendTransform(
      defaultOption.translateX,
      defaultOption.translateY,
      defaultOption.translateZ,
      defaultOption.scaleX,
      defaultOption.scaleY,
      defaultOption.scaleZ,
      defaultOption.rotateX,
      defaultOption.rotateY,
      defaultOption.rotateZ,
      defaultOption.skewX,
      defaultOption.skewY,
      defaultOption.originX,
      defaultOption.originY,
      defaultOption.originZ
    ).elements
}
Transform.getMatrix2D = function (option) {
  let defaultOption = {
    translateX: 0,
    translateY: 0,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    originX: 0,
    originY: 0,
    scaleX: 1,
    scaleY: 1,
  }
  Object.keys(option).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(option, 'key')) {
      defaultOption[key] = option[key]
    }
  })
  return new Matrix2D()
    .identity()
    .appendTransform(
      defaultOption.translateX,
      defaultOption.translateY,
      defaultOption.scaleX,
      defaultOption.scaleY,
      defaultOption.rotation,
      defaultOption.skewX,
      defaultOption.skewY,
      defaultOption.originX,
      defaultOption.originY
    )
}

export const tf = function () {
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Transform
  } else {
    window.Transform = Transform
  }
}
