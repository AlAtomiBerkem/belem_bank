import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Folder } from './FolderItem.jsx'
import FileItem from './FileItem.jsx'
import AutoScrollbar from './AutoScrollbar.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import SearchBar from './SearchBar.jsx'
import '../index.css'
import structure from '../library/materials_structure.json'
import { useBackBtnLogick } from '../helpers/useBackBtnLogick.js';

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

export const MaterialsPG = () => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const pathArr = splat ? splat.split('/') : [];
  const items = findNodeByPath(structure, pathArr);

  const filteredItems = useMemo(() => {
    if (!searchQuery || !Array.isArray(items)) return items;
    
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const goBack = useBackBtnLogick('/materials');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='relative h-screen w-screen bg-[url("/global-bg.png")] bg-cover bg-center bg-fixed flex flex-col items-center'>
      <div className="flex justify-between items-center w-[1432px] mt-9 mb-22 gap-x-8">
        <div className="relative flex-1 min-w-0 mr-4">
          <div className="overflow-hidden whitespace-nowrap">
            <Breadcrumbs rootName="Методические пособия" rootPath="/materials" />
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16" style={{background: 'linear-gradient(to right, transparent, #5E8A7E 99%)'}} />
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <button onClick={goBack} className='absolute bottom-4 left-20 w-[50px] h-[50px] bg-[url("/back-btn.png")] bg-cover bg-center bg-no-repeat'></button>
      <AutoScrollbar itemCount={Array.isArray(filteredItems) ? filteredItems.length : 0} height={500} contentWidth={980} className="scroll-content-with flex flex-col items-center">
        {({ compact }) => (
          <div className={`flex flex-col ${compact ? 'gap-y-1' : ''}`}>
            {Array.isArray(filteredItems) && filteredItems.map((item, index) =>
              item.type === 'folder' ? (
                <div key={index} onClick={() => navigate(`/materials/${[...(splat ? pathArr : []), item.name].join('/')}`)} style={{ cursor: 'pointer' }}>
                  <Folder foldername={item.name} compact={compact} />
                </div>
              ) : (
                <div key={index}>
                  <div onClick={() => navigate(`/pdf?file=${encodeURIComponent([...(splat ? pathArr : []), item.name].join('/'))}&type=materials`)}>
                    <FileItem fileName={item.name} compact={compact} />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </AutoScrollbar>
    </div>
  )
}

export default MaterialsPG 