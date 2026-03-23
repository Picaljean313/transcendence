## 🔐 Authentification (API AUTH)

1------------------------------------------------------------------------------------------------------
| # | Méthode 	| Endpoint 					| Description 									| Auth 	 |
|---|-----------|---------------------------|-----------------------------------------------|--------|
| 1 | POST 		| `/auth/login` 			| Connexion classique (login + password) 		| ❌ Non	|
| 2 | GET 		| `/auth/42` 				| Récupère l'URL de redirection OAuth 42 		| ❌ Non |
| 3 | POST 		| `/auth/42/callback`		| Callback OAuth 42 (échange code contre JWT) 	| ❌ Non |
| 4 | POST 		| `/auth/42/confirm` 		| Confirmation d'inscription OAuth 42 			| ❌ Non |
| 5 | POST 		| `/auth/register` 			| Inscription classique 						| ❌ Non |
| 6 | GET 		| `/auth/me` 				| Récupère l'utilisateur actuellement connecté 	| ✅ Oui |
| 7 | POST 		| `/auth/change-password` 	| Change le mot de passe 						| ✅ Oui |
------------------------------------------------------------------------------------------------------