// import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<>
			<header>
				<nav class='container d-flex'>
					<div class='d-flex'>
						<img class='nav-logo' src='assets/logo.svg' alt='' />
						<h1>WebTech.ID</h1>
					</div>

					<ul class='d-flex'>
						<li>
							<a href=''>Home</a>
						</li>
						<li>
							<a href=''>Blog</a>
						</li>
						<li>
							<a href=''>Services</a>
						</li>
						<li>
							<a href="">Game</a>
						</li>
						<li>
							<a href=''>Profile</a>
						</li>
					</ul>
				</nav>
			</header>

			<div class='container banner-container'>
				<div class='banner-wrapper'>
					<img src='assets/images (14).jpg' class='banner-image' alt='' />
					<div class='banner-overlay'></div>
					<div class='banner-content'>
						<h1 class='banner-title'>Test Banner</h1>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus officiis harum minus recusandae,
							consectetur est, perferendis debitis sed hic nisi vitae maiores rerum dolor nesciunt quis velit non eum
							fugit!
						</p>
					</div>
				</div>
			</div>

			<main class='container'>
				<div class='short-description-container'>
					<h1>Welcome to WebTech.id</h1>
					<p class='short-description'>
						Seleksi Daerah Web Technology Indonesia adalah tahap awal dalam sebuah kompetisi atau program yang bertujuan
						untuk mencari dan mengembangkan talenta terbaik di bidang teknologi web di Indonesia. Dalam seleksi ini,
						peserta dari berbagai daerah di Indonesia bersaing untuk menunjukkan keterampilan mereka dalam pengembangan
						web, yang meliputi desain antarmuka pengguna (UI/UX), pemrograman frontend dan backend, serta optimasi dan
						keamanan web.
					</p>
				</div>
				<div class='what-is-web d-flex'>
					<img src='assets/images (5).png' alt='' />
					<div>
						<h1 class='what-is-web-title'>What is a Website?</h1>
						<p>
							website is a collection of related web pages that are typically identified by a common domain name and
							published on at least one web server. Websites are accessed through the internet and can serve various
							purposes, including providing information, offering services, or facilitating communication.
						</p>
					</div>
				</div>
				<hr />
			</main>

			<footer>
				<img src='' alt='' />
			</footer>
		</>
	);
}

export default App;
