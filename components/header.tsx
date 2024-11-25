'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <div className="space-y-20 mt-32">
      <div className="mx-auto grid grid-cols-1 gap-8">
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Clone. Build. Ship.
          </h2>
          <p className="mt-4 text-lg text-foreground">
            Build your SaaS faster with our fully customizable template.
          </p>
          <div className="flex justify-center items-center mt-4">
            <Link href="/overview">
              <Button className="gap-2">
                <Sparkles className="h-5 w-5" />
                <span>Get Started</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
