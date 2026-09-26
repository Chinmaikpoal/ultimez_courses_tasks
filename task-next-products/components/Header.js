export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <div className="brand-icon">U</div>
          <div className="brand-info">
            <h1>Ultimez Store</h1>
            <p>Frontend Developer Training &bull; Next.js SSR</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="ssr-badge">
            <span className="ssr-dot"></span>
            getServerSideProps Active
          </span>
        </div>
      </div>
    </header>
  );
}
