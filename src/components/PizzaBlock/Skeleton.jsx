import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => (
  <ContentLoader
    speed={3}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#d7d5d5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="140" r="140" />
    <rect x="0" y="295" rx="10" ry="10" width="280" height="40" />
    <rect x="0" y="355" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="455" rx="10" ry="10" width="112" height="30" />
    <rect x="143" y="450" rx="15" ry="15" width="130" height="40" />
  </ContentLoader>
)

export default Skeleton
