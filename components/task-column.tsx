import { useDroppable } from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Card } from "@/components/ui/card"
import { TaskCard } from "./task-card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface Task {
  id: string
  title: string
  dueDate: string
  progress: number
  status: string
}

interface TaskColumnProps {
  id: string
  title: string
  icon: LucideIcon
  tasks: Task[]
}

export function TaskColumn({ id, title, icon: Icon, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  const taskIds = tasks.map(task => task.id)

  return (
    <Card className={cn("p-4", isOver && "ring-2 ring-primary")}>
      <h4 className="font-medium mb-4 flex items-center">
        <Icon className="h-4 w-4 mr-2" />
        {title}
      </h4>
      <div ref={setNodeRef} className="space-y-4">
        <SortableContext
          id={id}
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  )
}
