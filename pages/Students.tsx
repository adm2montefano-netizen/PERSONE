
import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Filter, UserCheck, UserMinus } from 'lucide-react';
import { MOCK_STUDENTS, GOALS_LABELS } from '../constants';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Alunos</h1>
          <p className="text-slate-500 font-medium">Gerencie sua base de {MOCK_STUDENTS.length} alunos.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
          <Plus size={20} />
          <span>NOVO ALUNO</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar aluno por nome..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="bg-white border border-slate-200 p-4 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <Filter size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="relative">
                <img src={student.photo} alt={student.name} className="w-20 h-20 rounded-3xl object-cover border-4 border-emerald-50 shadow-md" />
                <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full border-4 border-white ${student.active ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  {student.active ? <UserCheck size={12} className="text-white" /> : <UserMinus size={12} className="text-white" />}
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-emerald-900 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-black text-emerald-950 group-hover:text-emerald-600 transition-colors">{student.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{student.type}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight">
                  {GOALS_LABELS[student.goal]}
                </span>
                <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tight">
                  Desde {new Date(student.joinedAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-50 flex gap-3">
                <button className="flex-1 bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-emerald-800 transition-colors">
                  VER PERFIL
                </button>
                <button className="flex-1 bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-xl hover:bg-slate-200 transition-colors">
                  TREINOS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
