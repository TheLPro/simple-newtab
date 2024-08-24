var form = document.getElementById('form');
var urlinput = document.getElementById('urlinp');
var searchbutton = document.getElementById('searchbtn');

var settings = document.getElementById('settings');
var popup = document.getElementById('popup');
var primarycolor = document.getElementById('primarycolor');
var secondarycolor = document.getElementById('secondarycolor');

popup.style.display = 'none';

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(urlinput.value);

  window.location.href = `https://www.google.com/search?q=${urlinput.value}`;

  return true;
});
