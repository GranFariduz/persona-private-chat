const users = [];

const addUser = (id, name) => {
  const user = { id, name };
  users.push(user);
  return user;
};

const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);
};

const getUser = (id) => users.find((user) => user.id === id);

module.exports = { users, addUser, removeUser, getUser };
