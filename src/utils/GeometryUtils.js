/* eslint-disable no-undef */
/* eslint-disable prefer-const */

import * as THREE from 'three'

export const GeometryUtils = {

  // Merge two geometries or geometry and geometry from object (using object's transform)

  merge(geometry1, geometry2, materialIndexOffset) {
    console.warn('THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.')

    let matrix

    if (geometry2 instanceof THREE.Mesh) {
      geometry2.matrixAutoUpdate && geometry2.updateMatrix()

      matrix = geometry2.matrix
      geometry2 = geometry2.geometry
    }

    geometry1.merge(geometry2, matrix, materialIndexOffset)
  },
  randomPointInTriangle() {
    const vector = new THREE.Vector3()

    return function (vectorA, vectorB, vectorC) {
      const point = new THREE.Vector3()

      let a = Math.random()
      let b = Math.random()

      if ((a + b) > 1) {
        a = 1 - a
        b = 1 - b
      }

      const c = 1 - a - b

      point.copy(vectorA)
      point.multiplyScalar(a)

      vector.copy(vectorB)
      vector.multiplyScalar(b)

      point.add(vector)

      vector.copy(vectorC)
      vector.multiplyScalar(c)

      point.add(vector)

      return point
    }
  },

  // Get random point in face (triangle)
  // (uniform distribution)

  randomPointInFace(face, geometry) {
    const vA = geometry.vertices[face.a]
    const vB = geometry.vertices[face.b]
    const vC = geometry.vertices[face.c]

    return GeometryUtils.randomPointInTriangle(vA, vB, vC)
  },

  // Get uniformly distributed random points in mesh
  // - create array with cumulative sums of face areas
  //  - pick random number from 0 to total area
  //  - find corresponding place in area array by binary search
  // - get random point in face

  randomPointsInGeometry(geometry, n) {
    let face
    let i
    const faces = geometry.faces
    const vertices = geometry.vertices
    const il = faces.length
    let totalArea = 0
    const cumulativeAreas = []
    let vA
    let vB
    let vC

    // precompute face areas

    for (i = 0; i < il; i++) {
      face = faces[i]

      vA = vertices[face.a]
      vB = vertices[face.b]
      vC = vertices[face.c]

      face._area = GeometryUtils.triangleArea(vA, vB, vC)

      totalArea += face._area

      cumulativeAreas[i] = totalArea
    }

    // binary search cumulative areas array

    function binarySearchIndices(value) {
      function binarySearch(start, end) {
        // return closest larger index
        // if exact number is not found

        if (end < start)
          return start

        const mid = start + Math.floor((end - start) / 2)

        if (cumulativeAreas[mid] > value)

          return binarySearch(start, mid - 1)

        else if (cumulativeAreas[mid] < value)

          return binarySearch(mid + 1, end)

        else

          return mid
      }

      const result = binarySearch(0, cumulativeAreas.length - 1)
      return result
    }

    // pick random face weighted by face area

    let r; let index
    const result = []

    const stats = {}

    for (i = 0; i < n; i++) {
      r = Math.random() * totalArea

      index = binarySearchIndices(r)

      result[i] = GeometryUtils.randomPointInFace(faces[index], geometry)

      if (!stats[index])

        stats[index] = 1

      else

        stats[index] += 1
    }

    return result
  },
  triangleArea(vertexA, vertexB, vertexC) {
    const AB = vertexB.clone().sub(vertexA)
    const AC = vertexC.clone().sub(vertexA)
    const cross = new THREE.Vector3().crossVectors(AB, AC)
    const area = 0.5 * cross.length()
    return area
  },
  randomPointsInBufferGeometry(geometry, n) {
    let i
    const vertices = geometry.attributes.position.array
    let totalArea = 0
    const cumulativeAreas = []
    let vA; let vB; let vC

    // precompute face areas
    vA = new THREE.Vector3()
    vB = new THREE.Vector3()
    vC = new THREE.Vector3()

    // geometry._areas = [];
    const il = vertices.length / 9

    for (i = 0; i < il; i++) {
      vA.set(vertices[i * 9 + 0], vertices[i * 9 + 1], vertices[i * 9 + 2])
      vB.set(vertices[i * 9 + 3], vertices[i * 9 + 4], vertices[i * 9 + 5])
      vC.set(vertices[i * 9 + 6], vertices[i * 9 + 7], vertices[i * 9 + 8])

      const area = GeometryUtils.triangleArea(vA, vB, vC)
      totalArea += area

      cumulativeAreas.push(totalArea)
    }

    // binary search cumulative areas array

    function binarySearchIndices(value) {
      function binarySearch(start, end) {
        // return closest larger index
        // if exact number is not found

        if (end < start)
          return start

        const mid = start + Math.floor((end - start) / 2)

        if (cumulativeAreas[mid] > value)

          return binarySearch(start, mid - 1)

        else if (cumulativeAreas[mid] < value)

          return binarySearch(mid + 1, end)

        else

          return mid
      }

      const result = binarySearch(0, cumulativeAreas.length - 1)
      return result
    }

    // pick random face weighted by face area

    let r; let index
    const result = []

    for (i = 0; i < n; i++) {
      r = Math.random() * totalArea

      index = binarySearchIndices(r)

      // result[ i ] = THREE.GeometryUtils.randomPointInFace( faces[ index ], geometry, true );
      vA.set(vertices[index * 9 + 0], vertices[index * 9 + 1], vertices[index * 9 + 2])
      vB.set(vertices[index * 9 + 3], vertices[index * 9 + 4], vertices[index * 9 + 5])
      vC.set(vertices[index * 9 + 6], vertices[index * 9 + 7], vertices[index * 9 + 8])
      result[i] = GeometryUtils.randomPointInTriangle(vA, vB, vC)
    }

    return result
  },

  // Get triangle area (half of parallelogram)
  // http://mathworld.wolfram.com/TriangleArea.html

  triangleArea: (function () {
    const vector1 = new THREE.Vector3()
    const vector2 = new THREE.Vector3()

    return function (vectorA, vectorB, vectorC) {
      vector1.subVectors(vectorB, vectorA)
      vector2.subVectors(vectorC, vectorA)
      vector1.cross(vector2)

      return 0.5 * vector1.length()
    }
  }()),

  center(geometry) {
    console.warn('THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.')
    return geometry.center()
  },
  createBufferAttributes({
    Particle,
    geometry = new THREE.BufferGeometry(),
    amount = 1000,
    radius = 5,
    positions = true,
    colors = true,
    sizes = true,
    scales = true,
    alphas = false,
  }) {
    if (!Particle)
      throw new Error('Particle class is required')

    if (!geometry || !(geometry instanceof THREE.BufferGeometry))
      geometry = new THREE.BufferGeometry()

    if (positions)
      positions = new Float32Array(amount * 3)

    if (colors)
      colors = new Float32Array(amount * 3)
    if (sizes)
      sizes = new Float32Array(amount)
    if (scales)
      scales = new Float32Array(amount)
    if (alphas)
      alphas = new Float32Array(amount)

    const vectors = []
    for (let i = 0; i < amount; i++) {
      if (positions) {
        const phi = Math.acos(2 * Math.random() - 1)

        const px = radius * Math.cos(theta) * Math.sin(phi)
        const py = radius * Math.sin(theta) * Math.sin(phi)
        const pz = radius * Math.cos(phi)

        const vertex = new Particle(px, py, pz)

        vectors.push(vertex)

        positions[i * 3 + 0] = px
        positions[i * 3 + 1] = py
        positions[i * 3 + 2] = pz
      }

      if (scales)
        scales[i] = (Math.random() * 0.2)

      if (sizes)
        sizes[i] = (Math.random() * 0.2)

      if (alphas)
        alphas[i] = Math.random()

      if (colors) {
        const c = Utils.color.fuckingDopeGreen(i)

        colors[i * 3 + 0] = c[0]
        colors[i * 3 + 1] = c[1]
        colors[i * 3 + 2] = c[2]
      }
    }

    if (positions)
      geometry.setAttribute('aPosition', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))

    if (colors)
      geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))

    if (scales)
      geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    if (sizes)
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const returnObj = {
      geometry,
    }
    if (positions) {
      returnObj.positions = positions
      returnObj.vectors = vectors
    }

    if (colors)
      returnObj.colors = colors

    if (scales)
      returnObj.scales = scales

    if (sizes)
      returnObj.sizes = sizes

    if (alphas)
      returnObj.alphas = alphas

    return returnObj
  },
}
