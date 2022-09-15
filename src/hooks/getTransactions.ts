import React, {
  useState,
  useEffect
} from "react";
import {
  createClient
} from '@layerzerolabs/scan-client';
import toast from "react-hot-toast";

export const useGetTransactionData = () => {
  const [status, setStatus] = useState('');
  const [hash, setHash] = useState('');
  const client = createClient('mainnet');
  //setHash('0x8433a58d47d1903ff757ff222147b00c923529461de857ca11896b3d086d4615')


  useEffect(() => {
      if (hash) {
        const toastId = toast.loading("Swapping Tokens");
          let msgStatus;
          const interval = setInterval(() => {
              console.log('hash', hash);
              client
                  .getMessagesBySrcTxHash(hash)
                  .then((result: any) => {
                      console.log(result);
                      //'INFLIGHT' | 'DELIVERED' | 'FAILED';
                      msgStatus = result.messages[0].status;

                      if (msgStatus === 'DELIVERED') {
                          toast.success("Successfully Swapped Tokens", {id: toastId})
                          setStatus(msgStatus)
                          console.log('done');
                          clearInterval(interval);
                      }
                      if (msgStatus === 'FAILED') {
                        toast.error("Swapping Tokens Failed", {id: toastId})
                          setStatus(msgStatus)
                          console.log('status: ', msgStatus);
                          clearInterval(interval);
                      }
                  })
          }, 2000)
      }
  }, [hash])

  return {
      status,
      setHash
  };
}

// export const getTransFromhash = (hash) => {
//     const client = createClient('testnet');
//     console.log('hash', hash);
//     client
//         .getMessagesBySrcTxHash(hash)
//         .then((result) => {
//             console.log(result.messages)
//         })
// }