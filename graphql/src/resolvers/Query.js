const { getUserId } = require("../utils");

async function allNotes(parent, args, context) {
  const userId = getUserId(context);
  const notes = await context.prisma.note.findMany({
    where: {
      author: {
        id: userId,
      },
    },
  });
  return notes;
}

module.exports = { allNotes };
