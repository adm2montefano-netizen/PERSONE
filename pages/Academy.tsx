
import React from 'react';
// // Fix: Added Plus to the imported icons from lucide-react
import { PlayCircle, Clock, BookOpen, Search, Play, Plus } from 'lucide-react';
import { MOCK_VIDEOS } from '../constants';

export default function Academy() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 tracking-tight uppercase">PERSON Academy</h1>
          <p className="text-slate-500 font-medium">Conteúdo educativo e técnico para seus alunos.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar vídeo aula..." 
            className="pl-11 pr-6 py-4 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_VIDEOS.map(video => (
          <div key={video.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Play size={24} className="text-emerald-950 fill-emerald-950 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-black flex items-center gap-2">
                <Clock size={12} /> {video.duration}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full uppercase">
                  {video.category}
                </span>
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full uppercase">
                  {video.level}
                </span>
              </div>
              <h3 className="text-xl font-black text-emerald-950 mb-3 leading-tight">{video.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        ))}

        <div className="bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center space-y-4 group cursor-pointer hover:bg-emerald-100/50 transition-colors">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Plus size={32} className="text-emerald-600" />
          </div>
          <div>
            <p className="font-black text-emerald-950">Novo Conteúdo</p>
            <p className="text-xs text-emerald-600/70 font-bold uppercase tracking-widest mt-1">Upload Vídeo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
