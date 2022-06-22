import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FC, useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';

const Example: FC = () => {
  const { data: account } = useAccount();
  const { data: signedMessage, signMessage, reset } = useSignMessage();

  const [, setLastForcedRenderAt] = useState(0);

  useEffect(() => {
    const onFocus = () => {
      setLastForcedRenderAt(Date.now());
    };

    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
    };
  });

  useEffect(() => {
    if (!account) {
      reset();
    }
  }, [account, reset]);

  useEffect(() => {
    if (account) {
      alert(`account connected: ${account.address}`);
    }
  }, [account]);

  useEffect(() => {
    if (signedMessage) {
      alert(`message signed: ${signedMessage}`);
    }
  }, [signedMessage]);

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
