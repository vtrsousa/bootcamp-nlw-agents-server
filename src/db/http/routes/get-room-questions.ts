import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { schema } from "../../schema/index.ts";
import z from "zod/v4";
import { db } from "../../connection.ts";
import { eq } from "drizzle-orm";

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
 app.get('/rooms/:roomId/questions', { 
    schema: {
      params: z.object({
        roomId: z.string()
      })
    },
  }, async (request, desc) => {
    const { roomId } = request.params

    const result = await db.select({
      id: schema.questions.id,
      question: schema.questions.question,
      answer: schema.questions.answer,
      createAt: schema.questions.createAt,
    })
    .from(schema.questions)
    .where(eq(schema.questions.roomId, roomId))
    .orderBy(schema.questions.createAt)

    return result
  })
}