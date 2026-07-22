import { api } from "../http";
import {
  AddPredictionParams,
  AddBonusPredictionParams,
  GetBonusPredictionsResponse,
  GetBonusPredictionsParams,
  GetPredictionsParams,
  GetPredictionsResponse,
} from "./prediction.types";

export const predictionApi = {
  addPrediction: async (params: AddPredictionParams) => {
    const res = await api.post<object>(`/predictions/${params.matchId}`, {
      ...params,
    });
    return res.data;
  },

  getPredictions: async (params: GetPredictionsParams) => {
    const res = await api.get<GetPredictionsResponse>(`/predictions`, { params });
    return res.data;
  },

  getBonusPredictions: async (params: GetBonusPredictionsParams) => {
    const res = await api.get<GetBonusPredictionsResponse>(`/predictions/bonus`, {
      params,
    });
    return res.data;
  },

  addBonusPrediction: async (params: AddBonusPredictionParams) => {
    const res = await api.post<object>(`/matches/bonus`, params);
    return res.data;
  },
};
