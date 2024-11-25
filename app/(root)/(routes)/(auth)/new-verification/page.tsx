'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { newVerification } from '@/actions/new-verification'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!')
      return
    }

    newVerification(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }
        if (data?.success) {
          setSuccess(data.success)
          toast.success(data.success)
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        }
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token, router])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headerTitle="Confirm your email"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">
              Verifying your email...
            </p>
          </div>
        )}
        {success && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-success text-sm">{success}</p>
            <p className="text-muted-foreground text-sm">
              Redirecting to login...
            </p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-destructive text-sm">{error}</p>
            <p className="text-muted-foreground text-sm">
              Please try again or contact support.
            </p>
          </div>
        )}
      </div>
    </CardWrapper>
  )
}
