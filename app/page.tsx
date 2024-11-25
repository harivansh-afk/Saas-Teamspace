import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <Header />
        </div>
        <Footer />
      </main>
    </>
  )
}
