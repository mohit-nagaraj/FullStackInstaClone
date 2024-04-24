import { useParams } from 'react-router-dom'

import Loader from '@/components/ui/shared/loader'
import PostForm from '@/components/ui/forms/PostForm'
import { useGetPostById } from '@/lib/react-query/queries'

const EditPost = () => {
  const { id } = useParams()
  const { data: post, isLoading } = useGetPostById(id)

  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )

  return (
    <div
      className="flex flex-1 w-full justify-center p-4"
      style={{ overflow: 'auto' }}
    >
      <div className="common-container w-70p">
        <div className="flex-start g-3 justify-start w-full max-w-5xl mb-4">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  )
}

export default EditPost
