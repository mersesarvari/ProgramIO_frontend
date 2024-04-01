import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryClient } from "../../App";
import { useNavigate } from "react-router";
import { AddressType } from "../../features/google-map/google-map-functions";

export type EventType = {
  _id: string;
  name: string;
  description: string;
  long_description: string;
  type: string;
  date: Date;
  address: AddressType;
  rating?: number;
  create_date?: Date;
  userId?: string;
  images?: any[];
};

//GET-ALL events
export const useGetAllEventsQuery = () => {
  return useQuery({
    queryKey: ["get-events"],
    queryFn: async () => {
      const axiosResponse = await api.get("/event/");
      return axiosResponse.data;
    },
  });
};
//GET-ONE event
export const useGetEventQuery = (eventId: string) => {
  console.log("useGetEventQuery");
  console.log("useGetEventQuery eventId: ", eventId);
  return useQuery({
    queryKey: ["get-event"],
    queryFn: async () => {
      const axiosResponse = await api.get(`/event/${eventId}`);
      return axiosResponse.data;
    },
  });
};
//GET-ALL-BY-USER
export const useGetAllEventsByUserQuery = () => {
  return useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const axiosResponse = await api.get("/event/my-events");
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
