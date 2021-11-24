const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
import clientPromise from "../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

export const config = { api: { bodyParser: { sizeLimit: '25mb' } } };

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }
    }
}

async function getPosts(req,res){
    try {
        // connect to the database
        const client = await clientPromise;
        let db = client.db(process.env.DB_NAME);
        // fetch the posts
        let posts = await db
            .collection('posts')
            .find()
            .sort({ published: -1 })
            .project({photos:0})
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function addPost(req, res) {
    try {
        // connect to the database
        const client = await clientPromise;
        let db = client.db(process.env.DB_NAME);
        const storage = new GridFsStorage({ 
            db, 
            client,
            file: (req, file) => {
              if (file.mimetype === 'image/jpeg') {
                return {
                  bucketName: 'photos'
                };
              } else {
                return null;
              }
            }
        });
        const upload = multer({ storage });
        let photos = JSON.parse(req.body).photos;


        storage.on('connection', (db) => {
        // Db is the database instance
        upload.array('photos', 12).photos;
        console.log(" we are ready :", photos);
        });
        
        storage.on('connectionFailed', (err) => {
        // err is the error received from MongoDb
        console.log(" we are not ready :", err);
        });



        // add the post
        await db.collection('posts').insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function updatePost(req, res) {
    try {
        // connect to the database
        const client = await clientPromise;
        let db = client.db(process.env.DB_NAME);
        // update the published status of the post
        await db.collection('posts').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        // return a message
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {

        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function deletePost(req, res) {
    try {
        // Connecting to the database
        const client = await clientPromise;
        let db = client.db(process.env.DB_NAME);

        // Deleting the post
        await db.collection('posts').deleteOne({
            _id: new ObjectId(req.body),
        });

        // returning a message
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {

        // returning an error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}