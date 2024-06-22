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
  },
  Variables: {
      userId: string
  }
}>();

// bookRouter.use('/*', async (c,next) => {
  
// 	await next()
// });
  

bookRouter.post('/', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	// c.set('userId' , "12345")
	// const userId = c.get('userId');
	// console.log(userId);
	const token = body.jwt;
	console.log(token);
	const decodedPayload = await verify(token, c.env.JWT_SECRET);

	const post = await prisma.post.create({
    data: {
        title: body.title,
        content: body.content,
        authorId : decodedPayload.id
    }
});

	return c.json({
		id: post.id
	});
})

bookRouter.get('/bulk', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.post.findMany({
		include: {
				author: {
						select: {
								name: true // Select only the name field from the author
						}
				}
		}
})
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
  
bookRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const update= await prisma.post.update({
		where: {
			id: parseInt(body.id),
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
     
      
		}
	});
 const Post = await prisma.post.findFirst({
		where: {
		id:parseInt(body.id)
		}
	});

	return c.json(Post);
});

  







