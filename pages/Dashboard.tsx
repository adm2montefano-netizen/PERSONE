
import React, { useEffect, useState } from 'react';
import { 
  Users, DollarSign, Calendar, Zap, TrendingUp, 
  ArrowUpRight, MessageSquare, RefreshCcw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { getDailyCoachInsight } from '../geminiService';
import { MOCK_STUDENTS, MOCK_SALES } from '../constants';

const chartData = [
  { name: 'Seg', vendas: 400 },
  { name: 'Ter', vendas: 700 },
  { name: 'Qua', vendas: 500 },
  { name: 'Qui', vendas: 900 },
  { name: 'Sex', vendas: 1200 },
  { name: 'Sáb', vendas: 800 },
  { name: 'Dom', vendas: 600 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-full">
        <TrendingUp size={12} />
        {trend}
      </div>
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
    <h3 className="text-2xl font-black text-emerald-950">{value}</h3>
  </div>
);

export default function Dashboard() {
  const [insight, setInsight] = useState("Carregando insight do coach...");
  const [loadingInsight, setLoadingInsight] = useState(false);

  const fetchInsight = async () => {
    setLoadingInsight(true);
    const text = await getDailyCoachInsight();
    setInsight(text);
    setLoadingInsight(false);
  };

  useEffect(() => {
    fetchInsight();
  }, []);

  const totalRevenue = MOCK_SALES.reduce((acc, curr) => acc + curr.amount, 0);
  const activeStudents = MOCK_STUDENTS.filter(s => s.active).length;

  return (
    <div className="space-y-8 animate-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium">Análise de performance e engajamento.</p>
        </div>
        <div className="hidden md:block bg-emerald-100 text-emerald-900 px-4 py-2 rounded-xl text-xs font-black">
          SESSÃO ATIVA: COACH RICARDO
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Alunos Ativos" value={activeStudents} icon={Users} trend="+12%" color="bg-emerald-600" />
        <StatCard title="Faturamento" value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`} icon={DollarSign} trend="+8%" color="bg-blue-600" />
        <StatCard title="Treinos/Mês" value="156" icon={Calendar} trend="+24%" color="bg-amber-600" />
        <StatCard title="Retenção" value="94%" icon={Zap} trend="+2%" color="bg-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-black text-emerald-950">Evolução de Receita</h3>
              <p className="text-sm text-slate-500">Volume financeiro semanal</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="vendas" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorVendas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-950 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <MessageSquare size={120} />
            </div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">Coach AI Insight</h3>
              <button 
                onClick={fetchInsight} 
                className={`p-1.5 hover:bg-white/10 rounded-lg transition-all ${loadingInsight ? 'animate-spin' : ''}`}
              >
                <RefreshCcw size={14} className="text-emerald-400" />
              </button>
            </div>
            <p className="text-lg font-bold leading-tight relative z-10 italic min-h-[80px]">
              "{insight}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <Zap size={14} className="text-emerald-950" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Powered by Gemini 3</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider mb-4">Novos Alunos</h3>
            <div className="space-y-4">
              {MOCK_STUDENTS.slice(0, 3).map((student) => (
                <div key={student.id} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-all">
                    <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-950">{student.name}</p>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">{student.goal}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
