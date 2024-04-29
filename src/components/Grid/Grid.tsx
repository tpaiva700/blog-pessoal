import React from 'react'

function Grid() {
  return (
    <div className='grid grid-cols-12'>
        <div className='bg-red-200 col-span-4'> Container</div>
        <div className='bg-gray-400 col-span-4'>Container 2</div>
        <div className='bg-lime-100 col-span-4'>Container 3</div>
    </div>
  )
}

export default Grid