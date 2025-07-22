import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Breadcrumbs = ({ rootName = 'Документы', rootPath = '/documents' }) => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const path = splat || '';
  const parts = path ? path.split('/') : [];

  const crumbs = [
    { name: rootName, path: '' },
    ...parts.map((part, idx) => ({
      name: part,
      path: parts.slice(0, idx + 1).join('/'),
    })),
  ];

  return (
    <nav className="flex gap-2 text-white text-[22px] min-w-0 overflow-x-auto whitespace-nowrap mb-2">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            {isLast ? (
              <span className="font-bold" title={crumb.name}>{crumb.name}</span>
            ) : (
              <span
                className="hover:underline cursor-pointer"
                onClick={() => navigate(crumb.path ? `${rootPath}/${crumb.path}` : rootPath)}
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