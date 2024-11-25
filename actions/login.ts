'use server'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import bcrypt from 'bcryptjs'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate fields
  const validatedFields = LoginSchema.safeParse(values)

  // If fields are not valid
  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist' }
  }

  // Check if email is verified first
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return { error: 'Please verify your email to login. Verification email sent!' }
  }

  // Verify password
  const passwordsMatch = await bcrypt.compare(password, existingUser.password)
  if (!passwordsMatch) {
    return { error: 'Invalid credentials' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: 'Logged in successfully!' }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Something went wrong' }
    }
    throw error
  }
}
