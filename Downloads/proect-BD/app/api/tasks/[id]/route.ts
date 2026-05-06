import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const db = await getDb()

  const task = await db.tasks.findOne({
    where: { id },
    relations: { assignee: true },
  })

  if (!task) return new Response("Not found", { status: 404 })

  const member = await db.projectMembers.findOne({
    where: { projectId: task.projectId, userId: session.user.id },
  })
  if (!member) return new Response("Forbidden", { status: 403 })

  const rootComments = await db.ds
    .getRepository("Comment")
    .createQueryBuilder("comment")
    .leftJoin("comment.author", "author")
    .addSelect(["author.id", "author.name", "author.avatarUrl"])
    .leftJoinAndSelect("comment.replies", "reply")
    .leftJoin("reply.author", "replyAuthor")
    .addSelect(["replyAuthor.id", "replyAuthor.name", "replyAuthor.avatarUrl"])
    .where("comment.taskId = :id AND comment.parentId IS NULL", { id })
    .orderBy("comment.createdAt", "ASC")
    .getMany()

  return Response.json({ ...task, comments: rootComments })
}
