import Greeting from './components/Greeting.jsx'
import Loading from './components/loading.jsx'
import FolderItem from './components/FolderItem.jsx'
import FileItem from './components/FileItem.jsx'
import SearchBar from './components/SearchBar.jsx'

import './index.css'

function App() {

  return (
    <>
      <FolderItem />
      <FileItem />
      <SearchBar />
    </>
  )
}

export default App
