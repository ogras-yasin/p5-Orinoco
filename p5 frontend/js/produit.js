// **** au chargement de la page l'ourson est lancee automatiquement *******
let getProductId = '';
const URL = `http://localhost:3000/api/teddies/`
window.onload = getTeddies(URL);


function DisplayCard(teddy) {
	let teddiesCardHTML = '';

	// Affichage du produit / personalisation
	teddiesCardHTML += `<div class="container">
<div class="card mb-3" style="max-width: 2040px;">
	<div class="row g-0">
	  <div class="col-md-4">
		<img
		  src="${teddy.imageUrl}" alt="..." class="img-fluid"/>
	  </div>
	  <div class="col-md-8">
		<div class="card-body">
		  <h2 class="card-title">Ours en peluche : ${teddy.name}</h2>
		  <p class="card-text">${teddy.description}</p>
		  <p class="card-text"> prix :  ${(teddy.price / 100).toFixed(2).replace('.', ',')}€ </p> 
		  <p class="card-text">Choisir la couleur de votre produit :</p>
		  <!-- choix de couleurs  --!>
		  <select class="color__choice" name="colors" id="select__color">
		  </select> <br>
		  <strong>quantité :</strong> 1
		  <button class="btn btn-success mx-5 addCart">Ajouter panier</button>
		</div>
	  </div>
	</div>
</div>
</div> `;

document.getElementById('item__Product').innerHTML = teddiesCardHTML;
}

//Création d'une function pour afficher mes choix de couleurs
function displayColor (teddy) {
	let choice = document.querySelector('.color__choice');
	teddy.colors.forEach(function(colors) {
		let opt = document.createElement('option');
		opt.value = colors;
		opt.textContent = colors;
		// on integre l'enfant au parent
		choice.appendChild(opt);
	});
}



function getTeddies(URL) {
	/* Récupération du produit avec l'id associé depuis le serveur */
	getProductId = new URLSearchParams(window.location.search).get('_id');

	fetch(URL + getProductId)
		.then((response) => response.json())
		.then((response) => {
			DisplayCard(response)
			displayColor(response)
			document.querySelector('.addCart').addEventListener('click', function addCart() {
				let cart = JSON.parse(localStorage.getItem('cart'));
				if (cart == null) {
					cart = [];
				}
				// console.log("t'as reussi : " + getProductId);
				cart.push( 
					{id : getProductId,
					name :response.name,
					price : response.price,
					description : response.description,
					image : response.imageUrl,
					quantity : 1
					}) ;

				document.getElementById('quantite-elt-panier').textContent = `(${cart.length})`;
				localStorage.setItem('cart', JSON.stringify(cart));
			});
		})
		.catch((error) => console.error(error));
}
