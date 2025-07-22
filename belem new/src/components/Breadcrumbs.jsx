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
    <nav className="flex text-white text-[28px] whitespace-nowrap">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            {isLast ? (
              <span title={crumb.name}>{crumb.name}</span>
            ) : (
              <span
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