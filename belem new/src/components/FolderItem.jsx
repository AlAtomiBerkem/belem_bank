import React from 'react'
import { useMarquee } from '../helpers/useMarquee.js'

export const Folder = ({foldername = 'текст, ну очень длинный текст и опять же длинный текстолтттьт adfadf adf  ', compact}) => {

  const [containerRef, textRef] = useMarquee()

  return (
      <section className={`scale-[0.83] inline-flex items-center relative  pb-3 ${compact ? 'scale-[0.8]' : ''}`}>
        <img src="/folderItem.png" alt={foldername} />
        <div
          className="marquee-fade overflow-hidden whitespace-nowrap max-w-[1024px] flex items-center ml-19 -mt-4 absolute inset-0"
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