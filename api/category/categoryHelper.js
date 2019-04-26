const db = require('../../data/dbConfig.js');

module.exports = {
  getAll,
  getCategoryById,
  checkForCategory,
  updateCategory,
  deleteCategory
};

async function getAll() {
  return db('category');
};

async function getCategoryById(id) {
  return db('category')
    .where('id', id);
};

async function checkForCategory(newCategory) {
  return db('category')
    .where('title', newCategory.title);
};

async function updateCategory(id, changes) {
  return db('category')
    .where('id', Number(id))
    .update(changes);
};

async function deleteCategory(id) {
  return db('category')
    .where('id', Number(id))
    .del();
};