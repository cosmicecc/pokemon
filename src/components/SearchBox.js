import React from 'react'

export default function SearchBox(props) {

  return (
    <div className='search-box'>
        <input 
          type='text' 
          name='search' 
          value={props.value} 
          className='input-round' 
          onChange={props.handleSearch} 
          placeholder='search for pokemon...'
        />
    </div>
  )
}
