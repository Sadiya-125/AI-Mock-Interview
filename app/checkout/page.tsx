// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface PaymentIntentResponse {
  clientSecret: string;
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 1000 }), // $10.00
        });

        if (!response.ok) {
          throw new Error("Failed to create payment intent");
        }

        const data: PaymentIntentResponse = await response.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    createPaymentIntent();
  }, []);

  const appearance = { theme: "stripe" as const };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Upgrade Your Interview Experience</h2>
          <p className="text-lg">
            Get access to premium features and unlimited interviews
          </p>
          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
              {error}
            </div>
          )}
          {clientSecret && (
            <div className="w-full max-w-md">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </div>
          )}
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
    </div>
  );
}
