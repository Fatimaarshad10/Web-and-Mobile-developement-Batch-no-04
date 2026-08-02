import React from "react";
import {
  SparklesIcon,
  DevicePhoneMobileIcon,
  CubeIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Props from "./props";
import Testimonials from "./testi";

const services = [
  {
    title: "Strategy & Operations",
    description:
      "Build a strong foundation with strategic planning, operational optimization, and process improvements.",
    icon: SparklesIcon,
  },
  {
    title: "Digital Transformation",
    description:
      "Leverage technology to modernize workflows, improve customer experience, and create scalable digital ecosystems.",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "Product & Innovation",
    description:
      "From ideation to execution, we guide your team in building products that customers love and businesses can scale.",
    icon: CubeIcon,
  },
];

export default function Card() {
    const username ='Fatima'
  return (
    <>
    <section className="bg-[#f8f8f2] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-10">
          <div>
            <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-5">
              • Services
            </p>

            <h2 className="text-5xl md:text-6xl font-light text-[#181818] leading-tight">
              Expertise built
              <br />
              on insight & experience
            </h2>

            <p className="mt-6 max-w-xl text-gray-600 text-lg">
              We deliver strategic solutions grounded in research,
              experience, and industry best practices.
            </p>
          </div>

          <button className="bg-[#1f260d] text-[#c9dd8b] uppercase tracking-[3px] text-sm px-8 py-4 rounded-full flex items-center gap-2 hover:bg-black transition">
            View Services
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-[#edf0dc] rounded-2xl p-8 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[#1f260d] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-lime-400" />
                </div>

                <h3 className="text-3xl font-normal text-[#222] mt-10">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-5 leading-7">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <Props />
    <Testimonials/>
    </>
  );
}