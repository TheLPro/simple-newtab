var form = document.getElementById('form');
var urlinput = document.getElementById('urlinp');
var searchbutton = document.getElementById('searchbtn');
var closepopupbutton = document.getElementById('closepopup');

var settings = document.getElementById('settings');
var popup = document.getElementById('popup');
var primarycolor = document.getElementById('primarycolor');
var toggletheme = document.getElementById('toggletheme');

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
  if (localStorage.getItem('theme')) {
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
  }

  if (!localStorage.getItem('primarycolor')) {
    localStorage.setItem('primarycolor', '#000');
  }
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
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
primarycolor.addEventListener('input', function () {
  console.log(primarycolor.value);
  document.body.style.setProperty('--primary-color', primarycolor.value);
  localStorage.setItem('primarycolor', primarycolor.value);
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