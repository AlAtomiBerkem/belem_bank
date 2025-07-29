import React from 'react'
import { useMarquee } from '../helpers/useMarquee.js'

export const Folder = ({foldername, compact}) => {

  const [containerRef, textRef] = useMarquee()

  return (
      <section className={`max-w-[1424px] inline-flex items-center relative  pb-3  `}>
        <img src="/folderItem.png" alt={foldername} />
        <div
          className="marquee-fade overflow-hidden whitespace-nowrap max-w-[1444px] pl-[2px] flex items-center ml-19 -mt-4 absolute inset-0"
          ref={containerRef}
        >
          <span
            className="font-semibold text-white text-[28px] inline-block"
            ref={textRef}
            style={{ willChange: 'transform' }}
          >
            {foldername}
          </span>
        </div>
      </section>
  )
}

export default Folder