import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Breadcrumbs = () => {
  const { '*': splat } = useParams();
  const navigate = useNavigate();
  const path = splat || '';
  const parts = path ? path.split('/') : [];

  const crumbs = [
    { name: 'Документы', path: '' },
    ...parts.map((part, idx) => ({
      name: part,
      path: parts.slice(0, idx + 1).join('/'),
    })),
  ];

  return (
    <nav className="flex gap-2 text-white text-lg text-nowrap text-white text-[28px] ">
      {crumbs.map((crumb, idx) => (
        <span key={idx}>
          <span
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/documents${crumb.path ? '/' + crumb.path : ' '}`)}
          >
            {crumb.name}
          </span>
          {idx < crumbs.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumbs