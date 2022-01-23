import Prim "mo:⛔";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Char "mo:base/Char";
import Debug "mo:base/Debug";

module {
    //传入时间戳得到utc时间字符串
    public func getUtcTime(time : Int): Text{
      //return Int.toText(Time.now());
     // 1638987906723612848
        let Days : [Int]=[31,28,31,30,31,30,31,31,30,31,30,31];
        var temp : Int = time;
        var Year : Int = 0;
        var Month : Nat = 1;
        var Day : Int = 1;
        var Hour : Int = 0;
        var Min : Int = 0;
        var Second : Int = 0;
        var Pass4year : Int = 0;
        var hours_per_year : Int = 0;
        Second := temp % 60_000_000_000;   //取秒
        Second /= 1000_000_000;
        temp /= 60_000_000_000;
        Min := temp % 60;     //取分
        temp /= 60;   //余下的小时
        //过去有多少个4年，每4年有 1461*24小时
        Pass4year := temp/(1461*24);
        //计算年份
        Year := 1970 + Pass4year*4;
        temp := temp %(1461*24);
         //校正闰年影响的年份，计算一年中剩下的小时数
    label l loop {
         //一年的hour = 365*24
         hours_per_year := 365*24;
         //判断闰年
         if((((Year%4)==0) and ((Year%100)!=0))  or ((Year%400)==0))
         {
             hours_per_year +=24;
         };
         if(temp < hours_per_year)
         {
             break l;
         };
         Year += 1;
         temp -= hours_per_year;
     };
      //小时数
     Hour := temp%24;
     temp /= 24;  //剩下的天数
     temp+=1;   //天数从1号开始
     if((((Year%4)==0)and((Year%100)!=0)) or((Year%400)==0))
     {
         if(temp > 60)
         {
             temp-=1;
         }
         else
         {
             if(temp == 60)
             {
                 Day := 29;
                 Month := 1;
                 return  Int.toText(Year) # ":" # Int.toText(Month) # ":" # Int.toText(Day) # " " # Int.toText(Hour) # ":" # Int.toText(Min) # ":" # Int.toText(Second) ;
             }
         }
     };
    //计算月日
    Month := 0;
     while(Days[Month] < temp)
     {
         temp -= Days[Month];
         Month+=1;
    };
    Day := temp;
    Month := Month+1;
    return  Int.toText(Year) # "-" # Int.toText(Month) # "-" # Int.toText(Day) # " " # Int.toText(Hour) # ":" # Int.toText(Min) # ":" # Int.toText(Second) ;
    };  
    
    public  func getTimeStamp(time : Text):  Nat{
        var Days : [var Nat]=[var 31,28,31,30,31,30,31,31,30,31,30,31];
        var res : Nat = 0;
        var Year : Nat = 0;
        var Month : Nat = 1;
        var curYear : Nat = 1;
        var Day : Nat = 1;
        var Hour : Nat = 0;
        var Min : Nat = 0;
        var Second : Nat = 0;
        var Pass4year : Nat = 0;
        Debug.print("123");
        var DeSpace : [Text] = Iter.toArray<Text>(Text.split(time , #char(' ')));
        var YearMonDay : [Text] = Iter.toArray<Text>(Text.split(DeSpace[0] , #char('-')));
        var HourMinSec : [Text] = Iter.toArray<Text>(Text.split(DeSpace[1] , #char(':')));
        Debug.print(HourMinSec[0]);
        Year := textToNat(YearMonDay[0]) - 1970;
        curYear := Year;
        if((((Year%4)==0) and ((Year%100)!=0))  or ((Year%400)==0)){
            Days[1] := 29;
        };
        Month := textToNat(YearMonDay[1]);
        Day := textToNat(YearMonDay[2]);
        Hour := textToNat(HourMinSec[0]);
        Min := textToNat(HourMinSec[1]);
        Second := textToNat(HourMinSec[2]);
        res += (Year / 4) * (1461*24*60*60);
        Year %=4 ;

        label l loop {
            //判断闰年
            if(Year <= 0){
                break l;
            };
            Year -= 1;
            curYear -= 1;
            if((((curYear%4)==0) and ((curYear%100)!=0))  or ((curYear%400)==0)){
                res += (366*24*60*60);
            }
            else{
                res += (365*24*60*60);
            };
        };
        var Mon :Nat = 0;
        while(Mon < Month - 1){
            res += Days[Mon]*24*60*60;
            Mon += 1;
        };
        res += (Day-1)*24*60*60;
        res += (Hour)*60*60;
        res += (Min)*60;
        res += Second;
        res
     };
     private func textToNat( txt : Text) : Nat {
        assert(txt.size() > 0);
        let chars = txt.chars();

        var num : Nat = 0;
        for (v in chars){
            let charToNum = Nat32.toNat(Char.toNat32(v)-48);
            assert(charToNum >= 0 and charToNum <= 9);
            num := num * 10 +  charToNum;          
        };

        num;
    };
};