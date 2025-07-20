import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Folder } from './FolderItem.jsx'
import FileItem from './FileItem.jsx'
import CustomScrollbar from '../UI/CustomScrollbar.jsx'
import Breadcrumbs from './Breadcrumbs.jsx'
import SearchBar from './SearchBar.jsx'
import '../index.css'

// Полная структура для одной эпохи (пример)
const fs = {
  '': ['1920-1930', '1940-1960', '1970-1980 ', '1990-2010', 'до 1920', 'с 2010'],
  '1920-1930': [
    { type: 'folder', name: '1. Дошкольное образование' },
    { type: 'folder', name: '2. Среднее образование' },
    { type: 'folder', name: '3. ССУЗЫ и ВУЗы' },
    { type: 'folder', name: '4. Научные организации' },
    { type: 'folder', name: '5. Доп. образование' },
    { type: 'folder', name: '6. Управление образованием и административные регламенты' },
  ],
  '1920-1930/1. Дошкольное образование': [
    { type: 'file', name: 'Декларация по дошкольному воспитанию.pdf' },
    { type: 'file', name: 'О введении дифференцированной оплаты труда педагогического персонала детдомов и дошкольных учреждений.pdf' },
    { type: 'file', name: 'О выполнении директив Правительства по использованию для школ и дошкольных учреждений конфискованных у кулачества домов..pdf' },
    // ... другие файлы ...
  ],
  '1920-1930/2. Среднее образование': [
    { type: 'file', name: 'Декрет Совета народных комиссаров РСФСР Об утверждении Положения о школах рабочих подростков, 07.04.1925г..pdf' },
    { type: 'file', name: 'О введении бесспорного порядка взысканий платы за ученье в учебных и воспитательных учреждениях. 20 июля 1930.pdf' },
    // ... другие файлы ...
  ],
  // ... остальные разделы и эпохи ...
}

export const FolderPG = () => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const currentPath = splat || '';

  let items = fs[currentPath] || [];
  if (typeof items[0] === 'string') {
    items = items.map(name => ({ type: 'folder', name }));
  }

  return (
    <div className='relative h-screen w-screen bg-[url("/global-bg.png")] bg-cover bg-center bg-fixed flex flex-col items-center justify-center'>
      <div className='flex justify-start items-center -mt-17 mb-17 gap-x-[420px]'>
        <Breadcrumbs />
        <SearchBar />
      </div>
      <CustomScrollbar height={500} contentWidth={980} className="scroll-content-with">
        {items.map((item, index) =>
          item.type === 'folder' ? (
            <div key={index} onClick={() => navigate(`/documents/${currentPath ? currentPath + '/' : ''}${item.name}`)} style={{ cursor: 'pointer' }}>
              <Folder foldername={item.name} />
            </div>
          ) : (
            <div key={index}>
              <FileItem fileName={item.name} />
            </div>
          )
        )}
      </CustomScrollbar>
    </div>
  )
}

export default FolderPG