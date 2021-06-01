<!doctype html>

<html>
<head>
	<meta charset="utf-8"/>	
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
	<!-- Angular will break without this line. It is not needed for Chrome -->
	<meta http-equiv="X-UA-Compatible" content="IE=11" />

	<title>My LEGO&reg; App</title>

<!-- Custom CSS -->
	<link rel="stylesheet" href="/css/custom.css">
	<link rel="stylesheet" href="/css/loading-animation.css">
	<link rel="stylesheet" href="/css/navbar.css">

<!-- Google Fonts -->
	<!-- <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,700" rel="stylesheet"> -->

</head>

<body id="home">
	<nav>
		<ul class="menu">
			<input type="checkbox" id="drop-menu-bars" class="drop-menu">
			<input type="checkbox" id="choices" class="choices">
			<div class="nav-icon-spacer-container">
				<label for="choices" id="icon-choices">
					<i class="nav-spacer fas fa-cogs"></i>
				</label>
			</div>
			<div class="logo">
				<img class="nav-logo" src="/images/LEGO_logo.svg">
			</div>
			<div class="menu-items">
				<li class="li-1">
					<a class="navbar-link" data-page="inventory">Inventory</a>
				</li>
				<li class="li-1">
					<a class="navbar-link" data-page="sets">Sets</a>
				</li>
				<li class="li-1">
					<a class="navbar-link" data-page="designIds">Design ID&apos;s</a>
				</li>
				<!-- <li class="li-1">
					<a class="navbar-link" data-page="dbs">DBs</a>
				</li> -->
				<li class="li-1">
					<a class="navbar-link" data-page="colors">Colors</a>
				</li>
				<li class="li-1">
					<a class="navbar-link" data-page="stats">Stats</a>
				</li>
			</div>
			<li class="toggle">
				<label for="drop-menu-bars" id="bars-menu">
					<span class="bars"></span>
				</label>
			</li>

			<div class="options-container">
				<ul class="options"></ul>
			</div>
		</ul>
	</nav>

	<main></main>

	
<!-- Modal -->
	<div id="myModal" class="modal" role="dialog">
	</div>
<!-- Modal -->

<!-- JQuery CDN -->
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

<!-- Latest compiled Font Awesome JavaScript -->
	<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/all.js" integrity="sha384-xymdQtn1n3lH2wcu0qhcdaOpQwyoarkgLVxC/wZ5q7h9gHtxICrpcaSUfygqZGOe" crossorigin="anonymous"></script>

<!-- Custom JavaScript -->
	<script src="/js/index.js"></script>
	<script src="/js/custom.js"></script>
	<script src="/js/promises.js"></script>
	<script src="/js/colors.js"></script>
	<script src="/js/sets.js"></script>
	<script src="/js/inventory.js"></script>
	<script src="/js/designIds.js"></script>
</body>
</html>