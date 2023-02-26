
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name,review,comment,position,note } = req.body;
    const result = await prisma.Review.create({
      data: {
        name: name,
        review: review,
        comment: comment,
        position: position,
        note: note
      },
    });
    res.json(result);
}
