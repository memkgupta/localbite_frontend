import React from 'react'

const layout = ({children,modal}:{children:React.ReactNode,modal:React.ReactNode}) => {
  return (
    <div>
<div className=''>{modal}</div>
        {children}
    </div>
  )
}

export default layout