import WikiNavbar from '../../common/WikiNavbar';

export default function Search() {
  
  return (
    <>
      <WikiNavbar 
        title="Home"
        showSearch={true}
        showAccount={true}
        offcanvasEnabled={true}
        offcanvasContent={
          <p>asdasd</p>
        }
      />
    </>
  )
}