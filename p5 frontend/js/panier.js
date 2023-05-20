const cart = JSON.parse(localStorage.getItem('cart'));
const url = `http://localhost:3000/api/teddies/`;
let totalBasket = 0;
const emptyBasket = document.getElementById('emptyBasket');
const table = document.getElementById("table")
const form = document.querySelector("form")
const cartClear = document.getElementById("cartClear")

console.log(form)


if (cart != null){
	function displayinHTML(cart) {
		
		for (let product of cart) {
			
			totalBasket += product.price // prixtotal
			const Product_Id = document.getElementById('productsBasket');
			Product_Id.innerHTML += `<tr class="text-center">
				<td class="w-25"> 
				<img src="${product.image}" class="img-fluid img-thumbnail" alt="${product.name}">
				</td>
				<td class="w-25">
					${product.name}
				</td>
				<td> 
					<span>${product.price/100 +  ` €`}</span>
				</td>
			</tr>
				`;
		}
		const totalPrice = document.getElementById('totalPrice');
		totalPrice.innerHTML = totalBasket/100 +  ` €`;
	}
	window.onload = displayinHTML(cart);
}

// cacher visibilite tableau et du champ
if (cart == null) {
	emptyBasket.classList.add('visibleBasket');
	table.style.visibility = "hidden" 
	form.style.visibility = "hidden" 
	cartClear.style.visibility = "hidden" 
}
// ---------------- manipulation de produit ---------------


// vide le panier  
document.getElementById('cartClear').addEventListener('click', function cartClear(e) {
	localStorage.clear();
	location.reload();
	console.log(e)
});


// ------------------- champ formulaire --------------

inputs = document.querySelectorAll('input');
// variable vide right ?
let prenom, nom, email, adresse, codePostal, ville;

const prenomChecker = (value) => {
	console.log(value);
	if (!value.match(/^[a-zA-Z_.-]*$/)) {
		console.log('test');
		errorDisplay('prenom', 'Veuillez fournir un prénom correcte');
		prenom = null;
        return false
	} else {
		prenom = value;
		return true
		
	}
};
const nomChecker = (value) => {
	console.log(value);
	if (!value.match(/^[a-zA-Z_.-]*$/)) {
		console.log('test');
		errorDisplay('nom', 'mettre un nom correcte');
		nom = null;
        return false
	} else {

		nom = value;
        return true
	}
};
const emailChecker = (value) => {
	console.log(value);
	if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
		console.log('test');
		errorDisplay('email', 'Veuillez fournir un email correcte');
		email = null;
        return false
	} else {
		email = value;
        return true
	}
};
const adresseChecker = (value) => {
	console.log(value);
	if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
		console.log('test');
		// errorDisplay('adresse', 'Veuillez fournir une adresse correcte');
        return false
	} else {
		errorDisplay('adresse', 'Ve', true);
		// adresse = value
        return true
	}
};
const codePostalChecker = (value) => {
	console.log(value);
	if (!value.match(/^[\d]*$/)) {
		console.log('test');
		errorDisplay('codePostal', 'code postal invalid');
		codePostal = null;
        return false
	} else {
		codePostal = value;
        return true
	}
};
const villeChecker = (value) => {
	console.log(value);
	if (!value.match(/^[a-zA-Z_.-]*$/)) {
		console.log('test');
		errorDisplay('ville', 'Ville invalide');
		ville = null;
        return false
	} else {
		
		ville = value;
        return true
	}
};

const errorDisplay = (tag, message, valid) => {
	const container = document.querySelector('.' + tag + '-container');
	const errorComment = document.querySelector('.' + tag + '-container > span');
	if (!valid) {
		console.log("pas valide")
		container.classList.add('error');
		errorComment.textContent = message;
	} else {
		console.log("valide")
		container.classList.remove('error');
		errorComment.textContent = message
	}
};

inputs.forEach(function(input) {
	input.addEventListener('input', (e) => {

		switch (e.target.id) {
			case 'prenom':
				prenomChecker(e.target.value);
				// errorDisplay('prenom', 'Veuillez fournir un prénom correcte');
				break;
			case 'nom':
				nomChecker(e.target.value);
				break;
			case 'email':
				emailChecker(e.target.value);
				break;
			case 'adresse':
				// il ne lit pas  donc retourne a la methode initial
				let addrese = adresseChecker(e.target.value);
				if (addrese == false) {errorDisplay('adresse', 'Veuillez fournir une adresse correcte')
				adresse = null
				} else{
					adresse = e.target.value
				}

				break;
			case 'codePostal':
				codePostalChecker(e.target.value);
				break;
			case 'ville':
				villeChecker(e.target.value);
				if (ville == false) { errorDisplay('ville', 'Ville invalide')}
					else{errorDisplay('ville', ' ', true)}
				break;
			default:
				'default value olmus';
				break;
		}
	});
});



form.addEventListener('submit', function testForm(e) {
	e.preventDefault()
	console.log(e);
	if (prenom !== null && nom !== null && ville !== null && adresse !== null && email !== null) {
		const products = cart.map((item) => item.id);
		// console.log(product)
		const contact = {
			firstName: prenom,
			lastName: nom,
			city: ville,
			address: adresse,
			email: email
		};
		const data = { contact, products };
		const option = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		};
		
		fetch(url + 'order', option)
			.then((response) => response.json())
			.then((response) => {
				localStorage.removeItem('cart');
				localStorage.setItem('total', totalBasket);
				console.log(response)
				localStorage.setItem('orderId', response.orderId);
				localStorage.setItem('contact', JSON.stringify(contact));
				// window.location.replace('./order.html');
			})
			.catch((error) => console.error(error));

		console.log(data);
		// console.log()
		alert('Votre formulaire a été enregistrer, nous vous remercions de votre achat');
	} else {
		alert('Vérifier votre formulaire');
	}
});
