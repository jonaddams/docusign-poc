import Image from 'next/image';

export default function AddRecipients() {
  return (
    <section className="mb-4" style={{borderBottom: '1px solid rgb(169, 169, 169)'}}>
      <div className="flex justify-between items-center py-2">
        <h2 className="text-ds-h3 font-medium text-ds-dark font-ds-indigo" style={{fontSize: '20px', lineHeight: '25px'}}>Add recipients</h2>
        <button className="text-gray-500 rotate-180">
          <Image src="/icon-element-chevronUp.svg" alt="Expand" width={16} height={16} />
        </button>
      </div>
      <div className="py-6">
        <div className="flex items-center mb-4 gap-2">
          <label className="flex items-center cursor-pointer text-sm text-gray-900">
            <input type="checkbox" defaultChecked className="w-4 h-4 mr-2" />
            I&apos;m the only signer
          </label>
          <button className="border border-gray-300 rounded-full w-5 h-5 flex items-center justify-center text-gray-600">
            <Image src="/info.svg" alt="Info" width={12} height={12} />
          </button>
        </div>

        <div className="flex items-center mb-6 gap-2">
          <label className="flex items-center cursor-pointer text-sm text-gray-900">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            Set signing order
          </label>
          <a href="#" className="text-purple-600 text-sm font-medium hover:underline">
            View
          </a>
        </div>

        <div className="mt-6">
          <div className="bg-white border border-gray-200 rounded-lg grid grid-cols-[4px_1fr_auto_auto] mb-4 overflow-hidden">
            <div className="bg-cyan-400"></div>
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-900 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                  placeholder=""
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-900 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>
            <div className="p-5 min-w-44">
              <button className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50">
                <span className="flex items-center gap-2">
                  <Image src="/pen.svg" alt="" width={16} height={16} />
                  Needs to Sign
                </span>
                <Image src="/triangle-down.svg" alt="" width={12} height={12} />
              </button>
            </div>
            <div className="p-5 min-w-32">
              <button className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50">
                <span>Customize</span>
                <Image src="/triangle-down.svg" alt="" width={12} height={12} />
              </button>
            </div>
          </div>
          <button className="bg-white border border-gray-300 rounded px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-50">
            <Image src="/recipient.svg" alt="" width={16} height={16} />
            Add Recipient 
            <Image src="/triangle-down.svg" alt="" width={12} height={12} />
          </button>
        </div>
      </div>
    </section>
  );
}