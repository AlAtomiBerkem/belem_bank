import React from 'react'

export const FolderItem = ({ folderName = 'тут будет находится пробное название папки' }) => {

  return (
    <div className='bg-black'>
        <section className="scale-[0.8] inline-flex items-center relative  ">
         <img src="/folderItem.png" alt={folderName} />
            <span className="ml-20 -mt-2  absolute inset-0 font-semibold text-white text-[35px] flex items-center justify-start">{folderName}</span>
         </section>
        </div>
  )
}

export default FolderItem