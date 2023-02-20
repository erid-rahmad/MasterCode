
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name,category } = req.body;
    const result = await prisma.type.create({
      data: {
        name: name,
        category: category
      },
    });
    res.json(result);
}
