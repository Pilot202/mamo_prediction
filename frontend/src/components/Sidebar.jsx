import React from 'react';
import { Activity, History, BookOpen, Menu } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
    const menuItems = [
        { id: 'predict', label: 'Predictor', icon: Activity },
        { id: 'history', label: 'History', icon: History },
        { id: 'resources', label: 'Resources', icon: BookOpen },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center text-white font-bold">
                        M
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                        MammoAI
                    </span>
                </div>
                <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
                    <Menu size={24} />
                </button>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === item.id
                                ? 'bg-[var(--color-primary)] text-white shadow-md shadow-sky-200'
                                : 'text-gray-600 hover:bg-slate-50'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
                <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-gray-500">Medical Disclaimer</p>
                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                        This tool is for assistance only. Always consult a qualified physician.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
