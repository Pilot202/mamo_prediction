import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import Chatbot from './components/Chatbot';

function App() {
  const [activeTab, setActiveTab] = useState('predict');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [predictionResults, setPredictionResults] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handlePredictionComplete = (results) => {
    setPredictionResults(results);
    // setActiveTab('predict'); // Stay on predict but show results
  };

  const resetPrediction = () => {
    setPredictionResults(null);
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-medical)] font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative w-full lg:w-auto overflow-hidden">
        {/* Mobile Header Spacer */}
        <div className="h-16 lg:hidden" />

        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                {activeTab === 'predict' && 'Breast Cancer Prediction'}
                {activeTab === 'history' && 'Analysis History'}
                {activeTab === 'resources' && 'Medical Resources'}
              </h1>
              <p className="text-slate-500 mt-2">
                {activeTab === 'predict' && 'Upload mammography scans for AI-powered analysis.'}
                {activeTab === 'history' && 'View your past analysis reports.'}
                {activeTab === 'resources' && 'Learn more about breast health and screening.'}
              </p>
            </header>

            {/* Content Area */}
            <div className="min-h-[60vh]">
              {activeTab === 'predict' && (
                <>
                  {!predictionResults ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <ImageUpload onPredictionComplete={handlePredictionComplete} />
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <Results results={predictionResults} reset={resetPrediction} />
                    </div>
                  )}
                </>
              )}

              {activeTab === 'history' && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                  <p>Local history storage coming soon.</p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-2">Understanding Mammograms</h3>
                    <p className="text-sm text-slate-600">Mammograms are X-ray pictures of the breast. Doctors use a mammogram to look for early signs of breast cancer.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-2">Screening Guidelines</h3>
                    <p className="text-sm text-slate-600">Women ages 40 to 44 should have the choice to start annual breast cancer screening with mammograms (x-rays of the breast) if they wish to do so.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Chatbot />
    </div>
  );
}

export default App;
