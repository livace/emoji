import React from 'react'
import './Wobble.css'

const Wobble = (props) => {
  const [action, setAction] = React.useState(0)
  return (
    <div
      onClick={() => setAction('wobble')}
      onAnimationEnd={() => setAction('')}
      action={action}
    >
      {props.children}
    </div>
  )
}
export default Wobble

