let cx,cy;
let permissionGranted = false;

  if(window.DeviceOrientationEvent){
    window.addEventListener('deviceorientation',function(event){
      permissionGranted = true;
    },false);
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  cx = width/2;
  cy = height/2;

  if(typeof(DeviceOrientationEvent)!='undefined'&&typeof(DeviceOrientationEvent.requestPermission)==='function'){
    
    DeviceOrientationEvent.requestPermission()
    .catch(()=>{
      let button = createButton('click to allow access to snsors');
      button.style("font-size","24px");
      button.center();
      button.mousePressed(requestAccess);
      throw error;
    })
    .then(()=>{
      permissionGranted = true;
    })

  }
  else{
    textSize(48);
    text("non ios",100,100)
  }
}

function requestAccess(){
  DeviceOrientationEvent.requestPermission()
  .then(response=>{
    if(response=='granted'){
      permissionGranted = true;
      this.remove();
    }
    else{
      permissionGranted = false;
    }
  })
  .catch(console.error);
  
  
}

function draw() {
  if(!permissionGranted) {
    return
  }
  else{
    background(215);
    
    const dx = constrain(rotationY,-3,3);
    const dy = constrain(rotationX,-3,3);
    cx += dx;
    cy += dy;
    
    ellipse(cx,cy,200,200);
    // textSize(48);
    // text(rotationX,100,100);
  }

}
// DeviceOrientationEvent.requestPermission()
// .then(response => {
//   if (response == 'granted') {
//     if(window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', function(event) {
//       var a = document.getElementById('alpha'),
//               b = document.getElementById('beta'),
//               g = document.getElementById('gamma'),
//               alpha = event.alpha,
//               beta = event.beta,
//                   gamma = event.gamma;
    
//       a.innerHTML = Math.round(alpha);
//       b.innerHTML = Math.round(beta);
//       g.innerHTML = Math.round(gamma);
    
//         }, false);
//     }else{
//         document.querySelector('body').innerHTML = '你的瀏覽器不支援喔';
//         document.getElementById('gambbbma').style.display="none";
//     }

//   }
// })
// .catch(console.error)