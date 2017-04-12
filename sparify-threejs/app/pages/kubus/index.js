var diffhtml = require('diffhtml');
var yo = require('yo-yo');
var THREE = require('three');
var TrackballControls = require('three-trackballcontrols');

module.exports = function() {
  require('./index.css');

  console.log(THREE);

  var html = yo`
    <div class="wrapper">
      <div class="btn_utama">
        <div class="lingkar">
          <a href="../../index.html"><img src="assets/i/home.png"></a>
        </div>
        <div class="lingkar" style="margin-left: 70px;">
          <a href="../index.html"><img src="assets/i/edit.png"></a>
        </div>
      </div>
      <img src="assets/i/header.png" class="header">
      <div class="menu">
        <a href="/hoho">Pengertian</a>
      </div>
      <div class="menu">
        <a href="sifat/index.html">Sifat</a>
      </div>
      <div class="menu">
        <a href="#">Rumus dan Contoh</a>
      </div>
      <div class="menu">
        <a href="#">Contoh Soal</a>
      </div>
      <div class="kotak1">
        <img src="assets/i/header1.png" class="header1">
      </div>
      <div class="kotak2">
        <div id="container"></div><div class="kecil">
				  <img src="assets/i/kursor.png" class="ikon">
				  <img src="assets/i/kubus.png" class="ikon">
				  <img src="assets/i/teks.png" class="ikon">
			  </div>
		  </div>
	  </div>
  `;

  diffhtml.innerHTML(document.getElementById('app'), html);

  var container, camera, controls, scene, renderer;

  init();
  render();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;

    controls = new TrackballControls( camera );
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.addEventListener('change', render);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

    var geometry = new THREE.CubeGeometry(100, 100, 100);
    //var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );
    var material = new THREE.MeshFaceMaterial([
      new THREE.MeshBasicMaterial({
      color: 0x00ff00
      }),
      new THREE.MeshBasicMaterial({
      color: 0xff0000
      }),
      new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      }),
      new THREE.MeshBasicMaterial({
      color: 0xffff00
      }),
      new THREE.MeshBasicMaterial({
      color: 0x00ffff
      }),
      new THREE.MeshBasicMaterial({
      color: 0xff00ff
      })
    ]);

    var mesh = new THREE.Mesh( geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( scene.fog.color );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(800,400);
    container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );
    //document.body.appendChild(renderer.domElement);
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
  }

  function render() {
    renderer.render(scene,camera);
  }
};