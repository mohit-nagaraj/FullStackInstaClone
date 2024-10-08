import Loader from '@/components/ui/shared/loader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { SignupValidation } from '@/lib/validation'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queries'
import { useUserContext } from '@/context/AuthContext'

const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount()

  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount()
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)
    if (!newUser)
      return toast({
        title: 'Error',
        description: 'There was some problem creating your account',
      })

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })
    if (isSigningInUser) {
      console.log('Signing in user...')
    }
    if (isUserLoading) {
      console.log('User is loading...')
    }
    if (!session)
      return toast({
        title: 'Error',
        description: 'There was some problem signing in',
      })

    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      return toast({
        title: 'Error',
        description: 'There was some problem signing in',
      })
    }
  }

  return (
    <Form {...form}>
      <div className="sm-w-420 flex flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md-h2-bold pt-5 sm-pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mb-5">
          To use snapgram enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col g-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-5">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="shad-button_primary" type="submit">
            {isCreatingUser ? <Loader /> : 'Sign up'}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small semibold"
            >
              {' '}
              Login
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm
