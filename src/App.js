import "./App.css";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useState } from "react";

function App() {
  const [isLoginFB, setIsLoginFB] = useState(false);
  const [isLoginGoogle, setIsLoginGoogle] = useState(false);
  const [nameFB, setNameFB] = useState("");
  const [nameGoogle, setNameGoogle] = useState("");
  const [pictureFB, setPictureFB] = useState("");
  const [pictureGoogle, setPictureGoogle] = useState("");
  const responseFacebook = (response) => {
    setIsLoginFB(true);
    setNameFB(response.name);
    setPictureFB(response.picture.data.url);
  };

  const responseSuccessGoogle = (response) => {
    setIsLoginGoogle(true);
    setNameGoogle(response.profileObj.familyName);
    setPictureGoogle(response.profileObj.imageUrl);
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const handleGoogleLogout = () => {
    setIsLoginGoogle(false);
    window.location.reload();
  };

  const handleFBLogout = () => {
    setIsLoginFB(false);
    window.FB.logout();
    window.location.reload();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="loginPage">
            {!isLoginGoogle && (
              <div className="mt-3">
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FB_APPID}`}
                  autoLoad={true}
                  fields={`${process.env.REACT_APP_FB_FIELDS}`}
                  callback={responseFacebook}
                />
              </div>
            )}
            {!isLoginFB && (
              <div className="mt-3">
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseErrorGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            )}
            <div className="mt-3">
              {isLoginFB && (
                <button
                  onClick={() => handleFBLogout()}
                  style={{ backgroundColor: '#4c69ba', color: '#ffff', border: 0, fontFamily: 'Helvetica,sans-serif', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block' }}

                >
                  Logout Facebook
                </button>
              )}
            </div>
            <div className="mt-3">
              {isLoginGoogle && (
                <GoogleLogout
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENTID}`}
                  onLogoutSuccess={handleGoogleLogout}
                />
              )}
            </div>
            {isLoginFB && (
              <>
                <div className="mt-3">
                  <img src={pictureFB} alt="img" />
                  <p className="mt-2">{nameFB}</p>
                </div>
              </>
            )}
            {isLoginGoogle && (
              <>
                <div className="mt-3">
                  <img src={pictureGoogle} alt="img2" />
                  <p className="mt-2">{nameGoogle}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
