import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = ({ asset }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const handleDownload = () => {
    if (!asset) return;
    const link = document.createElement("a");
    link.href = asset;
    link.download = "document.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {asset && (
        <div className="relative border shadow-lg w-[600px] h-[700px] bg-white rounded-md flex justify-center items-center">
          <button
            onClick={handleDownload}
            className="absolute top-2 right-2 text-black"
          >
            <Download size={24} />
          </button>

          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            className="absolute left-2 text-gray-400 hover:text-gray-900"
            disabled={pageNumber === 1}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={() =>
              setPageNumber((prev) =>
                numPages ? Math.min(prev + 1, numPages) : prev
              )
            }
            className="absolute right-2 text-gray-400 hover:text-gray-900"
            disabled={pageNumber === numPages}
          >
            <ChevronRight size={32} />
          </button>

          <Document
            file={asset}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setError(null);
            }}
            onLoadError={() => setError("Failed to load PDF")}
          >
            {!error ? (
              <Page pageNumber={pageNumber} width={550} />
            ) : (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </Document>
        </div>
      )}
    </>
  );
};

export default PdfViewer;
