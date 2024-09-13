import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  signupInput } from '@100xdevs/medium-common'
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
  console.log("chalega");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const {success} = signupInput.safeParse(body)
if(!success){


  c.status(411);
  return c.json({
    message: "Inputs are incorrect"
  })
}
  

  const user = await prisma.user.create({
    data: {
      email: body.username,
      password: body.password,
      name: body.name,
      role:  body.role,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  console.log(token);
  return c.json(token);
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.username,
            
        }
    });
    console.log(user);
    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json(jwt);
})

