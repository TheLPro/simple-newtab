var form = document.getElementById('form');
var urlinput = document.getElementById('urlinp');
var searchbutton = document.getElementById('searchbtn');
var closepopupbutton = document.getElementById('closepopup');

var settings = document.getElementById('settings');
var popup = document.getElementById('popup');
var primarycolor = document.getElementById('primarycolor');
var secondarycolor = document.getElementById('secondarycolor');

closepopupbutton.addEventListener('click', function () {
  popup.classList.remove('active');
});

settings.addEventListener('click', function () {
  popup.classList.toggle('active');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(urlinput.value);
  if (urlinput.value === '') {
    return false;
  }

  if (
    urlinput.value.includes('http://') ||
    urlinput.value.includes('https://')
  ) {
    window.location.href = urlinput.value;
    return true;
  }

  window.location.href = `https://www.google.com/search?q=${urlinput.value}`;

  return true;
});
