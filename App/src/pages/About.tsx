import { motion } from 'framer-motion';
import { Target, Leaf, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    { icon: <Target className="w-6 h-6" />, title: 'Performance First', desc: 'Every product we carry is tested by real athletes in real conditions.' },
    { icon: <Leaf className="w-6 h-6" />, title: 'Sustainability', desc: 'We partner with brands committed to reducing environmental impact.' },
    { icon: <Users className="w-6 h-6" />, title: 'Community', desc: 'We support local clubs, events, and grassroots sports programs.' },
    { icon: <Award className="w-6 h-6" />, title: 'Quality', desc: 'Only premium products that meet our rigorous standards make the cut.' },
  ];

  return (
    <div className="bg-brand-gray bg-texture min-h-[80dvh]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl text-zinc-800">
            Built for the <span className="text-brand-purple">Bold</span>
          </h1>
          <p className="mt-6 text-lg font-mono text-zinc-600 leading-relaxed">
            Suburbia Sports was founded on a simple belief: every athlete deserves access to the best gear. 
            From weekend warriors to Olympians, we are here to power your pursuit of greatness.
          </p>
        </motion.div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-sm uppercase tracking-wider text-brand-purple">Our Story</span>
            <h2 className="font-sans text-2xl md:text-3xl text-zinc-800 mt-3">
              From Garage to Global
            </h2>
            <p className="mt-4 text-zinc-600 font-mono leading-relaxed">
              What started as a small bike shop in Portland, Oregon has grown into a global destination 
              for sports enthusiasts. Alex Trost founded Suburbia in 2019 with a single goal: make 
              premium sports equipment accessible to everyone.
            </p>
            <p className="mt-4 text-zinc-600 font-mono leading-relaxed">
              Today, we curate the world's finest gear across eight categories, from road bikes 
              to climbing harnesses, always staying true to our roots.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-brand-lime text-zinc-800 rounded-xl font-mono text-sm hover:bg-brand-lime/90 transition-colors"
            >
              Shop Our Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-[4/3] rounded-2xl overflow-hidden bg-brand-pink"
          >
            <img
              src="/products/trek-domane.jpg"
              alt="Suburbia Sports"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2 className="font-sans text-3xl md:text-4xl text-zinc-800">Our Values</h2>
            <p className="mt-3 text-zinc-500 font-mono text-sm max-w-lg mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple mb-4">
                  {value.icon}
                </div>
                <h3 className="font-sans text-lg text-zinc-800">{value.title}</h3>
                <p className="mt-2 text-sm font-mono text-zinc-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-navy rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '2019', label: 'Founded' },
              { value: '50K+', label: 'Customers' },
              { value: '200+', label: 'Brand Partners' },
              { value: '8', label: 'Sport Categories' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-sans text-3xl md:text-4xl text-brand-lime">{stat.value}</p>
                <p className="mt-2 text-sm font-mono text-brand-gray/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
