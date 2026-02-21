
import React from 'react';
import { LayoutDashboard, Users, Dumbbell, PlayCircle, Receipt, Award, ShoppingCart, Briefcase } from 'lucide-react';
import { Student, AcademyVideo, Level, MuscleGroup, Goal, Service, Sale, Certificate } from './types';

export const COLORS = {
  primary: '#064e3b',
  secondary: '#f1f5f9',
  white: '#ffffff',
  accent: '#10b981',
};

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { label: 'Alunos', icon: <Users size={20} />, path: '/alunos' },
  { label: 'Treinos', icon: <Dumbbell size={20} />, path: '/treinos' },
  { label: 'Serviços', icon: <Briefcase size={20} />, path: '/servicos' },
  { label: 'Vendas', icon: <ShoppingCart size={20} />, path: '/vendas' },
  { label: 'Academy', icon: <PlayCircle size={20} />, path: '/academy' },
  { label: 'Recibos', icon: <Receipt size={20} />, path: '/recibos' },
  { label: 'Certificados', icon: <Award size={20} />, path: '/certificados' },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Carlos Oliveira',
    photo: 'https://picsum.photos/seed/carlos/200',
    birthDate: '1992-05-15',
    goal: 'hipertrofia',
    observations: 'Focar em amplitude de movimento.',
    active: true,
    type: 'Intermediário',
    joinedAt: '2023-10-01'
  },
  {
    id: '2',
    name: 'Mariana Santos',
    photo: 'https://picsum.photos/seed/mariana/200',
    birthDate: '1995-12-20',
    goal: 'emagrecimento',
    observations: 'Resistência cardiovascular baixa.',
    active: true,
    type: 'Iniciante',
    joinedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'João Silva',
    photo: 'https://picsum.photos/seed/joao/200',
    birthDate: '1988-03-22',
    goal: 'condicionamento',
    observations: 'Paciente pós-reabilitação de joelho.',
    active: true,
    type: 'Avançado',
    joinedAt: '2023-06-15'
  }
];

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: 'Consultoria Online Gold', category: 'Consultoria', price: 299.90, cost: 45.00 },
  { id: 's2', name: 'Personal 3x Semana', category: 'Mensalidade', price: 850.00, cost: 120.00 },
  { id: 's3', name: 'Avaliação por Bioimpedância', category: 'Avaliação', price: 150.00, cost: 15.00 },
];

export const MOCK_SALES: Sale[] = [
  { id: 'v1', studentId: '1', studentName: 'Carlos Oliveira', serviceId: 's1', serviceName: 'Consultoria Online Gold', amount: 299.90, date: new Date().toISOString().split('T')[0], paymentMethod: 'Pix' },
  { id: 'v2', studentId: '2', studentName: 'Mariana Santos', serviceId: 's2', serviceName: 'Personal 3x Semana', amount: 850.00, date: new Date().toISOString().split('T')[0], paymentMethod: 'Cartão' },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    studentId: '1',
    studentName: 'Carlos Oliveira',
    programName: 'Desafio 60 Dias: Verão',
    hours: 45,
    issueDate: '2024-01-15',
    personalName: 'Coach Ricardo',
    validationCode: 'VERAO-2024-001'
  },
  {
    id: 'cert-2',
    studentId: '2',
    studentName: 'Mariana Santos',
    programName: 'Elite Performance: Nível Avançado',
    hours: 60,
    issueDate: '2023-12-20',
    personalName: 'Coach Ricardo',
    validationCode: 'ELITE-2023-099'
  }
];

export const MOCK_VIDEOS: AcademyVideo[] = [
  {
    id: 'v1',
    title: 'Agachamento Perfeito',
    description: 'Aprenda a biomecânica correta do agachamento livre.',
    thumbnail: 'https://picsum.photos/seed/squat/400/225',
    category: 'Pernas',
    level: 'Iniciante',
    duration: '12:30'
  },
  {
    id: 'v2',
    title: 'Técnicas de Supino',
    description: 'Como evitar lesões no ombro durante o supino.',
    thumbnail: 'https://picsum.photos/seed/bench/400/225',
    category: 'Peito',
    level: 'Avançado',
    duration: '15:45'
  },
];

export const GOALS_LABELS: Record<Goal, string> = {
  hipertrofia: 'Hipertrofia',
  emagrecimento: 'Emagrecimento',
  condicionamento: 'Condicionamento',
  reabilitação: 'Reabilitação',
  outro: 'Outro'
};
