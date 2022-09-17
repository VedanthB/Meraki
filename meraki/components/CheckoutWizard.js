import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-8 flex flex-wrap">
      {["Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-cyan-500 text-cyan-500"
                : "border-gray-400 text-gray-400"
            }`}
          >
            {step}
          </div>
        ),
      )}
    </div>
  );
}
