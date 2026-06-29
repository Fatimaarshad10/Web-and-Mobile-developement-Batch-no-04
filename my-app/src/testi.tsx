import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Testimonials() {
  return (
    <section className="bg-[#f8f8ef] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Section Label */}
        <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-10">
          • Testimonials
        </p>

        {/* Quote */}
        <h2 className="text-4xl md:text-6xl font-light leading-tight text-[#1b1b1b] max-w-5xl mx-auto">
          "They brought clarity to complex problems,
          <br />
          breaking down barriers and delivering
          <br />
          innovative solutions."
        </h2>

        {/* Author */}
        <div className="flex justify-center items-center mt-14">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="John Doe"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div className="ml-4 text-left">
            <h4 className="text-lg font-medium text-[#222]">
              John Doe
            </h4>

            <p className="text-gray-500 text-sm">
              CEO, Tech Innovations
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">

          <button
            className="w-12 h-12 rounded-xl bg-[#1b220d] flex items-center justify-center text-lime-300 hover:bg-black transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          <button
            className="w-12 h-12 rounded-xl bg-[#1b220d] flex items-center justify-center text-lime-300 hover:bg-black transition"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>

        </div>

      </div>
    </section>
  );
}