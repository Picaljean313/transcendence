- faire en sorte que les infos récupérées chez l'api 42 ne soient pas modifiables dans le front sur le formualaire de création de compte affilié à 42 (seuls pasword et confirm pasword ne sont pas verrouillés pour s'enregistrer)
- quelle est la taille d'avatar 42 que tu utilise en front ? medium c'est ok ?
- si le user 42 créé un compte 42 mais s'était déjà en registré je retourne au front un status 409 qu'il faut rediriger vers la page de connxeion (et non d'inscription)
- dans la requête /auth/login mettre dans le body les champs : {email : , password : } au lieu de login et password
- lors de la deco de l'utilisateur, on fait juste une suppresion du token dans le local storage du front. Pas la meilleure sécu mais osef

cf conversation disocrd :
- dans le cas d'un user qui annule la redirection vers l'api 42 :
res.redirect vers le frontend avec un paramètre d'erreur — c'est le frontend qui gère l'affichage :
javascriptif (error) {
  return res.redirect(${process.env.FRONTEND_URL}?error=login_cancelled);
}
Le frontend lit le paramètre et affiche un message propre à l'utilisateur :
javascriptconst params = new URLSearchParams(window.location.search);
if (params.get('error') === 'login_cancelled') {
  // afficher un message : "Connexion annulée"
}
- je t'envoie le theme dans les requêtes où tu récupères les données d'un user, fais en sorte d'établir direct le theme du user à sa conexion 