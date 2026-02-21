
export type Goal = 'hipertrofia' | 'emagrecimento' | 'condicionamento' | 'reabilitação' | 'outro';
export type Level = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Funcional' | 'HIIT';
export type MuscleGroup = 'Peito' | 'Costas' | 'Pernas' | 'Ombros' | 'Braços' | 'Core';

export interface Student {
  id: string;
  name: string;
  photo: string;
  birthDate: string;
  goal: Goal;
  observations: string;
  active: boolean;
  type: Level;
  joinedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load?: string;
  observations?: string;
}

export interface Workout {
  id: string;
  studentId: string;
  name: string;
  group: MuscleGroup;
  level: Level;
  exercises: Exercise[];
  dayOfWeek: string;
  status: 'feito' | 'pendente';
}

export interface AcademyVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: MuscleGroup | 'Geral';
  level: Level;
  duration: string;
}

export interface Receipt {
  id: string;
  studentName: string;
  service: string;
  value: number;
  date: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  programName: string;
  hours?: number;
  issueDate: string;
  personalName: string;
  validationCode: string;
}

// Novos tipos Financeiros
export type ServiceCategory = 'Mensalidade' | 'Consultoria' | 'Aula Avulsa' | 'Avaliação' | 'Outros';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  cost: number;
}

export interface Sale {
  id: string;
  studentId: string;
  studentName: string;
  serviceId: string;
  serviceName: string;
  amount: number;
  date: string;
  paymentMethod: 'Pix' | 'Cartão' | 'Dinheiro' | 'Transferência';
}
