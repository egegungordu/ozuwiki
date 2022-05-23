/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import WikiNavbar from './WikiNavbar';
import WikiNavbarItem from './WikiNavbarItem';
import WikiBody from './WikiBody';
import WikiOffcanvas from './WikiOffcanvas';
import WikiFooter from './WikiFooter';
import { SIZE_SM, } from '../../../hooks/use-breakpoint';
import { useLocalStorage } from 'react-use';

export default function WikiPage(props) {
  const {
    title = 'Page Title',
    showHome = false,
    showSearch = false,
    showAccount = false,
    showThemeToggle = true,
    navigation = []
  } = props

  const [showSearchBarFullwidth, setShowSearchBarFullwidth] = React.useState(false)
  const [children, setChildren] = React.useState({});
  const [searchInputRef, setSearchInputRef] = React.useState(null)
  const [theme] = useLocalStorage('theme', 'light')

  React.useLayoutEffect(() => {
    const children = {};
    if (!props.children) return;
    if (Array.isArray(props.children)) {
      props.children.forEach(child => {
        children[child.type.displayName] = child;
      })
    } else {
      children[props.children.type.displayName] = props.children;
    }
    setChildren(children);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode')
    }
  }, [props.children]);

  const focusSearchInput = () => { searchInputRef && searchInputRef.focus() }

  React.useEffect(() => {
    focusSearchInput()
  }, [searchInputRef])

  const toggleSearchBarFullwidth = () => setShowSearchBarFullwidth(!showSearchBarFullwidth)

  const sidebarExists = children.Sidebar ? true : false
  const panelExists = children.Panel ? true : false

  const sidebarRule = sidebarExists ? 'd-none d-xl-block' : 'd-none d-sm-block'
  const panelRule = 'd-none d-sm-flex'

  const accountName = 'Mr. Obama'

  // TODO: Shrink navigation elements when screen is small

  return (
    <div className="min-vh-100 d-flex flex-column">
      <WikiNavbar
        sidebarRule={sidebarRule}
        panelRule={panelRule}
        sidebarExists={sidebarExists}
        panelExists={panelExists}
      >
        <WikiNavbar.Main>
          {showHome && <WikiNavbarItem.Home />}
          <WikiNavbarItem.Title title={title} />
          <WikiNavbarItem.Navigation navigation={navigation} />
        </WikiNavbar.Main>
        <WikiNavbar.Sidebar>
          {showSearch && <WikiNavbarItem.SearchBar />}
        </WikiNavbar.Sidebar>
        <WikiNavbar.SidebarCollapsed>
          {sidebarExists && <WikiNavbarItem.Menu />}
          {showSearch && <WikiNavbarItem.SearchButton onClick={toggleSearchBarFullwidth} />}
        </WikiNavbar.SidebarCollapsed>
        <WikiNavbar.Panel>
          {showThemeToggle && <WikiNavbarItem.ThemeToggle />}
          {showAccount && <WikiNavbarItem.AccountName className="ms-auto" accountName={accountName} />}
        </WikiNavbar.Panel>
        <WikiNavbar.PanelCollapsed>
          {(breakpoint) => {
            // magic
            return (
              <>
                {showThemeToggle && <WikiNavbarItem.ThemeToggle />}
                {showAccount && (breakpoint.width < SIZE_SM.width ? <WikiNavbarItem.AccountLogo />
                  : !panelExists && <WikiNavbarItem.AccountName accountName={accountName} />)}
              </>
            )
          }}
        </WikiNavbar.PanelCollapsed>
        <WikiNavbar.Fullwidth>
          {showSearchBarFullwidth && <WikiNavbarItem.SearchBarFullwidth
            onBlur={toggleSearchBarFullwidth}
            callbackRef={setSearchInputRef} />}
        </WikiNavbar.Fullwidth>
      </WikiNavbar>
      <WikiBody
        children={children}
        sidebarRule={sidebarRule}
      />
      <WikiFooter />
      <WikiOffcanvas
        children={children}
      />
    </div>
  )
}

function Main(props) {
  return props.children
}
function Sidebar(props) {
  return props.children
}
function Panel(props) {
  return props.children
}

WikiPage.Main = Main;
WikiPage.Sidebar = Sidebar;
WikiPage.Panel = Panel;
WikiPage.Main.displayName = 'Main';
WikiPage.Sidebar.displayName = 'Sidebar';
WikiPage.Panel.displayName = 'Panel';