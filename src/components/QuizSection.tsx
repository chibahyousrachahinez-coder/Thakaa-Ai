import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { QUIZ_QUESTIONS, INITIAL_TOOLS } from '../data/thakaaData';
import { Tool } from '../types';
import { Storage } from '../utils/storage';
import { ToolLogo } from './ToolLogo';

export const QuizSection: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [resultTools, setResultTools] = useState<{ topPick: Tool | null; alternatives: Tool[] }>({
    topPick: null,
    alternatives: []
  });

  const handleAnswer = (value: string) => {
    const q = QUIZ_QUESTIONS[step];
    const newAnswers = { ...answers, [q.question]: value };
    setAnswers(newAnswers);

    if (step + 1 >= QUIZ_QUESTIONS.length) {
      calculateResult(newAnswers);
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const calculateResult = (ans: Record<string, string>) => {
    const category = ans["What primary task are you solving?"];
    const budget = ans["What is your pricing requirement?"];
    const arabic = ans["Do you require regional language support?"];

    let recommended = INITIAL_TOOLS.filter(t => {
      const catMatch = t.category === category;
      const budgetMatch = budget === 'free' ? t.pricing === 'free' : 
                         budget === 'freemium' ? t.pricing !== 'paid' : true;
      const arabicMatch = arabic === 'arabic' ? t.arabic !== 'no' : true;
      return catMatch && budgetMatch && arabicMatch;
    });

    if (recommended.length === 0) {
      recommended = INITIAL_TOOLS.filter(t => t.category === category).slice(0, 3);
    }
    if (recommended.length === 0) {
      recommended = INITIAL_TOOLS.slice(0, 3);
    }

    setResultTools({
      topPick: recommended[0] || INITIAL_TOOLS[0],
      alternatives: recommended.slice(1, 3)
    });
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setResultTools({ topPick: null, alternatives: [] });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).Thakaa = (window as any).Thakaa || {};
      (window as any).Thakaa.answerQuiz = (val: string) => handleAnswer(val);
      (window as any).Thakaa.restartQuiz = () => handleRestart();
    }
  }, [step, answers]);

  const currentQ = step < QUIZ_QUESTIONS.length ? QUIZ_QUESTIONS[step] : null;

  return (
    <section className="quiz-section" id="quizSection">
      <div className="container">
        <div className="quiz-container">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Interactive Tool Finder</h2>
          </div>
          <p>Answer 5 quick requirements to identify the optimal AI application</p>
          
          <div className="quiz-progress" id="quizProgress">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div key={i} className={`dot ${i <= step ? 'active' : ''}`} />
            ))}
          </div>

          <div id="quizContent">
            {currentQ ? (
              <>
                <div className="quiz-question">{currentQ.question}</div>
                <div className="quiz-options">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      className="quiz-option"
                      onClick={() => handleAnswer(opt.value)}
                    >
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="quiz-result active">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>Recommended Match</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Based on your requirements, the following software matches your criteria:
                </p>

                {resultTools.topPick && (
                  <div className="quiz-result-tool">
                    <ToolLogo name={resultTools.topPick.name} domain={resultTools.topPick.domain} size={56} className="mx-auto mb-3" />
                    <h3>{resultTools.topPick.name}</h3>
                    <p>{resultTools.topPick.desc}</p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
                      <a
                        href={resultTools.topPick.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="btn btn-primary"
                        onClick={() => {
                          Storage.push('affiliateClicks', {
                            toolId: resultTools.topPick?.id,
                            url: resultTools.topPick?.url,
                            timestamp: new Date().toISOString(),
                            source: 'quiz-result'
                          });
                        }}
                      >
                        Visit {resultTools.topPick.name} <ArrowUpRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                )}

                {resultTools.alternatives.length > 0 && (
                  <div style={{ marginTop: '24px' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      Secondary Alternatives:
                    </div>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {resultTools.alternatives.map((t) => (
                        <div key={t.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', minWidth: '160px', textAlign: 'center' }}>
                          <ToolLogo name={t.name} domain={t.domain} size={32} className="mx-auto mb-2" />
                          <div style={{ fontWeight: 700 }}>{t.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="quiz-restart inline-flex items-center gap-1.5" onClick={handleRestart} style={{ marginTop: '24px' }}>
                  <RotateCcw className="w-4 h-4 text-secondary" /> Retake Assessment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
