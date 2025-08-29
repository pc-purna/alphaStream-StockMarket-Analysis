import React, { useState, useEffect } from 'react';

// --- Helper Data ---
const mockStockData = [
    { 
        ticker: 'TCS', name: 'Tata Consultancy', color: '80bfff',
        analysis: {
            signal: 'Strong Buy', color: 'text-green-400', icon: 'fas fa-bolt',
            reason: 'High trading volume and a recent breakout above a key resistance level.',
            strategy: 'Consider entry for a short-term gain. Set a stop-loss just below the recent support.'
        }
    },
    { 
        ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', color: '77dd77',
        analysis: {
            signal: 'Bullish Momentum', color: 'text-green-400', icon: 'fas fa-chart-line',
            reason: 'Stock is trading above its 20-period moving average with increasing volume.',
            strategy: 'Potential for continued upward movement in the current session.'
        }
    },
    { 
        ticker: 'RELIANCE', name: 'Reliance Industries', color: 'ff6961',
        analysis: {
            signal: 'Strong Buy', color: 'text-green-400', icon: 'fas fa-bolt',
            reason: 'Positive news catalyst has caused a surge in buying interest.',
            strategy: 'Look for a small dip to enter; high volatility expected.'
        }
    },
    { 
        ticker: 'INFY', name: 'Infosys Ltd', color: 'fdfd96',
        analysis: {
            signal: 'Neutral', color: 'text-yellow-400', icon: 'fas fa-pause-circle',
            reason: 'Stock is consolidating after a recent run-up. Volume has decreased.',
            strategy: 'Watch for a breakout or breakdown from the current price range before acting.'
        }
    },
    { 
        ticker: 'BAJFINANCE', name: 'Bajaj Finance', color: 'b19cd9',
        analysis: {
            signal: 'Bullish Momentum', color: 'text-green-400', icon: 'fas fa-chart-line',
            reason: 'Showing strength and outperforming the broader market index today.',
            strategy: 'Good candidate for a quick momentum trade if the trend continues.'
        }
    },
    { ticker: 'ICICIBANK', name: 'ICICI Bank', color: 'ffb347', analysis: { signal: 'Strong Buy', color: 'text-green-400', icon: 'fas fa-bolt', reason: 'Banking sector is strong today, and this stock is leading the pack.', strategy: 'Enter with caution, as the sector can be volatile.' } },
    { ticker: 'HINDUNILVR', name: 'Hindustan Unilever', color: '77dd77', analysis: { signal: 'Neutral', color: 'text-yellow-400', icon: 'fas fa-pause-circle', reason: 'Low volatility and trading within a narrow range.', strategy: 'Not ideal for momentum trading at this moment. Wait for a clearer signal.' } },
    { ticker: 'SBIN', name: 'State Bank of India', color: 'aec6cf', analysis: { signal: 'Bullish Momentum', color: 'text-green-400', icon: 'fas fa-chart-line', reason: 'PSU Bank index is up, and SBIN is a major contributor.', strategy: 'Ride the trend but keep an eye on overall market sentiment.' } },
    { ticker: 'KOTAKBANK', name: 'Kotak Mahindra Bank', color: 'c3aed6', analysis: { signal: 'Strong Buy', color: 'text-green-400', icon: 'fas fa-bolt', reason: 'Just broke a key intraday resistance level with high volume.', strategy: 'Potential for a quick 1-2% upside from the current price.' } },
    { ticker: 'LT', name: 'Larsen & Toubro', color: 'd3d3d3', analysis: { signal: 'Neutral', color: 'text-yellow-400', icon: 'fas fa-pause-circle', reason: 'Stock is facing resistance at the day\'s high.', strategy: 'Wait to see if it can break through before considering a trade.' } }
];

const longTermStocksData = [
    {
        id: 'ril', ticker: 'RELIANCE', name: 'Reliance Industries', price: '2,955.75', change: '+0.85%', isPositive: true, peRatio: '28.5', fiveYearReturn: '+135%', logoColor: 'ff6961',
        pros: [{ id: 1, text: 'Diversified Powerhouse: Leader in Energy, Retail, and Telecom.' }, { id: 2, text: 'Future-Focused: Aggressive investment in green energy and 5G.' }, { id: 3, text: 'Market Dominance: Jio and Reliance Retail are clear market leaders.' }],
        cons: [{ id: 1, text: 'High Debt: Expansion has led to significant borrowing.' }, { id: 2, text: 'Cyclical Business: Energy profits depend on global oil prices.' }, { id: 3, text: 'Premium Valuation: Stock often trades at a high price relative to earnings.' }],
        timing: { signal: 'Wait and Watch', color: 'text-yellow-400', icon: 'fas fa-clock', reason: "The stock is currently trading near its all-time high. It's advisable to wait for a price correction of 5-7% for a better entry point. Re-evaluate in 2-3 weeks." }
    },
    {
        id: 'hdfc', ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', price: '1,690.10', change: '+2.10%', isPositive: true, peRatio: '19.8', fiveYearReturn: '+88%', logoColor: '77dd77',
        pros: [{ id: 1, text: 'Rock-Solid Stability: Excellent management and consistent growth.' }, { id: 2, text: 'Brand Trust: Massive, loyal customer base and low-cost deposits.' }, { id: 3, text: 'Largest Private Lender: A direct beneficiary of India\'s economic growth.' }],
        cons: [{ id: 1, text: 'Slower Growth: Large size makes high-paced growth more challenging.' }, { id: 2, text: 'Competitive Pressure: Faces competition from banks and fintechs.' }, { id: 3, text: 'Interest Rate Sensitivity: Profitability affected by RBI rate changes.' }],
        timing: { signal: 'Good Time to Invest', color: 'text-green-400', icon: 'fas fa-check-circle', reason: 'The stock is trading at a reasonable valuation compared to its historical average. A good entry point for long-term accumulation.' }
    },
    {
        id: 'tcs', ticker: 'TCS', name: 'Tata Consultancy', price: '3,845.50', change: '+1.25%', isPositive: true, peRatio: '30.1', fiveYearReturn: '+95%', logoColor: '80bfff',
        pros: [{ id: 1, text: 'Global IT Leader: Blue-chip client list including Fortune 500 companies.' }, { id: 2, text: 'Strong Financials: High profitability and consistent dividends.' }, { id: 3, text: 'Defensive Qualities: Revenue is resilient during economic uncertainty.' }],
        cons: [{ id: 1, text: 'Global Dependence: Growth depends on US and European economies.' }, { id: 2, text: 'Currency Risk: Rupee-dollar fluctuations can affect margins.' }, { id: 3, text: 'Intense Competition: High competition in the IT services space.' }],
        timing: { signal: 'Good Time to Invest', color: 'text-green-400', icon: 'fas fa-check-circle', reason: 'The stock has corrected from its recent highs and is now available at a more attractive price. Suitable for systematic investment.' }
    }
];


// --- Reusable Components ---

const Card = ({ children, className = '' }) => (
    <div className={`bg-gray-800/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/20 ${className}`}>
        {children}
    </div>
);

// --- Main Components ---

const Header = ({ activeTab, setActiveTab }) => (
    <header className="bg-black/20 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center space-x-4">
                    <i className="fas fa-chart-line text-4xl text-white/90"></i>
                    <h1 className="text-3xl font-bold text-white/90 tracking-tight">AlphaStream</h1>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <button onClick={() => setActiveTab('dashboard')} className={`font-medium transition-colors duration-300 ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>Dashboard</button>
                    <button onClick={() => setActiveTab('portfolio')} className={`font-medium transition-colors duration-300 ${activeTab === 'portfolio' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>Portfolio</button>
                    <button onClick={() => setActiveTab('alerts')} className={`font-medium transition-colors duration-300 ${activeTab === 'alerts' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>Alerts</button>
                    <button onClick={() => setActiveTab('learn')} className={`font-medium transition-colors duration-300 ${activeTab === 'learn' ? 'text-white' : 'text-gray-300 hover:text-white'}`}>Learn</button>
                </div>
                <div className="flex items-center space-x-4">
                     <div className="relative">
                        <input type="text" placeholder="Search..." className="hidden sm:block w-48 lg:w-64 pl-5 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" />
                        <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hidden sm:block"></i>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

const MarketSnapshot = () => (
    <section id="market-snapshot" className="mb-12">
        <h2 className="text-3xl font-semibold text-white/90 mb-6 tracking-tight">Market Snapshot</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
                <div><h3 className="font-medium text-gray-300">NIFTY 50</h3><p className="text-3xl font-semibold text-white mt-1">23,557.90</p></div>
                <div className="text-right mt-2"><p className="font-semibold text-green-400">+92.30</p><p className="font-medium text-green-400 text-sm">(+0.39%) <i className="fas fa-arrow-up"></i></p></div>
            </Card>
            <Card className="p-6">
                <div><h3 className="font-medium text-gray-300">SENSEX</h3><p className="text-3xl font-semibold text-white mt-1">77,337.59</p></div>
                <div className="text-right mt-2"><p className="font-semibold text-green-400">+131.18</p><p className="font-medium text-green-400 text-sm">(+0.17%) <i className="fas fa-arrow-up"></i></p></div>
            </Card>
            <Card className="p-6">
                <div><h3 className="font-medium text-gray-300">S&P 500</h3><p className="text-3xl font-semibold text-white mt-1">5,477.90</p></div>
                <div className="text-right mt-2"><p className="font-semibold text-red-400">-14.80</p><p className="font-medium text-red-400 text-sm">(-0.27%) <i className="fas fa-arrow-down"></i></p></div>
            </Card>
            <Card className="p-6">
                <div><h3 className="font-medium text-gray-300">NASDAQ</h3><p className="text-3xl font-semibold text-white mt-1">17,689.36</p></div>
                <div className="text-right mt-2"><p className="font-semibold text-red-400">-32.23</p><p className="font-medium text-red-400 text-sm">(-0.18%) <i className="fas fa-arrow-down"></i></p></div>
            </Card>
        </div>
    </section>
);

const HourlyStockItem = ({ stock, isOpen, onToggle }) => (
    <Card className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 w-2/5">
                <img src={`https://placehold.co/48x48/${stock.color}/000000?text=${stock.ticker.substring(0,4)}`} alt={`${stock.ticker} Logo`} className="rounded-full" />
                <div>
                    <p className="font-semibold text-lg text-white/90">{stock.ticker}</p>
                    <p className="text-sm text-gray-400 truncate">{stock.name}</p>
                </div>
            </div>
            <div className="text-center">
                <p className="font-medium text-lg text-white/90">₹{parseFloat(stock.price).toLocaleString('en-IN')}</p>
                <p className={`text-sm font-semibold ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>{stock.change}%</p>
            </div>
            <div className="hidden sm:block text-center">
                <p className="text-sm font-medium text-gray-400">Momentum</p>
                <div className="w-28 bg-white/10 rounded-full h-2.5 mt-1">
                    <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${stock.momentum}%` }}></div>
                </div>
            </div>
            <button onClick={onToggle} className="bg-white/10 text-white font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300 flex items-center space-x-2">
                 <i className={`fas fa-chevron-down details-icon ${isOpen ? 'rotated' : ''}`}></i>
            </button>
        </div>
        {isOpen && (
            <div className="mt-4 pt-4 border-t border-white/10 text-sm">
                 <h4 className="font-semibold text-white/90 mb-2 tracking-wide">Momentum Analysis</h4>
                 <div className={`flex items-center ${stock.analysis.color} mb-2`}><i className={`${stock.analysis.icon} mr-2`}></i><span className="font-semibold">{stock.analysis.signal}</span></div>
                 <p className="text-gray-400 mb-2"><span className="text-gray-300 font-semibold">Reason:</span> {stock.analysis.reason}</p>
                 <p className="text-gray-400"><span className="text-gray-300 font-semibold">Strategy:</span> {stock.analysis.strategy}</p>
            </div>
        )}
    </Card>
);

const HourlyStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState('');
    const [openStockTicker, setOpenStockTicker] = useState(null);

    const handleToggle = (ticker) => {
        setOpenStockTicker(openStockTicker === ticker ? null : ticker);
    };

    useEffect(() => {
        const fetchTopStocks = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const getRandomStocks = () => [...mockStockData].sort(() => 0.5 - Math.random()).slice(0, 5);
            const generateStockData = (info) => ({ ...info, price: (Math.random() * 3000 + 500).toFixed(2), change: (Math.random() * 4 - 2).toFixed(2), momentum: Math.floor(Math.random() * 25 + 75) });
            setStocks(getRandomStocks().map(generateStockData));
            setLoading(false);
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).format(now);
            setLastUpdated(`Updated: ${timeString}`);
        };
        fetchTopStocks();
        const interval = setInterval(fetchTopStocks, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="top-stocks">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold text-white/90 tracking-tight">Hourly Momentum Leaders</h2>
                    <p className="text-gray-400 mt-1">Stocks with the strongest recent positive momentum.</p>
                </div>
                <div className="text-right"><p className="text-sm font-medium text-gray-400">{lastUpdated}</p></div>
            </div>
            <div className="space-y-4">
                {loading ? <div className="flex justify-center items-center h-64"><div className="loader"></div></div> : stocks.map(stock => <HourlyStockItem key={stock.ticker} stock={stock} isOpen={openStockTicker === stock.ticker} onToggle={() => handleToggle(stock.ticker)} />)}
            </div>
        </section>
    );
};

const LongTermStockItem = ({ stock, isOpen, onToggle }) => (
    <Card className="p-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4"><img src={`https://placehold.co/48x48/${stock.logoColor}/000000?text=${stock.ticker.substring(0,4)}`} alt={`${stock.ticker} Logo`} className="rounded-full" />
                <div><p className="font-semibold text-lg text-white/90">{stock.ticker}</p><p className="text-sm text-gray-400">{stock.name}</p></div>
            </div>
            <div className="text-right"><p className="font-medium text-lg text-white/90">₹{stock.price}</p><p className={`text-sm font-semibold ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>{stock.change}</p></div>
            <div className="hidden sm:flex items-center space-x-8 text-center">
                <div><p className="text-xs font-bold text-gray-400 tracking-wider">P/E RATIO</p><p className="font-semibold text-white/90 mt-1">{stock.peRatio}</p></div>
                <div><p className="text-xs font-bold text-gray-400 tracking-wider">5Y RETURN</p><p className="font-semibold text-green-400 mt-1">{stock.fiveYearReturn}</p></div>
            </div>
            <button onClick={onToggle} className="bg-white/10 text-white font-semibold px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300 flex items-center space-x-2">
                <i className={`fas fa-chevron-down details-icon ${isOpen ? 'rotated' : ''}`}></i>
            </button>
        </div>
        {isOpen && (
            <div className="mt-5 pt-5 border-t border-white/10 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-green-400 mb-2 tracking-wide">PROS</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {stock.pros.map(pro => <li key={pro.id}>{pro.text}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-400 mb-2 tracking-wide">CONS</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {stock.cons.map(con => <li key={con.id}>{con.text}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="mt-5 pt-5 border-t border-white/10">
                    <h4 className="font-semibold text-white/90 mb-2 tracking-wide">Investment Timing Analysis</h4>
                    <div className={`flex items-center ${stock.timing.color}`}><i className={`${stock.timing.icon} mr-2`}></i><span className="font-semibold">{stock.timing.signal}</span></div>
                    <p className="text-gray-400 mt-1">{stock.timing.reason}</p>
                </div>
            </div>
        )}
    </Card>
);

const LongTermStocks = () => {
    const [openStockId, setOpenStockId] = useState(null);
    const handleToggle = (id) => setOpenStockId(openStockId === id ? null : id);

    return (
        <section id="long-term-stocks">
            <h2 className="text-3xl font-semibold text-white/90 tracking-tight mb-2">Long-Term Growth Stocks</h2>
            <p className="text-gray-400 mb-6">Companies with strong fundamentals for long-term capital appreciation.</p>
            <div className="space-y-4">
                {longTermStocksData.map(stock => <LongTermStockItem key={stock.id} stock={stock} isOpen={openStockId === stock.id} onToggle={() => handleToggle(stock.id)} />)}
            </div>
        </section>
    );
};

const Portfolio = () => (
    <section id="portfolio-snapshot">
        <h2 className="text-3xl font-semibold text-white/90 tracking-tight mb-6">Portfolio</h2>
        <Card className="p-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div><p className="text-gray-400">Current Value</p><p className="text-3xl font-bold text-white/90">₹1,52,840.50</p></div>
                <div className="text-right"><p className="text-gray-400">Overall P/L</p><p className="text-xl font-bold text-green-400">+₹12,840.50 (+9.17%)</p></div>
            </div>
            <div className="space-y-4">
                <p className="font-semibold text-sm text-gray-300">Top Holdings:</p>
                <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center text-sm"><p className="font-bold text-white/90">RELIANCE</p><p className="text-gray-300">₹29,557.50</p><p className="font-medium text-green-400">+12.5%</p></div>
                    <div className="mt-3"><h4 className="font-bold text-xs text-gray-400 mb-1 tracking-wider">ACTION SIGNAL</h4><div className="flex items-center text-yellow-400"><i className="fas fa-exclamation-triangle mr-2"></i><span className="font-semibold text-sm">Trim Position</span></div><p className="text-xs text-gray-400 mt-1">Profit has exceeded 10%. Consider selling 25% to book profits and hold the rest for future growth.</p></div>
                </div>
                <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center text-sm"><p className="font-bold text-white/90">TCS</p><p className="text-gray-300">₹19,227.50</p><p className="font-medium text-green-400">+8.2%</p></div>
                    <div className="mt-3"><h4 className="font-bold text-xs text-gray-400 mb-1 tracking-wider">ACTION SIGNAL</h4><div className="flex items-center text-green-400"><i className="fas fa-shield-alt mr-2"></i><span className="font-semibold text-sm">Hold</span></div><p className="text-xs text-gray-400 mt-1">The stock is performing as expected. Continue holding for long-term objectives.</p></div>
                </div>
            </div>
            <button className="mt-6 w-full bg-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/20 transition-colors duration-300">View Full Portfolio</button>
        </Card>
    </section>
);

const NewsFeed = () => (
    <section id="market-news">
        <h2 className="text-3xl font-semibold text-white/90 tracking-tight mb-6">Market News</h2>
        <Card className="p-6 space-y-4">
            <div className="border-b border-white/10 pb-3"><h4 className="font-semibold text-white/90">RBI holds repo rate, projects 7.2% GDP growth for FY25</h4><p className="text-sm text-gray-400 mt-1">Economic Times &bull; 35 mins ago</p></div>
            <div className="border-b border-white/10 pb-3"><h4 className="font-semibold text-white/90">Tech stocks rally on strong US cues; Infosys, TCS lead gains</h4><p className="text-sm text-gray-400 mt-1">Reuters &bull; 1 hour ago</p></div>
            <div><h4 className="font-semibold text-white/90">SEBI proposes tighter regulations for derivatives trading</h4><p className="text-sm text-gray-400 mt-1">Livemint &bull; 2 hours ago</p></div>
        </Card>
    </section>
);

const Footer = () => (
    <footer className="mt-16 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <p className="font-semibold text-white/90 mb-2">&copy; 2025 AlphaStream. All Rights Reserved.</p>
            <p className="text-xs max-w-2xl mx-auto">
                <span className="font-semibold text-gray-300">Disclaimer:</span> AlphaStream provides data and analysis for informational purposes only and does not constitute financial advice. All investments carry risk. Consult with a qualified financial advisor before making any investment decisions. Past performance is not indicative of future results.
            </p>
        </div>
    </footer>
);

const Dashboard = () => (
    <>
        <MarketSnapshot />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
                <HourlyStocks />
                <LongTermStocks />
            </div>
            <div className="space-y-12">
                <Portfolio />
                <NewsFeed />
            </div>
        </div>
    </>
);

const Learn = () => {
    const [activeRisk, setActiveRisk] = useState('bonds');
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showQuizResult, setShowQuizResult] = useState(false);

    const riskLevels = {
        bonds: { level: 15, color: 'bg-green-500', label: 'Very Low' },
        mutualFunds: { level: 50, color: 'bg-yellow-500', label: 'Medium' },
        stocks: { level: 85, color: 'bg-red-500', label: 'High' },
    };

    const quizQuestions = [
        {
            id: 1,
            question: "Which investment is like owning a tiny piece of a company?",
            options: ["Bonds", "Stocks", "Mutual Funds"],
            answer: "Stocks"
        },
        {
            id: 2,
            question: "What is the main advantage of a Mutual Fund?",
            options: ["Guaranteed returns", "Diversification (spreading risk)", "It's managed by the government"],
            answer: "Diversification (spreading risk)"
        },
        {
            id: 3,
            question: "Which investment is considered the safest because you're lending money to the government?",
            options: ["Stocks", "Bonds", "All of the above"],
            answer: "Bonds"
        }
    ];

    const handleQuizChange = (questionId, answer) => {
        setQuizAnswers({ ...quizAnswers, [questionId]: answer });
    };

    const calculateScore = () => {
        return quizQuestions.reduce((score, q) => {
            return score + (quizAnswers[q.id] === q.answer ? 1 : 0);
        }, 0);
    };

    return (
        <section id="learn-section">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white/90 tracking-tight">Investing for Beginners: Your Guide to Growing Money 🚀</h1>
                <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">Welcome to the AlphaStream Learning Hub! We've made these concepts simple and interactive so you can start your journey with confidence.</p>
            </div>

            <h2 className="text-3xl font-semibold text-white/90 mb-6 tracking-tight">Interactive Risk Meter</h2>
            <Card className="p-8 mb-12">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="w-full lg:w-1/2">
                        <p className="text-gray-300 mb-4">Click on an investment type to see its typical risk level. Understanding risk is the first step to smart investing.</p>
                        <div className="flex space-x-4">
                            <button onClick={() => setActiveRisk('bonds')} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeRisk === 'bonds' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'}`}>Bonds</button>
                            <button onClick={() => setActiveRisk('mutualFunds')} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeRisk === 'mutualFunds' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'}`}>Mutual Funds</button>
                            <button onClick={() => setActiveRisk('stocks')} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeRisk === 'stocks' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-300'}`}>Stocks</button>
                        </div>
                        <div className="mt-6">
                            {activeRisk === 'bonds' && <p className="text-gray-400">Bonds are very safe because you are lending to a government or a large corporation that is highly likely to pay you back.</p>}
                            {activeRisk === 'mutualFunds' && <p className="text-gray-400">Mutual funds spread your money across many investments, so the failure of one doesn't affect you as much. This diversification lowers your risk.</p>}
                            {activeRisk === 'stocks' && <p className="text-gray-400">Stocks can offer the highest returns, but they also come with the highest risk because a single company's fortunes can change quickly.</p>}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="w-full h-8 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full transition-all duration-500 ease-out ${riskLevels[activeRisk].color}`} style={{ width: `${riskLevels[activeRisk].level}%` }}></div>
                        </div>
                        <div className="text-center mt-2">
                            <span className="font-semibold text-lg" style={{ color: riskLevels[activeRisk].color.replace('bg-', '').replace('-500', '-400') }}>{riskLevels[activeRisk].label} Risk</span>
                        </div>
                    </div>
                </div>
            </Card>

            <h2 className="text-3xl font-semibold text-white/90 mb-6 tracking-tight">Key Terms to Know</h2>
            <Card className="p-8 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="relative group">
                        <p className="text-blue-400 font-semibold cursor-pointer">Wealth</p>
                        <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-900 border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">The total value of money and assets you own.</div>
                    </div>
                    <div className="relative group">
                        <p className="text-blue-400 font-semibold cursor-pointer">Diversification</p>
                        <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-900 border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Spreading your money across different investments to reduce risk.</div>
                    </div>
                    <div className="relative group">
                        <p className="text-blue-400 font-semibold cursor-pointer">Interest</p>
                        <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-900 border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">The extra money you earn for lending your money (like with bonds).</div>
                    </div>
                    <div className="relative group">
                        <p className="text-blue-400 font-semibold cursor-pointer">Long-Term</p>
                        <div className="absolute bottom-full mb-2 w-48 p-2 bg-gray-900 border border-white/10 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Investing for many years (5+) to allow your money to grow significantly.</div>
                    </div>
                </div>
            </Card>

            <h2 className="text-3xl font-semibold text-white/90 mb-6 tracking-tight">Check Your Knowledge</h2>
            <Card className="p-8">
                {quizQuestions.map((q, index) => (
                    <div key={q.id} className={`py-4 ${index < quizQuestions.length - 1 ? 'border-b border-white/10' : ''}`}>
                        <p className="font-semibold text-white/90 mb-3">{q.id}. {q.question}</p>
                        <div className="space-y-2">
                            {q.options.map(option => (
                                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                    <input type="radio" name={`question-${q.id}`} value={option} onChange={() => handleQuizChange(q.id, option)} className="form-radio h-4 w-4 text-blue-500 bg-gray-700 border-gray-600" />
                                    <span className="text-gray-300">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={() => setShowQuizResult(true)} className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">Submit Answers</button>
                {showQuizResult && (
                    <div className="mt-6 text-center p-4 bg-white/10 rounded-lg">
                        <h3 className="text-xl font-bold text-white">Your Score: {calculateScore()} out of {quizQuestions.length}</h3>
                        <p className="text-gray-300 mt-2">{calculateScore() === quizQuestions.length ? "Excellent! You're an investing whiz! 🏆" : "Great start! Review the sections above to master the concepts."}</p>
                    </div>
                )}
            </Card>
        </section>
    );
};


// --- Main App Component ---
export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/30"></div>
            <div className="relative">
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                    {activeTab === 'dashboard' && <Dashboard />}
                    {activeTab === 'learn' && <Learn />}
                </main>
                <Footer />
            </div>
        </div>
    );
}
