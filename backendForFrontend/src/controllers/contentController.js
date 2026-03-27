exports.getPosts = async (req, res) => {
  try {
    const { date, limit } = req.query;

    const params = new URLSearchParams();
    if (date)  params.append('date',  date);
    if (limit) params.append('limit', limit);
    params.append('sort', 'desc');

    const postsResponse = await fetch(`${process.env.CONTENT_SERVICE_URL}/post?${params}`);

    if (!postsResponse.ok) {
      return res.status(503).json({ error: 'Content service unavailable.' });
    }

    const posts = await postsResponse.json();

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    const countsResponses = await Promise.all(
      posts.map(post =>
        Promise.all([
          fetch(`${process.env.CONTENT_SERVICE_URL}/comment/count/post/${post.id}`).then(r => r.json()),
          fetch(`${process.env.CONTENT_SERVICE_URL}/like/count/post/${post.id}`).then(r => r.json()),
        ])
      )
    );

    const result = posts.map((post, index) => {
      const [commentsCount, likesCount] = countsResponses[index];

      return {
        id: post.id,
        content: post.content ?? null,
        image: post.image ?? null,
        pdf: post.pdf ?? null,
        userId: post.userId,
        createdAt: post.createdAt,
        modifiedAt: post.modifiedAt,
        commentsCount: commentsCount?.count ?? 0,
        likesCount: likesCount?.count ?? 0,
      };
    });

    return res.status(200).json(result);

  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.createOnePost = async (req, res) => {
  try {
    let post = {};
    if (req.body.post) {
      try {
        post = JSON.parse(req.body.post);
      }
      catch {
        return res.status(400).json({ error: 'Invalid post data format.' });
      }
    }

    const { content } = post;

    if (!content && !req.file) {
      return res.status(400).json({ error: 'Content or media is required.' });
    }

    const image = req.file && req.file.mimetype !== 'application/pdf'
      ? `${process.env.BFF_URL}/uploads/images/${req.file.filename}`
      : null;

    const pdf = req.file && req.file.mimetype === 'application/pdf'
      ? `${process.env.BFF_URL}/uploads/pdfs/${req.file.filename}`
      : null;

    const postResponse = await fetch(`${process.env.CONTENT_SERVICE_URL}/post/`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:  req.userId,
        content: content ?? null,
        image,
        pdf,
      }),
    });

    if (!postResponse.ok) {
      return res.status(503).json({ error: 'Content service unavailable.' });
    }

    return res.sendStatus(201);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};