document.addEventListener('DOMContentLoaded', function () {
	// 1. Sidebar'ni yuklab olish
	fetch('slidebar.html')
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Sidebar faylni olishda xatolik: ' + response.status);
		}
		return response.text();
	  })
	  .then(html => {
		// Sidebarni DOMga joylashtirish
		const container = document.getElementById('sidebar-container');
		if (container) {
		  container.innerHTML = html;
		  // Sidebar yuklangach, toggle funksiyasini ishga tushiramiz
		  initSidebarToggle();
		} else {
		  console.error('Sidebar konteyner topilmadi!');
		}
	  })
	  .catch(error => {
		console.error('Sidebar yuklashda xatolik:', error);
	  });
  
	// 2. Sidebar toggle funksiyasi
	function initSidebarToggle() {
	  const toggle = document.getElementById('toggle');
	  const sidebar = document.getElementById('sidebar');
	  const content = document.querySelector('.content');
  
	  function toggleSidebar() {
		sidebar.classList.toggle('active');
		content.classList.toggle('active');
	  }
  
	  if (toggle) {
		toggle.addEventListener('click', function (e) {
		  e.preventDefault();
		  toggleSidebar();
		});
	  }
  
	  function checkScreenSize() {
		if (window.innerWidth <= 768) {
		  if (!sidebar.classList.contains('active')) {
			sidebar.classList.add('active');
			if (content) content.classList.add('active');
		  }
		} else {
		  if (sidebar.classList.contains('active')) {
			sidebar.classList.remove('active');
			if (content) content.classList.remove('active');
		  }
		}
	  }
  
	  checkScreenSize();
	  window.addEventListener('resize', checkScreenSize);
	}
  });
  