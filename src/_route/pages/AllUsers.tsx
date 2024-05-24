import UserCard from '@/components/ui/shared/UserCard'
import Loader from '@/components/ui/shared/loader'
import { useToast } from '@/components/ui/use-toast'
import { useGetUsers } from '@/lib/react-query/queries'

const AllUsers = () => {
  const { toast } = useToast()

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers()

  if (isErrorCreators) {
    toast({ title: 'Something went wrong.' })

    return
  }

  return (
    <div className="common-container p-4">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full mb-4">All Users</h2>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="user-grid w-full" style={{ display: 'flex' }}>
            {creators?.documents.map((creator) => (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '1rem',
                  backgroundColor: '#1f1f1f',
                  margin: '1rem',
                }}
              >
                <li
                  key={creator?.$id}
                  className="flex-1 min-w-[200px] w-full mb-4"
                >
                  <UserCard user={creator} />
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AllUsers
