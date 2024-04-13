import { Hono } from 'hono'
import { SignupInput } from '@100xdevs/medium-common'
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

bookRouter.use('/*', async (c,next) => {
  const jwt = c.req.header('authorization')

  if(!jwt){
    c.status(401);
    return c.json({
      error: "unathorized"
    })
  }
  const payLoad = await verify(jwt,c.env.JWT_SECRET)
  if (!payLoad) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  c.set('userId', payLoad.id);
  console.log(payLoad.id);
	await next()
});
  

bookRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
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
	
	const post = await prisma.post.findMany()

   	return c.json(post);


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

  







