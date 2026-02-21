
import React, { useState } from 'react';
import { Dumbbell, Sparkles, Plus, Play, ChevronRight, ListChecks } from 'lucide-react';
import { MOCK_STUDENTS } from '../constants';
import { suggestWorkoutPlan } from '../geminiService';

export default function Workouts() {
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[0]);
  const [muscleGroup, setMuscleGroup] = useState('Pernas');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateAI = async () => {
    setLoading(true);
    const suggestion = await suggestWorkoutPlan({
      goal: selectedStudent.goal,
      level: selectedStudent.type,
      muscleGroup: muscleGroup
    });
    setAiSuggestion(suggestion);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 tracking-tight uppercase">Gestão de Treinos</h1>
          <p className="text-slate-500 font-medium">Prescreva e organize a rotina dos seus atletas.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-4 bg-white border border-slate-200 rounded-2xl text-emerald-900 hover:bg-slate-50 transition-all shadow-sm">
            <ListChecks size={20} />
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
            <Plus size={20} />
            <span>MONTAR TREINO</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Selecionar Aluno</label>
            <div className="space-y-2 max-h-[400px] overflow-y-auto no-scrollbar">
              {MOCK_STUDENTS.map(student => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    selectedStudent.id === student.id 
                    ? 'bg-emerald-50 border-emerald-100 border text-emerald-900 shadow-sm' 
                    : 'hover:bg-slate-50 border border-transparent text-slate-600'
                  }`}
                >
                  <img src={student.photo} className="w-10 h-10 rounded-xl object-cover" alt="" />
                  <div className="text-left">
                    <p className="text-sm font-black leading-none mb-1">{student.name}</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase">{student.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-xl">
                  <Sparkles size={18} className="text-emerald-950" />
                </div>
                <h3 className="font-black text-lg">AI Coach Assistant</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Foco Muscular</label>
                  <select 
                    value={muscleGroup}
                    onChange={(e) => setMuscleGroup(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                  >
                    {['Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Core'].map(g => (
                      <option key={g} value={g} className="text-emerald-950">{g}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Gerando...' : 'GERAR SUGESTÃO IA'}
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Dumbbell size={160} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {aiSuggestion && (
            <div className="bg-white p-8 rounded-[2rem] border-2 border-emerald-100 shadow-xl animate-in slide-in-from-top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                  <Sparkles size={20} /> Sugestão Inteligente
                </h3>
                <button onClick={() => setAiSuggestion('')} className="text-slate-300 hover:text-slate-500 font-bold text-xs uppercase">Limpar</button>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-100">
                {aiSuggestion}
              </div>
              <div className="mt-6 flex justify-end">
                <button className="text-sm font-black text-emerald-600 bg-emerald-50 px-6 py-3 rounded-xl hover:bg-emerald-100 transition-all">
                  IMPORTAR PARA TREINO
                </button>
              </div>
            </div>
          )}

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-emerald-950 mb-6 uppercase tracking-tight">Treinos Ativos: {selectedStudent.name}</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Push (Peito/Tríceps)', exercises: 6, status: 'Completo', color: 'text-emerald-600 bg-emerald-50' },
                { name: 'Pull (Costas/Bíceps)', exercises: 7, status: 'Pendente', color: 'text-amber-600 bg-amber-50' },
                { name: 'Leg Day (Foco Quadríceps)', exercises: 5, status: 'Pendente', color: 'text-amber-600 bg-amber-50' },
              ].map((workout, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-200 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Play size={20} className="text-emerald-900 fill-emerald-900" />
                    </div>
                    <div>
                      <p className="font-black text-emerald-950">{workout.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{workout.exercises} Exercícios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase ${workout.color}`}>
                      {workout.status}
                    </span>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
