import { FC } from "react";
import { useQuery } from "react-query";
import { getAssets } from "../api";
import { cryptoDB, accountDB } from "../db";

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
    let columnKey = 4;
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
    let subtotal = (amount(search(item.symbol, cryptoDB)) * usd(item.priceUsd)).toFixed(2);
    tableData.push([
      item.symbol,
      item.name || item.symbol,
      usd(item.priceUsd),
      (amount(search(item.symbol, cryptoDB))).toFixed(4),
      subtotal
    ]);
    total += parseFloat(subtotal);
  });
  accountDB.forEach(item => {
    let subtotal = (amount(item)).toFixed(2);
    tableData.push([
      item.code,
      item.name || item.code,
      1,
      amount(item),
      subtotal
    ]);
    total += parseFloat(subtotal);
  });
  console.log(total);

  return (
    <>
      {
        tableData && tableData.sort(sortFunction).map(item => {
          return (
            <tr key={item[0]}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
            </tr>
          );
        })
      }
      <tr className="footer">
        <td colSpan={5}>{total}</td>
      </tr>
    </>
  );
};