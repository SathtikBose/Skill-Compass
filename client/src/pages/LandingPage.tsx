import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, CheckCircle2, Compass, FileUp, Sparkles } from 'lucide-react';
import ThemeToggle from '../components/layout/ThemeToggle';
import heroImage from '../assets/hero.png';

const features = [
  {
    icon: <FileUp className="h-5 w-5" />,
    title: 'Resume intelligence',
    description: 'Upload a resume and let the system extract skills, strengths, and blind spots.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Readiness scoring',
    description: 'Track market fit, drift, and decay scores in one calm dashboard.',
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'AI career coach',
    description: 'Turn gaps into a focused learning roadmap for the role you want next.',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page min-h-screen overflow-hidden relative">
      <div className="gradient-bg"></div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="brand-link flex items-center gap-2 text-base font-bold">
          <Compass className="h-5 w-5 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Skill Compass
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="secondary-action hidden rounded-xl px-4 py-2 text-sm font-semibold sm:inline-flex">
            Sign in
          </Link>
          <Link to="/register" className="btn-gradient inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white">
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-6xl items-center gap-6 px-5 pb-8 pt-3 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              AI-powered skill direction
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Skill Compass
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 sm:text-base">
              Find the fastest path from your current skill set to the role you are aiming for. Analyze your resume,
              map missing skills, and build a roadmap that stays aligned with the market.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="btn-gradient inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white">
                Start your analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="secondary-action inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold">
                I already have an account
              </Link>
            </div>

            <div className="mt-6 grid gap-2.5 text-xs sm:grid-cols-3">
              {['Resume parsing', 'Gap reports', 'Learning roadmap'].map((item) => (
                <div key={item} className="proof-pill flex items-center gap-2 rounded-lg px-3 py-2 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-visual relative min-h-[280px] overflow-hidden rounded-2xl border lg:min-h-[330px]"
          >
            <img src={heroImage} alt="Skill Compass dashboard preview" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 hero-visual-overlay"></div>
            <div className="absolute bottom-3 left-3 right-3 grid gap-2.5 sm:grid-cols-3">
              {[
                ['87', 'Readiness'],
                ['12', 'Skill gaps'],
                ['4', 'Next steps'],
              ].map(([value, label]) => (
                <div key={label} className="metric-card rounded-xl p-3">
                  <div className="text-xl font-bold">{value}</div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em]">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="relative mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
          <div className="grid gap-3 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card feature-card rounded-2xl p-4">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                  {feature.icon}
                </div>
                <h2 className="text-base font-bold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
