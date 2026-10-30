export function trace(lesson,value) {
  if(!Number.isInteger(value)||value<lesson.min||value>lesson.max)throw new Error('輸入超出範圍');
  const nodes=new Map(lesson.nodes.map(n=>[n.id,n]));
  let vars={},outputs=[],id='start',edges=[],history=[];
  const states=[{id:null,vars:{},outputs:[],edges:[],history:[],message:'準備好後，按「下一步」開始。'}];
  for(let count=0;id&&count<100;count++) {
    const n=nodes.get(id);if(!n)throw new Error('節點不存在：'+id);
    let next=n.next, message=n.text;
    if(n.type==='input'){vars[lesson.input]=value;message=`讀入 ${lesson.input} = ${value}。`;}
    if(n.type==='set'){n.apply(vars);message=`執行 ${n.text}，更新變量。`;}
    if(n.type==='test'){const result=!!n.check(vars);next=result?n.yes:n.no;message=`${n.text} → ${result?'True（是）':'False（否）'}，走「${result?'是':'否'}」分支。`;}
    if(n.type==='output'){outputs.push(String(n.value(vars)));message=`輸出「${outputs.at(-1)}」。`;}
    if(n.type==='end')message='執行結束。請比較最終變量值與實際輸出。';
    history=[...history,{id:n.id,text:message,vars:{...vars}}];
    states.push({id:n.id,next,vars:{...vars},outputs:[...outputs],edges:[...edges],history:[...history],message});
    if(next)edges=[...edges,`${n.id}:${next}`];
    id=next;
  }
  if(id)throw new Error('執行步數超出限制');
  return states;
}
export function readProgress(raw) {
  try {
    const p=JSON.parse(raw);if(!p||p.version!==1)return {version:1,answers:{},seen:[]};
    const answers={};for(const [key,v] of Object.entries(p.answers||{}))if(/^\d+$/.test(key)&&Number(key)<24&&v&&typeof v.correct==='boolean'&&Number.isInteger(v.attempts)&&v.attempts>=0)answers[key]={correct:v.correct,attempts:v.attempts};
    return {version:1,answers,seen:Array.isArray(p.seen)?p.seen.filter(x=>Number.isInteger(x)&&x>=0&&x<6):[]};
  }catch{return {version:1,answers:{},seen:[]};}
}
