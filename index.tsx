import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types ---

type AppStage = 'SPLASH' | 'RED_PACKET' | 'COUPON_SELECT' | 'HOME';
type Tab = 'WISHES' | 'MERCHANTS' | 'GOD_COUPONS';

interface Coupon {
  id: string;
  title: string;
  value: string;
  desc: string;
  color: string;
}

interface WishItem {
  id: string;
  name: string;
  image: string;
  totalCardsNeeded: number;
  currentCards: number;
  participants: number;
}

interface Merchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  distance: string;
}

// --- Mock Data ---

const MOCK_WISHES: WishItem[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=500',
    totalCardsNeeded: 500,
    currentCards: 342,
    participants: 120
  },
  {
    id: '2',
    name: '戴森 Supersonic 吹风机',
    image: 'https://images.unsplash.com/photo-1585743131323-288219db9a56?auto=format&fit=crop&q=80&w=500',
    totalCardsNeeded: 200,
    currentCards: 180,
    participants: 85
  },
  {
    id: '3',
    name: '星巴克 ¥100 星礼卡',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=500',
    totalCardsNeeded: 50,
    currentCards: 12,
    participants: 5
  }
];

const MOCK_MERCHANTS: Merchant[] = [
  {
    id: '1',
    name: '金龙轩中餐厅',
    category: '中餐',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=500',
    distance: '0.5km'
  },
  {
    id: '2',
    name: 'Amber 尊享 SPA',
    category: '养生',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=500',
    distance: '1.2km'
  },
  {
    id: '3',
    name: '霓虹赛博网咖',
    category: '娱乐',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=500',
    distance: '2.0km'
  }
];

const GOD_COUPONS = [
  { id: 'g1', title: '免费午市套餐', merchant: '金龙轩', remaining: 5, value: '¥68' },
  { id: 'g2', title: '全身按摩半价', merchant: 'Amber SPA', remaining: 12, value: '¥198' },
  { id: 'g3', title: '饮品买一送一', merchant: '霓虹网咖', remaining: 50, value: '¥35' },
];

// --- Components ---

const IntroSplash = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 text-white">
      <div className="w-48 h-72 rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 shadow-[0_0_50px_rgba(245,158,11,0.6)] flex items-center justify-center animate-pulse border-2 border-yellow-200">
        <div className="text-center">
          <i className="fa-solid fa-gem text-6xl text-white drop-shadow-lg animate-float mb-4"></i>
          <h1 className="text-2xl font-bold font-serif tracking-widest text-white">AMBER</h1>
          <p className="text-xs tracking-[0.3em] uppercase opacity-80 mt-1">通行证</p>
        </div>
      </div>
      <p className="mt-8 text-yellow-500 font-mono animate-pulse text-sm">正在识别 NFC...</p>
    </div>
  );
};

const RedPacketModal = ({ onOpen }: { onOpen: () => void }) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-40 p-4 backdrop-blur-sm">
      <div className={`relative w-80 h-[400px] bg-[#cf2e2e] rounded-2xl shadow-2xl flex flex-col items-center overflow-hidden transition-all duration-700 ${opened ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Top Curve */}
        <div className="absolute top-0 w-full h-32 bg-[#e63b3b] rounded-b-[100%] shadow-md z-10 border-b-4 border-[#bc2222]"></div>
        
        {/* Content */}
        <div className="mt-12 z-20 flex flex-col items-center text-[#fceeb5]">
          <h2 className="text-3xl font-bold mb-2 text-[#fceeb5] drop-shadow-md tracking-wider">新人大礼包</h2>
          <p className="text-sm opacity-90 text-[#fceeb5]">恭喜获得 Amber 通行证权益</p>
        </div>

        {/* Button */}
        <button 
          onClick={handleOpen}
          className="z-20 mt-auto mb-20 w-24 h-24 rounded-full bg-[#fceeb5] border-4 border-[#e9c768] shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex items-center justify-center group active:scale-95 transition-transform"
        >
          <span className="text-4xl font-black text-[#cf2e2e] group-hover:rotate-12 transition-transform font-serif">
            開
          </span>
        </button>

        {/* Decor */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#911d1d] to-transparent"></div>
      </div>
    </div>
  );
};

const CouponSelection = ({ onSelect }: { onSelect: (coupon: Coupon) => void }) => {
  const coupons: Coupon[] = [
    { id: 'c1', title: '5折', value: '50%', desc: '全场咖啡饮品通用', color: 'from-blue-500 to-indigo-600' },
    { id: 'c2', title: '免费蛋糕', value: 'Free', desc: '任意消费满20元可用', color: 'from-pink-500 to-rose-600' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-30 p-6">
      <h2 className="text-2xl text-white font-bold mb-2 animate-bounce">请选择您的专属权益</h2>
      <p className="text-white/60 text-sm mb-8">二选一，点击领取</p>
      
      <div className="grid grid-cols-1 gap-6 w-full max-w-md">
        {coupons.map((coupon, idx) => (
          <button
            key={coupon.id}
            onClick={() => onSelect(coupon)}
            className={`relative h-40 w-full rounded-2xl bg-gradient-to-r ${coupon.color} p-6 flex items-center justify-between shadow-xl hover:scale-105 transition-transform group overflow-hidden border-2 border-white/20`}
          >
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-900 rounded-full"></div>
            
            <div className="text-left z-10">
              <h3 className="text-4xl font-black text-white italic">{coupon.title}</h3>
              <p className="text-white/90 mt-2 font-medium text-sm">{coupon.desc}</p>
            </div>
            <div className="z-10 bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <i className="fa-solid fa-hand-pointer text-white text-2xl"></i>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Pages for Home ---

const WishList = ({ userCards, onInvest }: { userCards: number, onInvest: (id: string) => void }) => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-4">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <i className="fa-solid fa-ticket text-8xl"></i>
        </div>
        <div className="flex justify-between items-center relative z-10">
          <div>
            <p className="text-sm opacity-90 mb-1">我的心愿卡</p>
            <div className="flex items-baseline">
               <span className="text-4xl font-bold font-mono mr-2">{userCards}</span>
               <span className="text-sm">张</span>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-bold">每日签到 +1</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 border-l-4 border-purple-600 pl-3">0元许愿池</h3>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_WISHES.map(wish => {
          const progress = (wish.currentCards / wish.totalCardsNeeded) * 100;
          return (
            <div key={wish.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex">
              <img src={wish.image} alt={wish.name} className="w-32 h-32 object-cover" />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug">{wish.name}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-2 space-x-2">
                     <span className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded"><i className="fa-solid fa-fire mr-1"></i>{wish.participants}人参与</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>收集进度</span>
                    <span className="font-mono">{wish.currentCards}/{wish.totalCardsNeeded}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <button 
                  onClick={() => onInvest(wish.id)}
                  disabled={userCards <= 0}
                  className="mt-3 w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  <i className="fa-solid fa-paper-plane text-[10px]"></i>
                  <span>投入心愿卡</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MerchantList = () => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 border-l-4 border-blue-600 pl-3">附近好店</h3>
      {MOCK_MERCHANTS.map(m => (
        <div key={m.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4">
          <img src={m.image} alt={m.name} className="w-20 h-20 rounded-lg object-cover" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{m.name}</h4>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded mr-2">{m.category}</span>
              <span>{m.distance}</span>
            </div>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400 text-xs">
                 {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(m.rating) ? '' : 'text-gray-300'}`}></i>
                 ))}
              </div>
              <span className="text-xs font-bold ml-1 text-gray-600">{m.rating}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <i className="fa-solid fa-location-arrow"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const GodCoupons = () => {
  return (
    <div className="pb-24 pt-4 px-4 space-y-4">
       <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-6 text-white text-center shadow-lg mb-6">
         <h2 className="text-2xl font-black tracking-widest mb-1 flex items-center justify-center">
            <i className="fa-solid fa-crown mr-2 text-yellow-200"></i>
            <span>限时神券</span>
         </h2>
         <p className="opacity-90 text-sm">超高价值 • 限量抢购</p>
       </div>

       <div className="grid grid-cols-1 gap-4">
          {GOD_COUPONS.map(c => (
            <div key={c.id} className="relative bg-white rounded-xl shadow-md overflow-hidden flex border-t-4 border-amber-500">
               <div className="bg-amber-500 w-24 flex flex-col items-center justify-center p-2 text-white border-r border-dashed border-white/30">
                  <span className="text-xs font-bold opacity-80">价值</span>
                  <span className="text-xl font-black">{c.value}</span>
               </div>
               <div className="flex-1 p-4">
                  <h4 className="font-bold text-gray-800">{c.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">适用门店: {c.merchant}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">仅剩 {c.remaining} 张</span>
                    <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg shadow-gray-300 active:scale-95 transition-transform">
                       立即抢
                    </button>
                  </div>
               </div>
               {/* Circles for coupon effect */}
               <div className="absolute -top-2 left-[5.7rem] w-4 h-4 bg-gray-100 rounded-full"></div>
               <div className="absolute -bottom-2 left-[5.7rem] w-4 h-4 bg-gray-100 rounded-full"></div>
            </div>
          ))}
       </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [stage, setStage] = useState<AppStage>('SPLASH');
  const [activeTab, setActiveTab] = useState<Tab>('WISHES');
  const [wishCards, setWishCards] = useState(0); 
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleOpenRedPacket = () => {
    // Grant rewards
    setWishCards(prev => prev + 5);
    setStage('COUPON_SELECT');
  };

  const handleSelectCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setStage('HOME');
  };

  const handleInvestWish = (id: string) => {
    if (wishCards > 0) {
      setWishCards(prev => prev - 1);
      // In a real app, we would update the MOCK_DATA state here or send API req
      alert("成功投入1张心愿卡！祝你好运！");
    }
  };

  if (stage === 'SPLASH') {
    return <IntroSplash onComplete={() => setStage('RED_PACKET')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden">
      
      {/* Top Bar (Only visible in Home) */}
      {stage === 'HOME' && (
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
              <i className="fa-solid fa-gem text-xs"></i>
            </div>
            <span className="font-bold text-gray-800 tracking-tight">Amber 通行证</span>
          </div>
          <div className="flex items-center space-x-3">
             <div className="px-3 py-1 bg-gray-100 rounded-full flex items-center space-x-1 border border-gray-200">
                <i className="fa-solid fa-ticket text-purple-600 text-xs"></i>
                <span className="text-xs font-bold text-gray-700">{wishCards}</span>
             </div>
             <div className="relative">
                <i className="fa-regular fa-bell text-gray-600 text-lg"></i>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
             </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="min-h-screen">
        {stage === 'RED_PACKET' && <RedPacketModal onOpen={handleOpenRedPacket} />}
        {stage === 'COUPON_SELECT' && <CouponSelection onSelect={handleSelectCoupon} />}
        
        {stage === 'HOME' && (
          <div className="animate-fadeIn">
            {activeTab === 'WISHES' && <WishList userCards={wishCards} onInvest={handleInvestWish} />}
            {activeTab === 'MERCHANTS' && <MerchantList />}
            {activeTab === 'GOD_COUPONS' && <GodCoupons />}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      {stage === 'HOME' && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex justify-around items-center py-2 z-30 pb-safe shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
          <button 
            onClick={() => setActiveTab('WISHES')}
            className={`flex flex-col items-center space-y-1 py-1 w-full ${activeTab === 'WISHES' ? 'text-purple-600' : 'text-gray-400'}`}
          >
            <div className={`text-xl mb-0.5 ${activeTab === 'WISHES' ? 'transform -translate-y-1 transition-transform' : ''}`}>
               <i className={`fa-solid fa-wand-magic-sparkles`}></i>
            </div>
            <span className="text-[10px] font-bold">0元许愿</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('MERCHANTS')}
            className={`flex flex-col items-center space-y-1 py-1 w-full ${activeTab === 'MERCHANTS' ? 'text-blue-600' : 'text-gray-400'}`}
          >
             <div className={`text-xl mb-0.5 ${activeTab === 'MERCHANTS' ? 'transform -translate-y-1 transition-transform' : ''}`}>
               <i className="fa-solid fa-store"></i>
             </div>
            <span className="text-[10px] font-bold">附近好店</span>
          </button>

          <button 
            onClick={() => setActiveTab('GOD_COUPONS')}
            className={`flex flex-col items-center space-y-1 py-1 w-full ${activeTab === 'GOD_COUPONS' ? 'text-amber-500' : 'text-gray-400'}`}
          >
            <div className={`text-xl mb-0.5 ${activeTab === 'GOD_COUPONS' ? 'transform -translate-y-1 transition-transform' : ''}`}>
              <i className="fa-solid fa-ticket-simple"></i>
            </div>
            <span className="text-[10px] font-bold">限时神券</span>
          </button>
        </nav>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);