import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  Settings, 
  Maximize2, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Cpu, 
  Flame, 
  ChevronRight, 
  ChevronDown, 
  Copy, 
  Check, 
  Terminal, 
  BookOpen, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  Volume2,
  Code2
} from 'lucide-react';

interface TestCase {
  id: number;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

interface ProblemData {
  id: string;
  title: string;
  track: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  acceptance: string;
  xp: number;
  timeEstimate: string;
  tags: string[];
  description: string;
  constraints: string[];
  examples: TestCase[];
  starterCode: {
    cpp: string;
    python: string;
    javascript: string;
  };
}

const SAMPLE_PROBLEM: ProblemData = {
  id: '4b936e2c-cb8c-45c2-abcd-27e55f71b228',
  title: 'Roll Number Lookup',
  track: 'Binary Search Track',
  difficulty: 'Medium',
  acceptance: '48.6%',
  xp: 100,
  timeEstimate: '25 min',
  tags: ['Binary Search', 'Arrays', 'Two Pointers'],
  description: `Aarav is checking the official school notice board where roll numbers are listed in strictly increasing order. He needs to quickly verify if his friend Rohan's roll number is present on the board.

You are given a 0-indexed integer array \`nums\` of length \`n\` consisting of unique elements sorted in ascending order, and an integer \`target\`.

Find and return the index of \`target\` if it exists in the array. If \`target\` does not exist, return \`-1\`.

Your algorithm must run in **O(log n)** runtime complexity.`,
  constraints: [
    '1 <= nums.length <= 10^5',
    '-10^4 <= nums[i], target <= 10^4',
    'All integers in nums are unique and sorted in strictly ascending order.'
  ],
  examples: [
    {
      id: 1,
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
      expectedOutput: '4',
      explanation: '9 exists in nums and its index is 4.'
    },
    {
      id: 2,
      input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
      expectedOutput: '-1',
      explanation: '2 does not exist in nums so return -1.'
    },
    {
      id: 3,
      input: 'nums = [5], target = 5',
      expectedOutput: '0',
      explanation: 'Single element match at index 0.'
    }
  ],
  starterCode: {
    cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
    python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
                
        return -1`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
};`
  }
};

interface CompilerViewProps {
  onBackToDirectory?: () => void;
}

export const CompilerView: React.FC<CompilerViewProps> = ({ onBackToDirectory }) => {
  const [selectedLang, setSelectedLang] = useState<'cpp' | 'python' | 'javascript'>('python');
  const [code, setCode] = useState(SAMPLE_PROBLEM.starterCode.python);
  const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'mentor' | 'notes'>('description');
  const [activeBottomTab, setActiveBottomTab] = useState<'testcases' | 'output' | 'verdict'>('testcases');
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [notes, setNotes] = useState(`The idea: Classical binary search with mid calculation.
Edge cases: Target not present, single element array, target at boundary (0 or n-1).
Complexity: Time O(log n), Space O(1).`);

  // Timer simulation
  const [timerSeconds, setTimerSeconds] = useState(142);
  const [timerRunning, setTimerRunning] = useState(true);

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<{
    status: 'Accepted' | 'Wrong Answer' | 'Error';
    runtime: string;
    memory: string;
    stdout: string;
    outputs: { caseId: number; passed: boolean; actual: string }[];
  } | null>(null);

  const [verdictResult, setVerdictResult] = useState<{
    status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
    runtime: string;
    runtimePercentile: string;
    memory: string;
    memoryPercentile: string;
    xpEarned: number;
    testCasesPassed: string;
  } | null>(null);

  // Mentor Chat simulation
  const [mentorMessages, setMentorMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "👋 Hi! I'm your CodeHurdle AI Algorithmic Mentor. I can walk you through the optimal invariant, provide subtle hints without spoiling the solution, or review your time complexity.",
      time: '12:00'
    }
  ]);
  const [mentorInput, setMentorInput] = useState('');

  // Handle timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => setTimerSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLanguageChange = (lang: 'cpp' | 'python' | 'javascript') => {
    setSelectedLang(lang);
    setCode(SAMPLE_PROBLEM.starterCode[lang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveBottomTab('output');
    setTimeout(() => {
      setIsRunning(false);
      setRunResult({
        status: 'Accepted',
        runtime: '28ms',
        memory: '17.4 MB',
        stdout: `Running against ${SAMPLE_PROBLEM.examples.length} test cases...\nTest 1: OK [target=9, index=4]\nTest 2: OK [target=2, index=-1]\nTest 3: OK [target=5, index=0]\nAll sample testcases passed without discrepancies.`,
        outputs: [
          { caseId: 1, passed: true, actual: '4' },
          { caseId: 2, passed: true, actual: '-1' },
          { caseId: 3, passed: true, actual: '0' }
        ]
      });
    }, 650);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    setActiveBottomTab('verdict');
    setTimeout(() => {
      setIsSubmitting(false);
      setVerdictResult({
        status: 'Accepted',
        runtime: '32 ms',
        runtimePercentile: '96.4%',
        memory: '18.1 MB',
        memoryPercentile: '89.2%',
        xpEarned: 100,
        testCasesPassed: '48 / 48'
      });
    }, 950);
  };

  const handleSendMentor = (queryText?: string) => {
    const textToSend = queryText || mentorInput;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'user' as const, text: textToSend, time: 'Just now' };
    setMentorMessages(prev => [...prev, userMsg]);
    if (!queryText) setMentorInput('');

    setTimeout(() => {
      let reply = "Remember to prevent integer overflow in languages like C++ when computing the midpoint using `mid = left + (right - left) / 2`. In Python, integers have arbitrary precision, but keeping this invariant ensures clean O(log n) convergence.";
      if (textToSend.toLowerCase().includes('hint') || textToSend.toLowerCase().includes('approach')) {
        reply = "Consider the array as two halves split at `mid`. Since the array is strictly increasing, comparing `nums[mid]` with `target` immediately cuts the search space in half. If `nums[mid] < target`, the answer must lie strictly to the right (`left = mid + 1`).";
      } else if (textToSend.toLowerCase().includes('optimize')) {
        reply = "Your current implementation is already the theoretical lower bound of O(log n) time and O(1) auxiliary space! No further asymptotical optimization is possible for a comparison-based search.";
      }
      setMentorMessages(prev => [...prev, { sender: 'ai' as const, text: reply, time: 'Just now' }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-zinc-100 flex flex-col font-sans">
      {/* Top Navigation & Session Bar */}
      <header className="h-14 border-b border-zinc-800/80 bg-[#0b0e14] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {onBackToDirectory && (
            <button 
              onClick={onBackToDirectory}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {SAMPLE_PROBLEM.track}
            </span>
            <span className="text-zinc-600">/</span>
            <h1 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              <span>{SAMPLE_PROBLEM.title}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                {SAMPLE_PROBLEM.difficulty}
              </span>
            </h1>
          </div>
        </div>

        {/* Center: Live Session Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Session:</span>
            <span className="font-semibold text-emerald-400">{formatTimer(timerSeconds)}</span>
            <button 
              onClick={() => setTimerRunning(!timerRunning)}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 underline ml-1"
            >
              {timerRunning ? 'Pause' : 'Resume'}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs text-zinc-400">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>+100 XP upon completion</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 active:scale-95 rounded-lg border border-zinc-700/80 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 text-emerald-400 fill-emerald-400 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>

          <button 
            onClick={handleSubmitCode}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 active:scale-95 rounded-lg shadow-sm shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Statement & Right Code/Terminal */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left Panel: Description / AI Mentor / Notes (Col 1-5) */}
        <div className="lg:col-span-5 border-r border-zinc-800/80 flex flex-col bg-[#0b0e14] min-h-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 px-3 bg-zinc-950/40">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveLeftTab('description')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeLeftTab === 'description'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Description</span>
              </button>

              <button
                onClick={() => setActiveLeftTab('mentor')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeLeftTab === 'mentor'
                    ? 'border-purple-400 text-purple-300'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Mentor</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              </button>

              <button
                onClick={() => setActiveLeftTab('notes')}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                  activeLeftTab === 'notes'
                    ? 'border-amber-400 text-amber-300'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Notes</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-zinc-500">
              <button title="Bookmark Problem" className="p-1 hover:text-zinc-300 transition-colors">
                <Bookmark className="w-3.5 h-3.5" />
              </button>
              <button title="Share Problem" className="p-1 hover:text-zinc-300 transition-colors">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-5 text-sm space-y-5 custom-scrollbar">
            {activeLeftTab === 'description' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{SAMPLE_PROBLEM.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                    <span className="px-2 py-0.5 rounded font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {SAMPLE_PROBLEM.difficulty}
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-400">Acceptance: <span className="text-zinc-200 font-mono">{SAMPLE_PROBLEM.acceptance}</span></span>
                    <span className="text-zinc-500">|</span>
                    <span className="text-zinc-400">Est. Time: <span className="text-zinc-200 font-mono">{SAMPLE_PROBLEM.timeEstimate}</span></span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {SAMPLE_PROBLEM.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        #{tag.toLowerCase().replace(/\s+/g, '-')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement Prose */}
                <div className="prose prose-invert prose-sm text-zinc-300 space-y-3 leading-relaxed">
                  <p>
                    Aarav is checking the official school notice board where roll numbers are listed in strictly increasing order. He needs to quickly verify if his friend Rohan's roll number is present on the board.
                  </p>
                  <p>
                    You are given a 0-indexed integer array <code className="text-emerald-300 bg-zinc-900 px-1 py-0.5 rounded">nums</code> of length <code className="text-emerald-300 bg-zinc-900 px-1 py-0.5 rounded">n</code> consisting of unique elements sorted in ascending order, and an integer <code className="text-emerald-300 bg-zinc-900 px-1 py-0.5 rounded">target</code>.
                  </p>
                  <p>
                    Find and return the index of <code className="text-emerald-300 bg-zinc-900 px-1 py-0.5 rounded">target</code> if it exists in the array. If <code className="text-emerald-300 bg-zinc-900 px-1 py-0.5 rounded">target</code> does not exist, return <code className="text-red-300 bg-zinc-900 px-1 py-0.5 rounded">-1</code>.
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                    <strong>Algorithmic Requirement:</strong> Your solution must run in <strong>O(log n)</strong> time complexity and O(1) auxiliary space.
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Examples</h3>
                  {SAMPLE_PROBLEM.examples.map((ex, idx) => (
                    <div key={ex.id} className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                      <div className="text-xs font-medium text-zinc-300">Example {idx + 1}:</div>
                      <div className="font-mono text-xs space-y-1">
                        <div>
                          <span className="text-zinc-500">Input: </span>
                          <span className="text-zinc-200">{ex.input}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500">Output: </span>
                          <span className="text-emerald-400">{ex.expectedOutput}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-zinc-400 text-[11px] pt-1 border-t border-zinc-800/60">
                            <span className="text-zinc-500">Explanation: </span>{ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2 pb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs font-mono text-zinc-400">
                    {SAMPLE_PROBLEM.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeLeftTab === 'mentor' && (
              <div className="h-full flex flex-col justify-between space-y-4">
                {/* Chat History */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {mentorMessages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-none'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-bl-none'
                        }`}
                      >
                        {msg.sender === 'ai' && (
                          <div className="flex items-center gap-1.5 text-purple-400 font-medium mb-1 text-[11px]">
                            <Sparkles className="w-3 h-3" />
                            <span>CodeHurdle AI Mentor</span>
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-zinc-600 mt-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <div className="text-[11px] font-medium text-zinc-400">Suggested Inquiries:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <button 
                      onClick={() => handleSendMentor("Explain approach without writing the full code")}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      💡 Explain approach
                    </button>
                    <button 
                      onClick={() => handleSendMentor("Give me a subtle hint on boundary conditions")}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      🔍 Debug hint
                    </button>
                    <button 
                      onClick={() => handleSendMentor("Can I optimize the space complexity further?")}
                      className="text-xs px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
                    >
                      ⚡ Check complexity
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="text" 
                      value={mentorInput}
                      onChange={e => setMentorInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendMentor()}
                      placeholder="Ask the AI mentor for guidance..."
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50"
                    />
                    <button 
                      onClick={() => handleSendMentor()}
                      className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeLeftTab === 'notes' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="text-xs text-zinc-400">
                  Auto-saved scratchpad for your thoughts, edge cases, and algorithmic complexity:
                </div>
                <textarea 
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="flex-1 w-full bg-zinc-900/60 border border-zinc-800/80 rounded-lg p-3 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500/40 resize-none leading-relaxed"
                  placeholder="Note down invariants, edge case values, and time/space notes..."
                />
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Saved locally to this problem</span>
                  <span className="font-mono">{notes.length} characters</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Code Editor (Top) & Testbed/Terminal (Bottom) (Col 6-12) */}
        <div className="lg:col-span-7 flex flex-col min-h-0 overflow-hidden bg-[#07090e]">
          {/* Editor Header */}
          <div className="h-10 border-b border-zinc-800/80 px-4 bg-zinc-950/60 flex items-center justify-between shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <div className="flex items-center gap-1">
                {(['python', 'cpp', 'javascript'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                      selectedLang === lang
                        ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {lang === 'python' ? 'Python 3' : lang === 'cpp' ? 'C++ 17' : 'JavaScript'}
                  </button>
                ))}
              </div>
            </div>

            {/* Utility Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCode(SAMPLE_PROBLEM.starterCode[selectedLang])}
                title="Reset to starter code"
                className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-900 rounded border border-zinc-800 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <button 
                title="Format Code"
                className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Code Area */}
          <div className="flex-1 relative min-h-[300px] bg-[#07090e] p-4 font-mono text-xs overflow-auto">
            {/* Line numbers + Textarea */}
            <div className="flex gap-3 h-full">
              <div className="select-none text-zinc-600 text-right pr-2 border-r border-zinc-800/50 font-mono space-y-1">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="leading-5 text-[11px]">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 w-full bg-transparent text-emerald-300/90 font-mono text-xs leading-5 focus:outline-none resize-none selection:bg-emerald-500/30 selection:text-white"
              />
            </div>
          </div>

          {/* Bottom Execution & Test Cases Drawer */}
          <div className="h-64 border-t border-zinc-800/80 bg-[#0a0d14] flex flex-col shrink-0">
            {/* Drawer Tabs */}
            <div className="h-9 border-b border-zinc-800/80 px-3 bg-zinc-950/40 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveBottomTab('testcases')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                    activeBottomTab === 'testcases'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Test Cases ({SAMPLE_PROBLEM.examples.length})</span>
                </button>

                <button
                  onClick={() => setActiveBottomTab('output')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                    activeBottomTab === 'output'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Output / Console</span>
                  {runResult && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  )}
                </button>

                <button
                  onClick={() => setActiveBottomTab('verdict')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                    activeBottomTab === 'verdict'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Submission Verdict</span>
                </button>
              </div>

              {/* Status info */}
              <div className="text-[11px] text-zinc-500 font-mono">
                Environment: GCC 11 / Python 3.11 / Node 20
              </div>
            </div>

            {/* Bottom Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar">
              {activeBottomTab === 'testcases' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {SAMPLE_PROBLEM.examples.map((ex, i) => (
                      <button
                        key={ex.id}
                        onClick={() => {
                          setSelectedTestCase(i);
                          setIsCustomMode(false);
                        }}
                        className={`px-3 py-1 rounded text-xs transition-colors ${
                          !isCustomMode && selectedTestCase === i
                            ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                            : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                        }`}
                      >
                        Case {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsCustomMode(true)}
                      className={`px-3 py-1 rounded text-xs transition-colors ${
                        isCustomMode
                          ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                          : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      + Custom Test Case
                    </button>
                  </div>

                  {!isCustomMode ? (
                    <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
                      <div>
                        <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Input:</div>
                        <div className="text-zinc-200 bg-zinc-950 p-2 rounded border border-zinc-800/80">
                          {SAMPLE_PROBLEM.examples[selectedTestCase].input}
                        </div>
                      </div>
                      <div>
                        <div className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Expected Output:</div>
                        <div className="text-emerald-400 bg-zinc-950 p-2 rounded border border-zinc-800/80">
                          {SAMPLE_PROBLEM.examples[selectedTestCase].expectedOutput}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] text-zinc-400">Enter custom array and target value:</div>
                      <textarea
                        value={customInput}
                        onChange={e => setCustomInput(e.target.value)}
                        placeholder="nums = [1, 3, 5, 7, 9, 11]&#10;target = 7"
                        className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === 'output' && (
                <div className="space-y-3">
                  {runResult ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{runResult.status}</span>
                        </span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-400">Runtime: <span className="text-zinc-200">{runResult.runtime}</span></span>
                        <span className="text-zinc-500">|</span>
                        <span className="text-zinc-400">Memory: <span className="text-zinc-200">{runResult.memory}</span></span>
                      </div>

                      <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                        {runResult.stdout}
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {runResult.outputs.map((out, idx) => (
                          <div key={idx} className="p-2 rounded bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                            <span className="text-zinc-400">Case {out.caseId}</span>
                            <span className="text-emerald-400 font-semibold flex items-center gap-1">
                              <Check className="w-3 h-3" /> Passed
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2 py-8">
                      <Play className="w-6 h-6 text-zinc-600" />
                      <p>Click "Run Code" above to execute your solution against sample testcases.</p>
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === 'verdict' && (
                <div>
                  {verdictResult ? (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          <div>
                            <div className="text-base font-bold text-emerald-400">Accepted!</div>
                            <div className="text-xs text-zinc-400 font-sans">All {verdictResult.testCasesPassed} testcases passed successfully.</div>
                          </div>
                        </div>

                        <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1 font-sans">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>+{verdictResult.xpEarned} XP</span>
                        </div>
                      </div>

                      {/* Runtime & Memory Telemetry */}
                      <div className="grid grid-cols-2 gap-3 pt-2 font-sans">
                        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                          <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                            <span>Runtime Speed</span>
                            <span className="text-emerald-400 font-mono font-bold">{verdictResult.runtime}</span>
                          </div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-400 h-full rounded-full" style={{ width: verdictResult.runtimePercentile }}></div>
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-1">
                            Beats <strong className="text-zinc-200">{verdictResult.runtimePercentile}</strong> of all submissions
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                          <div className="text-xs text-zinc-400 mb-1 flex items-center justify-between">
                            <span>Memory Footprint</span>
                            <span className="text-cyan-400 font-mono font-bold">{verdictResult.memory}</span>
                          </div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-cyan-400 h-full rounded-full" style={{ width: verdictResult.memoryPercentile }}></div>
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-1">
                            Beats <strong className="text-zinc-200">{verdictResult.memoryPercentile}</strong> of all submissions
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2 py-8">
                      <Send className="w-6 h-6 text-zinc-600" />
                      <p>Hit "Submit" to run the full official test suite against your solution.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
