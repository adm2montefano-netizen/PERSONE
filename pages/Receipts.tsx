
import React from 'react';
import { Receipt as ReceiptIcon, FileText, Download, Printer } from 'lucide-react';
import { MOCK_SALES } from '../constants';

export default function Receipts() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-black text-emerald-950 tracking-tight uppercase">Recibos</h1>
        <p className="text-slate-500 font-medium">Gere comprovantes de pagamento profissionais para seus alunos.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_SALES.map(sale => (
          <div key={sale.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-emerald-200 transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <ReceiptIcon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-emerald-950">{sale.studentName}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {sale.serviceName} • {new Date(sale.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Valor Total</p>
                <p className="text-xl font-black text-emerald-900">R$ {sale.amount.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors" title="Imprimir">
                  <Printer size={20} />
                </button>
                <button className="flex items-center gap-2 px-6 py-4 bg-emerald-900 text-white rounded-2xl font-black text-xs uppercase hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10">
                  <Download size={18} />
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
