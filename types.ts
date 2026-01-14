
export interface Exercise {
  nombre: string;
  series: number;
  repeticiones: string;
  nota_tecnica: string;
}

export interface TrainingDay {
  dia: string;
  tipo_entreno: string;
  ejercicios: Exercise[];
}

export interface UserProfile {
  tmb_calculada: number;
  gasto_total_diario: number;
  objetivo_calorias: number;
  tipo_objetivo: string;
}

export interface Macronutrients {
  proteina_gramos: number;
  grasas_gramos: number;
  carbohidratos_gramos: number;
}

export interface NutritionalPlan {
  macronutrientes: Macronutrients;
  consejo_clave: string;
}

export interface TrainingPlan {
  estructura_semanal: string;
  enfoque_principal: string;
  dias: TrainingDay[];
}

export interface IronAIResponse {
  perfil_usuario: UserProfile;
  plan_nutricional: NutritionalPlan;
  plan_entrenamiento: TrainingPlan;
}

export interface FormData {
  gender: 'HOMBRE' | 'MUJER';
  weight: number;
  height: number;
  age: number;
  bodyFat?: number;
  activityLevel: 'SEDENTARIO' | 'LIGERO' | 'MODERADO' | 'ALTO' | 'EXTREMO';
  goal: 'DEFICIT' | 'SURPLUS' | 'MANTENIMIENTO';
  weakPoint: string;
}
