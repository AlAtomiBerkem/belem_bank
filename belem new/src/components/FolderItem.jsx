import React from 'react'
import { useMarquee } from '../helpers/useMarquee.js'

export const Folder = ({foldername = 'тут есть текст, очень длинный текст, ну очень длинный текст и опять же длинный текст '}) => {

  const [containerRef, textRef] = useMarquee()

  return (
    <div className='bg-black'>
      <section className="scale-[0.8] inline-flex items-center relative  ">
        <img src="/fileItem.png" alt={foldername} />
        <div
          className="marquee-fade overflow-hidden whitespace-nowrap max-w-[1024px] flex items-center ml-19 -mt-2 absolute inset-0"
          ref={containerRef}
        >
          <span
            className="font-semibold text-white text-[35px] inline-block"
            ref={textRef}
            style={{ willChange: 'transform' }}
          >
            {foldername}
          </span>
        </div>
      </section>
    </div>
  )
}

export default Folder