import Image from "next/image";
import { Globe, MessageCircle, Send, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative h-12 w-12 overflow-hidden bg-transparent">
              <Image src="/logo.png" alt="AI Revenue Recovery" fill className="object-contain" />
            </div>
            <div className="text-sm font-semibold text-slate-900">AI Revenue Recovery</div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            AI-driven insights that help ecommerce teams recover lost revenue and protect growth.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Product</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><a href="#features" className="hover:text-slate-900">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-slate-900">How It Works</a></li>
            <li><a href="#benefits" className="hover:text-slate-900">Benefits</a></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Resources</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><a href="#faq" className="hover:text-slate-900">FAQ</a></li>
            <li><a href="#pricing" className="hover:text-slate-900">Pricing</a></li>
            <li><a href="#demo" className="hover:text-slate-900">Demo</a></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Company</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li><a href="#about" className="hover:text-slate-900">About</a></li>
            <li><a href="#contact" className="hover:text-slate-900">Contact</a></li>
            <li><a href="#careers" className="hover:text-slate-900">Careers</a></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Follow</p>
          <div className="mt-4 flex items-center gap-3">
            {[Globe, MessageCircle, Send, Users].map((Icon, index) => (
              <a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <span>© 2026 AI Revenue Recovery</span>
          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-slate-900">Privacy</a>
            <a href="#terms" className="hover:text-slate-900">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
