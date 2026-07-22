import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { predictionApi } from "./prediction.api";
import {
  GetBonusPredictionsParams,
  GetBonusPredictionsResponse,
  GetPredictionsParams,
  GetPredictionsResponse,
} from "./prediction.types";

export const useGetPredictions = (
  params: GetPredictionsParams,
  queryParams?: Partial<UseQueryOptions<GetPredictionsResponse>>,
) =>
  useQuery({
    queryKey: ["get-predictions", params],
    queryFn: () => predictionApi.getPredictions(params),
    ...queryParams,
  });

export const useAddPrediction = () =>
  useMutation({
    mutationKey: ["add-prediction"],
    mutationFn: predictionApi.addPrediction,
  });

export const useGetBonusPredictions = (
  params: GetBonusPredictionsParams,
  queryParams?: Partial<UseQueryOptions<GetBonusPredictionsResponse>>,
) =>
  useQuery({
    queryKey: ["get-bonus-predictions", params],
    queryFn: () => predictionApi.getBonusPredictions(params),
    ...queryParams,
  });

export const useAddBonusPrediction = () =>
  useMutation({
    mutationKey: ["add-bonus-prediction"],
    mutationFn: predictionApi.addBonusPrediction,
  });
