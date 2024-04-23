import { Outlet, Navigate } from 'react-router-dom'
const AuthLayout = () => {
  const isAuth = false
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 g-10">
            <Outlet />
          </section>
          <img
            src="assets/images/side-img.png"
            alt="sideimg"
            className="hidden xl-block h-screen w-50 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout
