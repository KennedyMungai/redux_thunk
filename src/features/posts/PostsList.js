import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts } from "./postsSlice";


const PostsList = () =>
{
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    const dispatch = useDispatch()

    useEffect(() =>
    {
        if (postsStatus === 'idle')
        {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content

    if (postsStatus === 'idle')
    {
        content = <p>"Loading..."</p>
    }
    else if (postsStatus === 'succeeded')
    {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    }
    else if (postsStatus === 'failed')
    {
        content = <p>{error}</p>
    }

    return (
        <section>
            <h2>Posts</h2>
        </section>
    )
}
export default PostsList