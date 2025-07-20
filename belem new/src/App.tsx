// @ts-ignore
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// @ts-ignore
import Greeting from './components/Greeting.jsx'
// import Loading from './components/loading.jsx'
// import FolderItem from './components/FolderItem.jsx'
// import FileItem from './components/FileItem.jsx'
// import SearchBar from './components/SearchBar.jsx'
// @ts-ignore
import FolderPG from './components/FolderPG.jsx'

import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/documents/*" element={<FolderPG />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
