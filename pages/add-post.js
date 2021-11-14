import { useState } from 'react';
import Layout from "../components/layouts/Layout";
import {
    MailIcon,
    CloudUploadIcon
} from "@heroicons/react/outline";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content || !files) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            setFiles([]);
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    const handleChangeFiles = (e) => {
        var selectedFiles = e.target.files;
        // var filesArr = Array.prototype.slice.call(files);
        // setFiles({ files: [...files, ...filesArr] });
        // console.log(filesArr);
        setFiles({files: [...selectedFiles]});
        console.log(files);
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-4">
                <form onSubmit={handlePost} className="{styles.form}">
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            name="content"
                            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <label
                        className="
                            w-64
                            flex flex-col
                            items-center
                            px-4
                            py-6
                            bg-white
                            rounded-md
                            shadow-md
                            tracking-wide
                            uppercase
                            border border-blue
                            cursor-pointer
                            hover:bg-indigo-500 hover:text-white
                            text-indigo-500
                            ease-linear
                            transition-all
                            duration-150
                        "
                        >
                        <CloudUploadIcon className="w-12 h-12" />
                        <span className="mt-2 font-bold">Select Photos</span>
                        <input 
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleChangeFiles}
                        />
                        </label>
                    </div>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                        <button onClick={handlePost} type="submit" className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            <MailIcon className="inline w-6 h-6 mr-1" /> Add post
                        </button>
                    </div>
                    {error ? (
                        <div className="{styles.formItem}">
                            <h3 className="{styles.error}">{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className="{styles.formItem}">
                            <h3 className="{styles.message}">{message}</h3>
                        </div>
                    ) : null}
                </form>
            </div>
        </Layout>
    );
}