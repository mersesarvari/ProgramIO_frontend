import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryClient } from "../../App";
import { useNavigate } from "react-router";

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
export const useGetEventQuery = (id: string) => {
  return useQuery({
    queryKey: ["get-event"],
    queryFn: async () => {
      const axiosResponse = await api.get(`/event/${id}`);
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
//POST-ONE-IMAGE
export const useAddImageMutation = () => {
  return useMutation({
    mutationFn: async (eventData: FormData) => {
      const axiosResponse = await api.post("/event/new-image", eventData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending form data
        },
      });
      return axiosResponse.data;
    },
    onSuccess: async (data) => {
      //Reloading the data on successfull creation
      console.log(data);
    },
  });
};
