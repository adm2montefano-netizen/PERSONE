
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, XCircle, Award, CheckCircle2, User, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { MOCK_CERTIFICATES } from '../constants';

export default function PublicCertificateValidation() {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [cert, setCert] = useState<any>(null);

  useEffect(() => {
    // Simulating API check
    const timer = setTimeout(() => {
      const found = MOCK_CERTIFICATES.find(c => c.validationCode === code);
      setCert(found);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-emerald-950 uppercase">PERSON</span>
          </div>
          <h1 className="text-xl font-black text-emerald-950 uppercase tracking-widest">Portal de Autenticidade</h1>
        </div>

        <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 text-center space-y-8 animate-in zoom-in duration-500">
          {loading ? (
            <div className="py-12 flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Verificando Código...</p>
            </div>
          ) : cert ? (
            <>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={48} className="text-emerald-600" />
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Certificado Autêntico
                </span>
              </div>

              <div className="space-y-6 text-left border-t border-slate-50 pt-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <User size={20} className="text-emerald-900" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aluno(a)</p>
                    <p className="text-lg font-black text-emerald-950">{cert.studentName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <Award size={20} className="text-emerald-900" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Programa</p>
                    <p className="text-lg font-black text-emerald-950">{cert.programName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-2xl">
                      <Calendar size={20} className="text-emerald-900" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emissão</p>
                      <p className="text-sm font-black text-emerald-950">{new Date(cert.issueDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-2xl">
                      <BookOpen size={20} className="text-emerald-900" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carga</p>
                      <p className="text-sm font-black text-emerald-950">{cert.hours} Horas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed">
                  Este documento foi verificado eletronicamente pelo PERSON Professional Management System.
                </p>
              </div>
            </>
          ) : (
            <div className="py-12 space-y-6">
              <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle size={48} className="text-rose-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-emerald-950">Código Inválido</h3>
                <p className="text-slate-400 mt-2">Não encontramos nenhum certificado correspondente ao código fornecido.</p>
              </div>
              <Link to="/" className="inline-block text-emerald-600 font-black text-xs uppercase hover:underline">
                Voltar ao Sistema
              </Link>
            </div>
          )}
        </div>
        
        <p className="text-center mt-12 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
          PERSON Professional Coaching © 2024
        </p>
      </div>
    </div>
  );
}
