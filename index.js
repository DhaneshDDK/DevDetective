let darkText = document.querySelector('.darktext');
let darkIcon = document.querySelector('#mode-icon');

let container = document.querySelector('.container');
let searchBtn = document.querySelector('.searchBtn');
const get =  (value) => document.getElementById(`${value}`);
let input = get("input");


const root = document.documentElement.style;
const url = "https://api.github.com/users/";
let darkmode = false;


function darkModeProperties(){
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("lm-shadow-xl", "rgba(70,88,109,0.15)");
  root.setProperty("brightness(100%)", "brightness(1000%)");
  // darkText.innerText = "LIGHT";
  // darkIcon.src = "./images/sun-icon.svg";
  darkmode = true;
  light.classList.remove("disable");
  dark.classList.add("disable");
}


let light = document.querySelector('.light');
let dark = document.querySelector('.dark');

function lightModeProperties(){
    root.setProperty("--lm-bg", "#f6f8ff");
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-text", "#4b6a9b");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("rgba(70,88,109,0.15)", "rgba(70, 88, 109, 0.25)");
    root.setProperty("brightness(1000%)", "brightness(100%)");
    // darkText.innerText = "DARK";
    // darkIcon.src = "./images/moon-icon.svg";
    darkmode = false;
    light.classList.add("disable");
   dark.classList.remove("disable");
    
}

function darkMode() {
    if(darkmode==false) darkModeProperties();
    else lightModeProperties();
}

searchBtn.addEventListener('click',()=>{
   if(input.value !== ""){
    // console.log(input.value)
      getUserData(url+input.value);
   }
});

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getUserData(url+input.value);
  }
});

function getUserData(gitUrl){
    fetch(gitUrl).then((response)=>(response.json())).then((data)=>{console.log(data); updateProfile(data)}).catch(error => {
     console.log(error);
    });
}

let profilePic = document.querySelector('.profilePic');
let userName = document.querySelector('.userName');
let userLink = document.querySelector('.userLink');
let dateJoined = document.querySelector('.dateJoined');
let bio = document.querySelector('.bio');
let repos = document.querySelector('.repos');
let followers = document.querySelector('.followers');
let following = document.querySelector('.following');
let userLocation = document.querySelector('.location');
let website = document.querySelector('.website');
let twitter = document.querySelector('.twitter');
let company = document.querySelector('.company');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function checkNull(param1, param2) {
  if (param1 === "" || param1 === null) {
      param2.style.opacity = 0.5;
      param2.previousElementSibling.style.opacity = 0.5;
      return false;
  } else {
    param2.style.opacity = 1;
      param2.previousElementSibling.style.opacity = 1;
    return true;
  }
}

let mainBox = document.querySelectorAll('.mainBox');
let error = document.querySelector('.error');
function updateProfile(data){

  if(data.message !== "Not Found")
 {
   mainBox.forEach((mainBox)=> mainBox.classList.remove("disable"));
   error.classList.add('disable');
   profilePic.src = `${data.avatar_url}`;
   userName.innerText =   data.name === null? data.login: data.name;
   userLink.innerHTML = '@' + data.login; 
   userLink.href = data.html_url;
   datesegments = data.created_at.split("T").shift().split("-");
   dateJoined.innerHTML = "Joined " + datesegments[2] + " " + months[datesegments[1]-1] + " " + datesegments[0];
   bio.innerHTML = data.bio == null ? "This profile has no bio" : `${data.bio}`;
   repos.innerText = `${data.public_repos}`;
   followers.innerText = `${data.followers}`;
   following.innerText = `${data.following}`;
   userLocation.innerText = checkNull(data.location, userLocation) ? data.location : "Not Available";
   console.log(data.blog);
   website.innerText = checkNull(data.blog, website) ? data.blog : "Not Available";
   website.href = checkNull(data.blog, website) ? data.blog : "#";
   twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
   twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
   company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
 }else{
  mainBox.forEach((mainBox)=> mainBox.classList.add("disable"));
  error.classList.remove('disable');
 }
}