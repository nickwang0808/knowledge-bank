const { getUserId } = require("../utils");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secret";

async function signUp(parent, args, context) {
  const username = args.username;

  const userFound = await context.prisma.user.findOne({
    where: {
      username: username,
    },
  });

  if (userFound) {
    throw new Error("User exist");
  } else {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
      data: { username: username, password: password },
    });
    const token = jwt.sign({ userId: user.id }, SECRET);
    return { isLoggedIn: true, token, user };
  }
}

async function login(parent, args, context) {
  const username = args.username;

  const user = await context.prisma.user.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw new Error("user does not exist");
  } else {
    const checkPassword = bcrypt.compare(args.password, user.password);
    if (!checkPassword) {
      throw new Error("Wrong password");
    } else {
      const token = jwt.sign({ userId: user.id }, SECRET);
      return { isLoggedIn: true, token, user };
    }
  }
}

async function create(parent, args, context, info) {
  const userId = await getUserId(context);
  const note = await context.prisma.note.create({
    data: {
      title: args.title,
      body: args.body,
      author: { connect: { id: userId } },
    },
  });
  return note;
}

async function update(parent, args, context) {
  await getUserId(context);
  const note = await context.prisma.note.update({
    where: {
      id: Number(args.id),
    },
    data: {
      title: args.title,
      body: args.body,
    },
  });
  return note;
}

async function deleteNote(parent, args, context) {
  await getUserId(context);
  await context.prisma.note.delete({
    where: {
      id: Number(args.id),
    },
  });
  return true;
}

module.exports = {
  create,
  update,
  deleteNote,
  signUp,
  login,
};
