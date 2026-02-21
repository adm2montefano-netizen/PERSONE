
import React, { useState, useRef, useEffect } from 'react';
import { Award, GraduationCap, Plus, Download, Eye, X, Printer, CheckCircle2, QrCode, Loader2 } from 'lucide-react';
import { MOCK_STUDENTS, MOCK_CERTIFICATES } from '../constants';
import { Certificate } from '../types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>(MOCK_CERTIFICATES);
  const [showModal, setShowModal] = useState(false);
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1);
  const certRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Efeito para ajustar a escala do certificado ao tamanho da tela
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && viewingCert) {
        const containerWidth = containerRef.current.clientWidth - 40; // 20px padding
        const baseWidth = 842; // Largura base do A4 em pontos (aprox)
        if (containerWidth < baseWidth) {
          setScale(containerWidth / baseWidth);
        } else {
          setScale(1);
        }
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, [viewingCert]);

  const [formData, setFormData] = useState({
    studentId: MOCK_STUDENTS[0].id,
    programName: '',
    hours: 40,
    personalName: 'Coach Ricardo'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const student = MOCK_STUDENTS.find(s => s.id === formData.studentId);
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      studentId: formData.studentId,
      studentName: student?.name || 'Desconhecido',
      programName: formData.programName,
      hours: formData.hours,
      issueDate: new Date().toISOString().split('T')[0],
      personalName: formData.personalName,
      validationCode: `VALID-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${new Date().getFullYear()}`
    };
    setCertificates([newCert, ...certificates]);
    setShowModal(false);
    setFormData({ ...formData, programName: '' });
  };

  const getQRUrl = (code: string) => {
    const baseUrl = window.location.origin + window.location.pathname;
    const validationUrl = `${baseUrl}#/public/validate-certificate/${code}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(validationUrl)}`;
  };

  const generatePDF = async (studentName: string) => {
    if (!certRef.current) return;
    
    setIsGenerating(true);
    try {
      // Temporariamente resetar escala para renderizar canvas full res
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Certificado_${studentName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in pb-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-emerald-950 tracking-tight uppercase">Certificados</h1>
          <p className="text-sm lg:text-base text-slate-500 font-medium">Reconhecimento e autenticidade digital.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-amber-950 font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>NOVO CERTIFICADO</span>
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white p-6 lg:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <GraduationCap size={24} className="text-amber-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-black text-emerald-950 mb-1">{cert.programName}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cert.studentName}</p>
                <p className="text-[9px] text-slate-400 font-bold mt-1 tracking-widest">VALIDAÇÃO: {cert.validationCode}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-500">{new Date(cert.issueDate).toLocaleDateString('pt-BR')}</span>
                <div className="flex gap-2">
                  <button onClick={() => setViewingCert(cert)} className="touch-target p-3 bg-slate-50 text-slate-600 rounded-xl">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => generatePDF(cert.studentName)} className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-amber-950 rounded-xl font-black text-[10px] uppercase">
                    <Download size={14} /> PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: VIEW CERTIFICATE (RESPONSIVO COM ESCALA) */}
      {viewingCert && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-emerald-950/95 backdrop-blur-md animate-in duration-300">
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white border-b border-white/10">
             <div className="flex items-center gap-3">
               <span className="bg-amber-500 text-amber-950 text-[10px] font-black px-3 py-1 rounded-full uppercase">Visualização</span>
               {isGenerating && <Loader2 className="animate-spin text-amber-500" size={16} />}
             </div>
             <button onClick={() => setViewingCert(null)} className="touch-target p-2 bg-white/10 rounded-full">
               <X size={24} />
             </button>
          </div>

          <div ref={containerRef} className="w-full flex items-center justify-center p-4 lg:p-10 overflow-hidden">
            <div 
              style={{ transform: `scale(${scale})`, minWidth: '842px' }} 
              className="cert-content transition-transform duration-300"
            >
              <div 
                ref={certRef}
                className="bg-white rounded shadow-2xl overflow-hidden aspect-[1.414/1] relative w-full"
              >
                <div className="w-full h-full border-[1.5rem] border-emerald-900 flex flex-col items-center justify-center text-center p-16 relative bg-white">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full opacity-40"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-tr-full opacity-40"></div>
                  
                  <div className="relative z-10 space-y-10 w-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 mb-4">
                         <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center">
                            <span className="text-white font-black text-xl">P</span>
                         </div>
                         <span className="text-2xl font-black tracking-tighter text-emerald-900">PERSON</span>
                      </div>
                      <h1 className="text-emerald-900 text-6xl font-black uppercase tracking-[0.1em]">Certificado</h1>
                      <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs">Reconhecimento de Evolução e Performance</p>
                    </div>

                    <div className="space-y-6">
                      <p className="text-slate-500 text-xl font-medium">Certificamos com excelência que</p>
                      <h2 className="text-emerald-950 text-5xl font-black border-b-2 border-emerald-100 inline-block px-8 pb-2">{viewingCert.studentName}</h2>
                      <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed mt-4">
                        Concluiu com êxito e dedicação o programa <span className="font-bold text-emerald-900 uppercase">{viewingCert.programName}</span>, 
                        totalizando <span className="font-bold">{viewingCert.hours} horas</span> de treinamento técnico de elite.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 w-full pt-12 items-end">
                      <div className="text-left space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emissão</p>
                         <p className="font-bold text-emerald-950">{new Date(viewingCert.issueDate).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-3">
                         <div className="w-48 border-b-2 border-emerald-900 mb-2"></div>
                         <p className="font-black text-emerald-900 uppercase text-xs tracking-tight">{viewingCert.personalName}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase">Coach Responsável</p>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                         <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-3">
                           <img 
                             src={getQRUrl(viewingCert.validationCode)} 
                             className="w-16 h-16"
                             crossOrigin="anonymous" 
                           />
                           <div className="text-right">
                             <p className="text-[8px] font-black text-slate-400 uppercase">Verificação</p>
                             <p className="text-[10px] font-black text-emerald-900 mt-1">{viewingCert.validationCode}</p>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-6 flex flex-col gap-3 lg:hidden">
            <button 
              onClick={() => generatePDF(viewingCert.studentName)}
              disabled={isGenerating}
              className="w-full bg-amber-500 text-amber-950 font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest"
            >
              <Download size={20} /> Baixar PDF Oficial
            </button>
            <p className="text-center text-white/50 text-[10px] font-bold uppercase tracking-widest">Certificado com validade jurídica digital</p>
          </div>
        </div>
      )}
    </div>
  );
}
