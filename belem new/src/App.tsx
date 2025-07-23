// @ts-ignore
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
// @ts-ignore
import Greeting from './components/Greeting.jsx'
// @ts-ignore
import FolderPG from './components/FolderPG.jsx'
// @ts-ignore
import MaterialsPG from './components/MaterialsPG.jsx'
// @ts-ignore
import PdfFile from './components/PdfFile.jsx'
// @ts-ignore
import { useInactivityRedirect } from './helpers/useInactivityRedirect.js'
import { useTransition, animated } from '@react-spring/web'
import './index.css'

function InactivityWrapper({ children }: { children: React.ReactNode }) {
  useInactivityRedirect();
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  const transitions = useTransition(location, {
    keys: location.pathname,
    from: { 
      opacity: 0,
      transform: 'translate3d(0, 0, 0)',
      bgOpacity: 0
    },
    enter: { 
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      bgOpacity: 0
    },
    leave: { 
      opacity: 0,
      transform: 'translate3d(0, 0, 0)',
      bgOpacity: 1
    },
    config: { 
      mass: 1,
      tension: 300,
      friction: 30
    },
    exitBeforeEnter: true
  });

  return (
    <div style={{ position: 'fixed', width: '100%', height: '100%' }}>
      {transitions(({ bgOpacity }) => (
        <animated.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/whiteFon.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: bgOpacity,
            zIndex: 1
          }}
        />
      ))}
      
      {/* Основной контент */}
      {transitions(({ opacity, transform }, item) => (
        <animated.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity,
            transform,
            zIndex: 2
          }}
        >
          <Routes location={item}>
            <Route path="/" element={<Greeting />} />
            <Route path="/documents/*" element={<FolderPG />} />
            <Route path="/materials/*" element={<MaterialsPG />} />
            <Route path="/pdf" element={<PdfFile />} />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <InactivityWrapper>
        <AnimatedRoutes />
      </InactivityWrapper>
    </BrowserRouter>
  );
}

export default App;