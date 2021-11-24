const PostPhotos = ({post, url}) => {
    return (
        <div className="cursor-pointer shadow w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
                src={`${dev ? DEV_URL : PROD_URL}/api/photo/${post._id}`}
                alt={post.title}
                className="w-full h-full object-center object-cover group-hover:opacity-75"
            />
        </div>
    )
}

export default PostPhotos;