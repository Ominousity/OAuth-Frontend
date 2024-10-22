function CallbackWrapper() {
  Callback().catch((error) => {
    console.error("Error in Callback:", error);
  });

  return <></>;
}

async function Callback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    const tokenresponse = await exchangeCodeForToken(code);
    if (tokenresponse) {
      localStorage.setItem("token", tokenresponse.access_token);
      localStorage.setItem("refreshToken", tokenresponse.refresh_token);

      window.location.href = "/";
    }
    console.log("code", tokenresponse.access_token);
  } else {
    console.error("no code");
  }

  return <></>;
}

export default CallbackWrapper;

const exchangeCodeForToken = async (code: string) => {
  const tokenUrl = `https://localhost:8080/auth/realms/master/protocol/openid-connect/token`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: "vigfyhdfxctgurfcty",
    code: code,
    redirect_uri: `${window.location.origin}/callback`,
  });

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for token");
    }

    return response.json(); // Access and refresh tokens
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};
