const nbLigne = document.getElementById('ligne');
const nbColonne = document.getElementById('colonne');
const Interval = document.getElementById('interval');
const boutonLancer = document.getElementById('start');
const boutonStop = document.getElementById('stop');
const boutonAlea = document.getElementById('random');
const boutonNvJeu = document.getElementById('reload');
const grilleHTML = document.getElementById('grille_jeu');
const labalNbJours = document.getElementById('nbJours');


/**
 * @param element
 * @description rend l'element visible du point de vue de l'utilisateur
 * @return void
 */
function afficher (element) {
    element.classList.remove('cache');
}
/**
 * @param element
 * @description rend l'element cache du point de vue de l'utilisateur
 * @return void
 */
function cacher (element) {
    element.classList.add('cache');
}

function cacherLabel () {
    for (let label of document.querySelectorAll("label")){
        label.classList.add('cache');
    }
    afficher(labalNbJours);
}
function afficherLabel () {
    for (let label of document.querySelectorAll("label")){
        label.classList.remove('cache');
    }
    cacher(labalNbJours);
}


cacher(boutonStop);
cacher(boutonLancer);
cacher(labalNbJours);

let grilleJeu;
let grilleAffichage;
let intervalAffichage;

boutonAlea.addEventListener("click", function () {
    grilleJeu = new GrilleJeu(nbLigne.value, nbColonne.value);
    grilleAffichage = new GrilleAffichage(grilleJeu, grilleHTML);
    grilleJeu.grille = ConfigureGrilleJeu.caseRandom(grilleJeu);
    grilleAffichage.mettreAJour();
    cacher(boutonAlea);
    cacher(boutonNvJeu);
    afficher(boutonLancer);
    cacherLabel();
    grilleAffichage.ajouterListener();
});
boutonNvJeu.addEventListener("click", function () {
    grilleJeu = new GrilleJeu(nbColonne.value, nbLigne.value);
    grilleAffichage = new GrilleAffichage(grilleJeu, grilleHTML);
    grilleAffichage.mettreAJour();
    cacher(boutonAlea);
    cacher(boutonNvJeu);
    afficher(boutonLancer);
    cacherLabel();
    grilleAffichage.ajouterListener();
});

boutonLancer.addEventListener("click", function () {
    cacher(boutonAlea);
    cacher(boutonNvJeu);
    cacher(boutonLancer);
    afficher(boutonStop);
    grilleAffichage.enleverListener();
    intervalAffichage = setInterval(grilleAffichage.mettreAJour, Interval.value);
});
boutonStop.addEventListener("click", function () {
    afficherLabel();
    afficher(boutonAlea);
    afficher(boutonNvJeu);
    cacher(boutonStop);
    grilleAffichage.enleverListener();
    clearInterval(intervalAffichage);
});