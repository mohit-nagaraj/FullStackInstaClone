import { Models } from 'appwrite'

// import { useToast } from "@/components/ui/use-toast";
// import { } from '@/components/ui/shared'
import Loader from '@/components/ui/shared/loader'
import PostCard from '@/components/ui/shared/PostCard'
import UserCard from '@/components/ui/shared/UserCard'
import { useGetRecentPosts, useGetUsers } from '@/lib/react-query/queries'

const Home = () => {
  // const { toast } = useToast();

  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts()
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10)

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1" style={{ overflow: 'auto' }}>
      <div className="home-container w-full p-4">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full mb-4">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators w-48 py-4">
        <h3 className="h3-bold text-light-1 mb-4">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="flex flex-col 2xl:grid-cols-2 g-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Home
