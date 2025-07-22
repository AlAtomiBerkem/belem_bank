import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import { useBackBtnLogick } from '../helpers/useBackBtnLogick'
import AutoScrollbar from './AutoScrollbar'
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import marqueeFadeStyle from '../helpers/PdfFileMarqueeFade.js';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';
import 'pdfjs-dist/web/pdf_viewer.css';
import CustomScrollbar from '../UI/CustomScrollbar.jsx';
import { getPdfUrlFromQuery, getFileBreadcrumbs, getFileNameFromQuery } from '../helpers/pdfUtils';
import { usePdfRenderer } from '../helpers/usePdfRenderer';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PdfFile = () => {

    const goBack = useBackBtnLogick('/documents');
    const location = useLocation();
    const pdfUrl = getPdfUrlFromQuery();

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const file = params.get('file');
    const fileName = file ? file.split('/').pop() : '';
    const folderPath = file ? file.split('/').slice(0, -1).join('/') : '';



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
        <div className='w-[1020px] min-h-[px] flex flex-col justify-center'>
          <Breadcrumbs rootName="Документы" rootPath="/documents" path={folderPath} />
          {fileName && (
            <div className="mb-2 w-full flex justify-center">
              <span
                className="text-white text-[28px]  text-center"
                style={marqueeFadeStyle}
                title={fileName}
              >
                {fileName}
              </span>
            </div>
          )}
          <button onClick={goBack} className='absolute bottom-4 left-20 w-[50px] h-[50px] bg-[url("/bdfBackBtn.png")] bg-cover bg-center bg-no-repeat'></button>
        </div>
        <div className="w-full flex flex-col items-center" style={{ maxWidth: 1080 }}>
          <CustomScrollbar height={window.innerHeight - 100} contentWidth={1200} hideFade={true} scrollbarColor="#618D82">
            <div id="pdf-viewer" className="w-full flex flex-col items-center" ref={pdfContainerRef}></div>
          </CustomScrollbar>
        </div>
    </article>
  )
}

export default PdfFile