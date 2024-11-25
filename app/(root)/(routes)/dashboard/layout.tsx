import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Task management and team collaboration dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
