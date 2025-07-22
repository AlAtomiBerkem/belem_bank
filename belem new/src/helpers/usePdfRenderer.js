import { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf.mjs';

GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export function usePdfRenderer(pdfUrl, locationSearch) {
  const containerRef = useRef(null);

  useEffect(() => {
    let pdfDoc = null;
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';
    if (!pdfUrl) {
      container.innerHTML = '<div class="text-red-500">PDF файл не выбран</div>';
      return;
    }
    (async () => {
      const loadingTask = getDocument(pdfUrl);
      pdfDoc = await loadingTask.promise;
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        let initialViewport = page.getViewport({ scale: 1.6 });
        let scale = 980 / initialViewport.width;
        if (scale > 1.0) scale = 1.6;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport }).promise;
        const pageWrapper = document.createElement('div');
        pageWrapper.style.background = 'white';
        pageWrapper.style.margin = '5px auto';
        pageWrapper.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.10)';
        pageWrapper.style.borderRadius = '8px';
        pageWrapper.style.display = 'flex';
        pageWrapper.style.justifyContent = 'center';
        pageWrapper.appendChild(canvas);
        container.appendChild(pageWrapper);
      }
    })();
    return () => {
      if (container) container.innerHTML = '';
    };
  }, [pdfUrl, locationSearch]);

  return containerRef;
} 