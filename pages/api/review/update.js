import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
    const {id,cardTitle, body, footer, images, type, typeId} = req.body;

    const result = await prisma.Product.update({
        where: {
            id: id,
        },
        data: {
            cardTitle: cardTitle,
            body: body,
            footer: footer,
            images: images,
            type: type,
            typeId: typeId
        },
    });
    res.json(result);
}
