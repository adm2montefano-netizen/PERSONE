
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Shield, Zap, Target, Star, Globe, MessageCircle } from 'lucide-react';
import { MOCK_SERVICES } from '../constants';

export default function PublicServiceDetail() {
  const { id } = useParams();
  const service = MOCK_SERVICES.find(s => s.id === id);

  if (!service) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-black text-emerald-950">Serviço não encontrado.</h2>
        <Link to="/" className="text-emerald-600 font-bold hover:underline">Voltar ao início</Link>
      </div>
    </div>
  );

  const whatsappLink = `https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre o serviço: ${service.name}`;

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar Minimalista */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-6 py-4 border-b border-slate-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">P</span>
            </div>
            <span className="font-black tracking-tighter text-emerald-950">PERSON</span>
          </div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-950 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-emerald-900 transition-colors flex items-center gap-2"
          >
            <MessageCircle size={14} />
            Consultar
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
              <Star size={14} className="text-emerald-600 fill-emerald-600" />
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Premium Training Experience</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-emerald-950 leading-[0.85] tracking-tighter">
              {service.name.toUpperCase()}
            </h1>
            
            <p className="text-xl text-slate-500 leading-relaxed max-w-md">
              Transforme seu corpo e sua mente com a metodologia <span className="text-emerald-900 font-bold">PERSON</span>. Um planejamento exclusivo desenhado para seus objetivos específicos.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Shield size={20} className="text-emerald-900" />
                </div>
                <div>
                  <p className="font-black text-emerald-950 text-sm">Garantia</p>
                  <p className="text-xs text-slate-400">Resultados comprovados</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <Globe size={20} className="text-emerald-900" />
                </div>
                <div>
                  <p className="font-black text-emerald-950 text-sm">Flexibilidade</p>
                  <p className="text-xs text-slate-400">Treine onde quiser</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 lg:p-14 rounded-[4rem] border border-slate-200 shadow-2xl relative animate-in zoom-in duration-700">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Investimento Total</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-emerald-950">R$</span>
                  <span className="text-7xl font-black text-emerald-950 tracking-tighter">{service.price.toFixed(2).split('.')[0]}</span>
                  <span className="text-3xl font-black text-slate-400">,{service.price.toFixed(2).split('.')[1]}</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Acesso Vitalício ao Academy',
                  'Planejamento de Treino Personalizado',
                  'Suporte via WhatsApp 24/7',
                  'Avaliações Mensais de Progresso',
                  'Protocolo de Recuperação e Mobilidade'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-slate-600 font-bold">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-[2rem] shadow-xl shadow-emerald-600/30 transition-all active:scale-95 text-xl tracking-tighter flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                GARANTIR MINHA VAGA
              </a>
              
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Vagas limitadas para este ciclo
              </p>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="max-w-5xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
           <div className="text-center space-y-4 group">
             <div className="w-20 h-20 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto group-hover:bg-emerald-600 group-hover:rotate-6 transition-all duration-500">
               <Zap size={32} className="text-emerald-600 group-hover:text-white" />
             </div>
             <h3 className="font-black text-emerald-950 text-lg">Alta Performance</h3>
             <p className="text-sm text-slate-500 leading-relaxed">Treinos focados em eficiência máxima para otimizar seu tempo e energia.</p>
           </div>
           <div className="text-center space-y-4 group">
             <div className="w-20 h-20 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:-rotate-6 transition-all duration-500">
               <Target size={32} className="text-blue-600 group-hover:text-white" />
             </div>
             <h3 className="font-black text-emerald-950 text-lg">Foco em Resultados</h3>
             <p className="text-sm text-slate-500 leading-relaxed">Monitoramento constante para garantir que cada repetição te leve ao objetivo.</p>
           </div>
           <div className="text-center space-y-4 group">
             <div className="w-20 h-20 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto group-hover:bg-amber-600 group-hover:rotate-6 transition-all duration-500">
               <Star size={32} className="text-amber-600 group-hover:text-white" />
             </div>
             <h3 className="font-black text-emerald-950 text-lg">Metodologia Elite</h3>
             <p className="text-sm text-slate-500 leading-relaxed">Baseado em ciência esportiva atualizada e anos de experiência prática.</p>
           </div>
        </div>
      </main>

      <footer className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">P</span>
            </div>
            <span className="font-black tracking-tighter text-emerald-950">PERSON</span>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">PERSON Professional Coaching © 2024</p>
          <p className="text-[10px] text-slate-400 mt-2">Todos os direitos reservados. Resultados variam conforme a dedicação individual.</p>
        </div>
      </footer>
    </div>
  );
}
