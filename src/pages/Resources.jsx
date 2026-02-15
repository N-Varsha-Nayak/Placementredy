import { useEffect, useState } from 'react';
import { BookMarked, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { extractSkills, generateChecklist, generatePlan, generateQuestions, computeReadiness, saveHistory, getHistory, makeId, getHistoryItem, updateHistoryEntry } from '../utils/analyzer';

export default function ResourcesPage() {
  const [tab, setTab] = useState('analyze'); // analyze | history | results
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jdText, setJdText] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleAnalyze() {
    const skills = extractSkills(jdText || '');
    const checklist = generateChecklist(skills);
    const plan = generatePlan(skills);
    const questions = generateQuestions(skills);
    const readinessScore = computeReadiness(skills, company, role, jdText);
    // flatten skills and initialize confidence map (default: 'practice')
    const allSkills = Object.values(skills).flat();
    const skillConfidenceMap = {};
    allSkills.forEach((s) => { skillConfidenceMap[s] = 'practice'; });

    const entry = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      company: company || '',
      role: role || '',
      jdText: jdText || '',
      extractedSkills: skills,
      plan,
      checklist,
      questions,
      readinessScore,
      skillConfidenceMap,
    };

    entry.lastComputedScore = computeLiveScore(entry);

    saveHistory(entry);
    const updated = getHistory();
    setHistory(updated);
    setResult(entry);
    setSelectedId(entry.id);
    setTab('results');
  }

  function openHistoryItem(id) {
    const item = getHistoryItem(id);
    if (item) {
      // ensure skillConfidenceMap exists
      const allSkills = Object.values(item.extractedSkills || {}).flat();
      item.skillConfidenceMap = item.skillConfidenceMap || {};
      allSkills.forEach((s) => { if (!item.skillConfidenceMap[s]) item.skillConfidenceMap[s] = 'practice'; });
      item.lastComputedScore = computeLiveScore(item);
      setResult({ ...item });
      setSelectedId(id);
      setTab('results');
    }
  }

  function getAllSkillsFromResult(res) {
    return Object.values(res.extractedSkills || {}).flat();
  }

  function computeLiveScore(res) {
    if (!res) return 0;
    const base = res.readinessScore || 0;
    const map = res.skillConfidenceMap || {};
    let adj = 0;
    Object.keys(map).forEach((skill) => {
      if (map[skill] === 'know') adj += 2;
      else if (map[skill] === 'practice') adj -= 2;
    });
    const val = Math.max(0, Math.min(100, base + adj));
    return val;
  }

  async function updateSkillConfidence(skill, value) {
    if (!result) return;
    const updated = { ...result, skillConfidenceMap: { ...(result.skillConfidenceMap || {}) } };
    updated.skillConfidenceMap[skill] = value;
    // recompute readiness
    // Note: store the live-adjusted score separately for display, but persist the base readinessScore unchanged. We'll also store lastComputedScore
    updated.lastComputedScore = computeLiveScore(updated);
    // persist
    updateHistoryEntry(updated);
    setHistory(getHistory());
    setResult(updated);
  }

  function exportPlainPlan(res) {
    const lines = [];
    lines.push(`7-Day Plan for ${res.role || ''} @ ${res.company || ''}`);
    lines.push('');
    res.plan.forEach((d) => {
      lines.push(`Day ${d.day}: ${d.title}`);
      d.tasks.forEach((t) => lines.push(` - ${t}`));
      lines.push('');
    });
    return lines.join('\n');
  }

  function exportChecklist(res) {
    const lines = [];
    lines.push(`Preparation Checklist for ${res.role || ''} @ ${res.company || ''}`);
    lines.push('');
    res.checklist.forEach((r) => {
      lines.push(r.name);
      r.items.forEach((it) => lines.push(` - ${it}`));
      lines.push('');
    });
    return lines.join('\n');
  }

  function exportQuestions(res) {
    const lines = [];
    lines.push(`Top Interview Questions for ${res.role || ''} @ ${res.company || ''}`);
    lines.push('');
    res.questions.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
    return lines.join('\n');
  }

  function downloadTXT(res) {
    const chunks = [];
    chunks.push(exportPlainPlan(res));
    chunks.push('\n-- Checklist --\n');
    chunks.push(exportChecklist(res));
    chunks.push('\n-- Questions --\n');
    chunks.push(exportQuestions(res));
    const blob = new Blob(chunks, { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(res.company || 'analysis')}-${(res.role || 'results')}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard(text) {
    try { await navigator.clipboard.writeText(text); }
    catch (e) { console.warn('Clipboard copy failed', e); }
  }

  return (
    <div className="app-container py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Resources & Analysis</h1>
          <p className="text-sm text-gray-600">Analyze job descriptions, get tailored plans, and save your history locally.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-2 rounded-md text-sm ${tab === 'analyze' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`} onClick={() => setTab('analyze')}>Analyze</button>
          <button className={`px-3 py-2 rounded-md text-sm ${tab === 'history' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}`} onClick={() => setTab('history')}>History</button>
        </div>
      </div>

      {tab === 'analyze' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Description Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" className="w-full border border-gray-200 rounded-md px-3 py-2" />
                  <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role (optional)" className="w-full border border-gray-200 rounded-md px-3 py-2" />
                  <textarea value={jdText} onChange={(e) => setJdText(e.target.value)} rows={12} placeholder="Paste job description here..." className="w-full border border-gray-200 rounded-md p-3 font-mono text-sm" />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => { setCompany(''); setRole(''); setJdText(''); }} className="px-4 py-2 border border-gray-200 rounded-md">Clear</button>
                  <button onClick={handleAnalyze} className="px-4 py-2 rounded-md bg-purple-600 text-white">Analyze</button>
                </div>
              </CardFooter>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>Paste full JD for better results (include responsibilities & tech stack).</li>
                    <li>You can save multiple analyses and revisit them from History.</li>
                    <li>No external APIs are used — everything is local and offline.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sample JD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">Frontend Engineer experienced with React, TypeScript, Node.js. Strong SQL skills and familiarity with AWS. Build user interfaces and APIs.</p>
                  <div className="mt-4 text-sm text-gray-600">Click Analyze to try the sample.</div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-end">
                    <button onClick={() => { setCompany('Acme Corp'); setRole('Frontend Engineer'); setJdText('Frontend Engineer experienced with React, TypeScript, Node.js. Strong SQL skills and familiarity with AWS. Build user interfaces and APIs.'); }} className="px-3 py-2 rounded-md border border-gray-200">Load Sample</button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 && <div className="text-sm text-gray-600">No analyses yet. Your saved analyses will appear here.</div>}
                <ul className="space-y-3">
                  {history.slice(0,6).map((h) => (
                    <li key={h.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{h.company || '—'} • {h.role || '—'}</div>
                        <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-gray-700">{h.lastComputedScore ?? h.readinessScore}</div>
                        <button onClick={() => openHistoryItem(h.id)} className="px-3 py-1 border border-gray-200 rounded-md text-sm">View</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === 'history' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                {history.length === 0 && <div className="text-sm text-gray-600">No saved analyses yet.</div>}
                <ul className="divide-y divide-gray-100">
                  {history.map((h) => (
                    <li key={h.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{h.company || '—'} • {h.role || '—'}</div>
                        <div className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold">{h.lastComputedScore ?? h.readinessScore}</div>
                        <button onClick={() => openHistoryItem(h.id)} className="px-3 py-1 border border-gray-200 rounded-md text-sm">Open</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">Select an analysis to see full results.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {tab === 'results' && result && (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{result.role || '—'}</h3>
                    <div className="text-sm text-gray-500">{result.company || '—'} • {new Date(result.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <section className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Detected Skills</h4>
                  <div className="space-y-2">
                    {Object.keys(result.extractedSkills).map((cat) => (
                      <div key={cat}>
                        <div className="text-xs text-gray-500 uppercase mb-1">{cat}</div>
                        <div className="flex flex-wrap gap-2">
                          {(result.extractedSkills[cat] || []).map((s) => {
                            const current = (result.skillConfidenceMap && result.skillConfidenceMap[s]) || 'practice';
                            return (
                              <div key={s} className="flex items-center gap-2">
                                <div className="text-xs px-2 py-1 bg-gray-100 rounded-md">{s}</div>
                                <div className="flex items-center rounded-md overflow-hidden border border-gray-200">
                                  <button
                                    onClick={() => updateSkillConfidence(s, 'know')}
                                    className={`px-2 py-1 text-xs ${current === 'know' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                                  >
                                    I know
                                  </button>
                                  <button
                                    onClick={() => updateSkillConfidence(s, 'practice')}
                                    className={`px-2 py-1 text-xs ${current === 'practice' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-700'}`}
                                  >
                                    Need practice
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Preparation Checklist</h4>
                  <div className="space-y-4">
                    {result.checklist.map((r) => (
                      <div key={r.name}>
                        <div className="text-sm font-medium mb-2">{r.name}</div>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {r.items.map((it, idx) => <li key={idx}>{it}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold mb-2">7-Day Plan</h4>
                  <div className="grid gap-3">
                    {result.plan.map((d) => (
                      <div key={d.day} className="p-3 border border-gray-100 rounded-md">
                        <div className="text-sm font-semibold">Day {d.day}: {d.title}</div>
                        <div className="text-sm text-gray-700 mt-1">{d.tasks.join(' • ')}</div>
                      </div>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 10 Interview Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal pl-5 text-sm space-y-2">
                    {result.questions.map((q, i) => <li key={i}>{q}</li>)}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Score & JD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{result.lastComputedScore ?? computeLiveScore(result)}</div>
                  <div className="text-sm text-gray-500">Readiness Score (live)</div>
                </div>

                <div className="mt-4 space-y-3">
                  <h5 className="text-sm font-medium mb-2">Job Description</h5>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-auto p-2 bg-gray-50 rounded-md">{result.jdText}</div>

                  <div className="mt-3 flex flex-col gap-2">
                    <button onClick={() => copyToClipboard(exportPlainPlan(result))} className="px-3 py-2 rounded-md border border-gray-200 text-sm">Copy 7-day plan</button>
                    <button onClick={() => copyToClipboard(exportChecklist(result))} className="px-3 py-2 rounded-md border border-gray-200 text-sm">Copy round checklist</button>
                    <button onClick={() => copyToClipboard(exportQuestions(result))} className="px-3 py-2 rounded-md border border-gray-200 text-sm">Copy 10 questions</button>
                    <button onClick={() => downloadTXT(result)} className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm">Download as TXT</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Next box - bottom of results */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Next</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-gray-600 mb-3">Top weak skills (marking for practice)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(() => {
                    const map = result.skillConfidenceMap || {};
                    const weak = Object.keys(map).filter(k => map[k] === 'practice').slice(0,3);
                    if (weak.length === 0) return <div className="text-sm text-gray-600">None — great!</div>;
                    return weak.map(s => <span key={s} className="px-2 py-1 bg-gray-100 rounded-md text-sm">{s}</span>);
                  })()}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">Suggested next action:</div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => { const day1 = result.plan?.find(p=>p.day===1); if(day1) { copyToClipboard(`Day 1: ${day1.title}\n${day1.tasks.join('\n')}`); alert('Day 1 plan copied to clipboard'); } }} className="px-4 py-2 bg-purple-600 text-white rounded-md">Start Day 1 plan now</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </>
      )}
    </div>
  );
}
