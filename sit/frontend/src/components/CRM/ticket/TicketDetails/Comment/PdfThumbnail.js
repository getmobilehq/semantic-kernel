import { Document, Page } from "react-pdf";
import getImageUrl from "../../../../../utils/getimageUrl";

const PdfThumbnail = ({ url }) => {
  return (
    <div className='pdf-thumbnail h-[120px] w-[180px] overflow-hidden'>
      <Document file={getImageUrl(url)}>
        <Page pageNumber={1} width={100} />
      </Document>
    </div>
  );
};

export default PdfThumbnail;
