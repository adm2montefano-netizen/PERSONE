
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function suggestWorkoutPlan(studentProfile: {
  goal: string;
  level: string;
  muscleGroup: string;
}) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Como um Personal Trainer de elite, crie um plano de treino técnico para um aluno de nível ${studentProfile.level} com objetivo de ${studentProfile.goal}. 
      Foco: ${studentProfile.muscleGroup}.
      
      Estruture a resposta assim:
      - Aquecimento (1 exercício)
      - Bloco Principal (3 exercícios com Séries x Reps e Descanso)
      - Dica técnica de biomecânica.
      Use uma linguagem motivadora e profissional.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text || "Não foi possível gerar sugestões no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao conectar com a IA Coach. Tente novamente.";
  }
}

export async function getDailyCoachInsight() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma pílula de conhecimento (máximo 140 caracteres) para um Personal Trainer. Pode ser sobre biomecânica, marketing para personal ou motivação técnica. Seja direto e impactante.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    });
    return response.text || "A consistência na técnica supera a carga excessiva.";
  } catch (error) {
    return "O movimento é a cura. Foco na execução perfeita.";
  }
}
