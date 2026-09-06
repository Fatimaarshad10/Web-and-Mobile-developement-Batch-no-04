"use client";

import { useState } from "react";

/**
 * Newsletter capture. Client-side because it owns input state.
 *
 * There is no backend yet, so submit only acknowledges locally. Wire the
 * TODO below to a route handler or provider when the list exists.
 */
export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: POST to a real subscribe endpoint.
        setSubmitted(true);
      }}
      className="mx-auto mt-7 flex h-[42px] w-full max-w-[340px] items-center rounded-3xl bg-[#fafafa] py-1 pl-4 pr-1"
    >
      <label htmlFor="subscribe-email" className="sr-only">
        Email address
      </label>
      <input
        id="subscribe-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
        className="min-w-0 flex-1 border-0 bg-transparent text-xs text-[#222] outline-none"
      />
      <button
        type="submit"
        className="h-[34px] cursor-pointer rounded-[22px] bg-lime-deep px-[18px] text-xs transition-opacity hover:opacity-90"
      >
        {submitted ? "Thanks!" : "Subscribe"}
      </button>
    </form>
  );
}
