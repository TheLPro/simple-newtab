var form = document.getElementById('form');
var urlinput = document.getElementById('urlinp');
var searchbutton = document.getElementById('searchbtn');
var closepopupbutton = document.getElementById('closepopup');

var settings = document.getElementById('settings');
var popup = document.getElementById('popup');
var primarycolor = document.getElementById('primarycolor');
var secondarycolor = document.getElementById('secondarycolor');

var styles = getComputedStyle(document.body);

window.onload = function () {
  urlinput.focus();

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
};

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

primarycolor.value = styles.getPropertyValue('--primary-color');
secondarycolor.value = styles.getPropertyValue('--secondary-color');

primarycolor.addEventListener('input', function () {
  console.log(primarycolor.value);
  document.body.style.setProperty('--primary-color', primarycolor.value);
  localStorage.setItem('primarycolor', primarycolor.value);
});

secondarycolor.addEventListener('input', function () {
  console.log(secondarycolor.value);
  document.body.style.setProperty('--secondary-color', secondarycolor.value);
  localStorage.setItem('secondarycolor', secondarycolor.value);
});
