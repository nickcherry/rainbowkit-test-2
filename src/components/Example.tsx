import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC, useEffect } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

const Example: FC = () => {
  const account = useAccount();
  const { data: signedMessage, signMessage, reset } = useSignMessage();

  useEffect(() => {
    if (!account) {
      reset();
    }
  }, [account, reset]);

  return (
    <div id="example">
      <ConnectButton />
      {account && (
        <button onClick={() => signMessage({ message: 'gm' })}>
          Sign Message
        </button>
      )}
      <div className="fields">
        <div className="field">
          <div className="label">url</div>
          <div className="value">{window.location.href}</div>
        </div>
        <div className="field">
          <div className="label">address</div>
          <div className="value">{account?.address || '–'}</div>
        </div>
        <div className="field">
          <div className="label">signed message</div>
          <div className="value">{signedMessage || '–'}</div>
        </div>
      </div>
    </div>
  );
};

export { Example };
