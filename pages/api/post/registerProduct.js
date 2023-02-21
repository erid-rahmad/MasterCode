
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { name,email,instance,phone } = req.body;
    const result = await prisma.registerProduct.create({
      data: {
        name: name,
        email: email,
        instance: instance,
        phone: phone
      },
    });
    res.json(result);
}
