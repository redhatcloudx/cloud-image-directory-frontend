import * as React from 'react'
import {
  NavLink,
  useLocation,
} from 'react-router-dom'
import {
  Nav,
  NavList,
  NavItem,
  Page,
  PageSidebar,
  SkipToContent,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageToggleButton,
  Flex,
  FlexItem,
  Title,
} from '@patternfly/react-core'
import {
  routes,
  IAppRoute,
} from '@app/routes'
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon'

interface IAppLayout {
  children: React.ReactNode
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true)
  const [isMobileView, setIsMobileView] = React.useState(true)
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false)
  const pageId = 'primary-app-container'
  const pageTitle = 'Cloud Image Directory'
  const location = useLocation()

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile)
  }
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView)
  }

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname}>
      <NavLink to={route.path}>
        {route.label}
      </NavLink>
    </NavItem>
  )

  const NavigationSidebar = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label != 'Search' && renderNavItem(route, idx)
        )}
      </NavList>
    </Nav>
  )

  const renderHeaderItems = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname} to={route.path}>
      {route.label}
    </NavItem>
  )
  const headerToolbar = (
    <Nav variant="horizontal" aria-label="Horizontal global nav">
      <NavList>
        {routes.map((route, idx) => route.label != 'Search' && renderHeaderItems(route, idx))}
      </NavList>
    </Nav>
  )

  const Header = (
    <Masthead>
      <MastheadToggle>
        {isMobileView &&
          <PageToggleButton
            aria-label="navToggleButton"
            variant="plain"
            onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}>
            <BarsIcon />
          </PageToggleButton>}
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand
          href='https://imagedirectory.cloud'
          alt='Cloud Image Directory'
          className='header-section'>
          <Title headingLevel='h1' className="header-title">
            Cloud Image Directory
          </Title>
        </MastheadBrand>
      </MastheadMain>
      <Flex justifyContent={{
        default: 'justifyContentCenter'
      }}>
        <FlexItem>
          <MastheadContent>
            {!isMobileView &&
              headerToolbar
            }
          </MastheadContent>
        </FlexItem>
      </Flex>

    </Masthead>
  )

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={NavigationSidebar}
      isNavOpen={isMobileView ? isNavOpenMobile : false} />
  )

  const PageSkipToContent = (
    <SkipToContent onClick={(event) => {
      event.preventDefault()
      const primaryContentContainer = document.getElementById(pageId)
      primaryContentContainer && primaryContentContainer.focus()
    }} href={`#${pageId}`}>
      Skip to Content
    </SkipToContent>
  )

  return (
    <Page
      mainContainerId={pageId}
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
  )
}

export { AppLayout }
