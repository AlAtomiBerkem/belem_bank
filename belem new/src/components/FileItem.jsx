import React from 'react'
import { useMarquee } from '../helpers/useMarquee.js'

export const FileItem = ({fileName}) => {

  const [containerRef, textRef] = useMarquee()

  return (
      <section className="scale-[0.99] inline-flex items-center relative pb-3 ">
        <img src="/fileItem.png" alt={fileName} />
        <div
          className="marquee-fade overflow-hidden whitespace-nowrap max-w-[1024px] flex items-center ml-19 -mt-4 absolute inset-0"
          ref={containerRef}
        >
          <span
            className="font-semibold text-white text-[35px] inline-block"
            ref={textRef}
            style={{ willChange: 'transform' }}
          >
            {fileName}
          </span>
        </div>
      </section>
  )
}

export default FileItem