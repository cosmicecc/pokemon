import React from 'react'

export default function Pagination(props) {
    const name = props.name
    const classNames = name === 'next' ? 'right' : null
  return (
    <div className={classNames}>
        <button name={name} onClick={() => props.paginationLinks(name)} className='btn-round'>
          {name}
          <div className='icon'>
            <i className={`fa ${props.icon}`}></i>
          </div>
        </button>
    </div>
  )
}
