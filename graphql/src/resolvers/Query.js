const { getUserId } = require("../utils");

function info(parent, args, context, info) {
  const userId = getUserId(context);
  if (userId) {
    return "user is logged in";
  } else {
    return "user is not logged in";
  }
}

function users(parent, args, context, info) {
  return context.prisma.user.findMany();
}

// need to only find notes wriiten by current user
async function allNotes(parent, args, context) {
  getUserId(context);
  const notes = await context.prisma.note.findMany();
  return notes;
}

module.exports = { info, users, allNotes };
