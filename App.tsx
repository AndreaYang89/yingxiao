import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  ShieldAlert, 
  BrainCircuit,
  Lock,
  ChevronRight,
  Menu,
  X,
  Building2, 
  Briefcase, 
  Users, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  Globe2,
  Send, 
  Bot, 
  User, 
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface PersonaCard {
  title: string;
  description: string;
  icon: any;
  highlight: string;
}

interface AssetCategory {
  title: string;
  description: string;
  partners: string[];
}

interface Feature {
  title: string;
  description: string;
  icon: any;
}

enum AIScenarioType {
  HUNTER = 'HUNTER',
  GUARDIAN = 'GUARDIAN',
  EXPERT = 'EXPERT'
}

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

// --- CONSTANTS ---
const HERO_CONTENT = {
  slogan: "Alpha 级资产 × Generative AI：重新定义财富管理生态",
  sub: "Nexus 合作伙伴 AI 操作系统 —— 专为 EAM、家族办公室及顶尖理财师打造的数字化赋能闭环。"
};

const PERSONAS: PersonaCard[] = [
  {
    title: "持牌 EAM 机构",
    description: "解决多托管行数据聚合难题，提供统一视图。",
    highlight: "Omnibus 综合账户支持",
    icon: Building2
  },
  {
    title: "单一/联合家办",
    description: "打破传统渠道壁垒，直通全球顶级私募份额。",
    highlight: "稀缺 PE/VC 独家配额",
    icon: Briefcase
  },
  {
    title: "独立理财师 (IFA)",
    description: "从繁琐的中后台事务中解放，专注于客户关系。",
    highlight: "自动化佣金结算系统",
    icon: Users
  },
  {
    title: "投顾咨询机构",
    description: "合规与投研的双重保障，降低运营风险。",
    highlight: "AI 智能合规风控大脑",
    icon: ShieldCheck
  }
];

const ASSETS: AssetCategory[] = [
  {
    title: "顶级私募股权 (PE/VC)",
    description: "直接接入红杉 (Sequoia)、黑石 (Blackstone) 等旗舰基金的 Institutional Share 份额，不仅限于 Feeder Fund。",
    partners: ["Sequoia", "Blackstone", "KKR"]
  },
  {
    title: "全球宏观对冲基金",
    description: "包括千禧 (Millennium)、桥水 (Bridgewater) 等硬封闭期产品的独家额度。",
    partners: ["Millennium", "Bridgewater", "Two Sigma"]
  },
  {
    title: "定制化结构化票据",
    description: "基于高盛、摩根大通底层的 FCN/Snowball 定制，支持 24 小时询价。",
    partners: ["Goldman Sachs", "J.P. Morgan"]
  },
  {
    title: "稀缺高收益债",
    description: "主要针对新兴市场主权债及全球顶级企业债的场外交易机会。",
    partners: ["PIMCO", "Oaktree"]
  },
  {
    title: "Pre-IPO 独角兽",
    description: "SpaceX, ByteDance 等未上市巨头的早期介入机会，锁定 Alpha 收益。",
    partners: ["SpaceX", "ByteDance"]
  }
];

const TRANSACTION_SUPPORT: Feature[] = [
  {
    title: "全权委托下单 (Discretionary)",
    description: "支持多账户一键调仓与算法交易执行，极大提升交易效率。",
    icon: LineChart
  },
  {
    title: "智能佣金清算 (Clearing)",
    description: "不仅自动计算，更支持多层级分润体系的自动划转与报表生成。",
    icon: Zap
  },
  {
    title: "白标 APP 定制 (White-Label)",
    description: "为您的机构打造专属品牌的客户终端，提升品牌溢价与客户粘性。",
    icon: Globe2
  }
];

// --- GEMINI SERVICE ---
const getApiKey = (): string => {
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env) {
      // @ts-ignore
      return process.env.API_KEY || '';
    }
  } catch (e) {
    console.warn("Could not access process.env");
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const generateExpertResponse = async (userPrompt: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "Demo Mode: API Key missing. Please configure your environment to use the live AI Expert.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the "Nexus AI Expert", a specialized financial AI assistant for the Nexus Wealth Management Operating System. 
        
        Your Tone:
        - Professional, sophisticated, Wall Street rigor meets Silicon Valley innovation.
        - Concise and high-level.
        - Use terms like "Alpha", "Exposure", "Risk-adjusted", "Omnibus", "Family Office".

        Your Goal:
        - Explain how Nexus helps EAMs (External Asset Managers) and Family Offices.
        - If asked about assets, mention we have access to Sequoia, Blackstone, Millennium, etc.
        - If asked about features, mention our "Hunter" (Lead Gen), "Guardian" (Risk/Comms), and "Expert" (Research) modules.
        
        Do not give specific financial advice (e.g., "buy this stock now"). Instead, provide strategic rationale or explain how the Nexus platform facilitates the investment process.`,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I am processing complex market data and cannot respond at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Nexus AI System is currently experiencing high demand. Please try again shortly.";
  }
};

// --- CHAT COMPONENT ---
const AIChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '您好，我是 Nexus 业务专家 (Expert) 智能体。我可以为您解析全球宏观趋势，或协助您筛选适合家办客户的 Alpha 策略。请问有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add User Message
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Call Gemini
    const responseText = await generateExpertResponse(userText);

    // Add Model Message
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto glass-card rounded-2xl overflow-hidden shadow-2xl border-slate-700/50">
      {/* Header */}
      <div className="bg-slate-900/80 p-4 border-b border-slate-700 flex items-center gap-3">
        <div className="p-2 bg-primary-500/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Nexus AI Expert</h3>
          <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'bg-primary-600' : 'bg-slate-600'}`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'model' 
                ? 'bg-slate-800 text-slate-200 rounded-tl-none' 
                : 'bg-primary-600 text-white rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 border-t border-slate-700">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="询问关于 PE 份额或 Nexus 系统功能..."
            className="w-full bg-slate-800 border border-slate-600 rounded-full py-3 px-5 text-slate-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 pr-12 transition-all placeholder-slate-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-500 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [activeAITab, setActiveAITab] = useState<AIScenarioType>(AIScenarioType.HUNTER);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans text-slate-300 selection:bg-primary-500/30 selection:text-primary-200 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b-0 border-b-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center text-slate-950 font-bold">N</div>
              <span className="text-xl font-bold tracking-tight text-slate-100">NEXUS <span className="text-primary-400 font-light">OS</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#empowerment" className="hover:text-primary-400 transition-colors text-sm font-medium">赋能对象</a>
              <a href="#assets" className="hover:text-primary-400 transition-colors text-sm font-medium">稀缺货架</a>
              <a href="#ai" className="hover:text-primary-400 transition-colors text-sm font-medium">AI 大脑</a>
              <button className="bg-slate-100 text-slate-900 hover:bg-white px-5 py-2 rounded-full text-sm font-semibold transition-all transform hover:scale-105">
                申请演示
              </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-300">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-slate-700 p-4 space-y-4 animate-fadeIn">
            <a href="#empowerment" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-400">赋能对象</a>
            <a href="#assets" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-400">稀缺货架</a>
            <a href="#ai" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-400">AI 大脑</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium tracking-wider uppercase text-slate-400">Nexus OS v2.5 Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-slate-100">Alpha 级资产 × </span>
            <span className="gradient-text">Generative AI</span>
            <br />
            <span className="text-slate-100 text-4xl md:text-6xl">重新定义财富管理生态</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-light">
            {HERO_CONTENT.sub}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 group">
              立即接入货架
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass-card text-slate-200 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 transition-all border-slate-700">
              预约系统演示
            </button>
          </div>
        </div>
      </section>

      {/* Empowerment Section (Cards) */}
      <section id="empowerment" className="py-20 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">精准赋能每一类财富管理者</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERSONAS.map((persona, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl hover:border-primary-500/50 transition-all group hover:-translate-y-2">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 text-primary-400 group-hover:text-primary-300 group-hover:bg-primary-900/20 transition-colors">
                  <persona.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{persona.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{persona.description}</p>
                <div className="border-t border-slate-800 pt-4">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wide flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    {persona.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Assets Shelf (Dark/Gold Theme) */}
      <section id="assets" className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-gold-500 font-bold tracking-wider uppercase text-sm mb-2 block">Premium Shelf</span>
              <h2 className="text-4xl font-bold text-slate-50">全球稀缺资产货架</h2>
              <p className="text-slate-400 mt-2">剔除大众品类，聚焦机构级 (Institutional) 独家份额</p>
            </div>
            <button className="text-primary-400 flex items-center gap-2 hover:text-primary-300 transition-colors font-medium">
              查看完整清单 <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ASSETS.map((asset, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-xl hover:bg-slate-800 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-100">{asset.title}</h3>
                  <Lock size={16} className="text-gold-500/70" />
                </div>
                <p className="text-slate-400 text-sm mb-6 h-10">{asset.description}</p>
                <div className="flex flex-wrap gap-2">
                  {asset.partners.map((partner, pIdx) => (
                    <span key={pIdx} className="text-xs bg-slate-950 text-slate-300 px-2 py-1 rounded border border-slate-700">
                      {partner}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary-900/20 to-slate-900 border border-primary-500/30 p-6 rounded-xl flex flex-col justify-center items-center text-center group cursor-pointer hover:border-primary-500 transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all">
                <Target />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">定制资产需求</h3>
              <p className="text-sm text-slate-400">找不到想要的标的？我们的资产团队为您定向寻源。</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section (Interactive) */}
      <section id="ai" className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-500 font-bold tracking-wider uppercase text-sm mb-2 block">Powered by Gemini 2.5</span>
            <h2 className="text-4xl font-bold text-slate-50 mb-4">Nexus AI 投研大脑</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">不仅仅是聊天机器人，更是深植于业务流程的智能中枢。</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Feature Selector */}
            <div className="lg:col-span-5 space-y-6">
              <button 
                onClick={() => setActiveAITab(AIScenarioType.HUNTER)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${activeAITab === AIScenarioType.HUNTER ? 'bg-slate-800 border-primary-500/50 shadow-lg shadow-primary-900/20' : 'bg-transparent border-slate-800 hover:bg-slate-900'}`}
              >
                <div className={`p-3 rounded-lg ${activeAITab === AIScenarioType.HUNTER ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">智能获客 (Hunter)</h3>
                  <p className="text-sm text-slate-400">基于高净值人群画像，自动生成拓客名单与破冰话术，提升转化率。</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveAITab(AIScenarioType.GUARDIAN)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${activeAITab === AIScenarioType.GUARDIAN ? 'bg-slate-800 border-primary-500/50 shadow-lg shadow-primary-900/20' : 'bg-transparent border-slate-800 hover:bg-slate-900'}`}
              >
                <div className={`p-3 rounded-lg ${activeAITab === AIScenarioType.GUARDIAN ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">市场安抚 (Guardian)</h3>
                  <p className="text-sm text-slate-400">市场剧烈波动时，自动生成个性化安抚信与持仓分析报告，稳定客户情绪。</p>
                </div>
              </button>

              <button 
                onClick={() => setActiveAITab(AIScenarioType.EXPERT)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${activeAITab === AIScenarioType.EXPERT ? 'bg-slate-800 border-primary-500/50 shadow-lg shadow-primary-900/20' : 'bg-transparent border-slate-800 hover:bg-slate-900'}`}
              >
                <div className={`p-3 rounded-lg ${activeAITab === AIScenarioType.EXPERT ? 'bg-primary-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-1">业务专家 (Expert)</h3>
                  <p className="text-sm text-slate-400">7x24 小时在线的投委会专家，实时解答复杂税务、架构与标的问题。</p>
                </div>
              </button>
            </div>

            {/* Right Column: Demo Area */}
            <div className="lg:col-span-7">
              {activeAITab === AIScenarioType.EXPERT ? (
                <div className="h-full flex flex-col justify-center">
                   <div className="mb-4 text-center">
                     <span className="inline-block bg-primary-900/30 text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-500/20 animate-pulse">
                       Live Demo: Try chatting with Nexus AI
                     </span>
                   </div>
                   <AIChatDemo />
                </div>
              ) : (
                <div className="h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden">
                   {/* Placeholder for static screenshots/animations of other modes */}
                   <div className="text-center">
                      <div className="w-20 h-20 bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-6">
                        {activeAITab === AIScenarioType.HUNTER ? <Target size={40} className="text-slate-500" /> : <ShieldAlert size={40} className="text-slate-500" />}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-200 mb-2">
                        {activeAITab === AIScenarioType.HUNTER ? "Hunter Mode Dashboard" : "Guardian Mode Alert System"}
                      </h3>
                      <p className="text-slate-500">
                        (Contact Sales to see full dashboard demonstration)
                      </p>
                   </div>
                   {/* Abstract UI Lines */}
                   <div className="absolute top-10 right-10 w-32 h-2 bg-slate-800 rounded-full opacity-50"></div>
                   <div className="absolute top-20 right-10 w-20 h-2 bg-slate-800 rounded-full opacity-50"></div>
                   <div className="absolute bottom-10 left-10 w-48 h-2 bg-slate-800 rounded-full opacity-50"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Support */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRANSACTION_SUPPORT.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 text-gold-500 border border-slate-700">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-200 mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-white">N</div>
            <span className="text-slate-400 font-semibold">Nexus OS</span>
          </div>
          <p className="text-slate-600 text-sm">© 2024 Nexus Financial Technology. All Rights Reserved. Hong Kong | Singapore.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;