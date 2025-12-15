import { 
  Building2, 
  Briefcase, 
  Users, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Globe2 
} from 'lucide-react';
import { PersonaCard, AssetCategory, Feature } from './types';

export const HERO_CONTENT = {
  slogan: "Alpha 级资产 × Generative AI：重新定义财富管理生态",
  sub: "Nexus 合作伙伴 AI 操作系统 —— 专为 EAM、家族办公室及顶尖理财师打造的数字化赋能闭环。"
};

export const PERSONAS: PersonaCard[] = [
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

export const ASSETS: AssetCategory[] = [
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

export const TRANSACTION_SUPPORT: Feature[] = [
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