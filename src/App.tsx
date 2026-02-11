import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="flex h-full flex-col">
      <nav className="flex items-center gap-6 border-b px-6 py-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-blue-600' : 'text-gray-600'
          }
        >
          Designers
        </NavLink>
        <NavLink
          to="/editor"
          className={({ isActive }) =>
            isActive ? 'font-semibold text-blue-600' : 'text-gray-600'
          }
        >
          Editor
        </NavLink>
      </nav>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
