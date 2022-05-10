/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import WikiNavbar from './WikiNavbar';
import WikiNavbarItem from './WikiNavbarItem';
import WikiBody from './WikiBody';
import WikiOffcanvas from './WikiOffcanvas';
import WikiFooter from './WikiFooter';
import { SIZE_SM, } from '../../../hooks/use-breakpoint';
import { useNavigate } from 'react-router-dom';
import { WikiPageContext } from '../../../context/WikiPageContext';

export default function WikiPage(props) {
  const {
    title = 'Page Title',
    showHome = false,
    showSearch = false,
    showAccount = false,
    navigation = []
  } = props
  
  const [showSearchBarFullwidth, setShowSearchBarFullwidth] = React.useState(false)
  const [children, setChildren] = React.useState({});
  const [searchInputRef, setSearchInputRef] = React.useState(null)
  const wikiPageContext = useContext(WikiPageContext)
  const navigate = useNavigate();

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
  }, [props.children]);
  
  const focusSearchInput = () => { searchInputRef && searchInputRef.focus() }
 
  React.useEffect(() => {
    focusSearchInput()
  }, [searchInputRef])
  
  const openOffcanvas = () => wikiPageContext.setShowOffcanvas(true)
  const toggleSearchBarFullwidth = () => setShowSearchBarFullwidth(!showSearchBarFullwidth)
  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search?q=' + e.target[0].value)
  }

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
          {showSearch && <WikiNavbarItem.SearchBar onSubmit={handleSearch} />}
        </WikiNavbar.Sidebar>
        <WikiNavbar.SidebarCollapsed>
          {sidebarExists && <WikiNavbarItem.Menu onClick={openOffcanvas} />}
          {showSearch && <WikiNavbarItem.SearchButton onClick={toggleSearchBarFullwidth} />}
        </WikiNavbar.SidebarCollapsed>
        <WikiNavbar.Panel>
          {showAccount && <WikiNavbarItem.AccountName className="ms-auto" accountName={accountName} />}
        </WikiNavbar.Panel>
        <WikiNavbar.PanelCollapsed>
          {(breakpoint) => {
            // magic
            return showAccount && (breakpoint.width < SIZE_SM.width ? <WikiNavbarItem.AccountLogo />
                                                        : !panelExists && <WikiNavbarItem.AccountName accountName={accountName} />)
          }}
        </WikiNavbar.PanelCollapsed>
        <WikiNavbar.Fullwidth>
          {showSearchBarFullwidth && <WikiNavbarItem.SearchBarFullwidth 
            onBlur={toggleSearchBarFullwidth} 
            callbackRef={setSearchInputRef}
            onSubmit={handleSearch} />}
        </WikiNavbar.Fullwidth>
      </WikiNavbar>
      <WikiBody
        children={children}
        sidebarRule={sidebarRule}
      />
      <WikiFooter />
      <WikiOffcanvas 
        show={wikiPageContext.showOffcanvas}
        setShow={wikiPageContext.setShowOffcanvas}
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