import { Models } from 'appwrite'
import { Link } from 'react-router-dom'

import PostStats from '@/components/ui/shared/PostStats'
import { multiFormatDateString } from '@/lib/utils'
import { useUserContext } from '@/context/AuthContext'

type PostCardProps = {
  post: Models.Document
}

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext()

  if (!post.creator) return

  return (
    <div className="post-card">
      <div className="flex-between items-center mb-4">
        <div className="flex items-center g-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                '/assets/icons/profile-placeholder.svg'
              }
              alt="creator"
              className="w-12 lg-h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col mb-4">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            <div className="flex-center g-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <img
            src={'/assets/icons/edit.svg'}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5 mb-4">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}&nbsp;
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt="post image"
          height={400}
          width={400}
          className="post-card_img rounded-lg mb-4"
          style={{ height: '400px', width: '400px', objectFit: 'cover' }}
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  )
}

export default PostCard
