import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY
})

const model = 'gemini-2.5-flash'

export const transcribeAudio = async (audioAsBase64: string, mimeType: string) => {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para português Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em paragrafos quando for apropriado'
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64
        }
      }
    ]
  })

  if(!response.text) {
    throw new Error('Não foi possível converter o áudio')
  }

  return response.text
} 

export const generateEmbeddings = async (text: string) => {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possível criar o Embeddings');
  }

  return response.embeddings[0].values;
};

export const generateAnswer = async (question: string, transcriptions: string[]) => {
  const context = transcriptions.join('\n\n')

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.

    Contexto: ${context}

    Pergunta: ${question}

    Instruções:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o termo "Conteúdo da aula";
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt
      }
    ]
  })

  if(!response.text){
    throw new Error('Falha ao gerar respostas pelo Gemini')
  }

  return response.text
};