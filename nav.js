/**
 * iOS uslubidagi bottom navbar ni sahifalarga dinamik yuklash skripti
 */

// Nav.html faylini barcha sahifalarga yuklash
document.addEventListener('DOMContentLoaded', function() {
  // Navbar joylashadigan container yaratish
  const navContainer = document.createElement('div');
  navContainer.id = 'navbar-container';
  document.body.appendChild(navContainer);
  
  // Navbar HTML ni yuklash
  fetch('nav.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Navbar yuklanmadi');
      }
      return response.text();
    })
    .then(html => {
      navContainer.innerHTML = html;
      
      // Navbarni yuklagandan so'ng, uning funksionalligini ishga tushirish
      initializeNavbar();
    })
    .catch(error => {
      console.error('Navbar yuklanishida xatolik:', error);
    });
});

/**
 * Navbar funksionalligini ishga tushirish
 */
function initializeNavbar() {
  // Rejim almashtirish
  const rejimToggle = document.getElementById('rejimToggle');
  
  if (rejimToggle) {
    rejimToggle.addEventListener('click', function() {
      document.body.classList.toggle('tungi-rejim');
      
      // Rejim sozlamalarini saqlash
      const tungiRejim = document.body.classList.contains('tungi-rejim');
      localStorage.setItem('tungiRejim', tungiRejim ? 'true' : 'false');
    });
    
    // Saqlangan rejimni yuklash
    const tungiRejim = localStorage.getItem('tungiRejim') === 'true';
    if (tungiRejim) {
      document.body.classList.add('tungi-rejim');
    }
  }
  
  // Profil menyusini ochish/yopish
  const profilToggle = document.getElementById('profilToggle');
  const profilMenyu = document.getElementById('profilMenyu');
  
  if (profilToggle && profilMenyu) {
    profilToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      profilMenyu.classList.toggle('ochiq');
      yashirMenyu('tilMenyu');
      yashirMenyu('koproqMenyu');
      
      if (profilMenyu.classList.contains('ochiq')) {
        animateMenyuItems(profilMenyu);
      }
    });
  }
  
  // Til menyusini ochish/yopish
  const tilToggle = document.getElementById('tilToggle');
  const tilMenyu = document.getElementById('tilMenyu');
  
  if (tilToggle && tilMenyu) {
    tilToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      tilMenyu.classList.toggle('ochiq');
      yashirMenyu('profilMenyu');
      yashirMenyu('koproqMenyu');
      
      if (tilMenyu.classList.contains('ochiq')) {
        animateMenyuItems(tilMenyu);
      }
    });
    
    // Til variantlarini tanlash
    const tilVariantlar = tilMenyu.querySelectorAll('.til-variant');
    tilVariantlar.forEach(variant => {
      variant.addEventListener('click', function() {
        tilVariantlar.forEach(v => v.classList.remove('faol'));
        this.classList.add('faol');
        
        // Tanlangan tilni saqlash mumkin
        const tilNomi = this.querySelector('span').textContent;
        localStorage.setItem('tanlangan-til', tilNomi);
        
        tilMenyu.classList.remove('ochiq');
      });
    });
  }
  
  // Ko'proq menyusini ochish/yopish
  const koproqToggle = document.getElementById('koproqToggle');
  const koproqMenyu = document.getElementById('koproqMenyu');
  
  if (koproqToggle && koproqMenyu) {
    koproqToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      koproqMenyu.classList.toggle('ochiq');
      yashirMenyu('profilMenyu');
      yashirMenyu('tilMenyu');
      
      if (koproqMenyu.classList.contains('ochiq')) {
        animateMenyuItems(koproqMenyu);
      }
    });
  }
  
  // Asosiy sahifa tugmalari orasida o'tish
  const navbarTugmalar = document.querySelectorAll('.navbar-tugma');
  navbarTugmalar.forEach(tugma => {
    tugma.addEventListener('click', function() {
      navbarTugmalar.forEach(t => t.classList.remove('faol'));
      this.classList.add('faol');
      
      // Sahifa almashtirish uchun 
      const sahifaNomi = this.querySelector('span').textContent.trim().toLowerCase();
      if (sahifaNomi === 'bosh sahifa') {
        window.location.href = 'index.html';
      } else if (sahifaNomi === 'o\\\'quvchilar' || sahifaNomi === 'o\\\'quvchilar') {
        window.location.href = 'students.html';
      } else if (sahifaNomi === 'kurslar') {
        window.location.href = 'courses.html';
      }
    });
  });
  
  // Joriy sahifani faollashtirish
  faollashtirishJoriySahifa();
  
  // Hujjat bo'yicha bosgan vaqtda menyularni yopish
  document.addEventListener('click', function(e) {
    const clickedElement = e.target;
    
    if (!clickedElement.closest('.profil-container') && 
        !clickedElement.closest('.til-container') && 
        !clickedElement.closest('.koproq-container')) {
      yashirMenyu('profilMenyu');
      yashirMenyu('tilMenyu');
      yashirMenyu('koproqMenyu');
    }
  });
}

/**
 * Menyuni yashirish uchun yordam funksiyasi
 */
function yashirMenyu(menyuId) {
  const menyu = document.getElementById(menyuId);
  if (menyu) {
    menyu.classList.remove('ochiq');
  }
}

/**
 * Menyu elementlarini animatsiyalash
 */
function animateMenyuItems(menyuElement) {
  const items = menyuElement.children;
  
  Array.from(items).forEach((item, index) => {
    item.classList.remove('menyu-animatsiya');
    setTimeout(() => {
      item.classList.add('menyu-animatsiya');
    }, index * 50);
  });
}

/**
 * Joriy sahifaga qarab navbar tugmasini faollashtirish
 */
function faollashtirishJoriySahifa() {
  const joriyPath = window.location.pathname;
  const navbarTugmalar = document.querySelectorAll('.navbar-tugma');
  
  navbarTugmalar.forEach(tugma => {
    tugma.classList.remove('faol');
  });
  
  if (joriyPath.includes('students.html')) {
    navbarTugmalar[1].classList.add('faol');
  } else if (joriyPath.includes('courses.html')) {
    navbarTugmalar[2].classList.add('faol');
  } else {
    // index.html yoki bosh sahifa
    navbarTugmalar[0].classList.add('faol');
  }
}