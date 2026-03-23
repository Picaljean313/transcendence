const express = require('express');
const router = express.Router();
const contentCtrl = require ('./controller');

router.post('/post/', contentCtrl.createOnePost);
router.get('/post/', contentCtrl.getAllPosts);
router.delete('/post/', contentCtrl.deleteAllPosts);
router.get('/post/:postId', contentCtrl.getOnePost);
router.put('/post/:postId', contentCtrl.modifyOnePost);
router.delete('/post/:postId', contentCtrl.deleteOnePost);
router.get('/post/:userId', contentCtrl.getUserPosts);
router.get('/post/count/:userId', contentCtrl.getUserPostsCount);
router.delete('/post/:userId', contentCtrl.deleteUserPosts);

router.post('/comment/', contentCtrl.createOneComment);
router.get('/comment/', contentCtrl.getAllComments);
router.delete('/comment/', contentCtrl.deleteAllComments);
router.get('/comment/:commentId', contentCtrl.getOneComment);
router.put('/comment/:commentId', contentCtrl.modifyOneComment);
router.delete('/comment/:commentId', contentCtrl.deleteOneComment);
router.get('/comment/:userId', contentCtrl.getUserComments);
router.delete('/comment/:userId', contentCtrl.deleteUserComments);
router.delete('/comment/:postId', contentCtrl.deletePostComments);

// quand un utilisateur ou admin supprime un commentaire depuis le front, 
// faire put (et non delete) et changer le champ booleen deleted    ---- > à gérer dans le BFF

router.post('/like/', contentCtrl.createOneLike);
router.get('/like/', contentCtrl.getAllLikes);
router.delete('/like/', contentCtrl.deleteAllLikes);
router.get('/like/:likeId', contentCtrl.getOneLike);
router.delete('/like/:likeId', contentCtrl.deleteOneLike);
router.delete('/like/:userId', contentCtrl.deleteUserLikes);
router.delete('/like/:postId', contentCtrl.deletePostLikes);

module.exports = router;