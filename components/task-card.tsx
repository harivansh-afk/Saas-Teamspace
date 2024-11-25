import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  id: string
  title: string
  dueDate: string
  progress: number
  status: string
}

export function TaskCard({ id, title, dueDate, progress, status }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Task",
      task: { id, title, dueDate, progress, status },
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={cn(
          "p-3 cursor-move hover:border-primary/50 transition-colors",
          isDragging && "opacity-50 border-dashed"
        )}
      >
        <h5 className="font-medium">{title}</h5>
        <p className="text-sm text-muted-foreground mt-1">Due: {dueDate}</p>
        <div className="mt-3 h-1.5 w-full bg-secondary rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Card>
    </div>
  )
}
