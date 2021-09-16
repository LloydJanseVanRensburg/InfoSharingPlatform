import { Viewer } from '@react-pdf-viewer/core';
// import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewerComponent = ({ fileUrl }) => {
  // Your render function
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
    </div>
  );
};

export default PdfViewerComponent;
