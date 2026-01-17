// ----------------------------------TABLEAU MOT ALEATOIRE------------------------------------------------
const motsPendu = [
    "ordinateur", "elephant", "guitare", "bibliotheque", "chocolat", "parapluie", "montagne", "papillon", "telephone", "crocodile", "champignon", "astronomie", "restaurant", "aventure", "cerisier", "kangourou", "microscope", "pirouette",
    "mystere", "accordeon", "grenouille", "automobile", "archipel", "flamingo", "toboggan", "cachalot", "trampoline","dinosaure", "pharmacie", "tournesol", "aquarium", "balancoire", "camembert", "delicieux", "echafaudage", "formidable", "girafon", "helicoptere", "imagination", "jonquille", "karaoke", "locomotive", "marguerite", "noctambule", "océanographe",
    "parachute", "quinquennat", "rhinoceros", "salamandre", "television", "ukulele", "ventriloque", "xylophone", "zeppelin", "abricot", "boulangerie", "caravane", "dompteur", "equilibre", "fanfare", "gondole", "harmonica", "intrepide", "jardinier", "labyrinthe", "menuisier", "noisette", "optimiste", "pasteque", "quincaillerie", "radiateur", "sauterelle", "uniforme", "violoncelle", "whisky", "yaourt", "zebre", "acrobate", "bouilloire", "cerf-volant", "deltaplane", "escalier", "fougere", "guepard", "hippopotame", "imprimante", "jongleur", "koala", "mandarine", "narval", "orchestre", "perroquet", "quenouille", "raquette", "scorpion", "tamanoir", "ucalyptus", "vannerie", "walkyrie", "yacht", "zibeline", "ambulance", "bretzel", "citrouille", "dromadaire", "etinclele", "fauteuil", "gargouille", "horloge", "igloo", "jasmin", "kimono", "limonade", "macaroni", "nenuphar", "omelette", "pingouin", "quetzal", "renard", "sombrero", "tarentule", "uranium", "vampire", "wombat", "yeti", "zircon", "alpaga", "bambou", "cacahuete", "drapeau", "eblouissant", "fandango", "gobelin", "hamster", "igname", "joaillier", "ketchup", "lavande", "maracas", "nautile", "octogone", "palmier", "quiche",
    "ravioli", "sandwich", "tatouage", "veranda", "wagon", "zinnia", "artichaut", "biscuit", "cameleon", "dauphin", "enchanteur", "farceur", "gazelle", "hibou", "iceberg", "jaguar", "licorne", "magie", "nuage", "origami", "pelican", "quadrille", "requin", "serpent", "tambour", "univers", "volcan", "western", "yoga", "zigzag", "ananas", "bonbon",
    "carotte", "dragee", "eclair", "framboise", "gateau", "haricot", "kiwi", "laitue"
];
// -----------------------------------------CHOISIR UN MOT ALEATOIRE-----------------------------------------
let motAleatoire = motsPendu[Math.floor(Math.random() * motsPendu.length)];

// -----------------------------------------LES CONSTANTES----------------------------------------------------
const elADeviner = document.getElementById('motADeviner');
const elLettre = document.querySelectorAll('.lettre');
const elMessage = document.getElementById('message');
const elVies = document.getElementById('vies');
const elHistorique = document.getElementById('historique');
const elBtnRejouer = document.getElementById('btnRejouer');

let boutonsMotADeviner = [];
let historique = [];
let vies = 10;
let lettreCliquer;
let jeuTermine = false;

// ----------------------------------------LES TESTS---------------------------------------------------------------
// console.log(motAleatoire)
// console.log(motAleatoire.length)
// console.log('vies', vies)

// --------------------------------------------CREATION BTN EN FCT NB CARACTERE----------------------------------------
for (let index = 0; index < motAleatoire.length; index++) {
    if(!jeuTermine){
        let btnVide = document.createElement('input');
        btnVide.type = 'button';
        btnVide.value = '_';
        elADeviner.appendChild(btnVide);
        boutonsMotADeviner.push(btnVide);
    }
}

// ------------------------------------AJOUT DANS UN TABLEAU LES LETTRES ESSAYER---------------------------------------
elLettre.forEach(element => {
    element.addEventListener('click', function(){
        lettreCliquer = this.value;
        ajoutLettre(lettreCliquer.toLowerCase());
        this.disabled = true;
    })
});

let ajoutLettre = function(lettreChoisi){
    if(jeuTermine) return;
    let lettrePresent = false;
    for (let i = 0; i < motAleatoire.length; i++) {
        if(motAleatoire[i] === lettreChoisi){
            boutonsMotADeviner[i].value = lettreChoisi;       
            lettrePresent = true;
        }
    }
    if(!lettrePresent){
        vies--;
        elVies.textContent = `${vies} vies restante`;
        afficheHistorique();
        

    }
    if(vies <= 0){
        jeuTermine = true;
        elMessage.textContent = `Perdu ! Le mot était : ${motAleatoire}`;
        elLettre.forEach(btn => btn.disabled = true);
        elBtnRejouer.style.display = 'block';
    }
    let motComplet = true;
    for(let i = 0; i < boutonsMotADeviner.length; i++){
        if(boutonsMotADeviner[i].value === '_'){
            motComplet = false;
            break;
        }
    }
    if(motComplet){
        jeuTermine = true;
        elMessage.textContent = 'Bravo ! Vous avez gagné !';
        elLettre.forEach(btn => btn.disabled = true);
        elBtnRejouer.style.display = 'block';
    }
}

let afficheHistorique = function(){
    historique.push(lettreCliquer);
    console.log(historique);
    elHistorique.textContent = `lettre non présent : ${historique}`;
}
// -----------------------------------------------------BTN REJOUE--------------------------------------------

elBtnRejouer.addEventListener('click', () => {
    vies = 10;
    jeuTermine = false;
    boutonsMotADeviner = [];
    historique = [];
    elHistorique.textContent = 'Lettre non présentes';
    elVies.textContent = `${vies} vies restantes`;
    elMessage.textContent = '';
    
    const nouveauMot = motsPendu[Math.floor(Math.random() * motsPendu.length)];
    motAleatoire = nouveauMot; 
    
    elADeviner.innerHTML = '';

    for (let index = 0; index < motAleatoire.length; index++) {
            let btnVide = document.createElement('input');
            btnVide.type = 'button';
            btnVide.value = '_';
            elADeviner.appendChild(btnVide);
            boutonsMotADeviner.push(btnVide);
        }
        
        elLettre.forEach(btn => btn.disabled = false);
        
       
        
        elBtnRejouer.style.display = 'none';
    }
        
);