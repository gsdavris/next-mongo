import { useState } from "react";
import {useRouter} from "next/router";
import {
    TrashIcon,
    MailIcon,
} from "@heroicons/react/outline";



const PostCard = ({post}) => {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);

        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };

    return (
        <div key={post.id} href={post.href} className="group m-1">
            <div className="shadow w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src="https://via.placeholder.com/350x250.png?text=Post+Image"
                    alt={post.imageAlt}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <div className="shadow-lg hover:shadow rounded-lg p-1 -mt-20 mr-4 ml-4 bg-white z-10" >
                <h3 className="mt-4 text-sm text-gray-700">{post.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <div className="flex justify-between">
                    <button 
                    onClick={() => publishPost(post._id)}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        <MailIcon className="inline w-6 h-6 mr-1" /> Publish
                    </button>
                    <button 
                    onClick={() => deletePost(post._id)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button">
                        <TrashIcon className="inline w-6 h-6 mr-1" /> Delete
                    </button> 
                </div>  
            </div>         
        </div>
    )
}

export default PostCard;