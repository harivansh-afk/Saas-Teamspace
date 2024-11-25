import { Metadata } from 'next'
import {
  Calendar,
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  UserRoundCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Task management and team collaboration dashboard'
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  // Fetch tasks (placeholder - implement actual DB queries)
  const tasks = [
    { id: 1, title: 'Design new landing page', status: 'In Progress', dueDate: '2023-12-01', progress: 60 },
    { id: 2, title: 'Implement authentication', status: 'Todo', dueDate: '2023-12-05', progress: 0 },
    { id: 3, title: 'Write documentation', status: 'Done', dueDate: '2023-11-30', progress: 100 }
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Task
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <div className="text-2xl font-bold">4</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Team Members</span>
                </div>
                <div className="text-2xl font-bold">6</div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <div className="p-6">
                <h3 className="text-lg font-medium">Recent Tasks</h3>
                <div className="mt-4 space-y-4">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">{task.status}</span>
                        <div className="h-2 w-24 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="col-span-3">
              <div className="p-6">
                <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Design Review</p>
                      <p className="text-sm text-muted-foreground">Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Team Meeting</p>
                      <p className="text-sm text-muted-foreground">Friday at 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">All Tasks</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Todo Column */}
            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                Todo
              </h4>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'Todo').map(task => (
                  <Card key={task.id} className="p-3">
                    <h5 className="font-medium">{task.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* In Progress Column */}
            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                In Progress
              </h4>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'In Progress').map(task => (
                  <Card key={task.id} className="p-3">
                    <h5 className="font-medium">{task.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Done Column */}
            <Card className="p-4">
              <h4 className="font-medium mb-4 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Done
              </h4>
              <div className="space-y-4">
                {tasks.filter(t => t.status === 'Done').map(task => (
                  <Card key={task.id} className="p-3">
                    <h5 className="font-medium">{task.title}</h5>
                    <p className="text-sm text-muted-foreground mt-1">Due: {task.dueDate}</p>
                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Calendar</h3>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Select Date
            </Button>
          </div>

          <div className="grid gap-4">
            <Card className="p-6">
              <div className="space-y-6">
                {/* Today's Schedule */}
                <div>
                  <h4 className="font-medium mb-4">Today's Schedule</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 text-sm text-muted-foreground">09:00 AM</div>
                      <div className="flex-1">
                        <Card className="p-3">
                          <h5 className="font-medium">Team Standup</h5>
                          <p className="text-sm text-muted-foreground">Daily team sync meeting</p>
                        </Card>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 text-sm text-muted-foreground">02:00 PM</div>
                      <div className="flex-1">
                        <Card className="p-3">
                          <h5 className="font-medium">Design Review</h5>
                          <p className="text-sm text-muted-foreground">Review new landing page design</p>
                        </Card>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-14 text-sm text-muted-foreground">04:30 PM</div>
                      <div className="flex-1">
                        <Card className="p-3">
                          <h5 className="font-medium">Sprint Planning</h5>
                          <p className="text-sm text-muted-foreground">Plan next sprint tasks</p>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div>
                  <h4 className="font-medium mb-4">Upcoming Events</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 text-sm text-muted-foreground">Tomorrow</div>
                      <div className="flex-1">
                        <Card className="p-3">
                          <h5 className="font-medium">Client Meeting</h5>
                          <p className="text-sm text-muted-foreground">10:00 AM - Project update discussion</p>
                        </Card>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 text-sm text-muted-foreground">Friday</div>
                      <div className="flex-1">
                        <Card className="p-3">
                          <h5 className="font-medium">Team Building</h5>
                          <p className="text-sm text-muted-foreground">02:00 PM - Virtual team activity</p>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
