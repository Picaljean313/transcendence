exports.getAllPosts = async (req, res) => {
  try {
    const { date, limit, sort } = req.query;

    const parsedLimit = limit ? parseInt(limit) : undefined;
    const parsedDate  = date  ? new Date(date)  : undefined;
    const parsedSort  = sort === 'asc' ? 'asc'  : 'desc';

    if (limit && (isNaN(parsedLimit) || parsedLimit <= 0)) {
      return res.status(400).json({ error: 'Invalid limit value.' });
    }

    if (date && isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date value.' });
    }

    const posts = await prisma.post.findMany({
      where: {
        ...(parsedDate && {
          createdAt: { lt: parsedDate },
        }),
      },
      orderBy: { createdAt: parsedSort },
      take:    parsedLimit,
    });

    return res.status(200).json(posts);

  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

//  date : ISO 8601, exemple : 2025-10-12T15:45:00.000Z



exports.deletePostLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required.' });
    }

    await prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });

    return res.sendStatus(200);

  } catch (error) {
    switch (error.code) {
      case 'P2025':
        return res.status(404).json({ error: 'Like not found.' });
      default:
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
  }
};



// TODO
// faire en sorte qu'une suppression de post vire aussi les commentaires et likes liés au post 



exports.getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const { date, limit, sort } = req.query;

    const parsedLimit = limit ? parseInt(limit) : undefined;
    const parsedDate  = date  ? new Date(date)  : undefined;
    const parsedSort  = sort === 'asc' ? 'asc'  : 'desc';

    if (limit && (isNaN(parsedLimit) || parsedLimit <= 0)) {
      return res.status(400).json({ error: 'Invalid limit value.' });
    }

    if (date && isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date value.' });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
        ...(parsedDate && {
          createdAt: { lt: parsedDate },
        }),
      },
      orderBy: { createdAt: parsedSort },
      take:    parsedLimit,
    });

    return res.status(200).json(comments);

  }
  catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};