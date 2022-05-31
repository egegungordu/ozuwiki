import { BsHouseDoorFill, BsSearch, BsPersonFill, BsSun, BsMoonFill } from "react-icons/bs"
import { Nav, Form, FormControl, NavDropdown, Col } from "react-bootstrap"
import { FiMenu } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react'
import { WikiPageContext } from "../../../context/WikiPageContext"
import { useLocalStorage } from 'react-use'

export default function WikiNavbarItem(props) {
  return (<></>)
}

function Home(props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
  }

  return (
    <button onClick={handleClick} className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none">
      <BsHouseDoorFill />
    </button>
  )
}

function Title(props) {
  return (
    <Nav.Item className="text-nowrap me-auto" ref={props.titleRef}>
      <Nav.Link className="p-2" active disabled href="#">{props.title}</Nav.Link>
    </Nav.Item>
  )
}

function Menu(props) {
  const { setShowOffcanvas } = useContext(WikiPageContext)

  const handleClick = () => {
    setShowOffcanvas(!props.showOffcanvas)
  }

  return (
    <button onClick={handleClick} className={"pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none"}>
      <FiMenu />
    </button>
  )
}

function SearchButton(props) {
  return (
    <button onClick={props.onClick} className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none">
      <BsSearch />
    </button>
  )
}

function SearchBar(props) {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search?q=' + e.target[0].value)
  }

  return (
    <div className={"d-flex flex-row"}>
      <BsSearch disabled style={{ height: '40px' }} size="50px" className="px-3 navbar-logo" />
      <Form className="flex-fill" onSubmit={handleSearch} >
        <FormControl style={{ height: '40px', padding: '0', backgroundColor: 'var(--background-tertiary)' }} type="text" placeholder="Search Ozu Wiki" className="search rounded-0 mr-sm-2 pe-1 border-0 shadow-none " />
      </Form>
    </div>
  )
}

function SearchBarFullwidth(props) {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search?q=' + e.target[0].value)
  }

  return (
    <Col>
      <Form className="flex-fill" onSubmit={handleSearch} >
        <FormControl onBlur={props.onBlur} ref={props.callbackRef} id="navbar-search-input" style={{ height: '40px', backgroundColor: 'var(--background-primary)' }} type="text" placeholder="Search Ozu Wiki" className="autofocus search rounded-0 mr-sm-2 pe-1 border-0 shadow-lg" />
      </Form>
    </Col>
  )
}

function AccountLogo(props) {
  return (
    <NavDropdown
      align="end"
      title={<BsPersonFill style={{ height: '40px', padding: '0' }} size="25px" className="mx-2" />}
      id="nekonadegoe"
      className="account-dropdown"
    >
      <Link className="nav-link" to={'/'}>Log out</Link>
    </NavDropdown>
  )
}

function AccountName(props) {
  return (
    <NavDropdown
      align="end"
      title={props.accountName}
      className={`account-dropdown px-1 ${props.className}`}
    >
      <Link className="nav-link" to={'/'}>Log out</Link>
    </NavDropdown>
  )
}

function Navigation(props) {
  return (
    props.navigation && props.navigation.map((nav, index) => {
      return (
        <Nav.Item key={index} >
          <Link className={`nav-link text-nowrap p-2 ${index === 0 ? 'ms-1' : ''} ${nav.active ? 'active disabled' : ''}`} to={nav.path}>{nav.title}</Link>
        </Nav.Item>
      )
    })
  )
}

function ThemeToggle(props) {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  const handleClick = () => {
    document.documentElement.classList.toggle('dark-mode')
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button onClick={handleClick} className="pb-2 me-0 navbar-logo rounded-0 border-0 shadow-none" >
      {theme === 'light' ? <BsSun /> : <BsMoonFill />}
    </button>
  )
}

WikiNavbarItem.Home = Home;
WikiNavbarItem.Title = Title;
WikiNavbarItem.Menu = Menu;
WikiNavbarItem.SearchButton = SearchButton;
WikiNavbarItem.SearchBar = SearchBar;
WikiNavbarItem.SearchBarFullwidth = SearchBarFullwidth;
WikiNavbarItem.AccountLogo = AccountLogo;
WikiNavbarItem.AccountName = AccountName;
WikiNavbarItem.Navigation = Navigation;
WikiNavbarItem.ThemeToggle = ThemeToggle;
