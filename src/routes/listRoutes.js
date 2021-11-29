import express from "express";
import listController from '../controllers/listController.js'

let router = express.Router();

router.get('/', listController.getTrending);

// router.get('/', listController.getAll);

// router.get('/:key', listController.getOne);

// router.post('/', listController.create);

// router.put('/:key', listController.update);

// router.delete('/:key', listController.remove);

export default router;
