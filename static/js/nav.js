let nav_res = document.querySelector('#nav_res');
let hamber_menu = document.querySelector('#hamber_menu');
let close_nav_res = document.querySelector('#close_nav_res');

// تابع بستن منو
function closeNav() {
  nav_res.classList.add('hidden');
}

// باز کردن منو با کلیک روی آیکون همبرگر
hamber_menu.addEventListener('click', () => {
  nav_res.classList.remove('hidden');
});

// بستن منو با کلیک روی آیکون ضربدر
close_nav_res.addEventListener('click', closeNav);

// بستن خودکار منو هنگام تغییر سایز صفحه
function handleResize() {
  if (window.innerWidth >= 840) { // مطابق با breakpoint md در Tailwind (768px)
    closeNav();
  }
}

// اضافه کردن رویداد رزایز با تروتلینگ برای بهینه‌سازی عملکرد
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(handleResize, 200); // اجرا پس از 200ms توقف رزایز
});

// بررسی اولیه هنگام لود صفحه
window.addEventListener('DOMContentLoaded', handleResize);

window.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.querySelector('.user-name');
  const fullName = nameElement.textContent.trim();

  if (fullName.length > 8) {
    nameElement.textContent = fullName.substring(0, 8) + '...';
  }
});