export interface LLMModelResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}