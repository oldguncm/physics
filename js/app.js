//some settings
var app = {
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: '#canvas'
}

var cam = {
	angle: 45,	//45 by default
	aspect: app.width/app.height,
	near: 0.1,
	far: 10000,
	//cam start position in m
	cameraPosition: new THREE.Vector3(0, 10, 5),
	//target that the camera will look at and be a child of
	//used only at creation time
	targetPosition: new THREE.Vector3(0, 0, 0)
}

var mouseX = 0, mouseY = 0;

$(document).ready(function() {
	//stats widget
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms
	$(app.canvas).append(stats.domElement);

	// create a WebGL renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(app.width, app.height);
	$(app.canvas).append(renderer.domElement);

	//a scene
	scene = new THREE.Scene();

	//camera maybe?
	camera = new THREE.PerspectiveCamera(
		cam.angle,
		cam.aspect,
		cam.near,
		cam.far);
	camera.position = cam.cameraPosition.clone();
	scene.add(camera);

	//we also include some ambient lighting
	var ambient = new THREE.AmbientLight( 0x202020 ); // soft white light
	scene.add( ambient );

	var point = new THREE.PointLight(0xcccccc);
	point.position.y = 5;
	scene.add( point );

	//basic materials
	var matBasic = new THREE.MeshBasicMaterial({color:0xccccff});
	var matLambert = new THREE.MeshLambertMaterial({color:0xccddff});

	//elements
	var geom = new THREE.PlaneGeometry(20, 20);
	var ground = new THREE.Mesh( geom, matLambert);
	ground.rotation.x = -Math.PI/2;
	scene.add(ground);

	geom = new THREE.CubeGeometry(5, 5);
	var cube01 = new THREE.Mesh( geom, matBasic );
	scene.add(cube01);

	var axis = new THREE.AxisHelper(5);
	axis.position.y = 0.1;	//just above the surface
	scene.add( axis );


	////////////////// EVENTS ////////////////
	// window.addEventListener("mousemove", app.events.mousePosOnCanvas);
	// window.addEventListener("mouseup", app.events.mouseUp);
	// window.addEventListener("mousedown", app.events.mouseDown);
	function onDocumentMouseMove( event ) {
		mouseX = ( event.clientX - app.width/2 );
		mouseY = ( event.clientY/2 - app.height/2 );
	}
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );


	////////////////// Rendering ////////////////
	
	//rendering function called in loop
	function render() {
		stats.begin();

		//camera positionning
		camera.position.x = ( mouseX - camera.position.x ) * 0.1;
		camera.position.y = ( - mouseY - camera.position.y ) * 0.1;
		camera.lookAt( scene.position );
		
		requestAnimationFrame(render);
		renderer.render( scene, camera );

		stats.end();
	}

	//////////////////////////////
	
	//launch the thing!	
	render();
});