// **** au chargement de la page les oursons sont lances automatiquement *******

const URL = "http://localhost:3000/api/teddies"
window.onload = getTeddies(URL);
//////////  Récupération des données ours en peluches avec l'API fetch.
function getTeddies(URL) {

  fetch(URL)
  .then((response) => response.json())
  .then((response) => {
      createTeddiesCard(response)
    })
    .catch((err) => {
      console.log('error', err)
    })


  // Boucle pour récupére toutes les variables des produits 
  function createTeddiesCard(teddies) {

    //Je créer ma variable que je vais ajouter à mes elements
    let teddiesCardHTML = ""

    for (let i = 0; i < teddies.length; i++) {
      let Teddie = teddies[i]

      // creation des cartes de teddies  , 
      teddiesCardHTML += 
      // ?_id=
          `   <div class="col-12 col-lg-4 my-1 my-md-5 ">
          <div class="card">
          <img src="${Teddie.imageUrl}" alt="ourson " class="card-img-top product-image">
          <div class="card-body ">
          <h5 class="card-title">${Teddie.name}</h5>
          <p class="card-text">${Teddie.description}</p>
          
          <a href="./produit.html?_id=${Teddie._id}" class="btn btn-primary ">Voir produit</a>
          <span id="productPrice" class="text-sm font-bold bg-white px-2 py-1 rounded">${(Teddie.price / 100 ).toFixed(2).replace(".", ",")} €</span>
          </div>
          </div>
          </div>   `
    }
    // Ajouter mes element créer dans le HTML pour afficher mes produits
  document.getElementById('bear').innerHTML = teddiesCardHTML
  } 
}



