export default function MaintenancePage() {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "48px 32px",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            maxWidth: "420px",
            width: "90%",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔧</div>
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1e293b",
              margin: "0 0 12px 0",
            }}
          >
            Website wird gewartet
          </h1>
          <p style={{ fontSize: "15px", color: "#64748b", margin: 0, lineHeight: "1.6" }}>
            Diese Seite ist vorübergehend nicht verfügbar.<br />
            Wir sind bald wieder online.
          </p>
        </div>
      </body>
    </html>
  );
}
