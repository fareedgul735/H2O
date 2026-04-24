import {
  Droplets,
  Package,
  Globe,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Star,
} from "lucide-react";

const About = () => {
  const services = [
    {
      icon: Package,
      title: "Custom Branded Bottles",
      desc: "Design your own water bottle with your logo, colors, and style. Perfect for businesses, events, and personal brands.",
    },
    {
      icon: Globe,
      title: "Your Own Online Store",
      desc: "We build you a full e-commerce website with admin panel so you can manage orders, products, and customers with ease.",
    },
    {
      icon: Droplets,
      title: "Bulk Manufacturing",
      desc: "High-quality water bottles produced at scale. Whether 100 or 100,000 units — we deliver consistency every time.",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      desc: "Every bottle goes through strict quality checks. BPA-free materials, food-grade certified, built to last.",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      desc: "From design approval to delivery, we move fast. Your brand shouldn't wait — and with us, it won't.",
    },
    {
      icon: Users,
      title: "End-to-End Support",
      desc: "From branding to fulfillment, our team is with you at every step. We don't just sell bottles — we build brands.",
    },
  ];

  const stats = [
    { value: "5+", label: "Brands Served" },
    { value: "1k+", label: "Bottles Delivered" },
    { value: "1", label: "Cities Reached" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  const steps = [
    {
      step: "01",
      title: "Contact Us",
      desc: "Reach out via our contact page or WhatsApp to discuss your vision.",
    },
    {
      step: "02",
      title: "Design & Approve",
      desc: "Our team crafts your bottle design. You review, suggest, and approve.",
    },
    {
      step: "03",
      title: "We Build & Launch",
      desc: "We manufacture your bottles and launch your store — ready to sell.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" />
            Aqua Forge — A Smlo LLC Company
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            We Don't Just Make Bottles.{" "}
            <span className="text-sky-500">We Build Brands.</span>
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Aqua Forge specializes in custom water bottle manufacturing and
            complete brand launches — from design and production to a fully
            functional online store with admin panel, so your brand is ready to
            sell from day one.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href="/contact"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              Start Your Brand <ChevronRight className="w-4 h-4" />
            </a>

            <a
              href="/products"
              className="flex items-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
            >
              View Our Bottles
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-sky-500">{s.value}</p>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-3">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">
              Your one-stop partner for water bottle branding
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Aqua Forge is a product of Smlo LLC — built for entrepreneurs,
              businesses, and creators who want to launch their own water bottle
              brand without the complexity. We handle manufacturing, design, and
              even the technology stack for your store.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed">
              Whether you need 100 custom bottles for a corporate event or a
              full-blown e-commerce brand with its own website and admin
              dashboard — Aqua Forge is the team behind it.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
              <span className="ml-1">
                Trusted by 5+ clients across Pakistan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "BPA-Free Materials",
              "Food Grade Certified",
              "Custom Logo Printing",
              "Bulk Orders Welcome",
              "Fast Delivery",
              "Lifetime Support",
            ].map((tag) => (
              <div
                key={tag}
                className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-sm font-medium text-sky-700 text-center"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Everything your brand needs
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-sky-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-sky-500" />
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-2">
              The Process
            </p>
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[60%] w-full h-px border-t border-dashed border-sky-200 z-0" />
                )}

                <div className="relative z-10 bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center text-xs font-bold mb-4">
                    {s.step}
                  </div>

                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-500 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to launch your water bottle brand?
          </h2>

          <p className="text-sky-100 text-sm mb-7">
            Contact Aqua Forge today. We'll take care of the bottles, the
            branding, and the website — you focus on growing your business.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-sky-600 hover:bg-sky-50 active:scale-95 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            Get in Touch <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
