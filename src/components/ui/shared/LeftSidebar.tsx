import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { INavLink } from '@/types'

import Loader from './loader'
import { Button } from '@/components/ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { useUserContext, INITIAL_USER } from '@/context/AuthContext'
import { sidebarLinks } from '@/constants'

const LeftSidebar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext()

  const { mutate: signOut } = useSignOutAccount()

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    signOut()
    setIsAuthenticated(false)
    setUser(INITIAL_USER)
    navigate('/sign-in')
  }

  return (
    <nav className="leftsidebar py-4 px-5">
      <div className="flex flex-col g-11">
        <Link to="/" className="flex g-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex g-3 items-center">
            <img
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col g-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route

            return (
              <li
                key={link.label}
                className={`leftsidebar-link ${isActive && 'bg-primary-500'}`}
              >
                <NavLink to={link.route} className="flex g-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`imgicon ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      <Button
        className="shad-button_ghost g-4 p-4 bottom-button"
        onClick={(e) => handleSignOut(e)}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg-base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
