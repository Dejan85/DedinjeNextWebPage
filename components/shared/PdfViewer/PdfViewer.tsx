"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
  title?: string;
}

export default function PdfViewer({ url, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  const goToPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNext = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const goToFirst = () => setPageNumber(1);
  const goToLast = () => setPageNumber(numPages);

  const zoomIn = () => setScale((s) => Math.min(2.5, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.4, s - 0.2));
  const zoomReset = () => setScale(1.0);

  if (error) {
    return (
      <div className={styles.errorState}>
        <i className="fas fa-exclamation-triangle" aria-hidden />
        <h3>Грешка при учитавању PDF-а</h3>
        <p>Документ тренутно није доступан. Покушајте поново касније.</p>
        <a href={url} download className={styles.downloadBtn}>
          <i className="fas fa-download" aria-hidden /> Преузмите PDF
        </a>
      </div>
    );
  }

  return (
    <div className={styles.viewer}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          {title && <span className={styles.toolbarTitle}>{title}</span>}
        </div>

        <div className={styles.toolbarCenter}>
          <button onClick={goToFirst} disabled={pageNumber <= 1} className={styles.toolBtn} title="Прва страна">
            <i className="fas fa-angle-double-left" aria-hidden />
          </button>
          <button onClick={goToPrev} disabled={pageNumber <= 1} className={styles.toolBtn} title="Претходна">
            <i className="fas fa-chevron-left" aria-hidden />
          </button>
          <span className={styles.pageInfo}>
            <input
              type="number"
              min={1}
              max={numPages}
              value={pageNumber}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= numPages) setPageNumber(val);
              }}
              className={styles.pageInput}
            />
            <span className={styles.pageDivider}>/</span>
            <span>{numPages}</span>
          </span>
          <button onClick={goToNext} disabled={pageNumber >= numPages} className={styles.toolBtn} title="Следећа">
            <i className="fas fa-chevron-right" aria-hidden />
          </button>
          <button onClick={goToLast} disabled={pageNumber >= numPages} className={styles.toolBtn} title="Последња страна">
            <i className="fas fa-angle-double-right" aria-hidden />
          </button>
        </div>

        <div className={styles.toolbarRight}>
          <button onClick={zoomOut} className={styles.toolBtn} title="Умањи">
            <i className="fas fa-search-minus" aria-hidden />
          </button>
          <button onClick={zoomReset} className={styles.zoomLabel} title="Ресетуј зум">
            {Math.round(scale * 100)}%
          </button>
          <button onClick={zoomIn} className={styles.toolBtn} title="Увећај">
            <i className="fas fa-search-plus" aria-hidden />
          </button>
          <a href={url} download className={styles.toolBtn} title="Преузми PDF">
            <i className="fas fa-download" aria-hidden />
          </a>
        </div>
      </div>

      {/* Document */}
      <div className={styles.documentWrapper}>
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Учитавање документа...</p>
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className={styles.document}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className={styles.page}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* Bottom bar */}
      {numPages > 0 && (
        <div className={styles.bottomBar}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${(pageNumber / numPages) * 100}%` }}
            />
          </div>
          <span className={styles.progressText}>
            Страна {pageNumber} од {numPages}
          </span>
        </div>
      )}
    </div>
  );
}
