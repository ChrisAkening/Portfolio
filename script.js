/* =========================================================
   SCRIPT.JS
   Ce fichier contient tout le JavaScript du portfolio.
   Chaque partie est commentée pour que tu comprennes
   facilement ce qu'elle fait.
   ========================================================= */

/* ---------------------------------------------------------
   1. MENU MOBILE
   Quand on clique sur le bouton "hamburger" (les 3 barres),
   le menu de navigation s'affiche ou se cache.
   --------------------------------------------------------- */

// On récupère les éléments dont on a besoin dans la page
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Quand on clique sur le bouton, on ajoute/retire la classe "open"
menuToggle.addEventListener('click', function () {
  navMenu.classList.toggle('open');
});

// Quand on clique sur un lien du menu (sur mobile), on referme le menu
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (lien) {
  lien.addEventListener('click', function () {
    navMenu.classList.remove('open');
  });
});


/* ---------------------------------------------------------
   2. NAVBAR QUI CHANGE D'APPARENCE AU SCROLL
   On ajoute une ombre sous la barre de navigation dès que
   l'utilisateur commence à faire défiler la page.
   --------------------------------------------------------- */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ---------------------------------------------------------
   3. APPARITION PROGRESSIVE DES SECTIONS AU SCROLL
   On utilise un "Intersection Observer" : c'est un outil du
   navigateur qui nous prévient dès qu'un élément devient
   visible à l'écran. On ajoute alors la classe "visible",
   ce qui déclenche l'animation définie dans style.css.
   --------------------------------------------------------- */

// On sélectionne toutes les sections qui doivent apparaître en fondu
const sectionsAnimees = document.querySelectorAll('.fade-section');

// Options de l'observateur : on considère la section visible
// quand 15% de sa hauteur est visible à l'écran
const optionsObservateur = {
  threshold: 0.15
};

const observateur = new IntersectionObserver(function (entries) {
  // "entries" est la liste des éléments observés
  entries.forEach(function (entree) {
    if (entree.isIntersecting) {
      entree.target.classList.add('visible');
    }
  });
}, optionsObservateur);

// On demande à l'observateur de surveiller chaque section
sectionsAnimees.forEach(function (section) {
  observateur.observe(section);
});


/* ---------------------------------------------------------
   4. ANIMATION DES BARRES DE COMPÉTENCES
   Les barres commencent à 0% de largeur (voir style.css).
   Dès que la section "Compétences" devient visible, on lit
   la valeur data-niveau de chaque barre et on l'applique
   comme largeur, ce qui déclenche l'animation CSS.
   --------------------------------------------------------- */

const sectionCompetences = document.getElementById('competences');
const barresCompetences = document.querySelectorAll('.skill-fill');

// On utilise encore un Intersection Observer, mais uniquement
// pour la section des compétences
const observateurCompetences = new IntersectionObserver(function (entries) {
  entries.forEach(function (entree) {
    if (entree.isIntersecting) {
      // On parcourt chaque barre pour appliquer sa largeur finale
      barresCompetences.forEach(function (barre) {
        const niveau = barre.getAttribute('data-niveau'); // ex: "90"
        barre.style.width = niveau + '%';
      });

      // On arrête d'observer une fois l'animation lancée,
      // pour ne pas la relancer à chaque scroll
      observateurCompetences.unobserve(sectionCompetences);
    }
  });
}, { threshold: 0.3 });

observateurCompetences.observe(sectionCompetences);


/* ---------------------------------------------------------
   5. VALIDATION DU FORMULAIRE DE CONTACT
   On vérifie que les champs sont bien remplis avant de
   considérer le message comme "envoyé". Ici, l'envoi est
   simulé (pas de vrai serveur), mais la validation, elle,
   est bien réelle.
   --------------------------------------------------------- */

const formulaire = document.getElementById('contactForm');

// Champs du formulaire
const champNom = document.getElementById('nom');
const champEmail = document.getElementById('email');
const champMessage = document.getElementById('message');

// Zones où afficher les messages d'erreur
const erreurNom = document.getElementById('errorNom');
const erreurEmail = document.getElementById('errorEmail');
const erreurMessage = document.getElementById('errorMessage');

// Message de succès affiché après un envoi valide
const messageSucces = document.getElementById('formSuccess');

formulaire.addEventListener('submit', function (evenement) {
  // On empêche le formulaire de recharger la page
  evenement.preventDefault();

  // On réinitialise les anciens messages d'erreur
  erreurNom.textContent = '';
  erreurEmail.textContent = '';
  erreurMessage.textContent = '';
  messageSucces.style.display = 'none';

  let formulaireValide = true; // on suppose que tout est correct au départ

  // Vérification du nom : il ne doit pas être vide
  if (champNom.value.trim() === '') {
    erreurNom.textContent = 'Merci de renseigner votre nom.';
    formulaireValide = false;
  }

  // Vérification de l'email avec une expression régulière simple
  // (vérifie juste qu'il y a "quelquechose@quelquechose.quelquechose")
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (champEmail.value.trim() === '') {
    erreurEmail.textContent = 'Merci de renseigner votre email.';
    formulaireValide = false;
  } else if (!regexEmail.test(champEmail.value.trim())) {
    erreurEmail.textContent = 'Merci d\'entrer un email valide.';
    formulaireValide = false;
  }

  // Vérification du message : il ne doit pas être vide
  if (champMessage.value.trim() === '') {
    erreurMessage.textContent = 'Merci d\'écrire un message.';
    formulaireValide = false;
  }

  // Si tout est valide, on affiche le message de succès
  // et on vide le formulaire
  if (formulaireValide) {
    messageSucces.style.display = 'block';
    formulaire.reset();
  }
});


/* ---------------------------------------------------------
   6. ANNÉE AUTOMATIQUE DANS LE FOOTER
   Plutôt que d'écrire l'année à la main (et d'oublier de la
   changer chaque année), on la récupère automatiquement.
   --------------------------------------------------------- */

document.getElementById('anneeActuelle').textContent = new Date().getFullYear();