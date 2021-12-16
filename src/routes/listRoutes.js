import express from "express";
import listController from '../controllers/listController.js'

let router = express.Router();

router.get('/categories', listController.getCategories);

router.get('/random', listController.getRandomApi);

router.get('/entries', listController.getAllApis);

router.get('/', listController.getOne);

router.post('/', listController.create);

router.put('/', listController.update);

router.delete('/', listController.remove);

export default router;
