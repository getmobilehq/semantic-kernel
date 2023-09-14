import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Document, Page } from "react-pdf";

export default function PdfViewer({ handleClosePDF, selectedPDF }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  return (
    <>
      <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50'>
        <div className='bg-white rounded-lg overflow-hidden'>
          <nav className='absolute flex items-center gap-2 top-2 left-2 bg-gray-200 px-2 py-1 rounded'>
            <button
              className='flex items-center gap-1 bg-gray-500 p-1 rounded text-white'
              onClick={goToPrevPage}
            >
              <IoIosArrowBack />
              Prev
            </button>
            <button
              className='flex items-center gap-1 bg-gray-500 p-1 rounded text-white'
              onClick={goToNextPage}
            >
              Next
              <IoIosArrowForward />
            </button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </nav>
          <button
            className='absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded'
            onClick={handleClosePDF}
          >
            Close PDF
          </button>

          <div className='h-[calc(100vh-100px)] w-full p-5'>
            <Document file={selectedPDF} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} renderTextLayer={false} />
            </Document>
          </div>
        </div>
      </div>
    </>
  );
}
