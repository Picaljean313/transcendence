# 📡 42Hub API - Documentation Complète

## 🎯 Vue d'ensemble

Cette documentation liste **toutes les requêtes API** du projet 42Hub, organisées par catégorie.

**Base URL:** `http://localhost:8000/api`

**Authentification:** JWT Token (Bearer Token dans le header `Authorization`)

---

## 📊 Résumé des Requêtes

- **Total:** 46 requêtes
- **GET:** 20
- **POST:** 13
- **PATCH:** 7
- **DELETE:** 6

---

## 🔐 Authentification (API AUTH)

Gestion du login, inscription et session utilisateur.
------------------------------------------------------------------------------------------------------
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

## 👤 Profil Utilisateur (PROFILE API)

Gestion du profil personnel, avatar et statistiques.
-----------------------------------------------------------------------------------------------------
| #  | Méthode 	| Endpoint 					| Description									| Auth 	 |
|----|---------	|---------------------------|-----------------------------------------------|--------|
| 8  | GET 		| `/users/{username}` 		| Récupère un profil public par username		| ❌ Non	|
| 9  | GET 		| `/users/me` 				| Récupère le profil personnel 					| ✅ Oui |
| 10 | PATCH 	| `/users/me` 				| Modifie le profil (bio, nom, etc.) 			| ✅ Oui |
| 11 | POST 	| `/users/me/avatar` 		| Upload un avatar (FormData) 					| ✅ Oui |
| 12 | GET 		| `/users/{username}/posts` | Récupère les posts d'un utilisateur 			| ❌ Non |
| 13 | GET 		| `/users/{username}/media` | Récupère les média d'un utilisateur 			| ❌ Non |
| 14 | GET 		| `/users/{username}/likes` | Récupère les posts likés par un utilisateur 	| ❌ Non |
------------------------------------------------------------------------------------------------------

## 👥 Utilisateurs (USERS API)

Gestion globale des utilisateurs.
-------------------------------------------------------------------------------------------------
| #  | Méthode 	| Endpoint 				  | Description 								| Auth   |
|----|---------	|-------------------------|---------------------------------------------|--------|
| 15 | GET 		| `/users` 				  | Récupère tous les utilisateurs (pagination) | ❌ Non |
| 16 | GET 		| `/users/{userId}` 	  | Récupère un utilisateur par ID 				| ❌ Non |
| 17 | GET 		| `/users/search?q=...`   | Recherche des utilisateurs 					| ❌ Non |
| 18 | PATCH 	| `/users/{userId}` 	  | Modifie un utilisateur 						| ✅ Oui |
| 19 | GET 		| `/users/{userId}/posts` | Posts d'un utilisateur par ID 				| ❌ Non |
--------------------------------------------------------------------------------------------------

## 📝 Posts (POSTS API)

Gestion des posts, likes et interactions.
-------------------------------------------------------------------------------------------------
| #  | Méthode | Endpoint 				| Description 									| Auth   |
|----|---------|------------------------|-----------------------------------------------|--------|
| 20 | GET 	   | `/posts` 				| Récupère tous les posts (feed principal) 		| ❌ Non |
| 21 | POST    | `/posts` 				| Crée un post (JSON ou FormData avec média)	| ✅ Oui |
| 22 | DELETE  | `/posts/{postId}` 		| Supprime un post 								| ✅ Oui |
| 23 | PATCH   | `/posts/{postId}` 		| Modifie un post 								| ✅ Oui |
| 24 | POST    | `/posts/{postId}/like` | Like un post 									| ✅ Oui |
| 25 | DELETE  | `/posts/{postId}/like` | Retire le like 								| ✅ Oui |
-------------------------------------------------------------------------------------------------

## 👫 Followers (FOLLOWERS API)

Gestion des relations de suivi entre utilisateurs.
-----------------------------------------------------------------------------------------------------
| #  | Méthode 	| Endpoint 						| Description 								| Auth   |
|----|---------	|-------------------------------|-------------------------------------------|--------|
| 26 | GET 		| `/users/{username}/followers` | Récupère les followers d'un utilisateur	| ❌ Non |
| 27 | GET 		| `/users/{username}/following` | Récupère les abonnements d'un utilisateur | ❌ Non |
| 28 | POST 	| `/users/{username}/follow` 	| Suivre un utilisateur 					| ✅ Oui |
| 29 | DELETE 	| `/users/{username}/follow` 	| Arrêter de suivre un utilisateur 			| ✅ Oui |
------------------------------------------------------------------------------------------------------

## 🔔 Notifications (NOTIFICATIONS API)

Gestion des notifications utilisateur.
-----------------------------------------------------------------------------------------------------
| #  | Méthode | Endpoint 								| Description 						| Auth   |
|----|---------|----------------------------------------|-----------------------------------|--------|
| 30 | GET 	   | `/notifications` 						| Récupère toutes les notifications | ✅ Oui |
| 31 | PATCH   | `/notifications/{notificationId}/read` | Marquer comme lue 				| ✅ Oui |
| 32 | PATCH   | `/notifications/read-all` 				| Marquer tout comme lu 			| ✅ Oui |
-----------------------------------------------------------------------------------------------------

## 💬 Messages (MESSAGES API)

Gestion des conversations et messages privés.
----------------------------------------------------------------------------------------------------------------------
| #  | Méthode  | Endpoint 										| Description 								| Auth   |
|----|----------|-----------------------------------------------|-------------------------------------------|--------|
| 33 | GET 		| `/messages/conversations` 					| Récupère toutes les conversations 		| ✅ Oui |
| 34 | GET 		| `/messages/conversations/{conversationId}`	| Récupère les messages d'une conversation 	| ✅ Oui |
| 35 | POST 	| `/messages` 									| Envoie un message 						| ✅ Oui |
---------------------------------------------------------------------------------------------------------------------

## 💭 Commentaires (COMMENTS API)

Gestion des commentaires sur les posts.
------------------------------------------------------------------------------------------
| #  | Méthode | Endpoint 				   | Description 						 | Auth   |
|----|---------|---------------------------|-------------------------------------|--------|
| 36 | GET 	   | `/comments/post/{postId}` | Récupère les commentaires d'un post | ❌ Non |
| 37 | POST    | `/comments/post/{postId}` | Crée un commentaire 				 | ✅ Oui |
| 38 | PATCH   | `/comments/{commentId}`   | Modifie un commentaire              | ✅ Oui |
| 39 | DELETE  | `/comments/{commentId}`   | Supprime un commentaire             | ✅ Oui |
------------------------------------------------------------------------------------------

## 🔍 Recherche (SEARCH API)

Recherche d'utilisateurs et ressources.
----------------------------------------------------------------------------------------------
| #  | Méthode | Endpoint 					 | Description 							 | Auth   |
|----|---------|-----------------------------|---------------------------------------|--------|
| 40 | GET 	   | `/search/42users?query=...` | Recherche utilisateurs 42 (API intra) | ✅ Oui |
| 41 | GET     | `/search/users?query=...` 	 | Recherche utilisateurs locaux (BDD)   | ✅ Oui |
-----------------------------------------------------------------------------------------------

## 📋 Résumé par Type de Requête

### GET (20 requêtes) - Lecture de données
```
/auth/me
/users
/users/{userId}
/users/{username}
/users/{username}/posts
/users/{username}/media
/users/{username}/likes
/users/{userId}/posts
/users/{username}/followers
/users/{username}/following
/posts
/comments/post/{postId}
/notifications
/messages/conversations
/messages/conversations/{conversationId}
/search/42users
/search/users
/users/search
/auth/42 (redirection)
```

### POST (13 requêtes) - Créer / Envoyer
```
/auth/login
/auth/42/callback
/auth/42/confirm
/auth/register
/posts
/posts/{postId}/like
/users/{username}/follow
/comments/post/{postId}
/messages
/users/me/avatar
/auth/change-password
/users/{userId} (create via update)
/search/... (queries)
```

### PATCH (7 requêtes) - Modification partielle
```
/users/me
/posts/{postId}
/comments/{commentId}
/notifications/{notificationId}/read
/notifications/read-all
/users/{userId}
```

### DELETE (6 requêtes) - Suppression
```
/posts/{postId}
/posts/{postId}/like
/comments/{commentId}
/users/{username}/follow
```
## 🛡️ Codes de Réponse
-------------------------------------------------
| Code | Signification 							 |
|------|-----------------------------------------|
| 200  | ✅ Succès 								|
| 201  | ✅ Créé avec succès 					|
| 400  | ❌ Requête invalide 					|
| 401  | ❌ Non authentifié 						|
| 403  | ❌ Non autorisé 						|
| 404  | ❌ Non trouvé 							|
| 409  | ❌ Conflit (ex: username existe déjà) 	|
| 500  | ❌ Erreur serveur 						|
-------------------------------------------------

---

## 📝 Notes Importantes

1. **JWT Token** - Obtenu lors du login ou OAuth 42, valide pendant 24h
2. **PATCH vs PUT** - On utilise **PATCH** pour les modifications partielles
3. **FormData** - Utilisé pour l'upload de fichiers (avatar, média)
4. **Pagination** - Par défaut page=1, limit=10 (variable par endpoint)
5. **Rate Limiting** - À ajouter pour l'API publique (future)

---

## 🚀 Frontend (api.js)

Toutes ces requêtes sont centralisées dans `/frontend/src/services/api.js` via la fonction `fetchWithAuth()` qui:
- Ajoute automatiquement le token JWT
- Gère les erreurs 401
- Redirige vers login en cas de session expirée
- Centralise les logs de débogage

---

**Dernière mise à jour:** 20 mars 2026  




---------------------------

## � Schémas des Réponses (Objets Attendus par le Frontend)

### 👤 User Object
```json
{     //// AJOUT DE THEME dans mon bff
  "id": 1,                              
  "username": "john_doe",                   //userDB
  "email": "john@42hub.com",                //authDB
  "firstName": "John",                      //userDB
  "lastName": "Doe",                        //userDB
  "avatar": "https://...",                  //userDB et stocké dans BFF
  "bio": "Mon bio",                         //userDB
  "postsCount": 12,                         //généré par BFF
  "followersCount": 45,                     //généré par BFF
  "followingCount": 23,                     //généré par BFF
  "createdAt": "2026-02-15T10:30:00Z",      //userDB
  "isFollowing": false,                     //généré par BFF
  "isFollowedBy": true                      //généré par BFF
}
```

### 📝 Post Object
```json
{
  "id": 42,
  "content": "Mon contenu du post",         //postDB
  "userId": 1,                              //postDB
  "author": "john_doe",                     //généré par BFF : username
  "avatar": "https://...",                  //postDB
  "date": "2026-03-20 15:45",               //postDB
  "isEdited": false,                        //postDB 
  "likesCount": 3,                          //BFF
  "isLiked": false,                         //BFF : dis si le user connecté a liké ce post
  "commentsCount": 2,                       //BFF
  "user": {                                 //virer
    "id": 1,
    "username": "john_doe",
    "firstName": "John",
    "lastName": "Doe",
    "avatar": "https://..."
  },
  "_count": {
    "likes": 3,
    "comments": 2
  },
  "createdAt": "2026-03-20T15:45:00Z",      //postDB
  "updatedAt": "2026-03-20T15:45:00Z"       //postDB
}
```

### 💬 Comment Object
```json
{
  "id": 5,
  "content": "Commentaire sympa!",
  "postId": 42,
  "userId": 2,
  "author": "jane_smith",
  "avatar": "https://...",
  "createdAt": "2026-03-20T16:20:00Z",
  "updatedAt": "2026-03-20T16:20:00Z",
  "user": {
    "id": 2,
    "username": "jane_smith",
    "firstName": "Jane",
    "lastName": "Smith",
    "avatar": "https://..."
  }
}
```

### 💭 Message Object
```json
{
  "id": 10,
  "content": "Salut, ça va?",
  "conversationId": 3,
  "senderId": 1,
  "receiverId": 2,
  "isRead": false,
  "createdAt": "2026-03-20T14:30:00Z",
  "sender": {
    "id": 1,
    "username": "john_doe",
    "avatar": "https://..."
  }
}
```

### 💬 Conversation Object
```json
{
  "id": 3,
  "participant1Id": 1,
  "participant2Id": 2,
  "lastMessage": "Salut, ça va?",
  "lastMessageAt": "2026-03-20T14:30:00Z",
  "unreadCount": 2,
  "participant": {
    "id": 2,
    "username": "jane_smith",
    "firstName": "Jane",
    "lastName": "Smith",
    "avatar": "https://..."
  }
}
```

### 🔔 Notification Object
```json
{
  "id": 8,
  "userId": 1,
  "type": "like",
  "message": "john_doe a aimé votre post",
  "relatedUserId": 2,
  "relatedPostId": 42,
  "isRead": false,
  "createdAt": "2026-03-20T13:15:00Z",
  "sender": {
    "id": 2,
    "username": "john_doe",
    "avatar": "https://..."
  }
}
```

### 👥 Follower Object
```json
{
  "id": 1,
  "followerId": 5,
  "followingId": 1,
  "createdAt": "2026-03-15T10:00:00Z",
  "follower": {
    "id": 5,
    "username": "alice_wonder",
    "firstName": "Alice",
    "lastName": "Wonder",
    "avatar": "https://..."
  }
}
```

### 📊 Pagination Response
```json
{
  "posts": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

## 📝 Notes Importantes

1. **JWT Token** - Obtenu lors du login ou OAuth 42, valide pendant 24h
2. **PUT** - On utilise **PUT** pour les modifications (remplace la ressource)
3. **FormData** - Utilisé pour l'upload de fichiers (avatar, média)
4. **Pagination** - Par défaut page=1, limit=10 (variable par endpoint)
5. **Rate Limiting** - À ajouter pour l'API publique (future)
6. **Schémas** - Les objets retournés par le backend doivent respecter les structures ci-dessus pour que le frontend fonctionne correctement

---

## 🚀 Frontend (api.js)

Toutes ces requêtes sont centralisées dans `/frontend/src/services/api.js` via la fonction `fetchWithAuth()` qui:
- Ajoute automatiquement le token JWT
- Gère les erreurs 401
- Redirige vers login en cas de session expirée
- Centralise les logs de débogage
