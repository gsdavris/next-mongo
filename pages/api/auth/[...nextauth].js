import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";


 const auth = async (req, res) => {
    return await NextAuth(req, res, {
        adapter: MongoDBAdapter({
        db: ( await clientPromise ).db(process.env.DB_NAME)
        }),
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET
              })
            // ...add more providers here
        ],
    })
}

export default auth;

