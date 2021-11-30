import express from "express";
import listController from '../controllers/listController.js'

let router = express.Router();

router.get('/random', listController.getRandomApi);

router.get('/', listController.getAll);

router.get('/:id', listController.getOne);

router.post('/', listController.create);

router.put('/:id', listController.update);

router.delete('/:id', listController.remove);

export default router;
