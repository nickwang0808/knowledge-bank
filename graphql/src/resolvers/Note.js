function author(parent, args, context) {
  return context.prisma.note.findOne({ where: { id: parent.id } }).author();
}

module.exports = {
  author,
};
