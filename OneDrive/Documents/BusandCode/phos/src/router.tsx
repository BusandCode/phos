import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Home from '@/pages/Home'
import Feed from '@/pages/Feed'
import Profile from '@/pages/Profile'
import ReportIncident from '@/pages/ReportIncident'
import NotFound from '@/pages/NotFound'
import Notifications from '@/pages/Notifications'
import AuthPage from '@/pages/auth/AuthPage'


// Layout wrapper for authenticated pages
function AppLayout() {
  return <Outlet />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'feed', element: <Feed /> },
      { path: 'report', element: <ReportIncident /> },
      { path: 'profile', element: <Profile /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
export default function Router() {
  return <RouterProvider router={router} />
}