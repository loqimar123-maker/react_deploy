import { useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  Mail,
  Power,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wifi,
} from 'lucide-react';

const PORT_FALLBACK = { x: 725, y: 360 };
const START = { x: 916, y: 567 };

function PowerSocket({ isPluggedIn, socketRef }) {
  return (
    <svg
      ref={socketRef}
      className={`power-socket ${isPluggedIn ? 'power-socket--live' : ''}`}
      viewBox="0 0 124 174"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="plate" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d9d5c9" />
          <stop offset=".48" stopColor="#a6a69b" />
          <stop offset="1" stopColor="#73786f" />
        </linearGradient>
        <linearGradient id="socketInset" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#171e1d" />
          <stop offset="1" stopColor="#343b36" />
        </linearGradient>
      </defs>
      <rect x="9" y="8" width="106" height="158" rx="18" fill="#090d0c" opacity=".22" />
      <rect x="5" y="3" width="106" height="158" rx="18" fill="url(#plate)" stroke="#e1ddcf" strokeOpacity=".55" />
      <rect x="10" y="9" width="96" height="146" rx="14" fill="none" stroke="#70766e" strokeOpacity=".45" />
      <circle cx="16" cy="15" r="2" fill="#73756c" />
      <circle cx="100" cy="149" r="2" fill="#73756c" />
      <rect x="25" y="33" width="66" height="96" rx="30" fill="url(#socketInset)" />
      <rect x="31" y="39" width="54" height="84" rx="25" fill="#0b1110" />
      <path d="M49 62a3.2 3.2 0 0 1 6.4 0v13a3.2 3.2 0 0 1-6.4 0z" fill="#050807" />
      <path d="M68 62a3.2 3.2 0 0 1 6.4 0v13a3.2 3.2 0 0 1-6.4 0z" fill="#050807" />
      <circle cx="62" cy="101" r="3.2" fill="#050807" />
      <path d="M22 25h70" stroke="#f4f0e3" strokeOpacity=".32" />
      {isPluggedIn && <circle cx="96" cy="24" r="3" fill="#b7e776" />}
    </svg>
  );
}

function Plug({ position, isPluggedIn, plugRef, onPointerDown, onPointerMove, onPointerUp, onClick }) {
  return (
    <button
      ref={plugRef}
      className={`plug ${isPluggedIn ? 'plug--connected' : ''}`}
      style={{ left: `${position.x / 10}%`, top: `${position.y / 7}%` }}
      type="button"
      aria-label={isPluggedIn ? 'Cabut steker dari stopkontak' : 'Colokkan steker ke stopkontak'}
      aria-pressed={isPluggedIn}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={onClick}
    >
      <span className="plug__cable-collar" />
      <svg viewBox="0 0 100 64" aria-hidden="true">
        <defs>
          <linearGradient id="plugBody" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f0ead8" />
            <stop offset=".5" stopColor="#c9c4b4" />
            <stop offset="1" stopColor="#898d82" />
          </linearGradient>
          <linearGradient id="plugMetal" x1="0" x2="1">
            <stop offset="0" stopColor="#999d92" />
            <stop offset=".45" stopColor="#f5f0df" />
            <stop offset="1" stopColor="#858b81" />
          </linearGradient>
        </defs>
        <path d="M4 24 23 24" stroke="#111716" strokeWidth="15" strokeLinecap="round" />
        <path d="M4 24 23 24" stroke="#38403a" strokeWidth="8" strokeLinecap="round" />
        <rect x="19" y="9" width="45" height="31" rx="10" fill="url(#plugBody)" stroke="#f2ecda" strokeOpacity=".45" />
        <path d="M59 16h22a5 5 0 0 1 5 5v7a5 5 0 0 1-5 5H59z" fill="#888e84" />
        <path d="M82 17h14a3 3 0 0 1 3 3v2H82zM82 27h17v2a3 3 0 0 1-3 3H82z" fill="url(#plugMetal)" />
        <path d="M29 13h23" stroke="#fffceb" strokeOpacity=".45" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function LoginForm({ hasError, onSubmit, onClearError, isPowered }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsSuccess(false);
    onSubmit({ email, password, onSuccess: () => setIsSuccess(true) });
  }

  return (
    <div className={`screen-content ${isPowered ? '' : 'screen-content--hidden'}`}>
      <div className="screen-topline">
        <div className="screen-brand"><span className="brand-dot" /> DAYLIGHT STUDIO</div>
        <span className="screen-clock"><Wifi size={12} strokeWidth={1.8} /> PRIVATE NETWORK</span>
      </div>

      <div className="login-copy">
        <div className="login-eyebrow"><span /> WORKSPACE ACCESS</div>
        <h2>Senang melihatmu<br /><em>kembali.</em></h2>
        <p>Masuk ke meja kerjamu dan lanjutkan dari terakhir kali.</p>
      </div>

      {isSuccess ? (
        <div className="success-state" role="status">
          <div className="success-icon"><Check size={24} /></div>
          <p className="field-label">BERHASIL TERHUBUNG</p>
          <h3>Selamat datang.</h3>
          <p>Monitor kamu kini siap menemani hari ini.</p>
          <button className="success-reset" type="button" onClick={() => setIsSuccess(false)}>Kembali ke login <ArrowRight size={14} /></button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label className="field-label" htmlFor="email">ALAMAT EMAIL</label>
          <div className="input-wrap">
            <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nama@email.com"
              value={email}
              onChange={(event) => { setEmail(event.target.value); if (hasError) onClearError(); }}
              required
            />
          </div>

          <div className="password-heading">
            <label className="field-label" htmlFor="password">KATA SANDI</label>
            <a href="#lupa-password" onClick={(event) => event.preventDefault()}>Lupa?</a>
          </div>
          <div className={`input-wrap ${hasError ? 'input-wrap--error' : ''}`}>
            <Fingerprint size={16} strokeWidth={1.7} aria-hidden="true" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(event) => { setPassword(event.target.value); if (hasError) onClearError(); }}
              required
            />
            <button className="password-toggle" type="button" aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} onClick={() => setShowPassword((current) => !current)}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {hasError && <div className="field-error" role="alert"><span /> Kata sandi keliru. Sambungan listrik terputus.</div>}

          <button className="submit-button" type="submit">
            <span>Masuk ke workspace</span>
            <span className="submit-arrow"><ArrowRight size={16} /></span>
          </button>
          <div className="form-footnote"><ShieldCheck size={13} /> Sambunganmu terenkripsi dan aman</div>
        </form>
      )}

      <div className="screen-bottomline"><span>EST. 2024</span><span>MAKE SPACE FOR GOOD WORK.</span></div>
    </div>
  );
}

function App() {
  const [isPluggedIn, setIsPluggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [position, setPosition] = useState(START);
  const [showSpark, setShowSpark] = useState(false);
  const [sparkPoint, setSparkPoint] = useState({ x: 864, y: 455 });
  const stageRef = useRef(null);
  const socketRef = useRef(null);
  const plugRef = useRef(null);
  const monitorPortRef = useRef(null);
  const dragRef = useRef({ active: false, moved: false, start: null, last: null, suppressClick: false });

  function getSocketGeometry() {
    const stage = stageRef.current.getBoundingClientRect();
    const socket = socketRef.current.getBoundingClientRect();
    const plug = plugRef.current.getBoundingClientRect();
    const outlet = {
      x: ((socket.left + socket.width / 2 - stage.left) / stage.width) * 1000,
      y: ((socket.top + socket.height / 2 - stage.top) / stage.height) * 700,
    };
    const plugWidthInUnits = (plug.width / stage.width) * 1000;
    return {
      outlet,
      plugPosition: { x: outlet.x - plugWidthInUnits * .49, y: outlet.y },
    };
  }

  function connectPlug() {
    const { outlet, plugPosition } = getSocketGeometry();
    setSparkPoint(outlet);
    setPosition(plugPosition);
    setIsPluggedIn(true);
    setHasError(false);
    setShowSpark(true);
    window.setTimeout(() => setShowSpark(false), 850);
  }

  function disconnectPlug() {
    setIsPluggedIn(false);
    setPosition(START);
  }

  function pointFromEvent(event) {
    const bounds = stageRef.current.getBoundingClientRect();
    return {
      x: Math.max(35, Math.min(965, ((event.clientX - bounds.left) / bounds.width) * 1000)),
      y: Math.max(45, Math.min(655, ((event.clientY - bounds.top) / bounds.height) * 700)),
    };
  }

  function handlePointerDown(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { active: true, moved: false, start: pointFromEvent(event), last: pointFromEvent(event), suppressClick: false };
  }

  function handlePointerMove(event) {
    if (!dragRef.current.active) return;
    const point = pointFromEvent(event);
    if (Math.hypot(point.x - dragRef.current.start.x, point.y - dragRef.current.start.y) > 8) dragRef.current.moved = true;
    dragRef.current.last = point;
    if (dragRef.current.moved) setPosition(point);
  }

  function handlePointerUp() {
    if (!dragRef.current.active) return;
    const { moved, last } = dragRef.current;
    dragRef.current.active = false;
    if (moved) {
      dragRef.current.suppressClick = true;
      window.setTimeout(() => { dragRef.current.suppressClick = false; }, 80);
      const { outlet } = getSocketGeometry();
      if (Math.hypot(last.x - outlet.x, last.y - outlet.y) < 118) connectPlug();
      else {
        if (isPluggedIn) setIsPluggedIn(false);
        setPosition(START);
      }
    }
  }

  function handlePlugClick() {
    if (dragRef.current.suppressClick) return;
    if (isPluggedIn) disconnectPlug();
    else connectPlug();
  }

  function handleLogin({ email, password, onSuccess }) {
    const valid = email.trim().toLowerCase() === 'desk@studio.id' && password === 'daya123';
    if (valid) onSuccess();
    else {
      setHasError(true);
      setIsPluggedIn(false);
      setPosition(START);
    }
  }

  const stageWidth = stageRef.current?.getBoundingClientRect().width ?? window.innerWidth;
  const plugWidth = plugRef.current?.getBoundingClientRect().width ?? 115;
  const stageBounds = stageRef.current?.getBoundingClientRect();
  const portBounds = monitorPortRef.current?.getBoundingClientRect();
  const port = stageBounds && portBounds
    ? {
      x: ((portBounds.left + portBounds.width / 2 - stageBounds.left) / stageBounds.width) * 1000,
      y: ((portBounds.top + portBounds.height / 2 - stageBounds.top) / stageBounds.height) * 700,
    }
    : PORT_FALLBACK;
  const cordEndOffset = (plugWidth / stageWidth) * 1000 * .45;
  const cableEnd = { x: position.x - cordEndOffset, y: position.y };
  const cablePath = `M ${port.x} ${port.y} C ${port.x + 64} ${port.y + 50}, ${cableEnd.x - 45} ${cableEnd.y - 70}, ${cableEnd.x} ${cableEnd.y}`;

  return (
    <main className="scene" ref={stageRef}>
      <div className="scene-grain" />
      <div className="wall-light wall-light--one" />
      <div className="wall-light wall-light--two" />
      <div className="wall-lines" />

      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Daylight Studio beranda">
          <span className="wordmark-icon"><span /></span>
          <span>daylight<span className="wordmark-period">.</span><small>STUDIO / 04</small></span>
        </a>
        <div className="topbar-center"><span className="live-dot" /> YOUR DESK IS WAITING</div>
        <div className={`power-status ${isPluggedIn ? 'power-status--on' : ''}`}>
          <span className="power-status__icon"><Power size={13} /></span>
          <span>{isPluggedIn ? 'POWER ON' : 'STANDBY'}</span>
          <span className="power-status__led" />
        </div>
      </header>

      <section className="intro" aria-label="Tentang demonstrasi">
        <p className="intro-kicker"><span>INTERACTIVE CONCEPT</span><span className="intro-rule" />01 / 01</p>
        <h1>Colokkan.<br /><em>Mulai.</em></h1>
        <p className="intro-description">Hari kerja dimulai dari satu<br />sambungan kecil.</p>
        <div className="intro-caption"><Sparkles size={13} strokeWidth={1.7} /><span>A LITTLE MOMENT<br />OF EVERYDAY MAGIC</span></div>
      </section>

      <div className="scene-note">
        <span className="note-index">01</span>
        <span className="note-copy">{isPluggedIn ? 'MONITOR TERHUBUNG' : 'TARIK STEKER KE STOPKONTAK'}</span>
        <span className="note-line" />
      </div>

      <svg className={`cable-svg ${isPluggedIn ? 'cable-svg--live' : ''}`} viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        <path className="cable-shadow" d={cablePath} />
        <path className="cable-base" d={cablePath} />
        {isPluggedIn && <path className="cable-glow" d={cablePath} />}
      </svg>

      <PowerSocket isPluggedIn={isPluggedIn} socketRef={socketRef} />
      {showSpark && <div className="spark-burst" style={{ left: `${sparkPoint.x / 10}%`, top: `${sparkPoint.y / 7}%` }} aria-hidden="true"><i /><i /><i /><i /><b /></div>}

      <div className={`monitor ${isPluggedIn ? 'monitor--on' : ''} ${hasError ? 'monitor--error' : ''}`}>
        <div className="monitor__shell">
          <div className="monitor__bezel">
            <div className="monitor__screen-frame">
              <div className="monitor__screen">
                <LoginForm isPowered={isPluggedIn} hasError={hasError} onSubmit={handleLogin} onClearError={() => setHasError(false)} />
                {!isPluggedIn && (
                  <div className="screen-off" role="status" aria-label="Status daya monitor">
                    <div className="standby-mark"><span /><span /><span /></div>
                    <span className="standby-text">{hasError ? 'POWER DISCONNECTED' : 'AWAITING POWER'}</span>
                  </div>
                )}
              </div>
              {isPluggedIn && <div className="screen-glare" />}
            </div>
            <div className="monitor__chin">
              <div className="monitor__brand">N<span>°</span>ORD</div>
              <div className="monitor__controls"><span /><span /><span /></div>
              <div className={`monitor__led ${isPluggedIn ? 'monitor__led--on' : ''}`} />
            </div>
          </div>
          <div className="monitor__neck" />
          <div className="monitor__base"><span /><span /><span /></div>
          <div className="monitor__port" ref={monitorPortRef} />
        </div>
      </div>

      <Plug
        position={position}
        isPluggedIn={isPluggedIn}
        plugRef={plugRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handlePlugClick}
      />

      <div className="desk-edge" />
      <div className="desk-top" />
      <div className="desk-front"><span className="desk-grain desk-grain--one" /><span className="desk-grain desk-grain--two" /><span className="desk-drawer"><i /><i /></span></div>
      <div className="desk-object desk-object--left"><div /><span /></div>
      <div className="desk-object desk-object--right"><span /><span /><span /></div>

      <aside className={`hint-card ${isPluggedIn ? 'hint-card--connected' : ''} ${hasError ? 'hint-card--error' : ''}`} aria-live="polite">
        <span className="hint-card__icon">{isPluggedIn ? <Check size={15} /> : hasError ? <Power size={15} /> : <UserRound size={15} />}</span>
        <span className="hint-card__copy">
          <strong>{isPluggedIn ? 'DAYA TERSAMBUNG' : hasError ? 'DAYA TERPUTUS' : 'MULAI DARI SINI'}</strong>
          <small>{isPluggedIn ? 'Demo: desk@studio.id · daya123' : hasError ? 'Kata sandi keliru — sambungkan kembali' : 'Klik atau seret steker ke stopkontak'}</small>
        </span>
        {!isPluggedIn && !hasError && <span className="hint-card__key">↗</span>}
      </aside>

      <footer className="footer-bar">
        <span>DESIGNED FOR THE EVERYDAY <span className="footer-star">✳</span></span>
        <span className="footer-center">A DESK SCENE, REIMAGINED</span>
        <span>INTERACTION STUDY <b>© 2026</b></span>
      </footer>
    </main>
  );
}

export default App;
