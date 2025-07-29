import React, { useRef, useEffect, useState } from 'react';
import Breadcrumbs from './Breadcrumbs'
// import { useBackBtnLogick } from '../helpers/useBackBtnLogick'
// import AutoScrollbar from './AutoScrollbar'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import marqueeFadeStyle from '../helpers/PdfFileMarqueeFade.js';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';
import 'pdfjs-dist/web/pdf_viewer.css';
import CustomScrollbar from '../UI/CustomScrollbar.jsx';
import { getPdfUrlFromQuery, getFileBreadcrumbs, getFileNameFromQuery } from '../helpers/pdfUtils';
import { usePdfRenderer } from '../helpers/usePdfRenderer';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfFile = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const pdfUrl = getPdfUrlFromQuery();

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const file = params.get('file');
    const fileName = file ? file.split('/').pop() : '';
    const folderPath = file ? file.split('/').slice(0, -1).join('/') : '';

    // Функция для перехода на уровень выше
    const goBack = () => {
      if (!folderPath) {
        // Если нет пути (файл в корне) - идем в /documents
        navigate('/documents');
      } else {
        // Иначе идем на уровень выше
        const parentPath = folderPath.split('/').slice(0, -1).join('/');
        navigate(parentPath ? `/documents/${parentPath}` : '/documents');
      }
    };

    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(window.innerHeight - 170);

    useEffect(() => {
      const updateHeight = () => {
        if (containerRef.current) {
          const containerTop = containerRef.current.getBoundingClientRect().top;
          setContainerHeight(window.innerHeight - containerTop);
        }
      };

      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }, []);


    useEffect(() => {
      const prevBg = document.body.style.background;
      document.body.style.background = 'url("/pdf-bg.png") center top / cover fixed no-repeat';
      document.body.style.minHeight = '100vh';
      return () => {
        document.body.style.background = prevBg;
        document.body.style.minHeight = '';
      };
    }, []);

    const pdfContainerRef = usePdfRenderer(pdfUrl, location.search);

  return (
    <article className='relative min-h-screen w-full flex flex-col items-center'>
        <div className='w-[1432px]  flex flex-col justify-center mt-9 mb-28'>
          <Breadcrumbs className='text-[28px]'  rootName="Документы" rootPath="/documents"/>
          {fileName && (
            <div className="mb-2 w-full flex justify-start">
              <span
                className="text-white text-[35px] text-start mt-4"
                style={marqueeFadeStyle}
                title={fileName}
              >
                {fileName}
              </span>
            </div>
          )}
          <button onClick={goBack} className='absolute mt-4 right-30 scale-[0.76] w-[200px] h-[80px] bg-[url("/pdfBackBtn.png")] bg-center bg-no-repeat'></button>
        </div>
        <div className="w-full flex flex-col items-center mt-15" style={{ maxWidth: 1080 }} ref={containerRef}>
          <CustomScrollbar height={containerHeight} contentWidth={990} hideFade={true} scrollbarColor="#618D82">
            <div id="pdf-viewer" className="w-full flex flex-col items-center" ref={pdfContainerRef}></div>
          </CustomScrollbar>
        </div>
    </article>
  )
}

export default PdfFile