import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HomeContainer extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        /********************************************
        loader page time out js
        *********************************************/
        const loader = document.getElementsByClassName("loader-container");
        const content = document.getElementsByClassName("content");
        const mainPageContainer = document.getElementsByClassName("main-page-container");
        setTimeout(function() {
            loader[0].style.display = "none";
            loader[0].style.height = "0";
            content[0].style.visibility = "visible";
            content[0].style.height = "100%";
            mainPageContainer[0].style.visibility = "visible";
            mainPageContainer[0].style.height = "200px";
        }, 600);
        $('.main-button').click(function() {
            $(this).parents('.slide').toggleClass('is-transitioned');
        });
        $('.home').click(function() {
            $(this).parents('.slide').toggleClass('is-transitioned');
        });
        /********************************************
        fish bowl orbit control js
        *********************************************/
        var Boid = function() {
            this.position = new THREE.Vector3();
            this.velocity = new THREE.Vector3();
            this.acceleration = new THREE.Vector3();
        
            this.move = function(boids) {
                this.acceleration.add(this.cohesion(boids));
                this.acceleration.add(this.separation(boids));
                this.acceleration.add(this.alignment(boids));
                this.acceleration.add(this.avoidWalls());
                this.velocity.add(this.acceleration);
                this.acceleration.set(0, 0, 0);
                this.limitVelocity();
                this.position.add(this.velocity);
            }
        
            this.limitVelocity = function() {
                if (this.velocity.length() > Boid.MAX_VELOCITY) {
                    this.velocity.normalize().multiplyScalar(Boid.MAX_VELOCITY);
                }
            }
        
            this.cohesion = function(boids) {
                var count = 0;
                var positionSum = new THREE.Vector3();
            
                for (var i = 0; i < boids.length; i++) {
                    var distance = boids[i].position.distanceTo(this.position);
            
                        if (distance > 0 && distance <= Boid.NEIGHBOR_RADIUS) {
                            positionSum.add(boids[i].position);
                            count++;
                        }
                }
                if (count > 0) {
                    var averagePosition = positionSum.divideScalar(count);
                    return averagePosition.sub(this.position).multiplyScalar(Boid.COHESION_MULTIPLIER);
                }
                return new THREE.Vector3();
            }
        
        
            this.separation = function(boids) {
                var count = 0;
                var separationSum = new THREE.Vector3();
                var separation = new THREE.Vector3();
            
                for (var i = 0; i < boids.length; i++) {
                    var distance = boids[i].position.distanceTo(this.position);
            
                    if (distance > 0 && distance <= Boid.SEPARATION_RADIUS) {
                    separation.subVectors(this.position, boids[i].position);
                    separation.normalize();
                    separation.divideScalar(distance);
                    separationSum.add(separation);
                    count++;
                    }
                }
                return separationSum.multiplyScalar(Boid.SEPARATION_MULTIPLIER);
            }
        
            this.alignment = function(boids) {
                var count = 0;
                var velocitySum = new THREE.Vector3();
            
                for (var i = 0; i < boids.length; i++) {
                    var distance = boids[i].position.distanceTo(this.position);
            
                        if (distance > 0 && distance <= Boid.NEIGHBOR_RADIUS) {
                            velocitySum.add(boids[i].velocity);
                            count++;
                        }
                }
                if (count > 0) {
                    var averageVelocity = velocitySum.divideScalar(count);
                    return averageVelocity.multiplyScalar(Boid.ALIGNMENT_MULTIPLIER);
                }
                return new THREE.Vector3();
            }
        
            this.avoid = function(obstacle) {
                var v = new THREE.Vector3();
                v.subVectors(this.position, obstacle);
                v.multiplyScalar(1 / (4*this.position.distanceToSquared(obstacle)));
                return v;
            }
        
            this.avoidWalls = function() {
                var v = new THREE.Vector3();
            
                v.add(this.avoid(new THREE.Vector3(-Boid.X_RANGE, this.position.y, this.position.z)));
                v.add(this.avoid(new THREE.Vector3( Boid.X_RANGE, this.position.y, this.position.z)));
            
                v.add(this.avoid(new THREE.Vector3(this.position.x, -Boid.Y_RANGE, this.position.z)));
                v.add(this.avoid(new THREE.Vector3(this.position.x,  Boid.Y_RANGE, this.position.z)));
            
                v.add(this.avoid(new THREE.Vector3(this.position.x, this.position.y, -Boid.Z_RANGE)));
                v.add(this.avoid(new THREE.Vector3(this.position.x, this.position.y,  Boid.Z_RANGE)));
            
                return v.multiplyScalar(Boid.WALLS_MULTIPLIER);
            }
        }
        
        
        // Static props & functions
        Boid.NEIGHBOR_RADIUS;
        Boid.SEPARATION_RADIUS;
        Boid.MAX_VELOCITY = 0.4;
        Boid.X_RANGE;
        Boid.Y_RANGE;
        Boid.Z_RANGE;
        Boid.COHESION_MULTIPLIER;
        Boid.SEPARATION_MULTIPLIER;
        Boid.ALIGNMENT_MULTIPLIER;
        Boid.WALLS_MULTIPLIER;
        
        
        
        Boid.update = function(props) {
            Boid.NEIGHBOR_RADIUS = props.neighborRadius;
            Boid.SEPARATION_RADIUS = props.separationRadius;
            Boid.COHESION_MULTIPLIER = props.cohesion;
            Boid.SEPARATION_MULTIPLIER = props.separation;
            Boid.ALIGNMENT_MULTIPLIER = props.alignment;
            Boid.WALLS_MULTIPLIER = props.avoidWalls;
        
            Boid.X_RANGE = props.xRange;
            Boid.Y_RANGE = props.yRange;
            Boid.Z_RANGE = props.zRange;
        }
        
        
        
        
        
        
        
        var scene, renderer, camera, controls;
        
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight,
            PIXEL_RATIO = window.devicePixelRatio || 1;
        
        var BG_COLOR = 0x111c2d;

        var props = new function() {
            this.neighborRadius = 13;
            this.separationRadius = 16;
            this.cohesion = 0.1;
            this.separation = 0.4;
            this.alignment = 0.1;
            this.avoidWalls = 1;
            this.showWalls = false;
            this.xRange = 60;
            this.yRange = 50;
            this.zRange = 60;
        }


        var BOID_COUNT = 80;
        var walls, boid, boids = [], fish = [];

        function initScene() {
            scene = new THREE.Scene();
            //scene.fog = new THREE.Fog(BG_COLOR, 50, 350);
        
            camera = new THREE.PerspectiveCamera(15, WIDTH/HEIGHT, .1, 2000);
            camera.position.z = 200;
        
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setClearColor(BG_COLOR);
            renderer.setPixelRatio(PIXEL_RATIO);
            renderer.setSize(WIDTH, HEIGHT);
        
            var container = document.getElementById('scene');
            container.appendChild(renderer.domElement);
        
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.15;
            controls.enableZoom = false;
            controls.enablePan = false;
        
            scene.add(camera);
        
            var directionalLightlight = new THREE.DirectionalLight( 0xFFFFFF, 1 );
            var ambientLight = new THREE.AmbientLight( 0x888888 ); // soft white light
        
            scene.add(directionalLightlight);
            scene.add(ambientLight);
        
            walls = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({ wireframe: true, color: 0xaaaaaa }));
        
            scene.add(walls)
        
            var geometry = new THREE.ConeGeometry(0.5, 2, 6);
            geometry.rotateX(Math.PI/2);
            var material = new THREE.MeshPhongMaterial({ color: 0x2FA1D6 });
        
            for (var i = 0; i < BOID_COUNT; i++) {
                boid = boids[i] = new Boid();
            
                boid.position.x = Math.random() * 100 - 50;
                boid.position.y = Math.random() * 100 - 50;
                boid.position.z = Math.random() * 100 - 50;
                boid.velocity.x = Math.random() * 2 - 1;
                boid.velocity.y = Math.random() * 2 - 1;
                boid.velocity.z = Math.random() * 2 - 1;
                fish[i] = new THREE.Mesh(geometry, material);
            
                scene.add(fish[i]);
            }
        
            loop();
        }
        
        function loop() {
            controls.update();
            render();
        
            requestAnimationFrame(loop);
        }
        
        function render() {
            for (var i = 0; i < boids.length; i++) {
                boid = boids[i];
                boid.move(boids);
                fish[i].position.copy(boid.position);
                var aimP = new THREE.Vector3();
                aimP.copy(fish[i].position).add(boid.velocity);
                fish[i].lookAt(aimP);
            }
            renderer.render(scene, camera);
        }
        
        function updateScene() {
            walls.visible = props.showWalls;
            walls.scale.set(props.xRange*2, props.yRange*2, props.zRange*2);
            Boid.update(props);
        }
        
        function updateSize() {
            WIDTH = window.innerWidth;
            HEIGHT = window.innerHeight;
            PIXEL_RATIO = window.devicePixelRatio || 1;
            camera.aspect = WIDTH / HEIGHT;
        
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(PIXEL_RATIO);
            renderer.setSize(WIDTH, HEIGHT);
        }
        
        initScene();
        updateScene();

        window.onresize = updateSize;
    }
    render() {
        return (
            <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <div className="loader-container">
                    <div className="spinner pulser"></div>
                </div>
                <div className="content">
                    <div id="scene"></div>
                </div>
                <div className="main-page-container">
                    <div className="title">
                        <h2>Hello, I'm </h2><span>Lue Hang. <br/></span>
                        <h2>I'm a web and software <br/> developer.</h2>
                    </div>
                    <div className="main-button"> 
                        <p>MORE </p>
                        <p><i className="fa fa-arrow-down" aria-hidden="true"></i></p>
                    </div>
                </div>
            </div>
        );
    }
}