import * as React from 'react'
import {
  NavLink,
  useLocation,
  useNavigate,
  Link
} from 'react-router-dom'
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageSidebar,
  SkipToContent,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageToggleButton,
  JumpLinks,
  JumpLinksItem,
  JumpLinksList
} from '@patternfly/react-core'
import {
  routes,
  IAppRoute,
  IAppRouteGroup
} from '@app/routes'
import logo from '@app/bgimages/cloud_download.svg'
import BarsIcon from '@patternfly/react-icons/dist/js/icons/bars-icon'
import { Search } from '@app/components/Search'

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
  const navigate = useNavigate()

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

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  )

  const renderJumpLinkItem = (route: IAppRoute, index: number) => (
    <JumpLinksItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname} >
      <Link to={route.path}>
        {route.label}
      </Link>
    </JumpLinksItem>
  )

  const renderJumpLinkList = (group: IAppRouteGroup, groupIndex: number) => (
    <JumpLinks
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      label={`[${group.label}]`}
    >
      <JumpLinksList>
        {group.routes.map((route, idx) => route.label && renderJumpLinkItem(route, idx))}
      </JumpLinksList>
    </JumpLinks>
  )

  const NavigationSidebar = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && renderNavItem(route, idx) //(!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
      </NavList>
    </Nav>
  )

  const headerJumpLinks = (
    <JumpLinks isCentered>
      {routes.map(
        (route, idx) => route.label && renderJumpLinkItem(route, idx) //(!route.routes ? renderJumpLinkItem(route, idx) : renderJumpLinkList(route, idx))
      )}
    </JumpLinks>
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
      <MastheadBrand>
        {<img src={logo} onClick={() => navigate('/')} alt={pageTitle} width={250}/>}
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>
    {!isMobileView &&
      headerJumpLinks
    }
    <Search title={'Search'}/>
    </MastheadContent>
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
