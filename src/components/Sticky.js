import * as THREE from 'three'
import C from 'cannon'


// https://github.com/Aqro/Physics-menu-threejs-cannonjs/blob/master/src/js/Stage.js

import OrbitControls from 'three-orbitcontrols'

import MenuSticky from './MenuSticky'

import CANNON from 'cannon'

/**
 * Adds Three.js primitives into the scene where all the Cannon bodies and shapes are.
 * @class CannonDebugRenderer
 * @param {THREE.Scene} scene
 * @param {CANNON.World} world
 * @param {object} [options]
 */

export default class CannonDebugRenderer {

    constructor(scene, world, options) {
        this.options = options || {}

        this.scene = scene
        this.world = world

        this._meshes = []

        this._material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
        this._sphereGeometry = new THREE.SphereGeometry(1)
        this._boxGeometry = new THREE.BoxGeometry(1, 1, 1)
        this._planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10)
        this._cylinderGeometry = new THREE.CylinderGeometry(1, 1, 10, 10)

        this.tmpVec0 = new CANNON.Vec3()
        this.tmpVec1 = new CANNON.Vec3()
        this.tmpVec2 = new CANNON.Vec3()
        this.tmpQuat0 = new CANNON.Vec3()
    }


    update() {
        const { bodies } = this.world
        const meshes = this._meshes
        const shapeWorldPosition = this.tmpVec0
        const shapeWorldQuaternion = this.tmpQuat0

        let meshIndex = 0

        for (let i = 0; i !== bodies.length; i++) {
            const body = bodies[i]

            for (let j = 0; j !== body.shapes.length; j++) {
                const shape = body.shapes[j]

                this._updateMesh(meshIndex, body, shape)

                const mesh = meshes[meshIndex]

                if (mesh) {
                    // Get world position
                    body.quaternion.vmult(body.shapeOffsets[j], shapeWorldPosition)
                    body.position.vadd(shapeWorldPosition, shapeWorldPosition)

                    // Get world quaternion
                    body.quaternion.mult(body.shapeOrientations[j], shapeWorldQuaternion)

                    // Copy to meshes
                    mesh.position.copy(shapeWorldPosition)
                    mesh.quaternion.copy(shapeWorldQuaternion)
                }

                meshIndex += 1
            }
        }

        for (let i = meshIndex; i < meshes.length; i++) {
            const mesh = meshes[i]
            if (mesh) {
                this.scene.remove(mesh)
            }
        }

        meshes.length = meshIndex
    }


    _updateMesh(index, body, shape) {
        let mesh = this._meshes[index]
        if (!_typeMatch(mesh, shape)) {
            if (mesh) {
                this.scene.remove(mesh)
            }
            mesh = this._meshes[index] = this._createMesh(shape)
        }
        _scaleMesh(mesh, shape)
    }


    _createMesh(shape) {
        let mesh
        const material = this._material

        const geo = new THREE.Geometry()

        switch (shape.type) {

            case CANNON.Shape.types.SPHERE:
                mesh = new THREE.Mesh(this._sphereGeometry, material)
                break

            case CANNON.Shape.types.BOX:
                mesh = new THREE.Mesh(this._boxGeometry, material)
                break

            case CANNON.Shape.types.PLANE:
                mesh = new THREE.Mesh(this._planeGeometry, material)
                break

            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                // Create mesh

                // Add vertices
                for (let i = 0; i < shape.vertices.length; i++) {
                    const v = shape.vertices[i]
                    geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z))
                }

                for (let i = 0; i < shape.faces.length; i++) {
                    const face = shape.faces[i]

                    // add triangles
                    const a = face[0]
                    for (let j = 1; j < face.length - 1; j++) {
                        const b = face[j]
                        const c = face[j + 1]
                        geo.faces.push(new THREE.Face3(a, b, c))
                    }
                }
                geo.computeBoundingSphere()
                geo.computeFaceNormals()

                mesh = new THREE.Mesh(geo, material)
                shape.geometryId = geo.id
                break

            case CANNON.Shape.types.TRIMESH:
                for (let i = 0; i < shape.indices.length / 3; i++) {
                    shape.getTriangleVertices(i, this.tmpVec0, this.tmpVec1, this.tmpVec2)
                    geo.vertices.push(
                        new THREE.Vector3(this.tmpVec0.x, this.tmpVec0.y, this.tmpVec0.z),
                        new THREE.Vector3(this.tmpVec1.x, this.tmpVec1.y, this.tmpVec1.z),
                        new THREE.Vector3(this.tmpVec2.x, this.tmpVec2.y, this.tmpVec2.z),
                    )
                    const j = geo.vertices.length - 3
                    geo.faces.push(new THREE.Face3(j, j + 1, j + 2))
                }
                geo.computeBoundingSphere()
                geo.computeFaceNormals()
                mesh = new THREE.Mesh(geo, material)
                shape.geometryId = geo.id
                break

            case CANNON.Shape.types.HEIGHTFIELD:
                for (let xi = 0; xi < shape.data.length - 1; xi++) {
                    for (let yi = 0; yi < shape.data[xi].length - 1; yi++) {
                        for (let k = 0; k < 2; k++) {
                            shape.getConvexTrianglePillar(xi, yi, k === 0)
                            this.tmpVec0.copy(shape.pillarConvex.vertices[0])
                            this.tmpVec1.copy(shape.pillarConvex.vertices[1])
                            this.tmpVec2.copy(shape.pillarConvex.vertices[2])
                            this.tmpVec0.vadd(shape.pillarOffset, this.tmpVec0)
                            this.tmpVec1.vadd(shape.pillarOffset, this.tmpVec1)
                            this.tmpVec2.vadd(shape.pillarOffset, this.tmpVec2)
                            geo.vertices.push(
                                new THREE.Vector3(this.tmpVec0.x, this.tmpVec0.y, this.tmpVec0.z),
                                new THREE.Vector3(this.tmpVec1.x, this.tmpVec1.y, this.tmpVec1.z),
                                new THREE.Vector3(this.tmpVec2.x, this.tmpVec2.y, this.tmpVec2.z),
                            )
                            const ii = geo.vertices.length - 3
                            geo.faces.push(new THREE.Face3(ii, ii + 1, ii + 2))
                        }
                    }
                }
                geo.computeBoundingSphere()
                geo.computeFaceNormals()
                mesh = new THREE.Mesh(geo, material)
                shape.geometryId = geo.id
                break
            default:
                break
        }

        if (mesh) {
            this.scene.add(mesh)
        }

        return mesh
    }




}

const _typeMatch = (mesh, shape) => {
    if (!mesh) {
        return false
    }
    const geo = mesh.geometry
    return (
        (geo instanceof THREE.SphereGeometry && shape instanceof CANNON.Sphere)
        || (geo instanceof THREE.BoxGeometry && shape instanceof CANNON.Box)
        || (geo instanceof THREE.PlaneGeometry && shape instanceof CANNON.Plane)
        || (geo.id === shape.geometryId && shape instanceof CANNON.ConvexPolyhedron)
        || (geo.id === shape.geometryId && shape instanceof CANNON.Trimesh)
        || (geo.id === shape.geometryId && shape instanceof CANNON.Heightfield)
    )
}

const _scaleMesh = (mesh, shape) => {
    const { radius } = shape

    switch (shape.type) {

        case CANNON.Shape.types.SPHERE:
            mesh.scale.set(radius, radius, radius)
            break

        case CANNON.Shape.types.BOX:
            mesh.scale.copy(shape.halfExtents)
            mesh.scale.multiplyScalar(2)
            break

        case CANNON.Shape.types.CONVEXPOLYHEDRON:
            mesh.scale.set(1, 1, 1)
            break

        case CANNON.Shape.types.TRIMESH:
            mesh.scale.copy(shape.scale)
            break

        case CANNON.Shape.types.HEIGHTFIELD:
            mesh.scale.set(1, 1, 1)
            break
        default:
            break

    }
}




// Options
const force = 30
const distance = 15

export default class Scene {

    constructor() {
        this.$stage = document.getElementById('stage')

        this.setup()
        this.bindEvents()
    }

    bindEvents() {
        window.addEventListener('resize', () => { this.onResize() })
    }


    setup() {
        // Init Physics world
        this.world = new C.World()
        this.world.gravity.set(0, -50, 0)

        // Init Three components
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog(0x312929, -10, 100)

        this.setCamera()
        this.setLights()
        this.setRender()

        this.addObjects()

        // this.setupDebug()
    }


    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H } = APP.Layout

        this.camera.aspect = W / H

        this.camera.top    = distance
        this.camera.right  = distance * this.camera.aspect
        this.camera.bottom = -distance
        this.camera.left   = -distance * this.camera.aspect

        this.camera.updateProjectionMatrix()
        this.renderer.setSize(W, H)
    }


    /* Actions
    --------------------------------------------------------- */

    setCamera() {
        const { W, H } = APP.Layout
        const aspect = W / H

        this.camera = new THREE.OrthographicCamera(-distance * aspect, distance * aspect, distance, -distance, -10, 100)

        this.camera.position.set(-10, 10, 10)
        this.camera.lookAt(new THREE.Vector3())
    }

    setLights() {
        const ambient = new THREE.AmbientLight(0xcccccc)
        this.scene.add(ambient)

        const foreLight = new THREE.DirectionalLight(0xffffff, 0.5)
        foreLight.position.set(5, 5, 20)
        this.scene.add(foreLight)

        const backLight = new THREE.DirectionalLight(0xffffff, 1)
        backLight.position.set(-5, -5, -10)
        this.scene.add(backLight)
    }

    setRender() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.$stage,
        })

        this.renderer.setClearColor(0x312929)
        this.renderer.setSize(APP.Layout.W, APP.Layout.H)
        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.renderer.setAnimationLoop(() => { this.draw() })
    }

    addObjects() {
        this.menu = new MenuSticky(this.scene, this.world, this.camera)
    }


    setupDebug() {
        this.dbr = new CannonDebugRenderer(this.scene, this.world)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableKeys = false
        this.controls.update()
    }


    /* Values
    --------------------------------------------------------- */

    draw() {
        this.updatePhysics()
        this.renderer.render(this.scene, this.camera)
    }

    updatePhysics() {
        if (this.dbr) this.dbr.update()

        this.menu.update()

        this.world.step(1 / 60)
    }

}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */


export default class Menu {

    constructor(scene, world, camera) {
        this.$navItems = document.querySelectorAll('.mainNav a')

        this.scene = scene
        this.world = world
        this.camera = camera

        this.loader = new THREE.FontLoader()

        // Setups
        this.totalMass = 1
        this.cMaterial = new C.Material()

        this.mouse = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()

        // Loader
        this.loader.load(fontURL, (f) => { this.setup(f) })

        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener('click', () => { this.onClick() })
        window.addEventListener('mousemove', (e) => { this.onMouseMove(e) })
    }


    setup(font) {
        this.words = []
        this.margin = 6
        this.offset = this.$navItems.length * this.margin * 0.5 - 1

        const options = {
            font,
            size: 3,
            height: 0.4,
            curveSegments: 24,
            bevelEnabled: true,
            bevelThickness: 0.9,
            bevelSize: 0.3,
            bevelOffset: 0,
            bevelSegments: 10,
        }

        this.$navItems.forEach(($item, i) => {
            const { innerText } = $item

            const words = new THREE.Group()
            words.len = 0

            Array.from(innerText).forEach((letter, j) => {
                const progress = (j) / (innerText.length - 1)

                // Three.js
                const material = new THREE.MeshPhongMaterial({
                    color: colors[i].from.lerp(colors[i].to, progress),
                    shininess: 200,
                })
                const geometry = new THREE.TextBufferGeometry(letter, options)

                geometry.computeBoundingBox()
                geometry.computeBoundingSphere()

                const mesh = new THREE.Mesh(geometry, material)

                // Get size
                mesh.size = mesh.geometry.boundingBox.getSize(new THREE.Vector3())
                mesh.size.multiply(new THREE.Vector3(0.5, 0.5, 0.5))

                // Cannon.js
                mesh.initPosition = new C.Vec3(words.len * 2, (this.$navItems.length - 1 - i) * this.margin - this.offset, 0)

                words.len += mesh.size.x

                const box = new C.Box(new C.Vec3(mesh.size.x, mesh.size.y, mesh.size.z))

                mesh.body = new C.Body({
                    mass: this.totalMass / innerText.length,
                    position: mesh.initPosition,
                    material: this.cMaterial,
                })

                mesh.body.addShape(box, new C.Vec3(mesh.geometry.boundingSphere.center.x, mesh.geometry.boundingSphere.center.y, mesh.geometry.boundingSphere.center.z))

                this.world.addBody(mesh.body)
                words.add(mesh)
            })

            words.children.forEach((letter) => { letter.body.position.x -= words.len })

            this.words.push(words)
            this.scene.add(words)
        })

        this.setConstraints()
        this.addPivots()
    }


    /* Handlers
    --------------------------------------------------------- */


    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

        document.body.style.cursor = intersects.length > 0 ? 'pointer' : ''
    }

    onClick() {
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera)

        // calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

        if (intersects.length > 0) {
            const obj = intersects[0]
            const { object, face } = obj

            if (!object.isMesh) return

            const impulse = new C.Vec3().copy(face.normal).scale(-force);

            this.words.forEach((word) => {
                word.children.forEach((letter) => {
                    const { body } = letter

                    if (letter !== object) return

                    body.applyLocalImpulse(impulse, new C.Vec3())
                })
            })
        }
    }


    /* Actions
    --------------------------------------------------------- */

    update() {
        if (!this.words) return

        this.words.forEach((word) => {
            for (let i = 0; i < word.children.length; i++) {
                const letter = word.children[i]

                letter.position.copy(letter.body.position)
                letter.quaternion.copy(letter.body.quaternion)
            }
        })
    }



    /* Values
    --------------------------------------------------------- */

    setConstraints() {
        this.words.forEach((word) => {
            for (let i = 0; i < word.children.length; i++) {
                const letter = word.children[i]
                const nextLetter = i + 1 === word.children.length ? null : word.children[i + 1]

                if (!nextLetter) continue

                const c = new C.ConeTwistConstraint(letter.body, nextLetter.body, {
                    pivotA: new C.Vec3(letter.size.x * 0.7, letter.size.y, 0),
                    pivotB: new C.Vec3(-letter.size.x * 0.7, letter.size.y, 0),
                    axisA: C.Vec3.UNIT_X,
                    axisB: C.Vec3.UNIT_X,
                    // maxForce: 1e2,
                    angle: 0,
                    twistAngle: 0,
                })
                c.collideConnected = true

                this.world.addConstraint(c)
            }
        })
    }

    addPivots() {
        this.words.forEach((word) => {
            const firstLetter = word.children[0]
            const lastLetter = word.children[word.children.length - 1]

            word.pA = new C.Body({
                mass: 0,
                position: new C.Vec3(
                    firstLetter.body.position.x - 2,
                    firstLetter.body.position.y + firstLetter.geometry.boundingSphere.center.y,
                    firstLetter.geometry.boundingSphere.center.z,
                ),
                shape: new C.Sphere(0.1),
            })

            word.pB = new C.Body({
                mass: 0,
                position: new C.Vec3(
                    lastLetter.body.position.x + lastLetter.size.x + 2.5,
                    lastLetter.body.position.y + lastLetter.geometry.boundingSphere.center.y,
                    lastLetter.geometry.boundingSphere.center.z,
                ),
                shape: new C.Sphere(0.1),
            })

            const cA = new C.ConeTwistConstraint(word.pA, firstLetter.body, {
                pivotA: new C.Vec3(2, 0.5, 0.5),
                pivotB: new C.Vec3(
                    0,
                    firstLetter.geometry.boundingSphere.center.y,
                    firstLetter.geometry.boundingSphere.center.z,
                ),
                axisA: C.Vec3.UNIT_X,
                axisB: C.Vec3.UNIT_X,
            })

            const cB = new C.ConeTwistConstraint(word.pB, lastLetter.body, {
                pivotA: new C.Vec3(-lastLetter.size.x - 2.5, 0.5, 0.5),
                pivotB: new C.Vec3(
                    0,
                    lastLetter.geometry.boundingSphere.center.y,
                    lastLetter.geometry.boundingSphere.center.z,
                ),
                axisA: C.Vec3.UNIT_X,
                axisB: C.Vec3.UNIT_X,
            })

            this.world.addConstraint(cA)
            this.world.addConstraint(cB)

            this.world.addBody(word.pA)
            this.world.addBody(word.pB)
        })
    }

}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */

const fontURL = './dist/fonts/helvetiker_bold.typeface.json'
const colors = [
    {
        from : new THREE.Color('#DF872D'),
        to   : new THREE.Color('#B35E07'),
    },
    {
        from : new THREE.Color('#e2ad76'),
        to   : new THREE.Color('#bb7d6e'),
    },
    {
        from : new THREE.Color('#5d3d42'),
        to   : new THREE.Color('#5d2d29'),
    },
]