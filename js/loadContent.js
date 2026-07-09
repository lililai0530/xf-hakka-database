// 点击导航切换视图
async function loadAbout() {
  const res = await fetch('about-content.html');
  const html = await res.text();
  document.getElementById('about-container').innerHTML = html;
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('phonology-container').style.display = 'none';
  document.getElementById('about-container').style.display = 'block';
}

async function loadPhonology() {
  const res = await fetch('phonology-content.html');
  const html = await res.text();
  document.getElementById('phonology-container').innerHTML = html;
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('about-container').style.display = 'none';
  document.getElementById('phonology-container').style.display = 'block';
}

function showHome() {
  document.getElementById('main-content').style.display = 'block';
  document.getElementById('about-container').style.display = 'none';
  document.getElementById('phonology-container').style.display = 'none';
}