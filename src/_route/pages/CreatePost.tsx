import PostForm from '@/components/ui/forms/PostForm'

const CreatePost = () => {
  return (
    <div
      className="flex flex-1 flex-col align-center"
      style={{ overflow: 'auto' }}
    >
      <div className="common-container-create-post p-4">
        <div className="max-w-5xl flex-start g-3 justify-start w-full mb-10 mt-5">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md-h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  )
}

export default CreatePost
