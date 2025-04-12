"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://ai-mock-interview-eight-theta.vercel.app/success",
      },
    });

    if (error) {
      setMessage(
        error.message || "An error occurred during payment processing."
      );
    } else {
      setMessage("Unexpected error.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-card rounded-lg shadow-sm">
        <PaymentElement />
      </div>
      <Button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full"
      >
        {loading ? "Processing…" : "Pay $10.00"}
      </Button>
      {message && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          {message}
        </div>
      )}
    </form>
  );
}
