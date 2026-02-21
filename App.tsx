
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Bell, ChevronRight, TrendingUp, LogOut, Settings, LayoutGrid 
} from 'lucide-react';
import { NAV_ITEMS } from './constants';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Workouts from './pages/Workouts';
import Academy from './pages/Academy';
import Receipts from './pages/Receipts';
import Certificates from './pages/Certificates';
import Services from './pages/Services';
import Sales from './pages/Sales';
import PublicServiceDetail from './pages/PublicServiceDetail';
import PublicCertificateValidation from './pages/PublicCertificateValidation';

const Navbar = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/public/')) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-4 py-3 flex items-center justify-between lg:hidden">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
          <span className="text-white font-bold text-base">P</span>
        </div>
        <span className="text-lg font-black tracking-tighter text-emerald-900 uppercase">PERSON</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="touch-target p-2 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/public/')) return null;
  
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-emerald-950 text-white h-screen sticky top-0 shadow-2xl border-r border-white/5 no-scrollbar overflow-hidden">
      <div className="pt-10 pb-4 px-8 flex flex-col items-start">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 transform group-hover:rotate-6 transition-transform duration-500">
            <span className="text-emerald-950 font-black text-2xl">P</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter leading-none text-white uppercase">PERSON</h1>
            <p className="text-[9px] text-emerald-400 font-black tracking-[0.3em] uppercase mt-1">Professional</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
        <div className="mb-4 px-4 flex items-center gap-2">
          <LayoutGrid size={12} className="text-emerald-500/50" />
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Módulos Ativos</p>
        </div>
        
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  isActive 
                  ? 'bg-emerald-50 text-emerald-950 shadow-lg shadow-emerald-500/20 translate-x-1' 
                  : 'text-emerald-100/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <span className={`transition-colors duration-300 ${isActive ? 'text-emerald-950' : 'text-emerald-500/30 group-hover:text-emerald-400'}`}>
                    {item.icon}
                  </span>
                  <span className={`font-bold text-sm tracking-tight ${isActive ? 'font-black' : ''}`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={14} className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-4 bg-emerald-950/50 backdrop-blur-sm border-t border-white/5">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 p-3 text-emerald-100/30 hover:text-white hover:bg-white/5 rounded-xl transition-all group">
            <Settings size={16} className="group-hover:rotate-45 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Config</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-rose-400/40 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all">
            <LogOut size={16} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

const MobileNav = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/public/')) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-2 pb-safe-area-inset-bottom pt-2 flex items-center justify-around z-50 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-all duration-300 ${
              isActive ? 'text-emerald-900 scale-105' : 'text-slate-400'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-100 shadow-inner' : ''}`}>
              {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20, strokeWidth: isActive ? 3 : 2 })}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 pb-24 lg:pb-0">
          <Navbar />
          <div className="pt-20 lg:pt-0 p-4 lg:p-10 max-w-7xl mx-auto w-full animate-in">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alunos" element={<Students />} />
              <Route path="/treinos" element={<Workouts />} />
              <Route path="/servicos" element={<Services />} />
              <Route path="/vendas" element={<Sales />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/recibos" element={<Receipts />} />
              <Route path="/certificados" element={<Certificates />} />
              <Route path="/public/service/:id" element={<PublicServiceDetail />} />
              <Route path="/public/validate-certificate/:code" element={<PublicCertificateValidation />} />
            </Routes>
          </div>
        </main>
        <MobileNav />
      </div>
    </HashRouter>
  );
}
