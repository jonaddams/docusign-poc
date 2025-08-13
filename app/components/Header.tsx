import Image from 'next/image';

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className="bg-white px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded">
          <Image 
            src="/icon-element-close.svg" 
            alt="Close" 
            width={16} 
            height={16}
            className="text-gray-500"
          />
        </button>
        <span 
          className="font-ds-indigo overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            borderLeftColor: 'rgb(51, 51, 51)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            color: 'rgb(51, 51, 51)',
            fontSize: '16px',
            fontWeight: 400,
            height: '28px',
            lineHeight: '28px',
            marginLeft: '4px',
            paddingLeft: '16px',
            textOverflow: 'ellipsis'
          }}
        >
          Complete with Docusign: Business Consultant Agreement.pdf
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="border border-gray-300 hover:bg-gray-50 w-8 h-8 flex items-center justify-center rounded-full text-gray-600">
          <Image 
            src="/info.svg" 
            alt="Help" 
            width={16} 
            height={16}
            className="text-gray-600"
          />
        </button>
        <button 
          className="inline-flex items-center justify-center text-center"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            borderColor: 'rgb(213, 213, 213)',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '4px',
            color: 'rgb(69, 69, 69)',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
            height: '38px',
            paddingBlock: '8px',
            paddingInline: '16px',
            fontFamily: '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          ADVANCED OPTIONS
        </button>
        <button 
          className="inline-flex items-center justify-center text-white transition-colors duration-100 uppercase"
          style={{
            fontFamily: '"Maven Pro", Helvetica, Arial, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: '18px',
            backgroundColor: 'rgb(76, 0, 251)',
            borderColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '20px',
            letterSpacing: '0.66px',
            minHeight: '28px',
            minWidth: '28px',
            paddingBlock: '4px',
            paddingInline: '14px',
            transitionProperty: 'background-color, border-color, color',
            transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)'
          }}
        >
          VIEW PLANS
        </button>
      </div>
    </header>
  );
}