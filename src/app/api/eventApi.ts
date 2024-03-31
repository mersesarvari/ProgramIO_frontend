import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryClient } from "../../App";
import { useNavigate } from "react-router";

//GET-ALL events
export const useEventsQuery = () => {
  return useQuery({
    queryKey: ["get-events"],
    queryFn: async () => {
      const axiosResponse = await api.get("/event/");
      return axiosResponse.data;
    },
  });
};
//GET-ONE event
export const useEventQuery = (id: string) => {
  return useQuery({
    queryKey: ["get-event"],
    queryFn: async () => {
      const axiosResponse = await api.get(`/event/${id}`);
      return axiosResponse.data;
    },
  });
};
//POST-ONE
export const useCreateEventMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (eventData) => {
      const axiosResponse = await api.post("/event", eventData);
      return axiosResponse.data;
    },
    onSuccess: async () => {
      //Reloading the data on successfull creation
      queryClient.invalidateQueries("get-events");
      navigate("/event");
    },
  });
};
