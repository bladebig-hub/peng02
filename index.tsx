import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---

type AppStage = 'SPLASH' | 'RED_PACKET_COVER' | 'RED_PACKET_OPEN' | 'COUPON_SELECT' | 'COUPON_SUCCESS' | 'HOME';
type HomeTab = 'FREE_ORDER' | 'MY_PARTICIPATION' | 'RED_PACKET_ALLIANCE' | 'PASS_COUPONS';

interface StatItem {
  label: string;
  value: string;
  icon?: string;
}

interface GridItem {
  label: string;
  desc: string;
  icon: string;
  color: string;
}

interface FeedItem {
  id: string;
  merchantName: string;
  merchantBranch?: string;
  distance: string;
  logo: string;
  title: string;
  image: string;
  tags: string[];
  price: string;
  originalPrice: string;
  participantsCount: number;
  totalNeeded: number;
  status: 'PENDING' | 'FINISHED';
  buttonText: string;
}

// --- Mock Data ---

const USER_STATS: StatItem[] = [
  { label: '红包', value: '¥1000' },
  { label: '卡券', value: '11' },
  { label: '订单', value: '7' },
  { label: '积分', value: '1400' },
];

const MAIN_MENU: GridItem[] = [
  { label: '伴游讲解', desc: '一路随行, 讲透每一处风景', icon: 'fa-headphones', color: 'bg-blue-100 text-blue-600' },
  { label: '打卡任务', desc: '解锁权益, 记录每一段成长', icon: 'fa-list-check', color: 'bg-green-100 text-green-600' },
  { label: '用户社区', desc: '在这里, 遇见身边的同路人', icon: 'fa-users', color: 'bg-yellow-100 text-yellow-600' },
  { label: '数字藏品', desc: '收藏属于世界的独特印记', icon: 'fa-cube', color: 'bg-purple-100 text-purple-600' },
];

const TOOLS_MENU = [
  { label: '打卡地图', icon: 'fa-map-location-dot', color: 'text-red-500' },
  { label: '拍照打卡', icon: 'fa-camera', color: 'text-blue-500' },
  { label: 'AR视界', icon: 'fa-vr-cardboard', color: 'text-purple-500' },
  { label: '盲盒抽奖', icon: 'fa-gift', color: 'text-orange-500' },
  { label: '打卡', icon: 'fa-location-dot', color: 'text-green-500' },
];

const FEED_ITEMS: FeedItem[] = [
  {
    id: '1',
    merchantName: '星巴克',
    merchantBranch: '朝阳风雅汇108号',
    distance: '500m',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
    title: '客制化特调拿铁',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500',
    tags: ['50人已中奖', '抹茶若楠...刚中奖'],
    price: '免单',
    originalPrice: '¥29.9',
    participantsCount: 50,
    totalNeeded: 100,
    status: 'PENDING',
    buttonText: '许愿'
  },
  {
    id: '2',
    merchantName: '肯德基',
    merchantBranch: '北京朝阳大悦城B座店',
    distance: '500m',
    logo: 'https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png',
    title: '吮指原味鸡',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500',
    tags: ['50人已中奖', '李先生...刚中奖'],
    price: '免单',
    originalPrice: '¥12.5',
    participantsCount: 120,
    totalNeeded: 150,
    status: 'PENDING',
    buttonText: '许愿'
  },
  {
    id: '3',
    merchantName: '便利蜂',
    merchantBranch: '朝阳北路汇智104号',
    distance: '500m',
    logo: 'https://images.squarespace-cdn.com/content/v1/5a9e2233f2e6b12d5e754a64/1560912192669-026P8V9H6F6N6C4G1G1L/bianlifeng.png',
    title: '招牌麻辣炒肉便当',
    image: 'https://images.unsplash.com/photo-1562967960-f2038933aa52?auto=format&fit=crop&q=80&w=500',
    tags: ['50人已中奖', '免单 售价¥34.6'],
    price: '免单',
    originalPrice: '¥34.6',
    participantsCount: 180,
    totalNeeded: 200,
    status: 'PENDING',
    buttonText: '许愿'
  },
];

// --- Components ---

const Splash = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onFinish, 1500);
    return () => clearTimeout(t);
  }, [onFinish]);
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
       <div className="animate-bounce">
         <i className="fa-solid fa-gem text-amber-500 text-6xl"></i>
       </div>
    </div>
  );
};

const RedPacket = ({ onOpen, stage }: { onOpen: () => void, stage: 'COVER' | 'OPEN' }) => {
  const [animating, setAnimating] = useState(false);

  const handleOpenClick = () => {
    setAnimating(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  if (stage === 'OPEN') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xs aspect-[3/4.2] bg-[#cf2e2e] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center animate-zoomIn">
        {/* Top Arc Background */}
        <div className="absolute top-0 w-[150%] h-[40%] bg-[#e63b3b] rounded-b-[100%] border-b-4 border-[#b92b2b] shadow-md z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center mt-12 w-full px-6">
           {/* Avatar/Logo */}
           <div className="w-16 h-16 bg-white rounded-full p-1 shadow-lg mb-3">
             <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" className="w-full h-full object-contain rounded-full" alt="logo" />
           </div>
           
           <h3 className="text-[#fceeb5] text-xl font-bold tracking-wide mb-1">星巴克</h3>
           <p className="text-[#fceeb5]/80 text-sm mb-6">向您发放了现金红包</p>

           <div className="bg-gradient-to-r from-[#fceeb5] to-[#f0d885] text-[#cf2e2e] text-xs font-bold px-3 py-1 rounded-full mb-2">
              全场通用
           </div>
           
           <div className="mt-4 flex items-baseline text-[#fceeb5]">
              <span className="text-2xl font-bold">¥</span>
              <span className="text-6xl font-black tracking-tighter mx-1">0.85</span>
           </div>
           <p className="text-[#fceeb5]/60 text-xs mt-1">无门槛</p>
        </div>

        {/* Open Button */}
        <div className="mt-auto mb-16 relative z-20">
          <button 
            onClick={handleOpenClick}
            className={`w-24 h-24 rounded-full bg-[#fceeb5] border-[5px] border-[#e9c768] shadow-[0_5px_15px_rgba(0,0,0,0.2)] flex items-center justify-center active:scale-95 transition-transform ${animating ? '[transform:rotateY(360deg)] transition-all duration-1000' : ''}`}
          >
            <span className="text-4xl font-black text-[#cf2e2e] font-serif">開</span>
          </button>
        </div>

        {/* Bottom Tip */}
        <p className="absolute bottom-4 text-white/30 text-xs">每日碰一碰 · 红包享不停</p>
      </div>
      
      {/* Close Button below */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 border border-white/40 rounded-full w-8 h-8 flex items-center justify-center">
        <i className="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};

const RedPacketResult = ({ onProceed }: { onProceed: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-gradient-to-b from-[#e63b3b] to-[#cf2e2e] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col items-center animate-fadeIn">
        <div className="text-[#fceeb5] text-lg font-bold mb-2">恭喜获得</div>
        <div className="text-[#fceeb5] text-5xl font-black mb-1">¥0.85</div>
        <div className="text-[#fceeb5]/70 text-sm mb-8">已存入余额，下单自动抵扣</div>
        
        <button 
          onClick={onProceed}
          className="w-full py-3 bg-gradient-to-r from-[#fceeb5] to-[#f0d885] text-[#cf2e2e] font-bold rounded-full shadow-lg active:scale-95 transition-transform"
        >
          去使用
        </button>
      </div>
    </div>
  )
}

const CouponSelect = ({ onSelect }: { onSelect: (id: string) => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h2 className="text-white text-2xl font-bold text-center mb-2 tracking-wider">优惠券 二选一</h2>
        <div className="flex justify-center mb-8">
           <div className="h-1 w-10 bg-white/20 rounded-full"></div>
        </div>

        <div className="flex space-x-3 overflow-visible">
          {/* Coupon 1 */}
          <div className="flex-1 bg-white rounded-xl overflow-hidden relative clip-ticket shadow-2xl transform transition-transform hover:scale-105">
             <div className="h-32 bg-gray-100 relative">
                <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">星巴克</div>
             </div>
             <div className="p-3 bg-white text-center pb-12 relative border-t-2 border-dashed border-gray-200">
               {/* Semi-circles for ticket effect */}
               <div className="absolute -left-2 -top-2 w-4 h-4 bg-gray-900 rounded-full"></div>
               <div className="absolute -right-2 -top-2 w-4 h-4 bg-gray-900 rounded-full"></div>

               <h4 className="font-bold text-gray-800 text-xs mb-1 line-clamp-1">经典咖啡组合大杯</h4>
               <div className="text-red-500 font-black text-xl">¥19.9</div>
               <div className="text-gray-400 text-[10px] line-through mb-2">原价 ¥29.9</div>
               
               <button 
                onClick={() => onSelect('c1')}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md active:scale-95 transition-transform"
               >
                 选这个
               </button>
             </div>
          </div>

          {/* Coupon 2 */}
          <div className="flex-1 bg-white rounded-xl overflow-hidden relative clip-ticket shadow-2xl transform transition-transform hover:scale-105">
             <div className="h-32 bg-gray-100 relative">
                <img src="https://images.unsplash.com/photo-1461023058943-716c19268544?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">星巴克</div>
             </div>
             <div className="p-3 bg-white text-center pb-12 relative border-t-2 border-dashed border-gray-200">
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-gray-900 rounded-full"></div>
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-gray-900 rounded-full"></div>

               <h4 className="font-bold text-gray-800 text-xs mb-1 line-clamp-1">店铺通用满减券</h4>
               <div className="text-red-500 font-black text-xl">¥10</div>
               <div className="text-gray-400 text-[10px] mb-2">满100可用</div>
               
               <button 
                onClick={() => onSelect('c2')}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-md active:scale-95 transition-transform"
               >
                 选这个
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xs rounded-3xl p-6 text-center animate-bounceIn relative">
         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-check text-4xl text-green-500"></i>
         </div>
         <h3 className="text-xl font-bold text-gray-800 mb-2">领取成功</h3>
         <p className="text-gray-500 text-sm mb-6">优惠券已放入您的卡包</p>

         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 flex items-center text-left">
            <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-lg object-cover mr-3" />
            <div>
               <div className="font-bold text-sm text-gray-800">星巴克(朝阳南路店)</div>
               <div className="text-xs text-gray-500">经典咖啡组合大杯券</div>
            </div>
         </div>

         <div className="space-y-3">
           <button onClick={onComplete} className="w-full py-3 bg-red-500 text-white font-bold rounded-full shadow-lg shadow-red-200">立即使用</button>
           <button onClick={onComplete} className="w-full py-3 bg-gray-100 text-gray-600 font-bold rounded-full">放入卡包</button>
         </div>
      </div>
    </div>
  );
};

// --- Home Page Components ---

const HomeHeader = () => {
  return (
    <div className="bg-white px-4 pt-4 pb-2">
      {/* Profile Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
             <div className="w-12 h-12 rounded-full border-2 border-yellow-400 p-0.5">
                <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" className="w-full h-full rounded-full bg-gray-100" />
             </div>
             <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">LV.5</div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h1 className="text-lg font-bold text-gray-900">Hi 我是明小兵!</h1>
              <i className="fa-regular fa-pen-to-square text-gray-400 text-xs"></i>
            </div>
            <p className="text-xs text-gray-400">你认八达岭智慧导览员, 有什么问题都可以问我哟~</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <i className="fa-solid fa-gear text-gray-400"></i>
           <i className="fa-regular fa-comment-dots text-gray-400"></i>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] p-4 border border-gray-50">
        {USER_STATS.map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1 border-r last:border-0 border-gray-100">
             <div className="text-lg font-black text-gray-900 font-mono">{stat.value}</div>
             <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GridMenu = () => {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      {MAIN_MENU.map((item, idx) => (
        <div key={idx} className={`p-3 rounded-xl flex items-center space-x-3 ${item.color.split(' ')[0]} bg-opacity-40`}>
           <div className={`w-10 h-10 rounded-full ${item.color.replace('bg-', 'bg-white/50 ')} flex items-center justify-center text-lg`}>
              <i className={`fa-solid ${item.icon}`}></i>
           </div>
           <div>
             <div className="text-sm font-bold text-gray-800">{item.label}</div>
             <div className="text-[10px] text-gray-500 scale-90 origin-left mt-0.5 opacity-80">{item.desc}</div>
           </div>
        </div>
      ))}
    </div>
  );
};

const ToolsRow = () => {
  return (
    <div className="px-4 mb-6">
       <div className="flex items-center space-x-2 mb-2">
         <div className="w-1 h-3 bg-black rounded-full"></div>
         <span className="text-sm font-bold text-gray-900">潮玩工具箱</span>
       </div>
       <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm">
          {TOOLS_MENU.map((tool, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2">
               <div className={`text-2xl ${tool.color}`}>
                 <i className={`fa-solid ${tool.icon}`}></i>
               </div>
               <span className="text-[10px] text-gray-600">{tool.label}</span>
            </div>
          ))}
       </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="px-4 mb-6">
      <div className="w-full h-24 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-between px-6 text-white relative overflow-hidden shadow-lg shadow-red-200">
         <div className="z-10">
           <div className="bg-white/20 text-[10px] px-2 py-0.5 rounded w-fit mb-1 backdrop-blur-sm">限时活动</div>
           <h2 className="text-2xl font-black italic">0元·赢免单</h2>
           <p className="text-xs opacity-90">iPhone17Pro带回家</p>
         </div>
         <div className="z-10">
            <button className="bg-white text-red-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">立即参与</button>
         </div>
         {/* Decor */}
         <i className="fa-solid fa-gift text-9xl absolute -right-4 -bottom-4 text-white/10 rotate-12"></i>
         <div className="absolute top-0 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

const FeedList = () => {
  const [activeTab, setActiveTab] = useState<HomeTab>('FREE_ORDER');
  
  return (
    <div className="bg-gray-50 min-h-[500px] rounded-t-3xl border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm px-4 pt-4 pb-2 flex items-center space-x-6 overflow-x-auto scrollbar-hide border-b border-gray-200/50">
         <button 
          onClick={() => setActiveTab('FREE_ORDER')}
          className={`flex-shrink-0 relative pb-2 text-sm font-bold transition-colors ${activeTab === 'FREE_ORDER' ? 'text-red-500' : 'text-gray-500'}`}
         >
           0元·赢免单
           {activeTab === 'FREE_ORDER' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-red-500 rounded-full"></div>}
         </button>
         <button 
          onClick={() => setActiveTab('RED_PACKET_ALLIANCE')}
          className={`flex-shrink-0 relative pb-2 text-sm font-bold transition-colors ${activeTab === 'RED_PACKET_ALLIANCE' ? 'text-red-500' : 'text-gray-500'}`}
         >
           八达岭...红包联盟
           {activeTab === 'RED_PACKET_ALLIANCE' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-red-500 rounded-full"></div>}
         </button>
         <button 
          onClick={() => setActiveTab('PASS_COUPONS')}
          className={`flex-shrink-0 relative pb-2 text-sm font-bold transition-colors ${activeTab === 'PASS_COUPONS' ? 'text-red-500' : 'text-gray-500'}`}
         >
           PASS神券 🔥
           {activeTab === 'PASS_COUPONS' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-red-500 rounded-full"></div>}
         </button>
      </div>

      {/* Sub Filter */}
      <div className="px-4 py-3 flex space-x-3 text-xs text-gray-500">
         <span className="text-gray-900 font-bold">离我最近</span>
         <span>全部</span>
         <span>美食</span>
         <span>玩乐</span>
         <span>住宿</span>
         <span>出行</span>
      </div>

      {/* List */}
      <div className="px-4 space-y-4 pb-24">
         {FEED_ITEMS.map(item => {
           const percent = Math.floor((item.participantsCount / item.totalNeeded) * 100);
           return (
           <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-start space-x-4">
              {/* Image */}
              <div className="w-24 h-24 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden relative">
                 <img src={item.image} className="w-full h-full object-cover" />
                 <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-br-lg font-bold">0元</div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                 <div className="flex items-center space-x-2 mb-1">
                    <img src={item.logo} className="w-4 h-4 rounded-full" />
                    <h3 className="text-sm font-bold text-gray-800 truncate">{item.merchantName} <span className="text-gray-400 font-normal text-xs ml-1">{item.merchantBranch}</span></h3>
                 </div>
                 <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                 
                 {/* Tags */}
                 <div className="flex flex-wrap gap-2 mb-2">
                   {item.tags.map((tag, i) => (
                     <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-100">
                       {tag}
                     </span>
                   ))}
                 </div>

                 {/* Price Row */}
                 <div className="flex items-end mb-2">
                    <span className="text-red-500 font-bold text-sm">{item.price}</span>
                    <span className="text-gray-400 text-xs line-through ml-1">{item.originalPrice}</span>
                 </div>

                 {/* Progress Bar Row */}
                 <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-[10px] text-red-500 font-bold mb-1">
                         <span>进度{percent}%</span>
                         <span>还差{item.totalNeeded - item.participantsCount}人</span>
                      </div>
                      <div className="h-1.5 w-full bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* Action Button (aligned bottom) */}
              <div className="self-end pb-1">
                 <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-red-200 active:scale-95 transition-transform whitespace-nowrap">
                   {item.buttonText}
                 </button>
                 <div className="text-[10px] text-gray-400 text-center mt-1">{item.distance}</div>
              </div>
           </div>
           );
         })}
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [stage, setStage] = useState<AppStage>('SPLASH');

  if (stage === 'SPLASH') {
    return <Splash onFinish={() => setStage('RED_PACKET_COVER')} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Background overlays for red packet stages */}
      {(stage === 'RED_PACKET_COVER' || stage === 'RED_PACKET_OPEN' || stage === 'COUPON_SELECT' || stage === 'COUPON_SUCCESS') && (
        <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"></div>
      )}

      {/* Actual Home Page Content */}
      <div className={`transition-all duration-500 ${stage !== 'HOME' ? 'scale-95 opacity-50 overflow-hidden h-screen' : 'opacity-100'}`}>
         <HomeHeader />
         <GridMenu />
         <ToolsRow />
         <Banner />
         <FeedList />
      </div>

      {/* Modals Layer */}
      {stage === 'RED_PACKET_COVER' && (
        <RedPacket stage="COVER" onOpen={() => setStage('RED_PACKET_OPEN')} />
      )}
      
      {stage === 'RED_PACKET_OPEN' && (
        <RedPacketResult onProceed={() => setStage('COUPON_SELECT')} />
      )}

      {stage === 'COUPON_SELECT' && (
        <CouponSelect onSelect={() => setStage('COUPON_SUCCESS')} />
      )}

      {stage === 'COUPON_SUCCESS' && (
        <SuccessModal onComplete={() => setStage('HOME')} />
      )}

      {/* Floating Touch Button (Daily One Touch) */}
      {stage === 'HOME' && (
        <div className="fixed bottom-24 right-2 z-30 animate-float">
           <div className="relative">
             <button className="w-16 h-16 bg-gradient-to-b from-gray-800 to-black rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center justify-center text-white transform rotate-12 hover:rotate-0 transition-transform duration-300 group">
                <i className="fa-solid fa-nfc-symbol text-2xl text-amber-500 mb-1 group-hover:scale-110 transition-transform"></i>
                <span className="text-[8px] font-bold text-amber-500">碰一碰</span>
             </button>
             <div className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold border border-white animate-pulse">
               领红包
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);