import React from 'react';
import DottedOrb from './orb/DottedOrb';
import { Mic, Eye, MessageSquareQuote, Gauge, ArrowRight } from 'lucide-react';

const features = [
  { icon: Eye, label: 'Eye contact', text: 'See how naturally you connect with your audience.' },
  { icon: MessageSquareQuote, label: 'Filler words', text: 'Spot the ums and likes, gently.' },
  { icon: Gauge, label: 'Speaking pace', text: 'Find a pace that feels easy to follow.' },
];
const steps = ['Record', 'Analyze', 'Improve'];

function Landing({ onStart }) {
  return (
    <section className="landing fade-in">
      <span className="amb amb-a"><DottedOrb size={46} speed={0.6} /></span>
      <span className="amb amb-b"><DottedOrb size={30} speed={1.4} /></span>
      <span className="amb amb-c"><DottedOrb size={38} speed={0.9} /></span>
      <div className="landing-orb"><DottedOrb size={150} speed={0.8} glow="var(--cy)" /></div>
      <span className="landing-kicker">Hi, I'm your speaking coach</span>
      <h2 className="landing-title">
        Speak with <span className="pill">clarity</span>.<br />
        Be <span className="pill">heard</span>.
      </h2>
      <p className="landing-sub">
        Say a few words, at your own pace. I'll listen and share kind, honest feedback on your eye contact, filler words and pace. No judgement, just a little help getting better.
      </p>
      <button type="button" className="landing-cta" onClick={onStart}>
        <Mic size={18} /> Let's begin <ArrowRight size={18} />
      </button>
      <span className="landing-hint">Takes about a minute. I'll ask for your camera and mic.</span>
      <div className="landing-features">
        {features.map(({ icon: Icon, label, text }) => (
          <div className="landing-feature" key={label}>
            <Icon size={18} />
            <b>{label}</b>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <ol className="landing-steps">
        {steps.map((s, i) => (
          <li key={s}><em>0{i + 1}</em> {s}</li>
        ))}
      </ol>
    </section>
  );
}

export default Landing;
