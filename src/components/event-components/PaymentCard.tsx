import { Button, Datepicker } from "flowbite-react";
import Divider from "../Divider";

const PaymentCard = () => {
  return (
    <div className="card w-full bg-white text-primary-content border">
      <div className="card-body">
        <h2 className="card-title font-bold">Buy your ticket</h2>
        <Datepicker disabled />
        <p>Price</p>
        <p>Ticket price: 124.000 Ft</p>
        <p>EventIO fee: 12.400 Ft</p>
        <Divider />
        <div className="flex">
          <div className="font-semibold text-xl flex-1">Total</div>
          <div className="text-xl flex w-32">124.000 Ft</div>
        </div>
        <div className="card-actions justify-end">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
          >
            <div className="text-xl">Purchase</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
