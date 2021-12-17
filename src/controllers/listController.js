import listItem from '../models/listItem.js';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const listController = {
    getCategories: (req, res) => {
        let category = req.query.category;

        if (!category) {
            category = "";
        }
        axios.get(`http://api.publicapis.org/categories`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },

    getAllApis: (req, res) => {
        let title = req.query.title;
        let category = req.query.category;

        if (!category) {
            category = "";
        }
        if (!title) {
            title = "";
        }

        axios.get(`http://api.publicapis.org/entries?category=${category}&title=${title}`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },

    getRandomApi: (req, res) => {
        let category = req.query.category;

        if (!category) {
            category = "";
        }
        axios.get(`http://api.publicapis.org/random?category=${category}`).then(

            (response) => {
                res.send(response.data)
            }
        ).catch(error => {
            res.statusCode = 500
            res.send(error.message)
        })

    },

    getOne: async (req, res) => {
        if (req.query.link) {
            let link = req.query.link;

            const item = await listItem.findOne({ link: link })
            console.log(link)
            if (item) {
                res.send(item);
            }
            else {
                res.status(404).send("Item not found!")
            }
        }
        else {
            const apiList = await listItem.find()
            res.send(apiList)
        }
    },
    create: (req, res) => {
        // let body = lowerCaseKeys(req.body)
        let body = req.body;

        let requestItem = new listItem({
            API: body.API,
            Description: body.Description,
            Auth: body.Auth,
            HTTPS: body.HTTPS,
            Cors: body.Cors,
            Category: body.Category,
            Link: body.Link,
            favoriteList: body.favoriteList,
            saved: body.saved,
        });

        requestItem.save(function (err) {
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
        let link = req.query.link;
        // let body = lowerCaseKeys(req.body)
        let body = req.body;

        try {
            let existingItem = await listItem.findOne({ link: link });

            existingItem.API = body.api
            existingItem.Description = body.description
            existingItem.Category = body.description
            existingItem.Auth = body.auth
            existingItem.HTTPS = body.https
            existingItem.Cors = body.cors
            existingItem.Link = body.link
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
        let link = req.query.link;

        let response = await listItem.deleteOne({ link: link })

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