import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../connection.ts";
import { schema } from "../../schema/index.ts";
import { eq, count } from "drizzle-orm";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
 app.get('/rooms', async () => {
  const results = await db.select({
    id: schema.rooms.id,
    name: schema.rooms.name,
    createAr: schema.rooms.createAt,
    questionsCount: count(schema.questions.id)
  })
  .from(schema.rooms)
  .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
  .groupBy(schema.rooms.id)
  .orderBy(schema.rooms.createAt)

  return results
 })
}