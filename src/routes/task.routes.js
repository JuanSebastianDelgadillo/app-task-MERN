const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async(req, res) => {
    const tasks = await Task.find();
    res.json({
        status: 'recibido',
        tasks: tasks
    });
});

router.get('/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.json({
        status: '201',
        resp: task
    });
});

router.post('/', async(req, res) => {
    // console.log(req.body);
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.json({
        status: '200'
    });
});

router.put('/:id', async(req, res) => {
    // console.log(req.body);
    const { title, description } = req.body;
    const newTask = { title, description };
    await Task.findByIdAndUpdate(req.params.id, newTask);

    res.json({
        status: '201'
    });
});

router.delete('/:id', async(req, res) => {
    // console.log(req.body);
    // const { title, description } = req.body;
    // const newTask = { title, description };
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: '205'
    });
});

module.exports = router;