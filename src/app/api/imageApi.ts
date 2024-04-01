import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";
import { queryClient } from "../../App";

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

type ImageMutationType = {
  eventId: string;
  eventData: FormData;
};

//TODO: this is not the optional way. sending the image and the eventID would be better because then we dont need to send the whole event object
//POST-ONE-EVENT-IMAGE
export const useAddImageMutation = () => {
  return useMutation({
    retry: 0,
    mutationFn: async (event: ImageMutationType) => {
      console.log("Event Id:", event.eventId);
      const axiosResponse = await api.post(
        `/image/event/${event.eventId}`,
        event.eventData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending form data
          },
        }
      );
      return axiosResponse.data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("get-event-images");
    },
  });
};

//DELETE-ONE-EVENT-IMAGE
export const useDeleteImageMutation = () => {
  return useMutation({
    retry: 0,
    mutationFn: async ({ imageName, eventId }) => {
      console.log("Parameters for delete:", imageName, eventId);
      const axiosResponse = await api.delete(`/image/${eventId}`, {
        data: { imageName },
      });
      return axiosResponse.data;
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries("get-event-images");
    },
  });
};
