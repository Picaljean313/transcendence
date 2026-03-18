const prisma = require('./prisma');
const { v4: uuidv4 } = require('uuid'); // : permet de renommer la fonction v4 de l'objet retourné

exports.createOneAuth = async (req, res) => {
  try {
    const { email, password, login42 } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }

    const auth = await prisma.auth.create({
      data: {
        userId: uuidv4(),
        email,
        login42: login42 ?? null,
        password,
      },
    });
    return res.sendStatus(201);
  }
  catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email or login42 already used.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

exports.getAllAuths = async (req, res) => {
  try {
    const auths = await prisma.auth.findMany({
      select: {
        id: true,
        userId: true,
        email: true,
        login42: true,
        createdAt: true,
      },
    });
    return res.status(200).json(auths);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

exports.deleteAllAuths = async (req, res) => {
  try {
    const { count } = await prisma.auth.deleteMany();
    return res.status(200).json({ deleted: count });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

exports.getOneAuth = async (req, res) => {
  try {
    const { authId } = req.params;

    const auth = await prisma.auth.findUnique({
      where: { id: authId },
      select: {
        id:        true,
        userId:    true,
        email:     true,
        login42:   true,
        createdAt: true,
      },
    });

    if (!auth) {
      return res.status(404).json({ error: `Can't find user.` });
    }

    return res.status(200).json(auth);

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error.' });
  }
};

exports.modifyOneAuth = async (req, res) => {
  try {
    const { authId } = req.params;
    const { email, password, login42 } = req.body;

    await prisma.auth.update({
      where: { id: authId },
      data: {
        ...(email    && { email }),
        ...(password && { password }),
        ...(login42  && { login42 }),
      },
    });
    return res.sendStatus(200);
  }
  catch (error) {
    switch (error.code) {
      case 'P2025':
        return res.status(404).json({ error: `Can't find user.` });
      case 'P2002':
        return res.status(409).json({ error: 'Email or login42 already used.' });
      default:
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
  }
};

exports.deleteOneAuth = async (req, res) => {
  try {
    const { authId } = req.params;

    await prisma.auth.delete({
      where: { id: authId },
    });
    return res.sendStatus(200);
  }
  catch (error) {
    switch (error.code) {
      case 'P2025':
        return res.status(404).json({ error: `Can't find user.` });
      default:
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
  }
};


