import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  MessageSquare, 
  PieChart, 
  Settings, 
  LayoutDashboard, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Phone,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    className={`nav-item ${active ? 'active' : ''}`} 
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

// --- Dummy Data ---

const analyticsData = [
  { name: 'Mon', appointments: 12, leads: 18 },
  { name: 'Tue', appointments: 15, leads: 22 },
  { name: 'Wed', appointments: 10, leads: 15 },
  { name: 'Thu', appointments: 25, leads: 30 },
  { name: 'Fri', appointments: 40, leads: 45 },
  { name: 'Sat', appointments: 55, leads: 60 },
  { name: 'Sun', appointments: 35, leads: 40 },
];

const channelData = [
  { name: 'WhatsApp', value: 450, color: '#2563eb' },
  { name: 'Phone', value: 300, color: '#8b5cf6' },
  { name: 'Website', value: 150, color: '#10b981' },
];

const leadData = [
  { id: 1, name: 'Test Customer', status: 'NEW', interest: 'not specified', phone: '+919990000001', source: 'WhatsApp' },
  { id: 2, name: 'Ritu Kapoor', status: 'NEW', interest: 'Bridal Makeup', phone: '+919123456789', source: 'WhatsApp' },
  { id: 3, name: 'Priya Sharma', status: 'BOOKED', interest: 'Hair Colour (Global)', phone: '+919876543210', source: 'WhatsApp' },
  { id: 4, name: 'Sneha Gupta', status: 'CONTACTED', interest: 'Manicure', phone: '+919988776655', source: 'Website' },
];

// --- Views ---

const HomeView = () => (
  <div className="view-content">
    <div className="stats-grid">
      <div className="card" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
        <div style={{background:'#f0fdf4', color:'#16a34a', padding:'12px', borderRadius:'12px'}}><Calendar size={24}/></div>
        <div>
          <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>0</h2>
          <p style={{color:'var(--text-muted)', fontSize:'0.875rem'}}>Today's Appointments</p>
        </div>
      </div>
      <div className="card" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
        <div style={{background:'#eff6ff', color:'#2563eb', padding:'12px', borderRadius:'12px'}}><Users size={24}/></div>
        <div>
          <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>0</h2>
          <p style={{color:'var(--text-muted)', fontSize:'0.875rem'}}>New Leads Today</p>
        </div>
      </div>
      <div className="card" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
        <div style={{background:'#fffbeb', color:'#d97706', padding:'12px', borderRadius:'12px'}}><Clock size={24}/></div>
        <div>
          <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>1</h2>
          <p style={{color:'var(--text-muted)', fontSize:'0.875rem'}}>Pending Confirmations</p>
        </div>
      </div>
      <div className="card" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
        <div style={{background:'#fef2f2', color:'#dc2626', padding:'12px', borderRadius:'12px'}}><AlertCircle size={24}/></div>
        <div>
          <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>1</h2>
          <p style={{color:'var(--text-muted)', fontSize:'0.875rem'}}>Flagged Chats</p>
        </div>
      </div>
    </div>

    <div style={{display:'flex', gap:'1.5rem', marginBottom:'2rem'}}>
      <a href="tel:+919865576670" style={{flex:1, textDecoration:'none'}}>
        <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', background:'linear-gradient(135deg, #2563eb, #3b82f6)', color:'white', border:'none', cursor:'pointer', transition:'transform 0.2s'}}>
          <Phone size={24}/>
          <div style={{textAlign:'left'}}>
            <h3 style={{fontSize:'1rem', fontWeight:'700'}}>Call Receptionist</h3>
            <p style={{fontSize:'0.75rem', opacity:0.8}}>Direct line to AI Voice Bot</p>
          </div>
        </div>
      </a>
      <a href="https://wa.me/919865576670" target="_blank" rel="noreferrer" style={{flex:1, textDecoration:'none'}}>
        <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem', background:'linear-gradient(135deg, #10b981, #34d399)', color:'white', border:'none', cursor:'pointer', transition:'transform 0.2s'}}>
          <MessageSquare size={24}/>
          <div style={{textAlign:'left'}}>
            <h3 style={{fontSize:'1rem', fontWeight:'700'}}>WhatsApp Bot</h3>
            <p style={{fontSize:'0.75rem', opacity:0.8}}>Chat with AI on WhatsApp</p>
          </div>
        </div>
      </a>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'2rem'}}>
      <div className="card" style={{minHeight:'300px'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'2rem'}}>
          <h3 style={{fontWeight:'700'}}>Today's Schedule</h3>
          <span style={{color:'var(--accent)', cursor:'pointer', fontSize:'0.875rem'}}>Full Calendar →</span>
        </div>
        <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'var(--text-muted)'}}>
           <Calendar size={48} style={{opacity:0.2, marginBottom:'1rem'}}/>
           <p>No appointments today.</p>
           <button style={{marginTop:'1.5rem', padding:'10px 20px', background:'var(--accent)', color:'white', border:'none', borderRadius:'10px', fontWeight:'600', cursor:'pointer'}}>Share Booking Link</button>
        </div>
      </div>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem'}}>
          <h3 style={{fontWeight:'700'}}>Recent Leads</h3>
          <span style={{color:'var(--accent)', cursor:'pointer', fontSize:'0.875rem'}}>View All →</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'1.25rem'}}>
          {leadData.map(lead => (
            <div key={lead.id} style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
              <div style={{width:'32px', height:'32px', background:'#f1f5f9', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700', fontSize:'0.75rem', color:'var(--accent)'}}>{lead.name[0]}</div>
              <div style={{flex:1}}>
                <h4 style={{fontSize:'0.875rem', fontWeight:'600'}}>{lead.name}</h4>
                <p style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>{lead.source} • 2h ago</p>
              </div>
              <div style={{fontSize:'0.75rem', fontWeight:'700', color: lead.status === 'NEW' ? '#2563eb' : lead.status === 'BOOKED' ? '#16a34a' : '#64748b'}}>{lead.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AppointmentsView = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="view-content">
      <div className="card" style={{padding:'2rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
          <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>April 2026</h2>
          <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <ChevronLeft size={20} style={{cursor:'pointer'}}/>
            <span style={{fontWeight:'600'}}>Today</span>
            <ChevronRight size={20} style={{cursor:'pointer'}}/>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', borderTop:'1px solid var(--border-color)', borderLeft:'1px solid var(--border-color)'}}>
          {days.map(d => (
            <div key={d} style={{padding:'10px', textAlign:'center', fontWeight:'600', color:'var(--text-muted)', fontSize:'0.75rem', borderRight:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)'}}>{d}</div>
          ))}
          {Array.from({length: 4}).map((_, i) => <div key={`empty-${i}`} style={{borderRight:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)', minHeight:'120px'}}></div>)}
          {dates.map(d => (
            <div key={d} style={{padding:'10px', minHeight:'120px', borderRight:'1px solid var(--border-color)', borderBottom:'1px solid var(--border-color)', position:'relative', background: d === 10 ? '#eff6ff' : 'transparent'}}>
              <span style={{fontSize:'0.875rem', fontWeight: d === 10 ? '700' : '400'}}>{d}</span>
              {d === 9 && (
                <div style={{display:'flex', gap:'4px', marginTop:'8px'}}>
                  <div style={{width:'6px', height:'6px', background:'#f59e0b', borderRadius:'50%'}}></div>
                  <div style={{width:'6px', height:'6px', background:'#10b981', borderRadius:'50%'}}></div>
                  <div style={{width:'6px', height:'6px', background:'#3b82f6', borderRadius:'50%'}}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeadsView = () => (
  <div className="view-content">
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2rem'}}>
       <div style={{position:'relative', width:'300px'}}>
          <Search size={18} style={{position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)'}}/>
          <input type="text" placeholder="Search leads..." style={{width:'100%', padding:'10px 10px 10px 40px', borderRadius:'10px', border:'1px solid var(--border-color)'}}/>
       </div>
       <div style={{display:'flex', gap:'1rem'}}>
          <button style={{padding:'10px 20px', background:'white', border:'1px solid var(--border-color)', borderRadius:'10px', fontWeight:'600', cursor:'pointer'}}>Export CSV</button>
          <button style={{padding:'10px 20px', background:'var(--accent)', color:'white', border:'none', borderRadius:'10px', fontWeight:'600', cursor:'pointer'}}>+ Add Lead</button>
       </div>
    </div>
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem'}}>
      {leadData.map(lead => (
        <div key={lead.id} className="card" style={{padding:'1.25rem'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: '1.25rem'}}>
            <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
               <div style={{width:'40px', height:'40px', background:'var(--accent)', color:'white', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'700'}}>{lead.name[0]}</div>
               <div>
                  <h3 style={{fontSize:'1rem', fontWeight:'700'}}>{lead.name}</h3>
                  <span style={{fontSize:'0.75rem', fontWeight:'700', color:'#2563eb'}}>{lead.status}</span>
               </div>
            </div>
            <MoreVertical size={18} style={{color:'var(--text-muted)', cursor:'pointer'}}/>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'0.75rem', fontSize:'0.875rem', marginBottom:'1.5rem'}}>
             <div style={{display:'flex', gap:'0.5rem', color:'var(--text-muted)'}}><Users size={16}/> <span>Interested in: <strong>{lead.interest}</strong></span></div>
             <div style={{display:'flex', gap:'0.5rem', color:'var(--text-muted)'}}><Phone size={16}/> <span>{lead.phone}</span></div>
             <div style={{display:'flex', gap:'0.5rem', color:'var(--text-muted)'}}><MessageSquare size={16}/> <span>Source: {lead.source}</span></div>
          </div>
          <div style={{display:'flex', borderTop:'1px solid var(--border-color)', margin:'0 -1.25rem', padding:'1rem 1.25rem 0', gap:'1rem'}}>
             <button style={{flex:1, padding:'8px', background:'transparent', border:'none', fontSize:'0.75rem', fontWeight:'600', color:'var(--text-muted)', cursor:'pointer'}}>View History</button>
             <button style={{flex:1, padding:'8px 12px', background:'var(--accent)', color:'white', border:'none', borderRadius:'8px', fontSize:'0.75rem', fontWeight:'600', cursor:'pointer'}}>Book Appt</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsView = () => (
  <div className="view-content">
    <div className="card" style={{marginBottom:'2rem', padding:'1.5rem'}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'2rem'}}>
        <div>
          <h3 style={{fontWeight:'700'}}>Appointments Over Time</h3>
          <p style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>Daily booking vs completion volume</p>
        </div>
        <div style={{color:'#16a34a', background:'#f0fdf4', padding:'4px 10px', borderRadius:'999px', fontSize:'0.75rem', fontWeight:'700', display:'flex', alignItems:'center', gap:'4px'}}>
          <TrendingUp size={14}/> +12.5%
        </div>
      </div>
      <div style={{height:'300px', width:'100%'}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:12, fill:'#94a3b8'}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize:12, fill:'#94a3b8'}} />
            <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}} />
            <Line type="monotone" dataKey="appointments" stroke="#2563eb" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
            <Line type="monotone" dataKey="leads" stroke="#8b5cf6" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:'2rem'}}>
      <div className="card">
        <h3 style={{fontWeight:'700', marginBottom:'1.5rem'}}>Channel Breakdown</h3>
        <div style={{height:'240px', position:'relative'}}>
           <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
           </ResponsiveContainer>
           <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', textAlign:'center'}}>
              <h4 style={{fontSize:'1.25rem', fontWeight:'800'}}>900</h4>
              <p style={{fontSize:'0.625rem', color:'var(--text-muted)'}}>Messages</p>
           </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'0.75rem', marginTop:'1rem'}}>
          {channelData.map(c => (
             <div key={c.name} style={{display:'flex', justifyContent:'space-between', fontSize:'0.875rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                   <div style={{width:'8px', height:'8px', borderRadius:'50%', background:c.color}}></div>
                   <span>{c.name}</span>
                </div>
                <span style={{fontWeight:'600'}}>{c.value}</span>
             </div>
          ))}
        </div>
      </div>
      <div className="card">
         <h3 style={{fontWeight:'700', marginBottom:'1.5rem'}}>Top Services</h3>
         <div style={{height:'350px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Hair Cut', val: 85 },
                { name: 'Bridal', val: 72 },
                { name: 'Manicure', val: 65 },
                { name: 'Facial', val: 58 },
                { name: 'Hair Spa', val: 42 },
                { name: 'Styling', val: 38 },
              ]} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize:12, fontWeight:600}} width={80} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="val" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [activeView, setActiveView] = useState('Home');
  const [stats, setStats] = useState({
    total_leads: 0,
    bookings_today: 0,
    missed_calls_recovered: 0,
    conversion_rate: 0
  });

  useEffect(() => {
    // Fetch real stats from backend
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'Home': return <HomeView />;
      case 'Appointments': return <AppointmentsView />;
      case 'Leads': return <LeadsView />;
      case 'Analytics': return <AnalyticsView />;
      default: return <HomeView />;
    }
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <LayoutDashboard size={20} color="white" />
          </div>
          Weblynk AI
        </div>
        
        <nav className="nav-group">
          <SidebarItem icon={BarChart3} label="Home" active={activeView === 'Home'} onClick={() => setActiveView('Home')} />
          <SidebarItem icon={Calendar} label="Appointments" active={activeView === 'Appointments'} onClick={() => setActiveView('Appointments')} />
          <SidebarItem icon={Users} label="Leads" active={activeView === 'Leads'} onClick={() => setActiveView('Leads')} />
          <SidebarItem icon={MessageSquare} label="Conversations" active={activeView === 'Conversations'} onClick={() => setActiveView('Conversations')} />
          <SidebarItem icon={PieChart} label="Analytics" active={activeView === 'Analytics'} onClick={() => setActiveView('Analytics')} />
          <SidebarItem icon={Settings} label="Settings" active={activeView === 'Settings'} onClick={() => setActiveView('Settings')} />
        </nav>

        <div className="sidebar-footer">
          <div className="profile-card">
            <div className="avatar">
               <img src="https://ui-avatars.com/api/?name=Salon+Owner&background=random" alt="Avatar" />
            </div>
            <div className="profile-info">
              <h4>Glitz & Glamour Salon</h4>
              <p>Salon Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="content-wrapper">
        <header className="header">
          <h1 style={{fontSize:'1.25rem', fontWeight:'600'}}>{activeView}</h1>
          <div style={{display:'flex', alignItems:'center', gap:'1.5rem'}}>
            <div style={{position:'relative'}}>
              <Search size={18} style={{position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)'}} />
              <input type="text" placeholder="Global search..." style={{padding:'8px 12px 8px 36px', borderRadius:'10px', border:'1px solid var(--border-color)', width:'260px', background:'#f8fafc', fontSize:'0.875rem'}} />
            </div>
            <div style={{position:'relative', cursor:'pointer'}}>
               <Bell size={20} style={{color:'var(--text-muted)'}} />
               <div style={{position:'absolute', top:'-2px', right:'-2px', width:'8px', height:'8px', background:'#ef4444', borderRadius:'50%', border:'2px solid white'}}></div>
            </div>
          </div>
        </header>
        {renderView()}
      </div>
    </>
  );
};

export default App;
