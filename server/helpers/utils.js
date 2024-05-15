const { parse, compareAsc, compareDesc } = require("date-fns");

const getUserByEmail = (users, email) => {
  return users.find(user => user.email === email)
}

const getSort = (data, field, direction) => {
  if (field === 'date') {
    const sorted = [...data].sort((a, b) => {
      const dateA = parse(a[field], 'dd.MM.yyyy, HH:mm:ss', new Date());
      const dateB = parse(b[field], 'dd.MM.yyyy, HH:mm:ss', new Date());

      if (direction === 'ASC') {
        return compareAsc(dateA, dateB);
      } else {
        return compareDesc(dateA, dateB);
      }
    });
    return sorted
  }

  return [...data].sort((a, b) => {
    if (direction === 'ASC') {
      return a[field] - b[field]
    } else {
      return b[field] - a[field]
    }
  });
}

module.exports = { getSort, getUserByEmail }
