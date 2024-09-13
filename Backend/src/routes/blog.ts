import { Hono } from 'hono'
import { SignupInput , createBlogInput} from '@100xdevs/medium-common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
const prisma = new PrismaClient().$extends(withAccelerate())

export const bookRouter = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

// bookRouter.use('/*', async (c,next) => {
  
// 	await next()
// });
  


bookRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    console.log('Received body:', body);

    const token = body.jwt;
    console.log('Received token:', token);

    const decodedPayload = await verify(token, c.env.JWT_SECRET);
    console.log('Decoded payload:', decodedPayload);
     const user = await prisma.user.findUnique({
      where: {
        id:String(decodedPayload.id)
      },
     })
     console.log(user.role);
     if(user.role){
      return c.json({
        error: 'Only authors are allowed to create post'
      },403)
     }
     const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: String(decodedPayload.id),
        authorDescription: body.authorDescription,
        categoryId: body.categoryId,
        branchId: body.branchId, // Optional, only required for Academics category
        imageUrl: body.imageUrl, // Optional, if provided
      },
    });

    await prisma.$disconnect();

    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.error('Error occurred:', error);
    return c.json({ error: 'An error occurred' }, 500);
  } finally {
    await prisma.$disconnect();
  }
});

bookRouter.get('/bulk', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.post.findMany({
		select: {
			id: true,
			title: true,
			content: true,
			published: true,
			createdAt: true,  // Include the createdAt field
			author: {
				select: {
					name: true
				}
			}
		}
	});
console.log(blogs);
   	return c.json(blogs);


})


bookRouter.get('/:id', async (c) => {
	const id = Number(c.req.param("id"));
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const post = await prisma.post.findFirst({
		where: {
		id: id
		}
	});
	console.log(post);

	return c.json(post);


})
  


  






