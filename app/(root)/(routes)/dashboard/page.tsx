"use client"

import {
  Calendar,
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  Search,
  Bell,
  Mail,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ProjectSelect } from "@/components/project-select"
import { TaskColumn } from "@/components/task-column"
import { RichTextEditor } from "@/components/rich-text-editor"
import { FileUpload } from "@/components/file-upload"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { useState } from "react"
import { TaskCard } from "@/components/task-card"

interface Task {
  id: string
  title: string
  status: string
  dueDate: string
  progress: number
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Design new landing page", status: "In Progress", dueDate: "2023-12-01", progress: 60 },
    { id: "2", title: "Implement authentication", status: "Todo", dueDate: "2023-12-05", progress: 0 },
    { id: "3", title: "Write documentation", status: "Done", dueDate: "2023-11-30", progress: 100 },
  ])

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = tasks.find(t => t.id === active.id)
    if (task) {
      setActiveTask(task)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks(tasks => {
        const oldIndex = tasks.findIndex(t => t.id === active.id)
        const task = tasks[oldIndex]
        const newStatus = over.id as string

        if (task && (newStatus === "Todo" || newStatus === "In Progress" || newStatus === "Done")) {
          const updatedTasks = [...tasks]
          updatedTasks[oldIndex] = { ...task, status: newStatus }
          return updatedTasks
        }

        return tasks
      })
    }

    setActiveTask(null)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Shadcn UI Kit</h2>
        </div>
        <nav className="px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <ListTodo className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Mail className="mr-2 h-4 w-4" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-6 gap-4">
            <ProjectSelect />
            <div className="flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full bg-background pl-8 md:w-[300px]"
                  />
                </div>
              </form>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <div className="text-2xl font-bold">12</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <div className="text-2xl font-bold">4</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Upcoming</span>
                </div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </Card>
          </div>

          {/* Task Board */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>

            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TaskColumn
                  id="Todo"
                  title="Todo"
                  icon={ListTodo}
                  tasks={tasks.filter(t => t.status === "Todo")}
                />
                <TaskColumn
                  id="In Progress"
                  title="In Progress"
                  icon={Clock}
                  tasks={tasks.filter(t => t.status === "In Progress")}
                />
                <TaskColumn
                  id="Done"
                  title="Done"
                  icon={CheckCircle2}
                  tasks={tasks.filter(t => t.status === "Done")}
                />
              </div>

              <DragOverlay>
                {activeTask ? <TaskCard {...activeTask} /> : null}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Task Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Task Description</h3>
              <RichTextEditor
                className="min-h-[200px]"
                content="<p>Add your task description here...</p>"
                onChange={(content) => console.log(content)}
              />
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Attachments</h3>
              <FileUpload
                onUpload={(files) => console.log("Uploaded files:", files)}
              />
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
