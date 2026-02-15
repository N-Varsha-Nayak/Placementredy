import { useEffect, useState } from 'react';
import { BookMarked, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { extractSkills, generateChecklist, generatePlan, generateQuestions, computeReadiness, saveHistory, getHistory, makeId, getHistoryItem } from '../utils/analyzer';

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
    };

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
      setResult(item);
      setSelectedId(id);
      setTab('results');
    }
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
                        <div className="text-sm font-semibold text-gray-700">{h.readinessScore}</div>
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
                        <div className="text-sm font-semibold">{h.readinessScore}</div>
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
                          {(result.extractedSkills[cat] || []).map((s) => (
                            <span key={s} className="text-xs px-2 py-1 bg-gray-100 rounded-md">{s}</span>
                          ))}
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
                  <div className="text-4xl font-bold text-gray-900">{result.readinessScore}</div>
                  <div className="text-sm text-gray-500">Readiness Score</div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Job Description</h5>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-auto p-2 bg-gray-50 rounded-md">{result.jdText}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
