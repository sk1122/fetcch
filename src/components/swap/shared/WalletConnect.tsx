/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex w-full items-center justify-center space-x-2 rounded-md bg-fetcch-purple px-6 py-2 text-center text-sm font-medium text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      className="-ml-1 mr-2 "
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M2 3.5A1.5 1.5 0 0 1 3.5 2H11a2 2 0 0 1 2 2v.268A2 2 0 0 1 14 6v6a2 2 0 0 1-2 2H4.5A2.5 2.5 0 0 1 2 11.5v-8Zm1 0a.5.5 0 0 0 .5.5H12a1 1 0 0 0-1-1H3.5a.5.5 0 0 0-.5.5ZM10.5 8a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z"
                      ></path>
                    </svg>
                    <span className="font-semibold">Connect Wallet</span>
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="rounded-md bg-red-400 px-6 py-2 text-sm font-medium text-white"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="rounded-md bg-fetcch-purple px-6 py-2 text-sm font-medium text-white"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                        }}
                        className="mr-4 -ml-2 h-fit w-full rounded-md"
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 24, height: 24 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="rounded-md bg-fetcch-purple px-6 py-2 text-sm font-medium text-white"
                  >
                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;
