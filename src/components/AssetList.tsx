import { FC } from "react";
import { useQuery } from "react-query";
import { getAssets } from "../api";
import { cryptoDB, accountDB, altCoinDB } from "../db";

export const AssetList: FC = () => {

  function search(nameKey:any, myArray:any){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].code === nameKey) {
            return myArray[i];
        }
    }
  }

  function sum(values:Array<number>){
    return values.reduce((a, b) => a + b, 0);
  }

  function sortFunction(a:any, b:any) {
    let columnKey = 5;
    if (a[columnKey] === b[columnKey]) {
      return 0;
    }
    else {
      return (parseFloat(a[columnKey]) < parseFloat(b[columnKey])) ? 1 : -1;
    }
  }
  
  const assetsQuery = useQuery("assets", () => getAssets(), {
    refetchInterval: 60000 * 30,
  });

  function amount(obj:any) {
    return sum([
      obj?.ally1 || 0,
      obj?.ally2 || 0,
      obj?.ally3 || 0,
      obj?.blockfi || 0,
      obj?.brave1 || 0,
      obj?.cakefi || 0,
      obj?.coinbase || 0,
      obj?.gemini || 0,
      obj?.guideline || 0,
      obj?.kraken || 0,
      obj?.lendingclub || 0,
      obj?.lively || 0,
      obj?.benefitStrategies || 0,
    ]);
  }

  function usd(price:any) {
    return Math.round(Number(price) * 10000) / 10000.0;
  }

  console.clear();

  let tableData:Array<any> = [];
  let total = 0;

  assetsQuery.data && assetsQuery.data.forEach(item => {
    let currentAmount = amount(search(item.symbol, cryptoDB));
    let investment = search(item.symbol, cryptoDB).usdInvestment;
    let subtotal = currentAmount * usd(item.priceUsd);
    let category = investment < subtotal ? "success" : "";
    category = investment > subtotal ? "danger" : category;
    let gain = (subtotal - investment).toFixed(2);
    tableData.push([
      item.symbol,
      item.name || item.symbol,
      usd(item.priceUsd),
      currentAmount,
      investment,
      subtotal,
      gain,
      category,
    ]);
    total += subtotal;
  });

  altCoinDB.forEach(item => {
    let currentAmount = (amount(item));
    let subtotal = currentAmount * item.usd;
    let investment = item.usdInvestment;
    let category = investment < subtotal ? "success" : "";
    category = investment > subtotal ? "danger" : category;
    category += " non-track";
    let gain = (subtotal - investment).toFixed(2);
    tableData.push([
      item.code,
      item.name || item.code,
      item.usd,
      currentAmount,
      investment,
      subtotal,
      gain,
      category,
    ]);
    total += subtotal;
  });

  accountDB.forEach(item => {
    let subtotal = (amount(item)) * item.usd;
    let investment = item.usdInvestment || subtotal;
    let category = investment < subtotal ? "success" : "";
    category = investment > subtotal ? "danger" : category;
    let gain = (subtotal - investment).toFixed(2);
    tableData.push([
      item.code,
      item.name || item.code,
      item.usd,
      subtotal,
      investment,
      subtotal,
      gain,
      category,
    ]);
    total += subtotal;
  });

  return (
    <>
      {
        tableData && tableData.sort(sortFunction).map(item => {
          return (
            <tr key={item[0]} className={item[7]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2].toFixed(4)}</td>
              <td>{item[3].toFixed(4)}</td>
              <td>{item[4].toFixed(2)}</td>
              <td>{item[5].toFixed(2)}</td>
              <td>{item[6]}</td>
            </tr>
          );
        })
      }
      <tr className="footer">
        <td colSpan={7}>{total.toFixed(2)}</td>
      </tr>
    </>
  );
};