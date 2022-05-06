import Skeleton from 'react-loading-skeleton'

const SkeletonArticle = () => {
  return (
    <>
      <Skeleton count={2} /><br></br><Skeleton count={5} />
      <br></br><Skeleton count={4} width={'50%'}/>
      <br></br><br></br><br></br><Skeleton count={2} />
      <br></br><Skeleton count={6} /><br></br><Skeleton count={4} width={'60%'}/>
    </>
  )
}

const SkeletonTable = () => {
  return (
    <>
      <Skeleton count={5} width={'75%'}/><Skeleton count={5} width={'45%'}/>
    </>
  )
}

const SkeletonImage = () => {
  return <Skeleton width={'100%'} height={'320px'} />
}

export { SkeletonArticle, SkeletonTable, SkeletonImage };
  