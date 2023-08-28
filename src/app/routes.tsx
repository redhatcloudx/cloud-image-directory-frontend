import * as React from 'react'
import {
  Route,
  Routes,
} from 'react-router-dom'
import {
  LastLocationProvider,
} from 'react-router-dom-last-location'
import { Home } from '@app/Pages/Dashboard/Home'
import { NotFound } from '@app/Pages/NotFound/NotFound'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import { Blog } from './Pages/Blog'
import { ImageDetails } from './Pages/ImageDetails'

let routeFocusTimer: number
export interface IAppRoute {
  label?: string // Excluding the label will exclude the route from the nav sidebar in AppLayout
  component: React.ReactNode
  exact?: boolean
  path: string
  isAsync?: boolean
  routes?: undefined
}

export interface IAppRouteGroup {
  label: string
  routes: IAppRoute[]
}

export type AppRouteConfig = IAppRoute

const routes: AppRouteConfig[] = [
  {
    component: <Home title='Cloud Image Directory | Home' />,
    exact: true,
    label: 'Home',
    path: '/'
  },
  {
    component: <Blog title='Cloud Image Directory | About' />,
    exact: true,
    label: 'About',
    path: '/about',
  },
  // TODO: Implement contact page
  {
    component: <Home title='Cloud Image Directory | Contact Us' />,
    exact: true,
    label: 'Contact Us',
    path: 'mailto: contact@imagedirectory.cloud',
  },
  {
    component: <ImageDetails title='Cloud Image Directory | Image Details' />,
    exact: true,
    label: 'Image Details',
    path: '/images/:os/:provider/:version/:region/:uniqueImageId',
  },
]

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route path={route.path} element={route.component} key={`app_route_${index}`} />
        )
      })}
      <Route path='*' element={<NotFound title='404 Page Not Found' />} />
    </Routes>
  </LastLocationProvider>
)

export { AppRoutes, routes }
