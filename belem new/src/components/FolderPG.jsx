import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Folder } from './FolderItem.jsx'
import FileItem from './FileItem.jsx'
import AutoScrollbar from './AutoScrollbar.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import SearchBar from './SearchBar.jsx'
import '../index.css'
import structure from '../library/structure.json'

// Функция поиска папки/файлов по пути
function findNodeByPath(tree, pathArr) {
  if (!pathArr.length) return tree;
  const [head, ...tail] = pathArr;
  const next = (Array.isArray(tree) ? tree : tree.children).find(
    node => node.name === head
  );
  if (!next) return [];
  if (!tail.length) return next.children || [];
  return findNodeByPath(next, tail);
}

export const FolderPG = () => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const pathArr = splat ? splat.split('/') : [];
  const items = findNodeByPath(structure, pathArr);

  return (
    <div className='relative h-screen w-screen bg-[url("/global-bg.png")] bg-cover bg-center bg-fixed flex flex-col items-center justify-center'>
      <div
        className="fixed left-1/2 z-50 -px-[20px]  top-[20px] "
        style={{ top: '20px', transform: 'translateX(-50%)', width: '1015px' }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="relative flex-1 min-w-0 mr-4">
            <div className="overflow-hidden whitespace-nowrap">
              <Breadcrumbs />
            </div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16" style={{background: 'linear-gradient(to right, transparent, #5E8A7E 99%)'}} />
          </div>
          <SearchBar />
        </div>
      </div>
      <AutoScrollbar itemCount={Array.isArray(items) ? items.length : 0} height={500} contentWidth={980} className="scroll-content-with flex flex-col items-center">
        {({ compact }) =>
          Array.isArray(items) && items.map((item, index) =>
            item.type === 'folder' ? (
              <div key={index} onClick={() => navigate(`/documents/${[...(splat ? pathArr : []), item.name].join('/')}`)} style={{ cursor: 'pointer' }}>
                <Folder foldername={item.name} compact={compact} />
              </div>
            ) : (
              <div key={index}>
                <FileItem fileName={item.name} compact={compact} />
              </div>
            )
          )
        }
      </AutoScrollbar>
    </div>
  )
}

export default FolderPG