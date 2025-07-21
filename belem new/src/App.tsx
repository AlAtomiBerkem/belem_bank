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
// @ts-ignore
import { useInactivityRedirect } from './helpers/useInactivityRedirect.js'

import './index.css'

function InactivityWrapper({ children }: { children: React.ReactNode }) {
  useInactivityRedirect();
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <InactivityWrapper>
        <Routes>
          <Route path="/" element={<Greeting />} />
          <Route path="/documents/*" element={<FolderPG />} />
        </Routes>
      </InactivityWrapper>
    </BrowserRouter>
  );
}

export default App
