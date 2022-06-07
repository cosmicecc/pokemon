import React from 'react'

export default function RefreshButton(props) {
  return (
    <div>
        <button name='refresh' className='btn-round refresh' onClick={props.handleReset}>
          <i className='fa-solid fa-rotate'></i>
        </button>
    </div>
  )
}
