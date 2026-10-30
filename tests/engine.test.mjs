import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lessons,questions,operators,codeRows} from '../content.mjs';
import {trace,readProgress} from '../engine.mjs';

test('六個單元與24題，所有問題都有有效答案與解釋',()=>{
 assert.equal(lessons.length,6);assert.equal(questions.length,24);
 for(let i=0;i<6;i++)assert.equal(questions.filter(q=>q.lesson===i).length,4);
 for(const q of questions){assert.ok(q.options[q.answer]);assert.ok(q.why.length>15);assert.ok(q.hint);}
 assert.deepEqual(questions.map(q=>q.answer),[1,2,0,1,2,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,2,1,2]);
});
test('所有允許輸入終止且輸出符合獨立公式',()=>{
 for(let u=0;u<6;u++)for(let value=lessons[u].min;value<=lessons[u].max;value++){
  const result=trace(lessons[u],value).at(-1);assert.equal(result.id,'end');
  const expected=[()=>[value>=50?'True':'False'],()=>[value>=50?'及格':'未設定'],()=>[value>=50?'及格':'不及格'],()=>[value>=50?(value>=85?'優異':'及格'):'再努力','完成'],()=>[value>=85?'A':value>=50?'B':'F'],()=>[String(value+10>30?10:value-5)]][u]();
  assert.deepEqual(result.outputs,expected,`單元 ${u} 輸入 ${value}`);
  if(u===5)assert.equal(result.vars.x,value+10>30?value+5:value);
 }
});
test('臨界值0、49、50、84、85、100正確',()=>{
 assert.deepEqual([0,49,50,84,85,100].map(v=>trace(lessons[4],v).at(-1).outputs[0]),['F','F','B','B','A','A']);
 assert.deepEqual([49,50,51].map(v=>trace(lessons[2],v).at(-1).outputs[0]),['不及格','及格','及格']);
});
test('單一if不成立保持初始化；外層失敗不進內層',()=>{
 assert.equal(trace(lessons[1],49).at(-1).vars.grade,'未設定');
 assert.ok(!trace(lessons[3],40).some(s=>s.id==='inner'));
 assert.ok(!trace(lessons[4],95).some(s=>s.id==='second'));
});
test('快照不共享變量或輸出，可安全後退',()=>{
 const states=trace(lessons[5],21),before=states.find(s=>s.id==='test'),after=states.find(s=>s.id==='inc');
 assert.equal(before.vars.x,21);assert.equal(after.vars.x,26);assert.deepEqual(before.outputs,[]);
 after.vars.x=999;assert.equal(before.vars.x,21);
 assert.deepEqual(states[0],{id:null,vars:{},outputs:[],edges:[],history:[],message:'準備好後，按「下一步」開始。'});
});
test('圖、程式碼、邊線均參照存在節點',()=>{
 for(let u=0;u<6;u++){
  const ids=new Set(lessons[u].nodes.map(n=>n.id));
  for(const n of lessons[u].nodes)for(const to of [n.next,n.yes,n.no].filter(Boolean))assert.ok(ids.has(to));
  for(const row of codeRows(u))if(!row.id.startsWith('else'))assert.ok(ids.has(row.id));
 }
});
test('所有關係運算符對相等及不相等的結果',()=>{
 assert.deepEqual(Object.values(operators).map(fn=>fn(50,50)),[true,false,false,true,false,true]);
 assert.deepEqual(Object.values(operators).map(fn=>fn(49,50)),[false,true,true,true,false,false]);
});
test('拒絕不合法數值',()=>{for(const v of [NaN,Infinity,-1,101,1.5])assert.throws(()=>trace(lessons[0],v));});
test('損壞或不可信進度可恢復',()=>{
 for(const raw of [null,'bad','null','[]','{"version":2}'])assert.deepEqual(readProgress(raw),{version:1,answers:{},seen:[]});
 assert.deepEqual(readProgress(JSON.stringify({version:1,answers:{0:{correct:true,attempts:2},24:{correct:true,attempts:1},1:{correct:'true',attempts:1}},seen:[-1,0,5,6,'1']})),{version:1,answers:{0:{correct:true,attempts:2}},seen:[0,5]});
});
