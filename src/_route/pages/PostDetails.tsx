import { useParams, Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/shared/loader'
import PostStats from '@/components/ui/shared/PostStats'

import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from '@/lib/react-query/queries'
import { multiFormatDateString } from '@/lib/utils'
import { useUserContext } from '@/context/AuthContext'
import GridPostList from '@/components/ui/shared/GridPostList'

const PostDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useUserContext()

  const { data: post, isLoading } = useGetPostById(id)
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  )
  const { mutate: deletePost } = useDeletePost()

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  )

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId })
    navigate(-1)
  }

  return (
    <div className="post_details-container w-full" style={{ overflow: 'auto' }}>
      <div className="md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={'/assets/icons/back.svg'}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">&nbsp;Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card flex g-8">
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
            height={400}
            width={400}
          />

          <div className="post_details-info">
            <div className="flex-between w-full g-4 mb-4">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center g-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center g-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src={'/assets/icons/edit.svg'}
                    alt="edit"
                    width={20}
                    height={20}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && 'hidden'
                  }`}
                >
                  <img
                    src={'/assets/icons/delete.svg'}
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4-80" />
            <div className="flex-between h-80p flex-col">
              <div className="flex flex-col flex-1 w-full small-medium lg:base-regular mt-4">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2">
                  {post?.tags.map((tag: string, index: string) => (
                    <li
                      key={`${tag}${index}`}
                      className="text-light-3 small-regular"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <hr className="border w-full border-darkest-80" />

        <h3 className="body-bold md:h3-bold w-full my-10 mt-4">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  )
}

export default PostDetails
