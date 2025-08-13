import AddDocuments from './components/AddDocuments';
import AddMessage from './components/AddMessage';
import AddRecipients from './components/AddRecipients';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <AddDocuments />
          <AddRecipients />
          <AddMessage />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 flex justify-end">
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
          Next
        </button>
      </footer>
    </div>
  );
}
