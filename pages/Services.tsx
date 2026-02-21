
import React, { useState } from 'react';
import { Tag, Briefcase, Plus, ExternalLink, ShieldCheck, Share2, Check } from 'lucide-react';
import { MOCK_SERVICES } from '../constants';
import { Link } from 'react-router-dom';

export default function Services() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyShareLink = (id: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}#/public/service/${id}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 tracking-tight uppercase">Portfólio de Serviços</h1>
          <p className="text-slate-500 font-medium">Configure seus planos e metodologias de atendimento.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all">
          <Plus size={20} />
          <span>CRIAR SERVIÇO</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SERVICES.map(service => (
          <div key={service.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group flex flex-col hover:shadow-xl transition-all">
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-emerald-50 rounded-2xl group-hover:bg-emerald-600 transition-colors">
                  <Briefcase size={24} className="text-emerald-900 group-hover:text-white" />
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => copyShareLink(service.id)}
                    className={`p-2 rounded-xl transition-all ${copiedId === service.id ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400 hover:text-emerald-600'}`}
                    title="Copiar Link de Compartilhamento"
                   >
                     {copiedId === service.id ? <Check size={16} /> : <Share2 size={16} />}
                   </button>
                   <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full uppercase flex items-center">
                    {service.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-emerald-950 mb-2">{service.name}</h3>
              <p className="text-sm text-slate-400 mb-6">Serviço profissional de alta performance com acompanhamento personalizado e resultados comprovados.</p>
              
              <div className="space-y-3 mb-8">
                {['Suporte VIP', 'Planejamento Mensal', 'Chat Direto', 'Acesso ao Academy'].map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Valor do Investimento</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-emerald-950">R$</span>
                  <span className="text-3xl font-black text-emerald-950">{service.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link 
                to={`/public/service/${service.id}`}
                className="flex items-center justify-center gap-2 p-3 bg-white text-emerald-900 border border-slate-200 rounded-xl font-bold text-[10px] uppercase hover:bg-slate-50 transition-colors"
              >
                <ExternalLink size={14} />
                Visualizar
              </Link>
              <button className="flex items-center justify-center gap-2 p-3 bg-emerald-900 text-white rounded-xl font-bold text-[10px] uppercase hover:bg-emerald-800 transition-colors">
                <Tag size={14} />
                Vender
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {copiedId && (
        <div className="fixed bottom-8 right-8 bg-emerald-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4">
          <Check className="text-emerald-400" />
          <span className="font-bold text-sm">Link de apresentação copiado!</span>
        </div>
      )}
    </div>
  );
}
