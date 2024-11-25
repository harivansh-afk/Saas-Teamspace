import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <Header />

          <div className="relative mt-20 mb-40">
            {/* Hero Section */}
            <div className="text-center space-y-8 relative z-10">
              <h1 className="text-6xl font-bold tracking-tight">
                Think, plan, and track
                <span className="block text-gray-400 mt-2">all in one place</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Efficiently manage your tasks and boost productivity.
              </p>
              <div>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Get free demo
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {/* Yellow Note */}
              <div className="absolute left-20 top-20 transform -rotate-6">
                <div className="bg-yellow-100 p-6 rounded shadow-lg w-48">
                  <p className="text-sm text-gray-700">Take notes to keep track of crucial details, and accomplish more tasks with ease.</p>
                </div>
              </div>

              {/* Task List */}
              <div className="absolute right-20 bottom-20">
                <div className="bg-white p-4 rounded-lg shadow-lg w-64">
                  <h3 className="font-semibold mb-3">Today's tasks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-blue-100 rounded">
                        <div className="h-full w-3/5 bg-blue-500 rounded"></div>
                      </div>
                      <span className="text-sm text-gray-500">60%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-blue-100 rounded">
                        <div className="h-full w-1/3 bg-blue-500 rounded"></div>
                      </div>
                      <span className="text-sm text-gray-500">33%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrations */}
              <div className="absolute right-40 top-20">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-medium mb-2">100+ Integrations</p>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded"></div>
                    <div className="w-8 h-8 bg-green-100 rounded"></div>
                    <div className="w-8 h-8 bg-blue-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
