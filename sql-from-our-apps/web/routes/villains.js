const express = require('express');
const router = express.Router();
const { getVillains, getVillainById, updateVillain, createVillain, deleteVillain } = require('../data-access/queries');

router.get('/', (request, response) => {
    getVillains()
        .then(villains => {
            response.render('index', { villains });
        })
        .catch(err => {
            response.render('error', { err });
        });
});

router.get('/new', (request, response) => {
    response.render('new-villain');
});

router.get('/:id', (request, response) => {
    getVillainById(request.params.id)
        .then(villain => {
            response.render('villain', { villain });
        })
        .catch(err => {
            response.render('error', { err });
        });
});

router.post('/:id', (request, response) => {
    updateVillain(request.params.id, request.body.name)
        .then(() => {
            response.redirect(`/villains/${request.params.id}`);
        })
        .catch(err => {
            response.render('error', { err });
        });
});

router.post('/', (request, response) => {
    const villain = request.body;
    createVillain(villain.name, villain.movie)
        .then(() => {
            response.redirect('/villains');
        })
        .catch(err => {
            response.render('error', { err });
        });
});

router.post('/:id/delete', (request, response) => {
    deleteVillain(request.params.id)
        .then(() => {
            response.redirect('/villains');
        })
        .catch(err => {
            response.render('error', { err });
        });
});

module.exports = router;
