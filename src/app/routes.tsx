import * as React from 'react'
import {
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import {
  LastLocationProvider,
} from 'react-router-dom-last-location'
import { Home } from '@app/Pages/Dashboard/Home'
import {
  AWSImageBrowser,
  AzureImageBrowser,
  GCPImageBrowser
} from '@app/Pages/Browser'
import { NotFound } from '@app/Pages/NotFound/NotFound'
import { useDocumentTitle } from '@app/utils/useDocumentTitle'
import { Blog } from './Pages/Blog'

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
    component: <Home title='Cloud Image Directory | Home'/>,
    exact: true,
    label: 'Home',
    path: '/'
  },
  {
    component: <AWSImageBrowser title='Cloud Image Directory | AWS Image Browser'/>,
    exact: true,
    label: 'AWS',
    path: '/browser/AWS',
  },
  {
    component: <GCPImageBrowser title='Cloud Image Directory | GCP Image Browser'/>,
    exact: true,
    label: 'GCP',
    path: '/browser/GCP',
  },
  {
    component: <AzureImageBrowser title='Cloud Image Directory | Azure Image Browser'/>,
    exact: true,
    label: 'Azure',
    path: '/browser/Azure',
  },
  {
    component: <Blog title='Cloud Image Directory | Blog'/>,
    exact: true,
    label: 'Blog',
    path: '/browser/Blog',
  },
]

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Routes>
      {routes.map( (route, index) => {
        return (
          <Route path={route.path} element={route.component} key={`app_route_${index}`}/>
        )
      })}
      <Route path='*' element={<NotFound title='404 Page Not Found'/>} />
    </Routes>
  </LastLocationProvider>
)

export { AppRoutes, routes }
