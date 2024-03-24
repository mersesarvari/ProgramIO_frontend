import { apiSlice } from "../../app/api/apiSlice";
import { AddressType } from "../google-map/google-map-functions";

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
};

export const eventApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<any, EventType>({
      query: (event) => ({
        url: "/event",
        method: "POST",
        body: { ...event },
      }),
    }),
    getEvents: builder.query<any, void>({
      query: () => ({
        url: "/event",
        method: "GET",
      }),
    }),
    getEvent: builder.query<any, string>({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateEventMutation, useGetEventsQuery, useGetEventQuery } =
  eventApiSlice;
