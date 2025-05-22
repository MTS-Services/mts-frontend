import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const screenshots = [
  { id: 1, src: '/assits/short/p1.png', alt: 'Screenshot 1' },
  { id: 2, src: '/assits/short/p1.png', alt: 'Screenshot 2' },
];

const OrderPageScreenshot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const openModal = (imgSrc: string) => {
    setSelectedImg(imgSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImg(null);
  };

  return (
    <div className="bg-background min-h-screen px-4 py-8 space-y-8">
      {/* <h4 className="text-accent font-bold text-2xl sm:text-3xl md:text-4xl text-center">
        Order Page Screenshot
      </h4> */}

      Screenshot Grid
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {screenshots.map((img) => (
          <div key={img.id} className="h-[300px] sm:h-[350px] overflow-auto border border-muted rounded-lg p-2">
            <img
              src={img.src}
              alt={img.alt}
              onClick={() => openModal(img.src)}
              className="cursor-pointer rounded-lg shadow hover:scale-105 transition-transform w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Zoom Modal */}
      {isOpen && selectedImg && (
        <div
          className="fixed inset-0 bg-background bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="overflow-auto max-w-full max-h-full bg-white rounded-xl p-4 shadow-lg">
            <TransformWrapper wheel={{ step: 0.1 }} doubleClick={{ disabled: true }} pinch={{ step: 5 }}>
              <TransformComponent>
                <div className="overflow-auto max-h-[90vh]">
                  <img
                    src={selectedImg}
                    alt="Zoomed Screenshot"
                    className="w-full h-auto max-w-4xl object-contain"
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}

      

      {/* Login Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Client Login */}
        <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px] overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-bold mb-4">👤 Client Login Info</h3>
          <div className="space-y-2 break-words">
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
            </div>
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">👤 Username:</span> client_user
            </div>
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">🔑 Password:</span> Client@123
            </div>
          </div>
        </div>

        {/* Admin Login */}
        <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px] overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-bold mb-4">🔧 Our/User Login Info</h3>
          <div className="space-y-2 break-words">
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
            </div>
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">👤 Username:</span> admin
            </div>
            <div className="p-3 border-b border-accent/30 rounded">
              <span className="font-semibold">🔑 Password:</span> !$Admin123$
            </div>
          </div>
        </div>

        {/* cPanel Info */}
        <div className="bg-background rounded-lg p-4 shadow-md border border-accent/30 min-h-[250px] overflow-x-auto">
          <h3 className="text-lg sm:text-xl font-bold mb-4">📦 cPanel/Hosting Info</h3>
          <div className="space-y-2 break-words">
            <div className="p-3 border-b border-accent/30 rounded">🧱 Page Builder Name</div>
            <div className="p-3 border-b border-accent/30 rounded">
              <h5 className="font-semibold">🎨 Reference Design Link:</h5>
              <span>🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPageScreenshot;
