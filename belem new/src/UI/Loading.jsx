import React from 'react'

export const Loading = () => {
  return (
    <div className="h-screen w-screen bg-[url('/loadingFon.png')] bg-cover bg-center bg-fixed flex items-center justify-center">
        <div className="bg-[url('/loading.png')] bg-cover bg-center animate-spin -translate-y-10 spin-slow"
        style={{ width: '40vh', height: '40vh' }}></div>
    </div>
  )
}

export default Loading