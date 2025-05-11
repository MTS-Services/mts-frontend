import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const screenshots = [
  { id: 1, src: '/assits/short/p1.png', alt: 'Screenshot 1' },
  { id: 2, src: '/assits/short/p1.png', alt: 'Screenshot 2' },
  // Add more as needed...
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
    <div className="bg-background min-h-screen  space-y-8">
      <div><h4 className='text-accent font-bold  text-4xl '>Order Page Screenshot</h4></div>

      {/* Screenshot Section */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
  {screenshots.map((img) => (
    <div key={img.id} className="h-[350px] overflow-auto border border-muted rounded-lg p-2">
      <img
        src={img.src}
        alt={img.alt}
        onClick={() => openModal(img.src)}
        className="cursor-pointer rounded-lg shadow hover:scale-105 transition-transform w-full"
      />
    </div>
  ))}
</div>


      {/* Fullscreen Zoom Modal */}
      {isOpen && selectedImg && (
        <div
          className="fixed inset-0 bg-background bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="overflow-auto max-w-full max-h-full bg-accent rounded-xl p-4">
            <TransformWrapper
              wheel={{ step: 0.1 }}
              doubleClick={{ disabled: true }}
              pinch={{ step: 5 }}
            >
              <TransformComponent>
                <div className="overflow-auto max-h-[90vh]">
                  <img
                    src={selectedImg}
                    alt="Zoomed Screenshot"
                    className="w-full h-auto max-w-7xl object-contain"
                  />
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
      

      {/* Login/ Info Cards */}
  
  <div className='grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 m-auto'>
  {/* Client Login */}
  <div className="bg-background rounded-lg p-2 shadow-md border border-accent lg:min-h-[250px] overflow-auto">
    <h3 className="text-lg font-bold mb-4">👤 Client Login Info</h3>
    <div className="space-y-2 break-words">
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">👤 Username:</span> client_user
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔑 Password:</span> Client@123
      </div>
    </div>
  </div>

  {/* Admin Login */}
  <div className="bg-background rounded-lg p-2 shadow-md border border-accent min-h-[250px] overflow-auto">
    <h3 className="text-lg font-bold mb-4">🔧 Our/User Login Info</h3>
    <div className="space-y-2 break-words">
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">👤 Username:</span> admin
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔑 Password:</span> !$Admin123$
      </div>
    </div>
  </div>

  {/* cPanel/Hosting(Client Hosting)*/}
  <div className="bg-background rounded-lg p-2 shadow-md border border-accent min-h-[250px] overflow-auto">
    <h3 className="text-lg font-bold mb-4">cPanel/Hosting(Client Hosting)</h3>
    <div className="space-y-2 break-words">


      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">Page Builder Name</span> Page Builder Name
      </div>
       <div className="p-3 border border-accent rounded">
        <div>
          <h5>Reference website link or design (Figma, Invision, Adobe XD, PSD) </h5>
            <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
        </div>
      
      </div>

    
    </div>
  </div>

  {/* Reference/Competitor */}
  <div className="bg-background rounded-lg p-2 shadow-md border border-accent min-h-[250px] overflow-auto">
    <h3 className="text-lg font-bold mb-4">📚 Reference/Competitor</h3>
    <div className="space-y-2 break-words">
      <div className="p-3 border border-accent rounded">
        <div>
          <h5>Reference website link or design (Figma, Invision, Adobe XD, PSD) </h5>
            <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
        </div>
      
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
      </div>
    </div>
  </div>



  {/* Reference/Competitor */}
  <div className="bg-background rounded-lg p-2 shadow-md border border-accent min-h-[250px] overflow-auto">
    <h3 className="text-lg font-bold mb-4">Specials Plugin</h3>
    <div className="space-y-2 break-words">
      <div className="p-3 border border-accent rounded">
        <div>
          <h5>Reference website link or design (Figma, Invision, Adobe XD, PSD) </h5>
            <span className="font-semibold">🔗 URL:</span> https://ab3413430.mtsdevs.com/wp-admin/
        </div>
      
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">Special Requirement</span> 
      </div>
      <div className="p-3 border border-accent rounded">
        <span className="font-semibold">🔗 URL:</span> 
      </div>
    </div>
  </div>





</div>

    </div>
  );
};

export default OrderPageScreenshot;
