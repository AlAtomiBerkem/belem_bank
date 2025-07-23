import React from 'react'
import { useMarquee } from '../helpers/useMarquee.js'

export const FileItem = ({fileName, compact}) => {

  const [containerRef, textRef] = useMarquee()

  return (
      <section className={`inline-flex items-center relative ${compact ? '' : 'pb-4'} ${compact ? 'scale-[0.78]' : ''}`}>
        <img src="/fileItem.png" alt={fileName} />
        <div
          className="marquee-fade overflow-hidden whitespace-nowrap max-w-[1024px] pl-[2px] flex items-center ml-19 -mt-4 absolute inset-0"
          ref={containerRef}
        >
          <span
            className="font-semibold text-white text-[28px] inline-block"
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