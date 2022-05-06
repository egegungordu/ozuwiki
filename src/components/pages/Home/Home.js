import WikiNavbar from '../../common/WikiNavbar';

export default function Home() {
  
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