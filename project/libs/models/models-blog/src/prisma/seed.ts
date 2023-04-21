import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function fillDB() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Post Text',
      userID: 'sdfsdf',
      data: {
        anonce: 'Anonce Text'
      },
      tags: {
        create: [
          { title: 'Tag 1' },
          { title: 'Tag 2' },
        ]
      },
      comments: {
        create: [
          { text: 'Comment 1', userID: 'sdfsdf' },
        ]
      }
    }
  });
}

fillDB()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  })
