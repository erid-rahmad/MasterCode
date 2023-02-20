
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { cardTitle,body,footer,images,type,typeId } = req.body;
    const result = await prisma.category.findMany();

    res.json(result);
}
