import WikiPage from '../../common/WikiPage/WikiPage';
import SearchMain from './SearchMain';

export default function Search() {
  
  return (
    <WikiPage
      showAccount={true}
      showHome={true}
      title="Search"
      showSearch={true}
    >

        <WikiPage.Main>
          <SearchMain></SearchMain>
        </WikiPage.Main>
    </WikiPage>
  )
}