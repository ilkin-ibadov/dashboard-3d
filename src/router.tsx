import { createBrowserRouter } from 'react-router-dom'
import { DesignersPage } from './pages/DesignersPage'
import { EditorPage } from './pages/EditorPage'
import App from './App'

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            { path: '/', element: <DesignersPage /> },
            { path: '/editor', element: <EditorPage /> },
        ],
    },
])
