import { Hono } from 'hono'
import {  signupInput } from '@100xdevs/medium-common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
const prisma = new PrismaClient().$extends(withAccelerate())
import { cors } from 'hono/cors'

import { bookRouter } from './routes/blog'
import { userRouter } from './routes/user'
const app = new Hono<{
  Bindings: {
    DATABASE_URL:string
    JWT_SECRET : string
  }
}>()

app.use('/*' , cors())

app.route('/api/v1/blog',bookRouter)
app.route('/api/v1/user',userRouter)
app.post('/', async (c) => {
  console.log("chalega");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
if(!success){


  c.status(411);
  return c.json({
    message: "Inputs are connected"
  })
}
  

  const user = await prisma.user.create({
    data: {
      email: body.username,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
  
    jwt: token
  })
})
app.get('/' , async(c)=>{
  c.text("hello");
})

export default app
