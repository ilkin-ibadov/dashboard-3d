import { Outlet, NavLink } from 'react-router-dom'

export default function App() {
  return (
    <div className="flex w-full min-h-screen h-full flex-col">
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

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  )
}
