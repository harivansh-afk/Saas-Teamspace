'use server'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verification-token'

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
      return { error: 'Verification link is invalid!' }
    }

    const hasExpired = new Date(existingToken.expires) < new Date()
    if (hasExpired) {
      return { error: 'Verification link has expired! Please request a new one.' }
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
      return { error: 'Email not found! Please sign up first.' }
    }

    // If already verified, just return success
    if (existingUser.emailVerified) {
      return { success: 'Email already verified! Please login.' }
    }

    // Update user verification status
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    })

    // Delete the verification token
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    })

    return { success: 'Email verified successfully! You can now login.' }
  } catch (error) {
    return { error: 'Something went wrong! Please try again.' }
  }
}
