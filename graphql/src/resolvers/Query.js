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

async function checkAuth(parent, args, context) {
  try {
    await getUserId(context);
    return { isLoggedIn: true };
  } catch (err) {
    return { isLoggedIn: false };
  }
}

module.exports = { allNotes, checkAuth };
