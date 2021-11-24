import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
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
            }),
            Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER
            })
            // ...add more providers here
        ],
    })
}

export default auth;

