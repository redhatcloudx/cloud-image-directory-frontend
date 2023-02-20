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
    component: <Home title='Cloud Image Locator | Home'/>,
    exact: true,
    label: 'Cloud Image Locator',
    path: '/'
  },
  {
    component: <AWSImageBrowser title='Cloud Image Locator | AWS Image Browser'/>,
    exact: true,
    label: 'AWS',
    path: '/browser/AWS',
  },
  {
    component: <GCPImageBrowser title='Cloud Image Locator | GCP Image Browser'/>,
    exact: true,
    label: 'GCP',
    path: '/browser/GCP',
  },
  {
    component: <AzureImageBrowser title='Cloud Image Locator | Azure Image Browser'/>,
    exact: true,
    label: 'Azure',
    path: '/browser/Azure',
  },
]

const AppRoutes = (): React.ReactElement => (
  <LastLocationProvider>
    <Routes>
      {routes.map(route => {
        return (
          <Route path={route.path} element={route.component}/>
        )
      })}
      <Route path='*' element={<NotFound title='404 Page Not Found'/>} />
    </Routes>
  </LastLocationProvider>
)

export { AppRoutes, routes }
