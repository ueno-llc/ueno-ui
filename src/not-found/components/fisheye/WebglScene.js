import 'gsap/CSSPlugin';

import * as THREE from 'three';
import TimelineLite from 'gsap/TimelineLite';

export default class WebglScene {

  constructor(container, statsEl, webglClassName, src) {
    window.THREE = THREE;

    // scene set up
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    this.camera.far = 10000;
    this.camera.position.z = 22;
    this.controls = null;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.myRequestAnimationFrame = null;

    // canvas background to transparent
    this.renderer.setClearColor(0xffffff);

    // dom element
    this.container = container;
    this.statsEl = statsEl;
    this.webglClassName = webglClassName;

    // materials
    this.material = null;

    // groups
    this.globalGroup = new THREE.Group();

    // geometries
    this.nbSegments = 32;
    this.sphereMesh = null;

    // video
    this.video = null;

    // mousemove
    this.mousemoveX = 0;
    this.mousemoveY = 0;
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.orientationX = 0;
    this.orientationY = 0;
    this.orientation = {
      x: 0,
      y: 0,
    };

    // flags
    this.flagPlaying = false;
    this.forcePlaying = false;

    // functions
    this.resizeCanvas();
    this.createVideoTexture(src);
    this.createRoom();

    this.renderScene(1);

    this.scene.add(this.globalGroup);
  }

  createVideoTexture(src) {
    // texture video
    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.volume = 0;
    this.video.src = src;
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
    this.video.play();

    // wait for the video to start playing to avoid black frame
    this.video.addEventListener('playing', () => {
      if (!this.flagPlaying) {
        this.flagPlaying = true;
        this.introAnimation();
      }
    });

    this.textureFisheye = new THREE.VideoTexture(this.video);
    this.textureFisheye.minFilter = THREE.LinearFilter;
    this.textureFisheye.magFilter = THREE.LinearFilter;
    this.textureFisheye.format = THREE.RGBFormat;

    this.material = new THREE.MeshBasicMaterial({
      map: this.textureFisheye,
      transparent: true,
      opacity: 0,
    });
  }

  forcePlayVideo() {
    if (this.video !== null && !this.forcePlaying) {
      this.forcePlaying = true;
      this.video.play();
    }
  }

  createRoom() {
    const sphereGeometry = new THREE.SphereBufferGeometry(5, this.nbSegments, this.nbSegments);

    this.sphereMesh = new THREE.Mesh(sphereGeometry, this.material);
    this.sphereMesh.scale.set(-1, 1, 1);
    this.sphereMesh.rotation.x = -0.56;
    this.sphereMesh.rotation.y = -1;

    this.globalGroup.add(this.sphereMesh);
  }

  renderScene(myPixelRatio) {
    this.renderer.sortObjects = true;

    // this.controls = new OrbitControls(this.camera);

    this.renderer.setPixelRatio(myPixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.className = this.webglClassName;
    this.container.insertBefore(this.renderer.domElement, this.statsEl);

    this.render();
  }

  clearScene() {
    this.scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (object.material.map) {
          object.material.map.dispose();
        }
        object.material.dispose();
      }
      this.scene.remove(object);
    });

    if (window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.myRequestAnimationFrame);
    }

    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.renderer = null;
  }

  introAnimation() {
    const t = new TimelineLite();

    t.to(this.material, 1, { opacity: 1, ease: 'Power4.easeInOut', delay: 0.2 });
    t.to(this.camera.position, 2.2, { z: 5, ease: 'Power4.easeInOut', delay: 0.5 });
  }

  resizeCanvas() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  updateMouseMove(mousemoveX, mousemoveY) {
    this.mousemoveX = mousemoveX;
    this.mousemoveY = mousemoveY;
  }

  updateOrientation(x, y) {
    this.orientationX = this.betweenVal(-0.4, 1, (x / 8));
    this.orientationY = y / 6;
  }

  betweenVal(min, max, param) {
    if (param < min) {
      return min;
    } else if (param > max) {
      return max;
    }

    return param;
  }

  mousemoveLoopAnimation() {
    this.mouse.x = (0.08 * ((this.mousemoveX / 3000) - this.mouse.x)) + this.mouse.x;
    this.mouse.y = (0.08 * ((this.mousemoveY / 6000) - this.mouse.y)) + this.mouse.y;

    this.orientation.x = (0.06 * ((this.orientationX) - this.orientation.x)) + this.orientation.x;
    this.orientation.y = (0.06 * ((this.orientationY) - this.orientation.y)) + this.orientation.y;

    this.globalGroup.position.y = (-this.orientation.y);
    this.globalGroup.rotation.x = (-this.mouse.y);
    this.globalGroup.rotation.y = (-this.mouse.x * 2.2) + (this.orientation.x * 2);
  }

  render = () => {
    this.renderer.render(this.scene, this.camera);

    if (this.controls !== null) {
      this.controls.update();
    }

    this.mousemoveLoopAnimation();

    this.myRequestAnimationFrame = requestAnimationFrame(this.render);
  }
}
