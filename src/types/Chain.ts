type ChainId = '1' | '137';

export interface Chain {
  id: number;
  name: string;
  icon: string;
  chainId: ChainId;
}
