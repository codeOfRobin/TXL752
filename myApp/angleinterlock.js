var container;

var camera, scene, renderer, controls;
var x_arr=[];
var y_arr=[];
var phiArray=[];
var noOfLayers = 3
var noOfPieBy2 = 24
theta1 = 3.14/7
var k = math.sin(3.14/4 + theta1/2)
phiB = math.asin(k/math.sqrt(2))
//phiB=0.558;
function createXnY(){
  for (var i = 0; i<100 ; i++)
  {
      phi = phiB + (noOfPieBy2*3.14/2 - phiB)/100*i

      if(math.abs(y(phi)*100 - y_arr[y_arr.length-1])<noOfPieBy2*2 || i ==0)//y_arr.length==0
      {
        x_arr.push(x(phi)*33);
        y_arr.push(y(phi)*100);
        phiArray.push(phi);
      }

  }
}
function findPeriod()
{
    zeroes = []
    for (var i = 0; i < x_arr.length; i++)
    {

        if (x_arr[i]>0 && x_arr[i+1]<0)
        {
            phi1 = phiArray[i]
            phi2 = phiArray[i+1]
            mid = (phi1+phi2)/2

            //console.log(y_arr[i]);
            //console.log(y_arr[i+1]);
            while(math.abs(x(mid))>0.01){
                if (x(mid)>0)
                {
                    phi1=mid
                }
                else {
                    phi2=mid
                }
                mid = (phi1+phi2)/2
            }
            zeroes.push(y(mid))
            if(zeroes.length==2)
            {
                break
            }
        }
    }
    //console.log(diff[0]-diff[1]);
    return zeroes[1]-zeroes[0]

}
createXnY();
var period =findPeriod()
console.log(period)

init();
animate();
console.log(x_arr.length);
function init() {

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.link = '#f80';
	info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> angle-interlock webgl - geometry extrude shapes';
	document.body.appendChild( info );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x222222 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 0, 0, 1000 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.minDistance = 20;
	controls.maxDistance = 2200;

	scene.add( new THREE.AmbientLight( 0x00ff00) );

	var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	scene.add( light );

var h1 =( FF(3.14/2) - FF(phiB) - 2*(E(3.14/2) - E(phiB)))*170
	         	// angleOfBinder
	var a=h1,ar=1
	var b = h1


	var fpi = .216+2.694307
	var bpi = .216+2.694307
	var interLayerDistance = (4*b)


	//stuffers
var spd =(period)*100/2//2*1.14*100//.216+2.694307
console.log(spd*2/100 + " spd")

	for (var i=0; i<12 ; i++ )
	{
    var stufferPoints = []
		for(var j=0; j<1 ; j++)
		{
            //var pts=x_arr
    //  pts=pts.concat(curve.getPoints(10))
      //2D to 3D conversion
      var points3d=[]
      for(var k=0;k<x_arr.length;k++)
      {
        if (i%2 == 0)
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],y_arr[k] + spd,spd*i)])
        }
        else
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],y_arr[k],spd*i)])
        }
      }

      stufferPoints = stufferPoints.concat(points3d)

      var closedSpline = new THREE.SplineCurve3(stufferPoints);
			var extrudeSettings = {
				steps			: 100,
				bevelEnabled	: false,
				extrudePath		: closedSpline
			};

			var shape = new THREE.Shape();
			shape.moveTo(0,a);
			shape.quadraticCurveTo( b,a, b,0 );
			shape.quadraticCurveTo( b,-a, 0,-a);
			shape.quadraticCurveTo(-b,-a, -b,0 );
			shape.quadraticCurveTo( -b,a, 0,a);


			var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);

			var material = new THREE.MeshLambertMaterial( { color: 0x00ffff, wireframe: false } );

			var mesh = new THREE.Mesh( geometry, material );

			scene.add( mesh );

		}
	}
  //fillers
  var fpd = (period)*100/2//2*1.14*100//

  for (var i=0; i<12 ; i++ )
  {
    var fillerPoints = []
    for(var j=0; j<1 ; j++)
    {
            //var pts=x_arr
    //  pts=pts.concat(curve.getPoints(10))
      //2D to 3D conversion
      var points3d=[]
      for(var k=0;k<x_arr.length;k++)
      {
        if (i%2 == 0)
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],fpd*i+fpd/2,y_arr[k]-fpd/2)])
        }
        else
        {
          points3d = points3d.concat([new THREE.Vector3(x_arr[k],fpd*i+fpd/2,y_arr[k]+fpd/2)])
        }
      }

      fillerPoints = fillerPoints.concat(points3d)

      var closedSpline = new THREE.SplineCurve3(fillerPoints);
      var extrudeSettings = {
        steps			: 100,
        bevelEnabled	: false,
        extrudePath		: closedSpline
      };

      var shape = new THREE.Shape();
      shape.moveTo(0,a);
      shape.quadraticCurveTo( b,a, b,0 );
      shape.quadraticCurveTo( b,-a, 0,-a);
      shape.quadraticCurveTo(-b,-a, -b,0 );
      shape.quadraticCurveTo( -b,a, 0,a);


      var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings);

      var material = new THREE.MeshLambertMaterial( { color: 0xff00ff, wireframe: false } );

      var mesh = new THREE.Mesh( geometry, material );

      scene.add( mesh );

    }
  }




}
function integrate(dif,a,b,precision)
{
    newSum = (b-a)*(dif(a) + dif(b))/2
    sum = 0
    n = 1
    // console.log(newSum);
    do
    {
        sum = newSum
        newSum =0
        n = n*2
        for (var i = 0; i < n; i++)
        {

            newSum += (b-a)/n * (dif(a+(b-a)*i/n) + dif(a+(b-a)*(i+1)/n))/2
            // console.log((b-a)/n * (dif(a+(b-a)*i/n) + dif(a+(b-a)*(i+1)/n))/2);
            // process.exit()
        }
    }while(math.abs(newSum - sum) > precision)
    return newSum
}


function chotaF(phi)
{
    return 1/math.sqrt(1 - (k*k)*(k*k)*math.pow(math.sin(phi),2))
}

function FF(phi)
{
    return integrate(chotaF,0,phi,0.0001)
}
function chotaE(phi)
{
    return math.sqrt(1 - (k*k)*(k*k)*math.pow(math.sin(phi),2))
}

function E(phiB)
{
    return integrate(chotaE,0,phiB,0.0001)
}

function x(phi)
{
    return 2*(k*k)*math.cos(phi)
}
function y(phi)
{
    return FF(3.14/2) - FF(phi) - 2*(E(3.14/2) - E(phi))
}

function psiToPhi(psi)
 {
     return math.asin(math.sin(3.14/4 + psi/2)/(k*k))
}


function animate() {

	requestAnimationFrame( animate );

	controls.update();

	renderer.render( scene, camera );

}
