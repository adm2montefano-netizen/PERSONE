
import React from 'react';
import { ShoppingCart, Download, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { MOCK_SALES } from '../constants';

export default function Sales() {
  const totalRevenue = MOCK_SALES.reduce((acc, curr) => acc + curr.amount, 0);
  const ticketMedio = totalRevenue / MOCK_SALES.length;

  return (
    <div className="space-y-6 lg:space-y-8 animate-in">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-emerald-950 tracking-tight uppercase">Financeiro</h1>
          <p className="text-sm lg:text-base text-slate-500 font-medium">Fluxo de pagamentos e faturamento.</p>
        </div>
        <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95">
          <ShoppingCart size={20} />
          <span>NOVA VENDA</span>
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-emerald-900 p-6 lg:p-8 rounded-[2rem] text-white flex flex-col justify-between h-40 lg:h-48 shadow-xl shadow-emerald-900/20">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-emerald-800 rounded-xl">
              <ArrowUpRight size={20} className="text-emerald-400" />
            </div>
            <span className="text-[9px] lg:text-[10px] font-black text-emerald-400 uppercase tracking-widest">Faturamento</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
        
        <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between h-40 lg:h-48 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-50 rounded-xl">
              <ArrowDownLeft size={20} className="text-rose-500" />
            </div>
            <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Pendentes</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-emerald-950">R$ 0,00</h3>
        </div>

        <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between h-40 lg:h-48 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 rounded-xl">
              <CreditCard size={20} className="text-blue-500" />
            </div>
            <span className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Médio</span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-black text-emerald-950">R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-emerald-950 uppercase text-sm lg:text-base">Transações</h3>
          <button className="flex items-center gap-2 text-[10px] font-black text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl transition-all border border-emerald-100">
            <Download size={14} /> EXPORTAR
          </button>
        </div>

        {/* Tabela Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Aluno</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Serviço</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_SALES.map(sale => (
                <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-emerald-950">{sale.studentName}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs text-slate-500">{sale.serviceName}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-sm font-black text-emerald-900">R$ {sale.amount.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lista Mobile (Cards) */}
        <div className="md:hidden divide-y divide-slate-50">
          {MOCK_SALES.map(sale => (
            <div key={sale.id} className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center font-black text-emerald-900 text-[10px]">
                    {sale.studentName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-emerald-950">{sale.studentName}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{sale.date}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-600">R$ {sale.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl">
                <span className="text-[9px] font-black text-slate-400 uppercase">{sale.serviceName}</span>
                <span className="text-[9px] font-black px-2 py-1 bg-white border border-slate-200 rounded text-slate-500 uppercase">{sale.paymentMethod}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
