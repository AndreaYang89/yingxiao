import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  ShieldAlert, 
  BrainCircuit,
  Lock,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { HERO_CONTENT, PERSONAS, ASSETS, TRANSACTION_SUPPORT } from './constants';
import { AIScenarioType } from './types';
import { AIChatDemo } from './components/AIChatDemo';

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