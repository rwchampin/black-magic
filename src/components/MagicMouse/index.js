export const MagicMouse = (props) => {
    const material = useRef();
    const geometry = useRef();
    const addObjects = () => {
        let that = this;
        material.current = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: "f", value: 0 },
                resolution: { type: "v4", value: new THREE.Vector4() },
            },
            vertexShader: `
        
        `,
            fragmentShader: `

        `
        });
        geometry.current = new THREE.PlaneGeometry(1, 1, 1, 1);

        for (let i = 0; i < 1000; i++) {
            let path = new THREE.CatmullRomCurve3(
                getCurve(
                    new THREE.Vector3(
                        i / 100,
                        0,
                        0
                    ),
                )
            );
        }

        let geometry = new THREE.TubeGeometry(path, 600, 0.005, 8, false);
        let curve = new THREE.Mesh(geometry, material.current);

    }
}