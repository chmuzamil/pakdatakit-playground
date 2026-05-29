import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 bg-surface">
        <Outlet />
      </main>
    </div>
  )
}
