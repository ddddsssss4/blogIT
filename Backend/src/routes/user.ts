import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
 
import { Hono } from "hono";
import { verify,sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings : {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

userRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });

  // const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
    jwt: c.env.JWT_SECRET
  })
})






