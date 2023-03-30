import * as React from 'react'
import {render, screen, queryByAttribute, act, within} from '@testing-library/react'
import '@testing-library/jest-dom'
import App from '@app/index'
import userEvent from '@testing-library/user-event'
import { Button } from '@patternfly/react-core'

describe('App tests', () => {
  test('should render default App component', () => {
    render(<App />)
    expect(screen).toMatchSnapshot()
  })

  it('should hide the sidebar on smaller viewports', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 600 })
    const getById = queryByAttribute.bind(null, 'id')
    const dom = render(<App />)
    act(() => window.dispatchEvent(new Event('resize')))
    expect(getById(dom.container, 'page-sidebar')).toHaveClass('pf-m-collapsed')
  })

  it('should show the sidebar when clicking the nav-toggle button', async () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 600 })
    const getById = queryByAttribute.bind(null, 'id')
    const dom = render(<App />)
    const navButton = screen.getByRole('button', {
      name: /navToggleButton/i
    })

    act(() => window.dispatchEvent(new Event('resize')))
    expect(getById(dom.container,'page-sidebar')).toHaveClass('pf-m-collapsed')
    await userEvent.click(navButton)
    expect(getById(dom.container,'page-sidebar')).toHaveClass('pf-m-expanded')
  })
})
