type ChainId = '4' | '80001' | '97';

export interface Chain {
  id?: number;
  name: string;
  icon: string;
  chainId: ChainId;
}
