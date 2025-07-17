import React from 'react'
import { Folder } from './FolderItem.jsx'
import CustomScrollbar from '../UI/CustomScrollbar.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import SearchBar from './SearchBar.jsx'
import '../index.css'


export const FolderPG = () => {
  return (
    <div className='relative h-screen w-screen bg-[url("/global-bg.png")] bg-cover bg-center bg-fixed flex flex-col items-center justify-center'>
      <div className='flex justify-start items-center -mt-17 mb-17 gap-x-[420px]'>
        <Breadcrumbs />
        <SearchBar />
      </div>
      <CustomScrollbar height={500} contentWidth={980} className="scroll-content-with">
        {Array.from({ length: 20 }).map((_, index) => (
          <Folder key={index} />
        ))}
      </CustomScrollbar>
    </div>
  )
}

export default FolderPG