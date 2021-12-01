import listItem from '../models/listItem.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const listController = {
    getCategories: async (req, res) => {
        let body = lowerCaseKeys(req.body)
        let category = body.category;

        if (!category) {
            category = "";
        }
        await axios.get(`http://api.publicapis.org/categories`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },

    getAllApis: async (req, res) => {
        let body = lowerCaseKeys(req.body)
        let category = body.category;

        if (!category) {
            category = "";
        }
        await axios.get(`http://api.publicapis.org/entries?category=${category}`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },

    getRandomApi: async (req, res) => {
        let body = lowerCaseKeys(req.body)
        let category = body.category;

        if (!category) {
            category = "";
        }
        await axios.get(`http://api.publicapis.org/random?category=${category}`).then(

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
        let body = lowerCaseKeys(req.body)

        let requestItem = new listItem({
            id: id,
            api: body.api,
            description: body.description,
            auth: body.auth,
            https: body.https,
            cors: body.cors,
            category: body.category,
            link: body.link,
            favorite: body.favorite,
            saved: body.saved,
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
        let body = lowerCaseKeys(req.body)

        try {
            let existingItem = await listItem.findOne({ id: id });

            existingItem.api = body.api
            existingItem.description = body.description
            existingItem.auth = body.auth
            existingItem.https = body.https
            existingItem.cors = body.cors
            existingItem.link = body.link
            existingItem.favorite = body.favorite
            existingItem.saved = body.saved

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
const lowerCaseKeys = (obj) => {
    let key, keys = Object.keys(obj);
    let n = keys.length;
    let lowercaseObject = {}
    while (n--) {
        key = keys[n];
        lowercaseObject[key.toLowerCase()] = obj[key];
    }
    return lowercaseObject;
}
export default listController