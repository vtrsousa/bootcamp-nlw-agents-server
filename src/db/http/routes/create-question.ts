import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { schema } from "../../schema/index.ts";
import z from "zod/v4";
import { db } from "../../connection.ts";
import { eq } from "drizzle-orm";

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
 app.post('/rooms/:roomId/questions', {
   schema :{
    params: z.object({
      roomId: z.string(),
    }),
     body: z.object({
       question: z.string().min(1),
     })
   }
  },
   async (request, reply) => {
    const {roomId} = request.params
    const { question } = request.body
    const result = await db.insert(schema.questions).values({
      question,
      roomId
    }).returning()
 
    const insertQuestion = result[0]
 
    if (!insertQuestion) {
      throw new Error('Failed to create new room')
    }
 
    return reply.status(201).send({ roomId: insertQuestion.id})
  })
}