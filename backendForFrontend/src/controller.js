const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

exports.registerRedirectTo42 = (req, res) => {
  const params = new URLSearchParams({
    client_id:     process.env.FORTYTWO_CLIENT_ID,
    redirect_uri:  process.env.FORTYTWO_REGISTER_REDIRECT_URI,
    response_type: 'code',
  });
  res.redirect(`https://api.intra.42.fr/oauth/authorize?${params}`);
};

exports.registerHandleCallback = async (req, res) => {
  try {
    const { code, error } = req.query;
    if (error) {
        return res.redirect(`${process.env.FRONTEND_URL}?error=login_cancelled`);
      }
    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing.' });
    }

    const tokenResponse = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type:    'authorization_code',
        client_id:     process.env.FORTYTWO_CLIENT_ID,
        client_secret: process.env.FORTYTWO_CLIENT_SECRET,
        redirect_uri:  process.env.FORTYTWO_REDIRECT_URI,
        code,
      }),
    });
    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      return res.status(401).json({ error: 'Failed to obtain access token.' });
    }

    const userResponse = await fetch('https://api.intra.42.fr/v2/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const user42 = await userResponse.json();

    const { login, first_name, last_name, email, image } = user42;
    const avatar = image?.versions?.medium ?? image?.link ?? null;
  
    const response = await fetch(`https://localhost:3000/login/${login}`);

    if (response.ok)
      return res.status(409).json({ error: 'login42 already in use.' });
    
    if (response.status === 500) {
      return res.status(503).json({ error: 'Auth service unavailable, please try again later.' });
    }

    return res.status(200).json({ login, first_name, last_name, email, avatar });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.authRedirectTo42 = (req, res) => {
  const params = new URLSearchParams({
    client_id:     process.env.FORTYTWO_CLIENT_ID,
    redirect_uri:  process.env.FORTYTWO_AUTH_REDIRECT_URI,
    response_type: 'code',
  });
  res.redirect(`https://api.intra.42.fr/oauth/authorize?${params}`);
};

exports.authHandleCallback = async (req, res) => {
  try {
    const { code, error } = req.query;
    if (error) {
        return res.redirect(`${process.env.FRONTEND_URL}?error=login_cancelled`);
      }
    if (!code) {
      return res.status(400).json({ error: 'Authorization code missing.' });
    }

    const tokenResponse = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type:    'authorization_code',
        client_id:     process.env.FORTYTWO_CLIENT_ID,
        client_secret: process.env.FORTYTWO_CLIENT_SECRET,
        redirect_uri:  process.env.FORTYTWO_REDIRECT_URI,
        code,
      }),
    });
    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      return res.status(401).json({ error: 'Authentication failed.' });
    }

    const user42Response = await fetch('https://api.intra.42.fr/v2/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!user42Response.ok) {
      return res.status(502).json({ error: 'Failed to retrieve 42 user data.' });
    }
    const { login } = await user42Response.json();

    if (!login) {
      return res.status(502).json({ error: 'Invalid response from 42 API.' });
    }
  
    const authResponse = await fetch(`https://localhost:3000/login/${login}`);

    if (authResponse.status === 404)
      return res.status(404).json({ error: 'No account found.' });
    
    if (!authResponse.ok) {
      return res.status(503).json({ error: 'Auth service unavailable, please try again later.' });
    }

    const [userResponse, friendsCount, followersCount, postsCount] = await Promise.all([
      fetch(`https://localhost:3001/id/${authResponse.userId}`).then(r => r.json()),
      fetch(`https://localhost:3002/friendsCount/${authResponse.userId}`).then(r => r.json()),
      fetch(`https://localhost:3002/followersCount/${authResponse.userId}`).then(r => r.json()),
      fetch(`https://localhost:3003/post/count/${authResponse.userId}`).then(r => r.json()),
    ]).catch(() => {
      return res.status(503).json({ error: 'Service unavailable.' });
    });

    const user = {  
        "id": authResponse.userId,                        
        "username": authResponse.login42,
        "email": authResponse.email,
        "firstName": userResponse.firstname,
        "lastName": userResponse.lastname,
        "bio": userResponse.bio,
        "theme": userResponse.theme,
        "avatar": userResponse.avatar,
        "postsCount": postsCount,
        "followersCount": followersCount,
        "followingCount": friendsCount,
        "createdAt": userResponse.createdAt
    };

    let token;
    try {
      token = jwt.sign(
        { userId: auth.userId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
    }
    catch (error) {
      return res.status(500).json({ error: 'Failed to generate token.' });
    }

    return res.status(200).json({user : user, token : token});
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.authClassic = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!req.body.password) {
    return res.status(400).json({ error: 'Password is required.' });
  }
  
  const authResponse = await fetch(`https://localhost:3000/email/${req.body.email}`);

  if (authResponse.status === 404)
    return res.status(404).json({ error: 'No account found.' });
  
  if (!authResponse.ok) {
    return res.status(503).json({ error: 'Auth service unavailable, please try again later.' });
  }

  let validPassword;
  try {
    validPassword = await bcrypt.compare(req.body.password, user.password);
  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }

  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password.' });
  }

  const [userResponse, friendsCount, followersCount, postsCount] = await Promise.all([
    fetch(`https://localhost:3001/id/${authResponse.userId}`).then(r => r.json()),
    fetch(`https://localhost:3002/friendsCount/${authResponse.userId}`).then(r => r.json()),
    fetch(`https://localhost:3002/followersCount/${authResponse.userId}`).then(r => r.json()),
    fetch(`https://localhost:3003/post/count/${authResponse.userId}`).then(r => r.json()),
  ]).catch(() => {
    return res.status(503).json({ error: 'Service unavailable.' });
  });

  const user = {  
      "id": authResponse.userId,                        
      "username": authResponse.login42,
      "email": authResponse.email,
      "firstName": userResponse.firstname,
      "lastName": userResponse.lastname,
      "bio": userResponse.bio,
      "theme": userResponse.theme,
      "avatar": userResponse.avatar,
      "postsCount": postsCount,
      "followersCount": followersCount,
      "followingCount": friendsCount,
      "createdAt": userResponse.createdAt
  };

  let token;
  try {
    token = jwt.sign(
      { userId: auth.userId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
  catch (error) {
    return res.status(500).json({ error: 'Failed to generate token.' });
  }
  
  return res.status(200).json({user : user, token : token});
};






const getValid42Token = async () => {
  try {
    const response = await fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type:    'client_credentials',
        client_id:     process.env.FORTYTWO_CLIENT_ID,
        client_secret: process.env.FORTYTWO_CLIENT_SECRET,
      }),
    });

    const data = await response.json();

    if (!data.access_token) {
      throw new Error('No access token in response.');
    }
    return data.access_token;
  }
  catch (error) {
    console.error(error.message);
    throw new Error('Failed to retrieve 42 token.');
  }
};

exports.search42Users = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search cannot be empty.' });
    }

    const accessToken = await getValid42Token();

    const params = new URLSearchParams({
      'search[login]': query,
      per_page:        10,
    });

    const response = await fetch(`https://api.intra.42.fr/v2/users?${params}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();

    const users = data.map((user) => {
      const cursus42 = user.cursus_users?.find(c => c.cursus.slug === '42cursus');

      return {
        id:          user.id,
        login:       user.login,
        displayName: user.displayname     ?? user.usual_full_name,
        avatar:      user.image?.versions?.medium ?? user.image?.link,
        campus:      user.campus?.[0]?.name       ?? 'Unknown',
        cursus:      cursus42?.cursus?.name        ?? '42',
        level:       cursus42?.level               ?? 0,
      };
    });

    return res.status(200).json({ users });
  }
  catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};