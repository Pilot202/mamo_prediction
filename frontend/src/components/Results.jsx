import React from 'react';
import { Download, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Results = ({ results, reset }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(14, 165, 233); // Primary color
        doc.text("Mammography Analysis Report", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

        const tableData = results.map(r => [
            r.filename,
            r.prediction?.class || "Error",
            r.prediction?.confidence ? (r.prediction.confidence * 100).toFixed(2) + "%" : "N/A",
            r.error || "Success"
        ]);

        autoTable(doc, {
            head: [['File Name', 'Prediction', 'Confidence', 'Status']],
            body: tableData,
            startY: 40,
            theme: 'grid',
            headStyles: { fillColor: [14, 165, 233] }
        });

        doc.save("mammography_report.pdf");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Analysis Results</h2>
                <div className="flex gap-3">
                    <button
                        onClick={reset}
                        className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                    >
                        Upload New
                    </button>
                    <button
                        onClick={generatePDF}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] font-medium shadow-sm transition-colors"
                    >
                        <Download size={18} />
                        Download Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, idx) => {
                    const isMalignant = result.prediction?.class === 'Malignant';
                    const isBenign = result.prediction?.class === 'Benign';
                    const isNormal = result.prediction?.class === 'Normal';

                    let statusColor = 'text-gray-500';
                    let statusBg = 'bg-gray-50';
                    let StatusIcon = FileText;

                    if (isMalignant) {
                        statusColor = 'text-red-500';
                        statusBg = 'bg-red-50 border-red-100';
                        StatusIcon = AlertTriangle;
                    } else if (isBenign) {
                        statusColor = 'text-orange-500';
                        statusBg = 'bg-orange-50 border-orange-100';
                        StatusIcon = AlertTriangle;
                    } else if (isNormal) {
                        statusColor = 'text-green-500';
                        statusBg = 'bg-green-50 border-green-100';
                        StatusIcon = CheckCircle;
                    }

                    return (
                        <div key={idx} className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow ${statusBg} ${isMalignant ? 'border-red-200' : 'border-slate-100'}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <StatusIcon size={24} className={statusColor} />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${isMalignant ? 'bg-red-100 text-red-600' :
                                        isBenign ? 'bg-orange-100 text-orange-600' :
                                            'bg-green-100 text-green-600'
                                    }`}>
                                    {result.prediction?.class || "Error"}
                                </span>
                            </div>

                            <h3 className="font-semibold text-slate-800 truncate mb-1" title={result.filename}>
                                {result.filename}
                            </h3>

                            {result.prediction ? (
                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Confidence</span>
                                        <span className="font-medium">{(result.prediction.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-slate-100">
                                        <div
                                            className={`h-full rounded-full ${isMalignant ? 'bg-red-500' : isBenign ? 'bg-orange-400' : 'bg-green-500'}`}
                                            style={{ width: `${result.prediction.confidence * 100}%` }}
                                        />
                                    </div>

                                    {/* Probabilities Mini Table */}
                                    <div className="pt-3 border-t border-slate-200/50">
                                        <p className="text-xs text-slate-400 mb-2 font-medium">Class Probabilities</p>
                                        <div className="space-y-1">
                                            {Object.entries(result.prediction.probabilities).map(([cls, prob]) => (
                                                <div key={cls} className="flex justify-between text-xs text-slate-500">
                                                    <span>{cls}</span>
                                                    <span>{(prob * 100).toFixed(1)}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-red-500 mt-2">{result.error}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
