import Image from 'next/image';

export default function AddDocuments() {
  return (
    <section className="mb-4" style={{borderBottom: '1px solid rgb(169, 169, 169)'}}>
      <div className="flex justify-between items-center pb-2 pt-6">
        <h2 className="text-ds-h3 font-medium text-ds-dark font-ds-indigo" style={{fontSize: '20px', lineHeight: '25px'}}>Add documents</h2>
        <button className="text-gray-500 rotate-180">
          <Image src="/icon-element-chevronUp.svg" alt="Expand" width={16} height={16} />
        </button>
      </div>
      <div className="py-6 flex gap-6 items-start">
        <div className="flex-none">
          <div className="w-50">
            <div className="relative bg-gray-100 border border-gray-200 rounded-lg overflow-hidden h-70 group">
              <div className="relative h-full flex flex-col">
                <div className="p-4 flex-1 overflow-hidden text-xs leading-tight text-gray-800">
                  <div className="font-bold text-center mb-2 text-[9px]">
                    BUSINESS CONSULTANT AGREEMENT
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px]">This Parties: Independent Contractor is made between or on behalf of:</p>
                    <p className="text-[8px]">Company Information:</p>
                    <p className="text-[8px]">Name: ________________________________</p>
                    <p className="text-[8px]">_____________________________________</p>
                    <p className="text-[8px]">Additional Documents: _______________</p>
                    <p className="text-[8px]">Date: ________________ City, of Date of such contract</p>
                    <p className="text-[8px]">_____________________________________</p>
                  </div>
                </div>
                <div className="bg-white p-3 border-t border-gray-200 flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Business Consultant A...
                    </h3>
                    <div className="text-xs text-gray-600">6 pages</div>
                  </div>
                  <button className="text-gray-500 text-base">⋮</button>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-black bg-opacity-80 text-white px-4 py-2 rounded text-sm">
                    View
                  </button>
                </div>
                <button className="absolute top-2 right-2 bg-black bg-opacity-60 text-white w-6 h-6 rounded-full flex items-center justify-center">
                  <Image src="/icon-element-close.svg" alt="Remove" width={12} height={12} className="invert" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-70 rounded-lg flex flex-col items-center justify-center hover:bg-purple-50 transition-colors" style={{backgroundColor: 'rgb(240, 239, 241)'}}>
          <div className="mb-4 flex p-2 rounded-xl border border-white border-opacity-10" style={{backgroundColor: 'rgba(26, 29, 32, 0.1)'}}>
            <Image src="/file-drop-zone-text-image.svg" alt="Upload" width={24} height={24} className="text-gray-300" />
          </div>
          <p className="text-base text-gray-600 mb-4">Drop your files here or</p>
          <button 
            className="inline-flex items-center justify-center text-white rounded font-ds-indigo transition-colors duration-100"
            style={{
              backgroundColor: '#4c00fb',
              borderColor: 'transparent',
              borderStyle: 'solid',
              borderWidth: '1px',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: 1.5,
              minHeight: '40px',
              height: '40px',
              minWidth: '80px',
              paddingBlock: '8px',
              paddingInline: '12px 11px',
              transitionProperty: 'background-color, border-color, color',
              transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
            }}
          >
            Upload <Image src="/triangle-down.svg" alt="" width={12} height={12} className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}