




// --------------------------------------------- //

router.get('/register/42', bffCtrl.registerRedirectTo42);
router.get('/register/callback', bffCtrl.registerHandleCallback);

router.get('/auth/42', bffCtrl.authRedirectTo42);
router.get('/auth/callback', bffCtrl.authHandleCallback);

router.post('/auth', bffCtrl.authClassic);

router.get('/search42Users/:login', bffCtrl.search42Users);

router.get('/uploads/:folder/:filename', auth, bffCtrl.getFiles);
router.post('/avatar/:userId', auth, upload.single('avatar'), bffCtrl.uploadAvatar); // 'avatar' corrspond au champ dans le fromData
router.post('/pdf/:userId', auth, upload.single('pdf'), bffCtrl.uploadPdf);



router.get('/media/user/:userId', verifyToken, filesCtrl.getUserFiles); //recup media user
exports.getUserFiles = async (req, res) => {            // a check
  try {
    const { userId } = req.params;
    const fs   = require('fs');
    const path = require('path');

    const getFiles = (folder) => {
      const dir = `./uploads/${folder}`;
      if (!fs.existsSync(dir)) return [];

      return fs.readdirSync(dir)
        .filter(file => file.startsWith(userId))
        .map(file => {
          const stats = fs.statSync(`${dir}/${file}`);
          return {
            filename:   file,
            url:        `${process.env.BFF_URL}/files/${folder}/${file}`,
            uploadedAt: stats.birthtime,
          };
        });
    };

    return res.status(200).json({
      avatars: getFiles('avatars'),
      pdfs:    getFiles('pdfs'),
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};