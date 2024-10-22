
function App() {
  function handleLogin() {
    const keycloakAuthurl = "http://localhost:8080/realms/master/protocol/openid-connect/auth"
    const clientId = "vigfyhdfxctgurfcty"
    const redirectUri = window.location.origin + "/callback"

    const authurl = `${keycloakAuthurl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid`
    window.location.href = authurl
  }

  return (
    <>
      <div className="card">
        <button onClick={handleLogin}>
          Login or sometin?
        </button>
       
      </div>
    </>
  )
}

export default App
