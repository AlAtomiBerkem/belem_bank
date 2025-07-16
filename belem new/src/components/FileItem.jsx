import React from 'react'

export const FileItem = ({fileName = 'тут будет находится пробное название файлов '}) => {
  return (
    <div className='bg-black'>
      <section className="scale-[0.8] inline-flex items-center relative  ">
        <img src="/fileItem.png" alt={fileName} />
            <span className="ml-19 -mt-2  absolute inset-0 font-semibold text-white text-[35px] flex items-center justify-start">{fileName}</span>
      </section>
    </div>
  )
}

export default FileItem