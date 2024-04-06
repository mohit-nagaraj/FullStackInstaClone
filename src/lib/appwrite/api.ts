import { INewUser } from '@/types'
import { ID, Query } from 'appwrite'
import { account, avatars, databases } from './config'
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
    if (!newAccount) throw new Error('Account not created')
    const avatarUrl = avatars.getInitials(user.name)
    const newUser = await saveUserToDb({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      username: user.username,
    })
    return newUser
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function saveUserToDb(user: {
  accountId: string
  email: string
  name: string
  imageUrl: URL
  username?: string
}) {
  try {
    const newUser = await databases.createDocument(
      process.env.VITE_APPWRITE_DATABASE_ID ?? '',
      process.env.VITE_APPWRITE_USERS_COLLECTION_ID ?? '',
      ID.unique(),
      user
    )
    return newUser
  } catch (error) {
    console.error(error)
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password)

    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get()

    return currentAccount
  } catch (error) {
    console.log(error)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      process.env.VITE_APPWRITE_DATABASE_ID ?? '',
      process.env.VITE_APPWRITE_USERS_COLLECTION_ID ?? '',
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    console.log(error)
  }
}
