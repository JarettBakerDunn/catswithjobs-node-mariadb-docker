const loginButton = document.getElementById("loginbutton");
const signupButton = document.getElementById("signupbutton");
const paragraph = document.querySelector('p1');
const username = document.getElementById("name");
const password = document.getElementById("passwordenter");
const loginErrorBlock = document.getElementById("loginErrorBlock");
//const testButton = document.getElementById("testbutton");

function updateLoginButton() {
  if (username.value != "" && password.value != ""){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", loginReqListener);
    oReq.open("POST", "./user/" + username.value + "/" + password.value);
    oReq.send();
  } else {
    loginErrorBlock.innerHTML = "must enter a username and password.";
    loginErrorBlock.style.visibility = "visible";
  }
}

function updateSignupButton() {
  if (username.value != "" && password.value != ""){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", signupReqListener);
    oReq.open("POST", "./createuser/" + username.value + "/" + password.value);
    oReq.send();
  } else {
    loginErrorBlock.innerHTML = "must enter a username and password.";
    loginErrorBlock.style.visibility = "visible";
  }
}

loginButton.addEventListener('click', updateLoginButton);
signupButton.addEventListener('click', updateSignupButton);
testButton.addEventListener('click', submitCatToServer);


function loginReqListener () {
    var responses = new Array();
    responses = JSON.parse(this.responseText);
    console.log(responses);

    if (responses.accountExists != false){
      console.log("cats retrieved: " + responses.length);
      sessionStorage.clear();
      
      sessionStorage.setItem('polaroidCount',responses.length);//this is for the gallery so it knows how many polaroids to construct
      //put all the cat information in the session storage
      for (i =0; i < responses.length; i++){
        var catObject = responses[i];
        var keyNumber = i + 1;
        sessionStorage.setItem('catName'+keyNumber,catObject.catName);
        sessionStorage.setItem('cat'+keyNumber,catObject.catPalletteName);
        sessionStorage.setItem('hat'+keyNumber,catObject.catHat);
        sessionStorage.setItem('pants'+keyNumber,catObject.catPants);
        sessionStorage.setItem('polaroidBG'+keyNumber,catObject.catPolaroidBG);
        sessionStorage.setItem('shirt'+keyNumber,catObject.catShirt);
        sessionStorage.setItem('catShoes'+keyNumber,catObject.catShoes);
      }

      location.href = '../dist/index.html';
      storeCurrentCredentials();
    } else {
      loginErrorBlock.innerHTML = "Incorrect username/password.";
      loginErrorBlock.style.visibility = "visible";
    }
}

function signupReqListener () {

  if (this.responseText == "created") {
    location.href = '../dist/index.html';
    storeCurrentCredentials();
  } else {
    loginErrorBlock.innerHTML = "username already exists. Press log in to log in using these credentials.";
    loginErrorBlock.style.visibility = "visible";
  }

}
//for future API calls made after the user logs in for the first time
function storeCurrentCredentials(){

  sessionStorage.setItem('currentUserName',username.value)
  sessionStorage.setItem('currentUserPassword',password.value)

}
//testing function. This is also in the game portion, but hard to find in the bundled file.
function submitCatToServer(){

  console.log('sending cat to server')

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "./dist/addcat/" + "johnny" + "/" + "password");
  oReq.addEventListener("load", submitReqListener);
  oReq.setRequestHeader('Content-Type', 'application/json');
  var testcat = {
    catName : 'Mr. Tester',
    catPalletteName : 'catanimated2-lime',
    catHat : 'hat4',
    catPants : 'pants4',
    polaroidBG : 'scenery1',
    catShirt : 'shirt4',
    catShoes : 'shoes4',
  }

  oReq.send(JSON.stringify(testcat));
}
//testing function listener
function submitReqListener(){

  console.log(JSON.parse(this.responseText));

}