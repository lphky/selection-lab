export const operators = {
  '=': (a,b)=>a===b, '≠': (a,b)=>a!==b, '<': (a,b)=>a<b,
  '≤': (a,b)=>a<=b, '>': (a,b)=>a>b, '≥': (a,b)=>a>=b
};
const start={id:'start',type:'start',text:'開始',next:'input',x:260,y:35};
const input={id:'input',type:'input',text:'輸入 mark',next:'test',x:260,y:110};
const end={id:'end',type:'end',text:'結束',x:260,y:690};
const node=(id,type,text,x,y,extra={})=>({id,type,text,x,y,...extra});
const test=(id,text,x,y,check,yes,no,indent=0)=>node(id,'test',text,x,y,{check,yes,no,indent});
const set=(id,text,x,y,apply,next,indent=0)=>node(id,'set',text,x,y,{apply,next,indent});
const out=(id,text,x,y,value,next,indent=0)=>node(id,'output',text,x,y,{value,next,indent});
export const lessons=[
  {title:'條件判斷',en:'BOOLEAN EXPRESSIONS',tag:'01',intro:'一句條件，只有兩種答案。先觀察「剛好等於」時會發生甚麼。',goal:'分辨六種關係運算符，特別是包含等號的臨界值。',tip:'布爾算式（Boolean expression）的結果是 True 或 False。偽代碼 = 是比較，← 才是賦值。',input:'mark',default:50,min:0,max:100,presets:[49,50,51],nodes:[start,input,test('test','mark ≥ 50',260,230,v=>v.mark>=50,'true','false'),out('true','輸出 True',420,400,()=> 'True','end',1),out('false','輸出 False',100,400,()=> 'False','end',1),end]},
  {title:'如果……則',en:'IF · THEN',tag:'02',intro:'條件成立才進入區塊；不成立，就跳過它。',goal:'理解 if 沒有 else 時，不成立並不會自動產生另一個結果。',tip:'這個例子先把 grade 設為「未設定」。若沒有初始化，便不能假設略過 if 後 grade 會是「不及格」。',input:'mark',default:45,min:0,max:100,presets:[49,50,51],nodes:[start,{...input,next:'init'},set('init','grade ← "未設定"',260,180,v=>{v.grade='未設定';},'test'),test('test','mark ≥ 50',260,290,v=>v.mark>=50,'pass','print'),set('pass','grade ← "及格"',430,430,v=>{v.grade='及格';},'print',1),out('print','輸出 grade',260,570,v=>v.grade,'end'),end]},
  {title:'如果……否則',en:'IF · THEN · ELSE',tag:'03',intro:'兩條路，只會走其中一條。50 分究竟屬於哪一邊？',goal:'辨認互斥分支，掌握 > 與 ≥ 的差異。',tip:'條件為 True 執行「則」分支；False 執行「否則」分支。兩者之後匯合，繼續執行。',input:'mark',default:50,min:0,max:100,presets:[49,50,51],nodes:[start,input,test('test','mark ≥ 50',260,250,v=>v.mark>=50,'pass','fail'),set('pass','grade ← "及格"',420,420,v=>{v.grade='及格';},'print',1),set('fail','grade ← "不及格"',100,420,v=>{v.grade='不及格';},'print',1),out('print','輸出 grade',260,570,v=>v.grade,'end'),end]},
  {title:'嵌套與縮排',en:'NESTED SELECTION',tag:'04',intro:'先通過外層，才有機會回答內層問題。縮排告訴你每行屬於哪裏。',goal:'追蹤內外層條件，辨認 else 歸屬及區塊外的輸出。',tip:'只有外層 mark ≥ 50 成立，才會判斷 mark ≥ 85。最後「完成」在區塊外，所以任何輸入都會輸出。',input:'mark',default:80,min:0,max:100,presets:[30,50,85,95],nodes:[start,input,test('test','mark ≥ 50',260,220,v=>v.mark>=50,'inner','fail'),test('inner','mark ≥ 85',390,345,v=>v.mark>=85,'great','pass',1),out('great','輸出 "優異"',490,470,()=> '優異','done',2),out('pass','輸出 "及格"',290,470,()=> '及格','done',2),out('fail','輸出 "再努力"',80,470,()=> '再努力','done',1),out('done','輸出 "完成"',260,585,()=> '完成','end'),end]},
  {title:'多向選擇',en:'IF · ELSEIF · ELSE',tag:'05',intro:'由上而下逐一判斷。第一個成立的分支，就是本次的選擇。',goal:'比較嵌套與 elseif 寫法，理解條件次序為何重要。',tip:'先判斷 ≥ 85，再判斷 ≥ 50。若次序倒轉，95 已命中第一個 ≥ 50 分支，不會再檢查 ≥ 85。',input:'mark',default:80,min:0,max:100,presets:[0,49,50,84,85,100],nodes:[start,input,test('test','mark ≥ 85',260,230,v=>v.mark>=85,'a','second'),set('a','grade ← "A"',450,320,v=>{v.grade='A';},'print',1),test('second','mark ≥ 50',200,390,v=>v.mark>=50,'b','f'),set('b','grade ← "B"',360,480,v=>{v.grade='B';},'print',1),set('f','grade ← "F"',80,480,v=>{v.grade='F';},'print',1),out('print','輸出 grade',260,590,v=>v.grade,'end'),end]},
  {title:'追蹤與挑戰',en:'TRACE & REASON',tag:'06',intro:'賦值會改變下一次判斷。最終的數值，未必就是螢幕輸出。',goal:'逐步記錄變量，區分賦值、判斷及輸出。',tip:'x ← x + 5 是把目前的 x 加 5 後存回 x，不是數學等式。沒有執行「輸出」就不會在輸出區出現。',input:'x',default:20,min:-50,max:100,presets:[10,20,21],nodes:[start,{...input,text:'輸入 x',next:'init'},set('init','y ← 10',260,180,v=>{v.y=10;},'test'),test('test','x + y > 30',260,280,v=>v.x+v.y>30,'inc','dec'),set('inc','x ← x + 5',420,415,v=>{v.x+=5;},'print',1),set('dec','y ← x − 5',100,415,v=>{v.y=v.x-5;},'print',1),out('print','輸出 y',260,570,v=>v.y,'end'),end]}
];
export function codeRows(index,variant='normal') {
  const l=lessons[index], n=id=>l.nodes.find(n=>n.id===id);
  const r=(id,indent,text=n(id).text,scope='主程序')=>({id,indent,text,scope});
  if(index===0)return [r('input',0),r('test',0,'判斷 mark ≥ 50'),r('true',1,'若成立：輸出 True','True 分支'),r('false',1,'若不成立：輸出 False','False 分支')];
  if(index===1)return [r('input',0),r('init',0),r('test',0,'如果 mark ≥ 50 則'),r('pass',1,undefined,'if 區塊'),r('print',0)];
  if(index===2)return [r('input',0),r('test',0,'如果 mark ≥ 50 則'),r('pass',1,undefined,'if 區塊'),{id:'else',indent:0,text:'否則',scope:'與外層 if 配對'},r('fail',1,undefined,'else 區塊'),r('print',0)];
  if(index===3)return [r('input',0),r('test',0,'如果 mark ≥ 50 則'),r('inner',1,'如果 mark ≥ 85 則','外層 if 區塊'),r('great',2,undefined,'內層 if 區塊'),{id:'else-inner',indent:1,text:'否則',scope:'配對 mark ≥ 85'},r('pass',2,undefined,'內層 else 區塊'),{id:'else-outer',indent:0,text:'否則',scope:'配對 mark ≥ 50'},r('fail',1,undefined,'外層 else 區塊'),r('done',0)];
  if(index===4)return [r('input',0),r('test',0,'如果 mark ≥ 85 則'),r('a',1,undefined,'第一分支'),r('second',variant==='nested'?1:0,variant==='nested'?'否則：如果 mark ≥ 50 則':'否則如果 mark ≥ 50 則','只有第一條件不成立才判斷'),r('b',variant==='nested'?2:1,undefined,'第二分支'),{id:'else',indent:variant==='nested'?1:0,text:'否則',scope:'其餘情況'},r('f',variant==='nested'?2:1,undefined,'最後分支'),r('print',0)];
  return [r('input',0),r('init',0),r('test',0,'如果 x + y > 30 則'),r('inc',1,undefined,'if 區塊'),{id:'else',indent:0,text:'否則',scope:'配對 x + y > 30'},r('dec',1,undefined,'else 區塊'),r('print',0)];
}
const q=(lesson,prompt,options,answer,why,hint,code='')=>({lesson,prompt,options,answer,why,hint,code});
export const questions=[
 q(0,'age = 65，條件 age < 65 的結果？',['True','False'],1,'65 與 65 相等，並沒有小於 65，所以是 False。','留意有沒有等號。'),
 q(0,'mark = 50，哪個條件是 True？',['mark > 50','mark ≠ 50','mark ≥ 50','mark < 50'],2,'≥ 包括相等，所以 50 ≥ 50 為 True；其餘三項均為 False。','把 50 代入每個條件。'),
 q(0,'x = 7，條件 x ≠ 8 的結果？',['True','False'],0,'7 與 8 不相等，因此 ≠ 的結果是 True。','≠ 代表不相等。'),
 q(0,'哪一句是把值存入變量？',['score = 10','score ← 10','score ≥ 10'],1,'← 表示賦值，將 10 存進 score；另外兩個是比較。','判斷和賦值使用不同符號。'),
 q(1,'mark = 49，實際輸出是甚麼？',['及格','不及格','沒有輸出'],2,'49 ≥ 50 是 False，跳過唯一的輸出語句；沒有 else，沒有其他輸出。','沒有 else 時會自動輸出別的內容嗎？','如果 mark ≥ 50 則\n    輸出 "及格"'),
 q(1,'mark = 50，實際輸出是甚麼？',['及格','沒有輸出','50'],0,'50 ≥ 50 是 True，執行區塊中的「輸出 及格」。','≥ 包括相等。','如果 mark ≥ 50 則\n    輸出 "及格"'),
 q(1,'mark = 20，最後 grade 是甚麼？',['及格','未設定','不及格'],1,'先賦值為未設定；20 ≥ 50 為 False，不執行賦值，所以 grade 保持未設定。','只執行路徑上的賦值。','grade ← "未設定"\n如果 mark ≥ 50 則\n    grade ← "及格"'),
 q(1,'若 grade 從未初始化，且 if 分支沒有執行，可以斷定它是「不及格」嗎？',['可以','不可以'],1,'不可以。沒有執行賦值不能推論 grade 的值，應先初始化或提供完整分支。','沒有給值，能保證某個值嗎？'),
 q(2,'mark = 50，下面會輸出甚麼？',['及格','不及格','兩者都有'],0,'50 ≥ 50 成立，只執行 if 分支，跳過 else。','只會走一個分支。','如果 mark ≥ 50 則\n    輸出 "及格"\n否則\n    輸出 "不及格"'),
 q(2,'把及格條件由 ≥ 50 改為 > 50，哪個分數的結果改變？',['49','50','51'],1,'只有剛好 50：原先成立，改成 > 後不成立。49 和 51 的判斷不變。','檢查剛好等於門檻的值。'),
 q(2,'mark = 49，下面實際輸出是甚麼？',['及格','不及格','沒有輸出'],1,'49 ≥ 50 為 False，執行 else，輸出不及格。','False 會走哪個分支？','如果 mark ≥ 50 則\n    輸出 "及格"\n否則\n    輸出 "不及格"'),
 q(2,'一般 if…else 在一次執行中，會執行多少個分支？',['零個','一個','兩個'],1,'條件非 True 即 False，必定執行其中一個分支，再匯合繼續。','兩個分支互斥。'),
 q(3,'mark = 40，內層 mark ≥ 85 會被判斷嗎？',['會','不會'],1,'外層 40 ≥ 50 為 False，直接走外層 else，沒有進入內層。','先檢查外層。','如果 mark ≥ 50 則\n    如果 mark ≥ 85 則\n        輸出 "優異"\n    否則\n        輸出 "及格"\n否則\n    輸出 "再努力"'),
 q(3,'mark = 70，實際輸出是甚麼？',['優異','及格','再努力'],1,'70 ≥ 50 為 True；70 ≥ 85 為 False，執行內層 else，輸出及格。','先外後內，逐個代入。','如果 mark ≥ 50 則\n    如果 mark ≥ 85 則\n        輸出 "優異"\n    否則\n        輸出 "及格"\n否則\n    輸出 "再努力"'),
 q(3,'x = 0，下面實際輸出是甚麼？',['完成','正數、完成','沒有輸出'],0,'0 > 0 為 False，略過正數；「完成」在區塊外，仍會執行。','觀察最後一行的縮排。','如果 x > 0 則\n    輸出 "正數"\n輸出 "完成"'),
 q(3,'內層「否則」對應哪個條件？',['mark ≥ 50','mark ≥ 85','兩者都對應'],1,'它與縮排相同的內層 if 配對，對應 mark ≥ 85。','對照 if 與 else 的縮排。','如果 mark ≥ 50 則\n    如果 mark ≥ 85 則\n        輸出 "優異"\n    否則\n        輸出 "及格"'),
 q(4,'分級 A ≥ 85、B ≥ 50、否則 F；mark = 84 的等級？',['A','B','F'],1,'84 ≥ 85 為 False，再判斷 84 ≥ 50 為 True，得到 B。','第一個條件不成立才檢查第二個。'),
 q(4,'相同分級規則，mark = 85 的等級？',['A','B','F'],0,'85 ≥ 85 為 True，直接得到 A，不再判斷後面的條件。','第一個條件已成立。'),
 q(4,'mark = 95，錯誤次序的程式會給出甚麼？',['A','B','F'],1,'95 ≥ 50 已成立，得到 B，後面的 elseif 不會執行；應先判斷較高門檻。','命中第一個分支後會跳過後面的分支。','如果 mark ≥ 50 則\n    grade ← "B"\n否則如果 mark ≥ 85 則\n    grade ← "A"\n否則\n    grade ← "F"'),
 q(4,'相同分級規則，哪組分數最能測試兩個門檻的兩側？',['0、100','49、50、84、85','30、60、90'],1,'49／50 測試 B 門檻兩側，84／85 測試 A 門檻兩側。','測試值應貼近邊界。'),
 q(5,'下面最後 x 的值？',['8','10','2'],1,'x 初始 8，8 > 5 為 True，執行 x ← 8 + 2，最後 x = 10。','賦值使用目前的 x。','x ← 8\n如果 x > 5 則\n    x ← x + 2'),
 q(5,'下面實際輸出是甚麼？',['10','8','沒有輸出'],2,'程式改變了 x，但沒有任何輸出語句，所以螢幕沒有輸出。','最終變量值等同實際輸出嗎？','x ← 8\n如果 x > 5 則\n    x ← x + 2'),
 q(5,'下面實際輸出是甚麼？',['4','8','12'],1,'2 × 4 ≥ 8 成立；8 ÷ 2 > 4 不成立，執行內層 else，y ← x 後輸出 8。','注意內層是 >，不是 ≥。','x ← 8\ny ← 4\n如果 2 × y ≥ x 則\n    如果 x ÷ 2 > y 則\n        x ← y\n        輸出 x\n    否則\n        y ← x\n        輸出 y'),
 q(5,'下面最後 y 的值？',['3','6','9'],2,'先把 x 更新為 6，再計算 y ← 6 + 3，得到 9。','下一行要用更新後的變量值。','x ← 3\nx ← x × 2\ny ← x + 3')
];
