import '../styles/global.css';

import type { AppProps } from 'next/app';

import AppCOntextPRovider from '@/contexts/AppContext';
import { ChainContextProvider } from '@/contexts/chaincontext';
import ConnectWallet from '@/templates/ConnectWallet';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [valid, setValid] = useState(false);
  const [otp, setOtp] = useState("");

  // useEffect(() => {
  //   console.log(window.localStorage.getItem("ok") === "fetcch")
  // }, [])

  const validate = (otp: string) => {
    if (otp === process.env.NEXT_PUBLIC_OTP) {
      setValid(true);
    } else {
      alert("Visitor password is invalid");
    }
  };

  return (
    <AppCOntextPRovider>
      <ChainContextProvider>
        <Toaster />
        <ConnectWallet>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-2T1W588Y9J"
          />
          <Script>
            {`
              window.dataLayer = window.dataLayer || []
              function gtag(){
                window.dataLayer.push(arguments)
              }
              gtag('js', new Date());

              gtag('config', 'G-0KJ0S99TJ3');
            `}
          </Script>
          {valid && <Component {...pageProps} />}
          {!valid && (
            <>
              <div className="w-full h-screen bg-white text-black flex justify-center items-center flex-col space-y-3">
                <div className="w-54 h-full flex text-center justify-center items-center flex-col space-y-3">
                  <h1>Enter Visitor Password</h1>
                  <input
                    type="password"
                    placeholder="password"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 text-center rounded-xl border-black border"
                  />
                  <div
                    className="cursor-pointer w-full p-3 bg-black rounded-xl text-white"
                    onClick={() => validate(otp)}
                  >
                    Enter
                  </div>
                </div>
              </div>
            </>
          )}
        </ConnectWallet>
      </ChainContextProvider>
    </AppCOntextPRovider>
  );
}

export default MyApp;
