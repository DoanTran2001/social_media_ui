import { useRoutes } from 'react-router-dom'
import { path } from '../constants/path'
import AuthLayout from '../layouts/AuthLayout'
import Register from '../pages/Register'

export default function useRoutesElement() {
  const routeElement = useRoutes([
    {
      path: path.register,
      element: (
        <AuthLayout>
          <Register />
        </AuthLayout>
      )
    }
  ])
  return routeElement
}