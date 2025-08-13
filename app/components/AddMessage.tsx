import Image from 'next/image';

interface AddMessageProps {}

export default function AddMessage({}: AddMessageProps) {
  return (
    <section className="mb-4">
      <div className="flex justify-between items-center py-6">
        <h2 className="text-ds-h3 font-medium text-ds-dark font-ds-indigo" style={{fontSize: '20px', lineHeight: '25px'}}>Add message</h2>
        <button className="text-gray-500 rotate-180">
          <Image src="/icon-element-chevronUp.svg" alt="Expand" width={16} height={16} />
        </button>
      </div>
      <div className="py-6">
        <div className="flex flex-col mb-6">
          <label htmlFor="email-subject" className="text-sm font-medium text-gray-900 mb-1.5">
            Email Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email-subject"
            className="border border-gray-300 rounded px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
            defaultValue="Complete with Docusign: Business Consultant Agreement.pdf"
          />
          <div className="text-xs text-gray-600 text-right mt-1">57/100</div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email-message" className="text-sm font-medium text-gray-900 mb-1.5">
            Email Message
          </label>
          <textarea
            id="email-message"
            className="border border-gray-300 rounded px-3 py-3 text-sm text-gray-900 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 min-h-32 resize-y"
            placeholder="Enter Message"
          />
          <div className="text-xs text-gray-600 text-right mt-1">0/10000</div>
        </div>
      </div>
    </section>
  );
}