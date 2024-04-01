import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryClient } from "../../App";
import { useNavigate } from "react-router";

//GET-ALL events
export const useGetAllEventImagesQuery = (eventId: string) => {
  return useQuery({
    queryKey: ["get-event-images"],
    queryFn: async () => {
      const axiosResponse = await api.get(`/image/${eventId}`);
      return axiosResponse.data;
    },
  });
};
