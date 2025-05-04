// Navbar HTML strukturasini yaratish
const navbarHTML = `
<div class="container add" id="container">
  <div class="brand">
    <h3>Web Dev</h3>
    <a href="#" id="toggle"><i class="bi bi-list"></i></a>
  </div>
  <div class="user">
    <img src="https://husanbek-coder.uz/assets/images/image.png" alt="">
    <div class="name">
      <h5>Husan Suyunov</h5>
      <span>Full-Stack Web Developer</span>
    </div>
  </div>
  <div class="navbar">
    <ul>
      <li><a href="#"><i class="bi bi-house"></i><span>Bosh saxifa</span></a></li>
      <li><a href="#"><i class="bi bi-person"></i><span>Hisobim</span></a></li>
      <li><a href="#"><i class="bi bi-chat-right-text"></i><span>Xabarlar</span></a></li>
      <li><a href="#"><i class="bi bi-graph-up-arrow"></i><span>Statistika</span></a></li>
      <li><a href="#"><i class="bi bi-folder"></i><span>Mening fayllarim</span></a></li>
      <li><a href="#"><i class="bi bi-cart"></i><span>Savat</span></a></li>
      <li><a href="#"><i class="bi bi-heart"></i><span>Yoqtirganlarim</span></a></li>
      <li><a href="#"><i class="bi bi-gear"></i><span>Sozlamalar </span></a></li>
    </ul>
  </div>

  <div class="navbar">
    <ul>
      <li><a href="#"><i class="bi bi-box-arrow-in-right"></i><span>Chiqish</span></a></li>
    </ul>
  </div>
</div>
`;

// Navbarni DOMga qo'shish
document.getElementById('navbar-container').innerHTML = navbarHTML;

// Toggle uchun JavaScript
var toggle = document.getElementById("toggle");
var container = document.getElementById("container");

toggle.onclick = function(){
	container.classList.toggle('active');
}

// CSSni JavaScript orqali qo'shish
var style = document.createElement('style');
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500&display=swap');
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
:root {
	--primaer-color: #fff;
}
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Poppins', sans-serif;
}
body{
	display: flex;
	width: 100%;
	background-image: url('https://t3.ftcdn.net/jpg/02/85/56/50/360_F_285565016_g2FGSFU0YPw5oq1TUBScOYEU1kW1Zei6.jpg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
.container{
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 100vh;
	border-radius: 10px;
	align-items: center;
	box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: 1s;
	background: rgb(255 255 255 / 25%);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 30px );
    -webkit-backdrop-filter: blur( 3px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
}
.container .brand{
	display: flex;
	width: 100%;
	height: 40px;
	padding: 0 10px;
	margin: 10px 0;
	align-items: center;
	justify-content: space-between;
}
.container .brand h3{
	font-weight: 300;
	font-size: 20px;
	color: var(--primaer-color);
}

.container .brand a i{
	color: var(--primaer-color);
	font-size: 30px;
}
.container .navbar {
	display: flex;
	width: 90%;
	height: 450px;
	margin: 10px 0;
	align-items: center;
    justify-content: flex-start; /* Chapga joylashish */
}

.container .navbar ul{
	list-style-type: none;
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	align-items: flex-start;
    align-items: flex-start; /* Chapga joylashish */
}
.container .navbar ul li{
	height: 40px;
	width: 100%;
	margin: 5px 0;
}
.container .navbar ul li a{
	display: flex;
	width: 100%;
	height: 100%;
	text-decoration: none;
	border-radius: 7px;
	align-items: center;
	justify-content: left;
}
.add .navbar:nth-child(4) {
	margin: 0;
}
.container .navbar ul li a {
	color: var(--primaer-color);
}
.container .navbar ul li a span{
	font-size: 14px;
	font-weight: 300;
}
.container .navbar ul li a i{
	display: flex;
	font-size: 20px;
	margin: 0 15px;
}
.container .navbar ul li a:hover,.container .navbar ul li a:hover span,.container .navbar ul li a:hover i{
    background: #8a8a8a14;
    backdrop-filter: blur(63px);
	
}
.container .user{
    display: flex;
    flex-direction: column;
	gap: 4px;
    width: 100%;
    height: 78px;
    align-items: center;
	text-align: center;
}


.container .user img{
	width: 50px;
	height: 50px;
	border-radius: 50%;
}
.container .user .name{
    display: flex;
    flex-direction: column;
}
.container .user .name h5{
	color: #fff;
	font-size: 12px;
	
}
.container .user .name span{
	color: #fff;
	font-size: 10px;
}
.container.active{
	width: 70px;
}
.container.active .brand{
	justify-content: center;
}
.container.active .navbar ul{
	width: 90%;
}
.container.active .user{
	width: 80%;
	height: 100%;
}
.container.active .navbar ul li a{
	justify-content: center;
}
.container.active .brand .logo,.container.active .brand h3,.container.active .navbar ul li a span,.container.active .user .name{
	display: none;
}


`;

document.head.appendChild(style); // CSSni <head>ga qo'shish
