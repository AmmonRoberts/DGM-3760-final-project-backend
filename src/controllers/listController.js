import listItem from '../models/listItem.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const listController = {
    getRandomApi: async (req, res) => {
        let category = req.body.category;
        if (!category) {
            category = "";
        }
        await axios.get(`http://api.publicapis.org/random?auth=null&category=${category}`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },
    getAll: async (req, res) => {
        const apiList = await listItem.find()
        res.send(apiList)
    },
    getOne: async (req, res) => {
        let id = req.params.id;

        const item = await listItem.findOne({ id: id })


        if (item) {
            res.send(item);
        }
        else {
            res.status(404).send("Item not found!")
        }
    },
    create: async (req, res) => {
        let id = uuidv4();

        let requestItem = new listItem({
            id: id,
            api: req.body.api,
            description: req.body.description,
            auth: req.body.auth,
            https: req.body.https,
            cors: req.body.cors,
            category: req.body.category,
            link: req.body.link,
            favorite: req.body.favorite,
            saved: req.body.saved,
        });

        await requestItem.save(function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating list item',
                    error: err
                });
            }

            return res.status(201).json(requestItem);
        });
    },
    update: async (req, res) => {
        let id = req.params.id;

        try {
            let existingItem = await listItem.findOne({ id: id });

            existingItem.api = req.body.api
            existingItem.description = req.body.description
            existingItem.auth = req.body.auth
            existingItem.https = req.body.https
            existingItem.cors = req.body.cors
            existingItem.link = req.body.link
            existingItem.favorite = req.body.favorite
            existingItem.saved = req.body.saved

            await existingItem.save();
            res.send(existingItem);
        }
        catch {
            res.status(404).send("Item not found!")
        }
    },
    remove: async (req, res) => {
        let id = req.params.id;

        let response = await listItem.deleteOne({ id: id })

        if (response.deletedCount > 0) {
            res.send("Successfully deleted!")
        }
        else {
            res.status(404).send("Item not found!")

        }
    }
}
export default listController