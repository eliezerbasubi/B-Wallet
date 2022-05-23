/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: undefined;
  Onboarding: undefined;
  Modal: undefined;
  Exchange: undefined;
  Trade: undefined;
  Send: undefined;
  Receive: undefined;
  TokenDetails: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeTab: undefined;
  TradeTab: undefined;
  ProfileTab: undefined;
  Exchange: undefined;
  Modal: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface IUser {
  username: string;
  amount: number;
  address: string;
  token: TChains;
}

export type TChains = "Bitcoin" | "Ethereum" | "Binance" | "Polygon";
export type TSymbol = "BTC" | "ETH" | "BSC" | "MATIC";
export type TActivity = "swap" | "buy" | "send" | "stake" | "approve";

export interface IToken {
  id?: number;
  name: TChains;
  symbol: TSymbol;
  icon: ImageSourcePropType;
  rate?: number;
  priceUSD: number;
  balance?: number;
  status?: "I" | "D";
  defaultSwapChain?: TChains;
}

export interface ITransaction {
  id?: number;
  type: TActivity;
  from?: TChains | string;
  to?: TChains | string;
  amount?: number;
  token?: TChains;
  date: string;
}

export interface DateTimeFormat {
  month: "short";
  day: "numeric";
  year: "2-digit";
}

export interface IWalletTab {
  title: string;
  id: number;
  route: any;
}

export interface Amount {
  amount: string;
  currency: string;
  scale: string;
}

export interface PercentChange {
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

export interface LatestPrice {
  amount: Amount;
  timestamp: string;
  percent_change: PercentChange;
}

export type PriceList = [string, number][];
export interface DataPoints {
  percent_change: number;
  prices: PriceList;
}

export interface Prices {
  latest: string;
  latest_price: LatestPrice;
  hour: DataPoints;
  day: DataPoints;
  week: DataPoints;
  month: DataPoints;
  year: DataPoints;
  all: DataPoints;
}

export type GraphIndex = 0 | 1 | 2 | 3 | 4;
