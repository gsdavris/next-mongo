import clientPromise from "../../../../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;



export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPhotos(req, res);
        }

        case 'POST': {
            return // addPost(req, res);
        }

        case 'PUT': {
            return // updatePost(req, res);
        }

        case 'DELETE': {
            return // deletePost(req, res);
        }
    }
}

async function getPhotos(req, res) {
    try {
        // connect to the database
        const client = await clientPromise;
        let db = client.db(process.env.DB_NAME);
        // find the product by id 
        let photos = await db
            .collection('posts')
            .findOne(
                {
                    _id: new ObjectId(req.body),
                }
            ).project({_id: 0, title: 0, content: 0, published: 0, photos: 1})
            .toArray();
        // return the photos
        if(photos && photos.length !==0) {
            return res.json({
                message: JSON.parse(JSON.stringify(photos)),
                success: true,
            });
        } else {
            return res.json({
                message: "There is no photos",
                success: false,
            });
        }
        
    } catch(error) {
        // return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }    
}