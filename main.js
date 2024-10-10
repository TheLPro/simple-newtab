var emptyRecent = `
{
   "recents":[
   ]
}
`
var recents;
var recentdiv = document.querySelector('.recent');

var form = document.getElementById('form');
var urlinput = document.getElementById('urlinp');
var searchbutton = document.getElementById('searchbtn');
var closepopupbutton = document.getElementById('closepopup');

var settings = document.getElementById('settings');
var popup = document.getElementById('popup');
var primarycolor = document.getElementById('primarycolor');
var secondarycolor = document.getElementById('secondarycolor');
var toggletheme = document.getElementById('toggletheme');
var keepcontent = document.getElementById('keepcontent');
var focussearch = document.getElementById('focussearch');
var showrecents = document.getElementById('showrecents');
var recentamount = document.getElementById('recentamount');
var recentamountint;
var resetsettings = document.getElementById('resetsettings');

if (!localStorage.getItem('recents')) {
  localStorage.setItem('recents', emptyRecent);
  recents = JSON.parse(localStorage.getItem('recents'));
} else {
  var recents = JSON.parse(localStorage.getItem('recents'));
  console.log(recents);
}

window.addEventListener("resize", function () {
  console.log(window.innerWidth);
});

checkRecentsOverflow();
showRecents();
window.onload = function () {

for (var i = 0; i < recents.recents.length; i++) {
    console.log(recents.recents[i][0]);
    console.log(recents.recents[i][1]);
  }

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }
  if (!localStorage.getItem('primarycolor') && localStorage.getItem('theme') === 'light') {
    localStorage.setItem('primarycolor', '#000');
  }
  if (!localStorage.getItem('secondarycolor') && localStorage.getItem('theme') === 'light') {
    localStorage.setItem('secondarycolor', '#000');
  }
  if (!localStorage.getItem('primarycolor') && localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('primarycolor', '#fff');
  }
  if (!localStorage.getItem('secondarycolor') && localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('secondarycolor', '#fff');
  }
  if (!localStorage.getItem('keepcontent')) {
    localStorage.setItem('keepcontent', 'true');
  }
  if (!localStorage.getItem('focussearch')) {
    localStorage.setItem('focussearch', 'false');
  }
  if (!localStorage.getItem('showrecents')) {
    localStorage.setItem('showrecents', 'true');
  }
  if (!localStorage.getItem('recentamount')) {
    localStorage.setItem('recentamount', '5');
    recentamountint = 5;
  }
  if (localStorage.getItem('primarycolor')) {
    document.body.style.setProperty(
      '--primary-color',
      localStorage.getItem('primarycolor'),
    );
    primarycolor.value = localStorage.getItem('primarycolor');
  }
  if (localStorage.getItem('secondarycolor')) {
    document.body.style.setProperty(
      '--secondary-color',
      localStorage.getItem('secondarycolor'),
    );
    secondarycolor.value = localStorage.getItem('secondarycolor');
  }
  if (localStorage.getItem('theme')) {
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
  }
  if (localStorage.getItem('keepcontent') === 'false') {
    keepcontent.checked = false;
  }
  if (localStorage.getItem('keepcontent') === 'true') {
    keepcontent.checked = true;
  }
  if (localStorage.getItem('focussearch') === 'false') {
    focussearch.checked = false;
  }
  if (localStorage.getItem('focussearch') === 'true') {
    focussearch.checked = true;
  }
  if (localStorage.getItem('showrecents') === 'false') {
    showrecents.checked = false;
  }
  if (localStorage.getItem('showrecents') === 'true') {
    showrecents.checked = true;
  }
  if (focussearch.checked) {
    if (location.search !== "?x") {
      location.search = "?x";
      throw new Error;  // load everything on the next page;
      // stop execution on this page
    };
  }
  if (localStorage.getItem('showrecents') === 'false') {
    recentdiv.style.display = 'none';
  }
  if (localStorage.getItem('recentamount')) {
    recentamount.value = localStorage.getItem('recentamount');
    recentamountint = localStorage.getItem('recentamount');
  }
};
if (!keepcontent.checked) {
  urlinput.value = '';
}
closepopupbutton.addEventListener('click', function () {
  popup.classList.remove('active');
});

settings.addEventListener('click', function () {
  popup.classList.toggle('active');
});

form.addEventListener('submit', function (e) {
  var textFormat = urlinput.value;
  var httpFormat = urlinput.value.replaceAll(' ', '+');
  e.preventDefault();
  console.log(urlinput.value);
  if (urlinput.value === '') {
    return false;
  }

  if (
    urlinput.value.startsWith('http://') ||
    urlinput.value.startsWith('https://')
  ) {
    addToRecent(httpFormat, textFormat);
    window.location.href = httpFormat;
    return true;
  }
  if (
    urlinput.value.startsWith('www.')
  ) {
    addToRecent(httpFormat, textFormat);
    window.location.href = `https://${httpFormat}`;
    return true;
  }
  if (
    checkIfDomain(urlinput.value)
  ) {
    localStorage.setItem('e', httpFormat);
    addToRecent(httpFormat, textFormat);
    window.location.href = `https://${httpFormat}`;
    return true;
  }
  var url = `https://www.google.com/search?q=${textFormat}`;
  addToRecent(url, textFormat);
  window.location.href = url;

  return true;
});
primarycolor.value = document.body.style.getPropertyValue('--primary-color');
primarycolor.addEventListener('input', function () {
  console.log(primarycolor.value);
  document.body.style.setProperty('--primary-color', primarycolor.value);
  localStorage.setItem('primarycolor', primarycolor.value);
});
secondarycolor.value = document.body.style.getPropertyValue('--secondary-color');
secondarycolor.addEventListener('input', function () {
  console.log(secondarycolor.value);
  document.body.style.setProperty('--secondary-color', secondarycolor.value);
  localStorage.setItem('secondarycolor', secondarycolor.value);
});

toggletheme.addEventListener('click', function () {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    return;
  }
  if (document.body.getAttribute('data-theme') === 'light') {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    return;
  }
});
keepcontent.addEventListener('click', function () {
  if (keepcontent.checked) {
    localStorage.setItem('keepcontent', 'true');
    return;
  }
  if (!keepcontent.checked) {
    localStorage.setItem('keepcontent', 'false');
    return;
  }
});
focussearch.addEventListener('click', function () {
  if (focussearch.checked) {
    localStorage.setItem('focussearch', 'true');
    return;
  }
  if (!focussearch.checked) {
    localStorage.setItem('focussearch', 'false');
    return;
  }
});
showrecents.addEventListener('click', function () {
  if (showrecents.checked) {
    localStorage.setItem('showrecents', 'true');
    recentdiv.style.display = 'flex';
    showRecents();
    return;
  }
  if (!showrecents.checked) {
    localStorage.setItem('showrecents', 'false');
    recentdiv.style.display = 'none';
    return;
  }
});
recentamount.addEventListener('input', function () {
  localStorage.setItem('recentamount', recentamount.value);
  recentamountint = localStorage.getItem('recentamount');
  checkRecentsOverflow();
});
resetsettings.addEventListener('click', function () {
  localStorage.clear();
  location.reload();
});
function saveRecents() {
  checkRecentsOverflow();
  localStorage.setItem('recents', JSON.stringify(recents));
}
function addToRecent(url, value) {
  console.log(recents);
  recents.recents.unshift([url, value]);
  saveRecents();
}
function showRecents() {
  if (recents.recents.length === 0) {
    return;
  }
  var newrecent;
  for (var i = 0; i < recents.recents.length; i++) {
    newrecent = document.createElement('a');
    var url = recents.recents[i][0];
    var value = recents.recents[i][1];
    if (!url.startsWith('https://')) {
      url = `https://${url}`;
    }
    newrecent.href = url;
    newrecent.textContent = value;
    recentdiv.appendChild(newrecent);
    console.log(newrecent)
  }
}
function checkRecentsOverflow() {
  var length = recents.recents.length;
  for (var i = 0; i < length; i++) {
    if (recents.recents.length > recentamountint) {
      recents.recents.pop();
    }
  }
}
function clearRecents() {
  recents.recents = [];
  saveRecents();
  location.reload();
}
function checkIfDomain(url) {
  if (url.split('.').length < 2) {
    return false;
  }
  var domain = url.split('.')[1];
  return fetch("tlds.txt")
    .then(response => response.text())
    .then((response) => {
      var tldsList = response.split('\n');
      for (var i = 0; i < tldsList.length; i++) {
        if (domain.toUpperCase() === tldsList[i].toUpperCase()) {
          return true;
        }
      }
      return false;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
}