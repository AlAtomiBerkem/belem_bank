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
    <nav
      className="flex gap-2 text-white text-[28px] min-w-0 overflow-hidden whitespace-nowrap"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
        maskImage: 'linear-gradient(to right, black 80%, transparent 100%)'
      }}
    >
      {crumbs.map((crumb, idx) => (
        <span key={idx}>
          <span
            onClick={() =>
              navigate(
                crumb.path
                  ? `${rootPath}/${crumb.path}`
                  : rootPath
              )
            }
          >
            {crumb.name}
          </span>
          {idx < crumbs.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;