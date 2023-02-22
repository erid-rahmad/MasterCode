
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const result = await prisma.Product.findMany();
    res.json(result);
}
