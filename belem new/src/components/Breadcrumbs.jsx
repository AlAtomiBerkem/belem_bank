import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import marqueeFadeStyle from '../helpers/PdfFileMarqueeFade.js';

export const Breadcrumbs = ({ rootName = 'Документы', rootPath = '/documents' }) => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  

  let path = splat || '';
  
  // Если мы на странице PDF (путь /pdf)
  if (location.pathname === '/pdf') {
    const params = new URLSearchParams(location.search);
    const file = params.get('file');
    if (file) {
      // Берем путь до папки, без имени файла
      path = file.split('/').slice(0, -1).join('/');
    }
  }

  const parts = path ? path.split('/') : [];

  const crumbs = [
    { name: 'Банк', path: '/' },
    { name: rootName, path: '' },
    ...parts.map((part, idx) => ({
      name: part,
      path: parts.slice(0, idx + 1).join('/'),
    })),
  ];

  return (
    <nav className="flex text-white text-[28px] whitespace-nowrap max-w-[840px] marquee-fade">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            {isLast ? (
              <span title={crumb.name}>{crumb.name}</span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (idx === 0) {
                    navigate('/');
                  } else {
                    navigate(crumb.path ? `${rootPath}/${crumb.path}` : rootPath);
                  }
                }}
                title={crumb.name}
              >
                {crumb.name}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;