import * as shape from "d3-shape";
import { scaleLinear } from "d3-scale";
import "react-native-reanimated";
import { parse } from "react-native-redash";

import Layout from "../constants/Layout";
import { DataPoints, DateTimeFormat, TChains } from "types";
import { TOKENS } from "../constants/Dummies";

export const truncate = (str: string) => {
  if (!str) {
    return "";
  }
  return `${str.substring(0, 4)}...${str.substring(
    str.length - 4,
    str.length
  )}`;
};

export const dateFormat = (date?: string) => {
  const format: DateTimeFormat = {
    month: "short",
    day: "numeric",
    year: "2-digit",
  };

  if (date) {
    return new Date(date).toLocaleDateString("en-US", format);
  }

  return new Date().toLocaleDateString("en-US", format);
};

export const convertTokenToDollars = (
  price: number,
  token: TChains
): number => {
  if (!token || !price) {
    return 0;
  }
  const chain = TOKENS[token];

  const total = price * chain.priceUSD;
  return total;
};

export const formatToUSD = (
  price: number,
  token?: TChains,
  sign: string = "US "
) => {
  if (price && !token) {
    const amount = new Intl.NumberFormat().format(price);
    return `${sign}${amount}`;
  }

  if (!token || !price) {
    return Number(0).toFixed(2).toLocaleString();
  }

  const total = convertTokenToDollars(price, token);
  const amount = new Intl.NumberFormat().format(total);
  return `${sign}${amount}`;
};

const POINTS = 60;
const SIZE = Layout.window.width;

export const buildGraph = (datapoints: DataPoints, label: string) => {
  const priceList = datapoints.prices.slice(0, POINTS);
  const formattedValues = priceList.map(
    (price) => [parseFloat(price[0]), price[1]] as [number, number]
  );
  const prices = formattedValues.map((value) => value[0]);
  const dates = formattedValues.map((value) => value[1]);
  const scaleX = scaleLinear()
    .domain([Math.min(...dates), Math.max(...dates)])
    .range([0, SIZE]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([SIZE, 0]);
  return {
    label,
    minPrice,
    maxPrice,
    percentChange: datapoints.percent_change,
    path: parse(
      shape
        .line()
        .x(([, x]) => scaleX(x) as number)
        .y(([y]) => scaleY(y) as number)
        .curve(shape.curveBasis)(formattedValues) as string
    ),
  };
};
