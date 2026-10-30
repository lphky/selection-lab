(async()=>{
 const checks=[];
 const assert=(ok,name)=>{if(!ok)throw new Error(name);checks.push(name);};
 const $=s=>document.querySelector(s);
 const delay=()=>new Promise(r=>setTimeout(r,40));
 const open=async hash=>{location.hash=hash;await delay();};
 const fill=(selector,value)=>{const e=$(selector);e.value=value;e.dispatchEvent(new Event('input',{bubbles:true}));};
 const finish=()=>{for(let i=0;i<20&&!$('#next').disabled;i++)$('#next').click();};
 const {questions}=await import('../content.mjs');
 for(let u=1;u<=6;u++){
  await open('lesson-'+u);assert(!!$('#diagram svg'),'單元'+u+'渲染圖');
  finish();assert($('#explanation').textContent.includes('執行結束'),'單元'+u+'完成執行');
  $('#prev').click();assert(!$('#explanation').textContent.includes('執行結束'),'單元'+u+'後退');
  $('#reset').click();assert($('#output').textContent==='（尚無輸出）'&&!$('#variables table'),'單元'+u+'重設快照');
  fill('#value','');assert($('#next').disabled&&$('#input-error').textContent.length>0,'單元'+u+'拒絕空白');
  fill('#value','1.5');assert($('#next').disabled,'單元'+u+'拒絕小數');
  fill('#value','0');assert(!$('#next').disabled,'單元'+u+'接受零');
 }
 await open('lesson-5');
 for(const [v,out] of [[0,'F'],[49,'F'],[50,'B'],[84,'B'],[85,'A'],[100,'A']]){fill('#value',String(v));finish();assert($('#output').textContent===out,'分級邊界 '+v);}
 $('#variant').value='nested';$('#variant').dispatchEvent(new Event('change'));finish();assert($('#output').textContent==='A','嵌套與elseif相同');
 await open('lesson-3');fill('#value','50');finish();assert($('#output').textContent==='及格','≥ 50包含50');
 $('#variant').value='strict';$('#variant').dispatchEvent(new Event('change'));finish();assert($('#output').textContent==='不及格'&&$('#diagram').textContent.includes('mark > 50'),'切換>比較同步');
 $('#reset').click();$('#speed').value='500';$('#play').click();await new Promise(r=>setTimeout(r,600));$('#play').click();const paused=$('#step-count').textContent;await new Promise(r=>setTimeout(r,600));assert($('#step-count').textContent===paused,'播放可暫停');
 $('#play').click();fill('#value','51');assert($('#step-count').textContent.includes('步驟 0'),'輸入改變重設');await new Promise(r=>setTimeout(r,600));assert($('#step-count').textContent.includes('步驟 0'),'更改輸入取消舊計時');
 await open('lesson-4');document.querySelector('[data-row="4"]').click();assert($('#scope').textContent.includes('mark ≥ 85'),'縮排歸屬');
 await open('practice-all');await delay();assert(!!$('#quiz-form'),'題庫啟動');
 $('#quiz-form').dispatchEvent(new Event('submit',{cancelable:true}));assert($('#quiz-feedback').textContent.includes('請先選擇'),'未選答案提示');
 const wrong=document.querySelector('input[value="0"]');wrong.checked=true;wrong.dispatchEvent(new Event('change',{bubbles:true}));$('#quiz-form').dispatchEvent(new Event('submit',{cancelable:true}));assert($('#quiz-feedback').textContent.includes('再想一想'),'錯誤提示');
 $('#quiz-form').dispatchEvent(new Event('submit',{cancelable:true}));assert($('#quiz-feedback').textContent.includes('答案：'),'兩次錯誤完整解析');
 for(let i=0;i<24;i++){
  const radio=document.querySelector(`input[name="answer"][value="${questions[i].answer}"]`);radio.checked=true;radio.dispatchEvent(new Event('change',{bubbles:true}));$('#quiz-form').dispatchEvent(new Event('submit',{cancelable:true}));assert($('#quiz-feedback').textContent.includes('判斷正確'),'原創題'+(i+1)+'正確回饋');$('#quiz-next').click();
 }
 assert(document.querySelector('.summary').textContent.includes('24 / 24'),'完成結果');
 assert(JSON.parse(localStorage.getItem('selection-lab-v1')).answers['23'].correct,'本機進度存入');
 await open('home');$('#clear').click();assert($('#clear-dialog').open,'清除前確認');$('#clear-dialog').close('cancel');await delay();assert($('#overall').textContent.includes('24 / 24'),'取消清除保留紀錄');
 await open('practice-1');await delay();$('#teacher').click();$('#reveal').click();assert($('#quiz-feedback').textContent.includes('教師解析'),'教師揭曉');$('#teacher').click();
 await open('home');
 return {passed:checks.length,checks};
})()
