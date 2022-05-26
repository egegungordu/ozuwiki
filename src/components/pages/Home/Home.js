import WikiPage from '../../common/WikiPage/WikiPage';
import HomeMain from './HomeMain';
import HomeSidebar from "./HomeSidebar"

export default function Home() {

  return (
    <WikiPage
      title="Home"
      showSearch={true}
      showAccount={true}
      navigation={[
        {
          title: 'Main Page',
          path: '/',
          active: true
        }
      ]}
    >
      <WikiPage.Sidebar>
        <HomeSidebar/>
      </WikiPage.Sidebar>
      <WikiPage.Main>
        <HomeMain/>
        
      </WikiPage.Main>
    </WikiPage>
  )
}