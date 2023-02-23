
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const { id,cardTitle,body,footer,images,type,typeId } = req.body;
    const result = await prisma.Product.findUnique({
        where: {
            id: id,
        },
    });
    res.json(result);
}
