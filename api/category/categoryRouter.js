const express = require('express');
const db = require('./categoryHelper.js');
const { auth } = require('../../auth/authenticate.js');
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  const rows = await db.getAll();
  if(rows.length > 0) {
    res.status(200).json(rows);
  } else {
    res.status(500).json({ message: 'There was an error getting card data' });
  };
});

categoryRouter.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const category = await db.getCategoryById(id);
  if(category.length > 0) {
    res.status(200).json(category[0]);
  } else {
    res.status(404).json({ message: 'Not Found' })
  };
});

categoryRouter.post('/', auth, async (req, res) => {
  const newCategory = req.body;
  if(newCategory.title) {
    const duplicate = await db.checkForCategory(newCategory);
    if(duplicate.length > 0) {
      res.status(400).json({ message: 'Category already exists' });
    } else {
      const ids = await db.addCategory(newCategory);
      if(ids) {
        res.status(201).json(ids);
      } else {
        res.status(500).json({ message: 'Databse Error' });
      }
    }
  } else {
    res.status(422).json({ message: 'Please provide a title' });
  };
});

module.exports = categoryRouter;