type ChainId = '4' | '80001';

export interface Chain {
  id: number;
  name: string;
  icon: string;
  chainId: ChainId;
}
