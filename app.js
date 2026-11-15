(function(){
  'use strict';
  var $=function(id){return document.getElementById(id)};
  var DATA=window.QUIZ_DATA;

  /* ---------- 各维度计分题短标签（顺序与数据文件一致） ---------- */
  var SHORTS={
    D2:['当天回复','留出话口','双向对话','话题延展','表达温度','不带评判','隐私分寸','轻盈相处','稳住节奏','自然约见','语音适应','体面收尾'],
    D3:['情绪平复','不被小事困','好接近','自然开口','守约履约','愿意了解','松弛不揣测','接得住玩笑','不控细节','不往坏处想','不试探','好好商量','不说重话','先想自己','不怀疑价值','不靠回应','不硬迁就','改约不慌','先听完'],
    D4:['想要婚姻','已走出上段','状态允许','不排斥相亲','说得清条件','能分主次','会查冲突','会调标准','了解现实','愿见不完美','自己决定','出于自己'],
    D5:['议题清晰','说得出口','愿意折中','知道底线','不含糊答应','想过婚后'],
    D6:['三餐自理','空间自理','事务能处理','作息规律','说到做到','开销独立','不超支','有共享兴趣','有可商量的人','懂自己习惯','低谷能维持','不转嫁情绪','不硬撑'],
    D7:['不反复琢磨','不拉开距离','不要求随时','先接住情绪','会谢会歉','愿意相信','接受平淡','经济独立','自己拿主意','情绪独立','家里能说开','守得住边界','说得清结束','不重复模式','能共同决策','有承载力','愿意调整','不以分手施压']
  };

  /* ---------- 维度配置 ---------- */
  var META={
    D1:{
      desc:'把年龄、学历、工作、家庭、健康等基本客观条件理一遍，再做一份不计分的条件解读与对齐建议。',
      badge:'档案 · 不计分',
      archiveTips:[
        '核对户籍 / 常住城市，与 D5 里的定居意愿是否一致，这是谈婚论嫁时最常见的卡点。',
        '写择偶条件时回头看一眼这份档案：哪些是自己的现实约束，哪些其实是可以商量的偏好。',
        '健康、财务、婚育这类信息不必在关系早期全盘告知，按熟悉程度逐步分享就好。',
        '这份档案只是当下快照，隔几个月回来重填一次，看看哪些情况已经变了。'
      ]
    },
    D2:{
      desc:'从被搭话到被约见，看看你在聊天里的回应节奏、话题温度与分寸感。',
      badge:'12 题 · 全计分',
      segIds:[
        {name:'回应与节奏',ids:['C1','C9']},
        {name:'话题与温度',ids:['C2','C3','C4','C5','C6']},
        {name:'边界与推进',ids:['C7','C8','C10','C11','C12']}
      ],
      advice:[
        '给自己一个回复节奏：不必秒回，但尽量当天回一次；忙的时候先说一句"晚点细聊"。',
        '把话头递回去：回复末尾多带半句，让对方有话可接，别让对话停在你这里。',
        '早期少问隐私：收入、家庭、过往感情留到熟一点之后，先聊当下和日常。',
        '给见面一个具体场景：把"有空约"换成"周六下午那家店"，落地率会高很多。'
      ]
    },
    D3:{
      desc:'情绪稳定度、相处基调与面对分歧的方式，是长期相处里最被在意的一面。',
      badge:'19 题 · 全计分',
      segNames:['情绪稳定与相处基调','不安、控制与分歧','自我价值与情境反应'],
      segCounts:[8,5,6],
      advice:[
        '先稳住再回应：情绪上来时给自己十分钟，等能好好说话了再回消息。',
        '把猜测换成确认：对方没及时回，先当作在忙，别急着往坏处想或连着追问。',
        '分歧时说需求、不说评判：用"我希望…"代替"你怎么总是…"，冲突会小很多。',
        '把自我价值和关系分开：一次冷淡不等于你不够好，别让对方的反应决定一天的心情。'
      ]
    },
    D4:{
      desc:'你是不是真的准备好进入关系，以及标准清不清楚、决定权在谁手里。',
      badge:'12 题计分 · 3 题登记',
      segNames:['意愿与状态','条件清晰度','自主与弹性'],
      segCounts:[4,6,2],
      advice:[
        '写下三条核心条件：只留真正不能妥协的三条，其余先归到"可以商量"。',
        '检查条件之间是否打架：硬条件超过六条时，看看它们能不能同时出现在一个人身上。',
        '给不完美留一次见面：大部分条件符合、只有一项差一点时，先见一面再判断。',
        '把决定权拿回自己手里：家人的意见可以听，但节奏和最终选择由自己定。'
      ]
    },
    D5:{
      desc:'生育、定居、财产、家务、父母边界，这些议题想得越清楚，越不容易卡住。',
      badge:'6 题计分 · 31 题登记',
      segNames:['议题清晰度','表达与协商','规划具体度'],
      segCounts:[2,3,1],
      advice:[
        '先把五个议题想清楚：生育、定居、财产、家务、父母边界，各写一句自己的答案。',
        '区分底线和偏好：知道哪些不能让、哪些可以商量，谈的时候才不会反复。',
        '早点说、平和地说：关系早期就把关键想法讲清楚，别为了避免冲突先含糊答应。',
        '具体想象日常：想想婚后一个普通周二怎么过，比只想象婚礼更接近真实。'
      ]
    },
    D6:{
      desc:'自理能力、财务独立与低谷期的状态，决定一段关系能不能轻松过日子。',
      badge:'13 题 · 全计分',
      segNames:['自理与节律','财务与共享','低谷可持续性'],
      segCounts:[5,5,3],
      advice:[
        '先把三件小事固定下来：三餐、作息、约定好的事，状态差时也能维持就够了。',
        '让开销自己说了算：日常不依赖补贴、不超出偿还能力，是从容感的基础。',
        '留一块可以共享的生活：培养一两项愿意和别人一起做的兴趣，关系才有内容可长。',
        '状态差时别硬撑：提前想好低谷期的替代方案，别把情绪全部转嫁给亲近的人。'
      ]
    },
    D7:{
      desc:'依恋模式、与原生家庭的分化、共同决策能力，最影响关系能走多远。',
      badge:'18 题 · 全计分',
      segNames:['依恋与信任','家庭分化','共同决策与承载力'],
      segCounts:[7,5,6],
      advice:[
        '慢一点确认，不代表不被喜欢：对方没回、关系变平淡时，先别急着下结论。',
        '先接住再讲道理：对方情绪低落时先听，会道谢会道歉，比给方案更有用。',
        '把三个独立分开：经济、决策、情绪都能自己拿主意，关系才不会变成两个家庭的拉扯。',
        '回看一次重复出现的模式：把过去几段关系的结束原因写下来，看是不是同一件事在重演。'
      ]
    }
  };
  var ADVANCED=[
    {h:'把节奏偶尔交给对方',p:'试着让对方先发起一次话题，观察这段关系是不是双向在走。'},
    {h:'把评价换成具体感受',p:'少说"挺好的"，多说"刚才那段我笑了好久"，对话会更有记忆点。'},
    {h:'给约定一个具体场景',p:'把"有空再说"换成"周六下午那家店"，一句具体的话更容易落地。'}
  ];
  var D2TIPS={
    C1:{high:'回应稳定，对方不用猜你的态度，对话容易自然续上。',low:'不必秒回，但可以给自己设一个"当天回一次"的小节奏；忙的时候先回一句"晚点细聊"，比沉默更让人安心。'},
    C2:{high:'会给对方留话口，聊天很少在你这里冷掉。',low:'试着在回复末尾多带半句，比如"你平时也这样吗"，把球轻轻递回去。'},
    C3:{high:'既会问也会分享，对话是双向的，不像在填资料。',low:'连续问了三个问题之后，补一句自己的经历或感受，让对话从"了解情况"变成"互相认识"。'},
    C4:{high:'能把一个话题自然聊深，不急着换场，熟悉感来得更快。',low:'别急着跳话题，顺着对方刚说的细节再追问一层，往往比开新话题更拉近距离。'},
    C5:{high:'文字里有温度，和你聊天的人比较容易放松下来。',low:'文字容易被读成冷淡，适当加一点语气或具体感受，让温度被看见。'},
    C6:{high:'很少用审视的语气，对方在你面前不必端着。',low:'把"你怎么会这样"换成"我有点好奇"，能明显减少对方的防御感。'},
    C7:{high:'知道哪些问题该等熟一点再问，分寸感让人安心。',low:'收入、家庭、过往感情这类话题留到彼此更熟之后，早期多聊当下和日常。'},
    C8:{high:'不会在刚认识时交付情绪负担，相处的第一印象很轻盈。',low:'刚认识时先交换轻松的信息，情绪支持留给关系稳定之后，节奏会更稳。'},
    C9:{high:'对方回复慢时你能稳得住，不会把节奏变成压力。',low:'对方没回时，先去做自己的事；把连着追问换成一次轻松、不带责备的招呼。'},
    C10:{high:'能把线上聊得来的关系自然带到见面，这一步你走得很顺。',low:'聊到 3–5 个来回、气氛不错时，可以用低压力的方式提一次具体邀约，比如"周末那家店要不要一起去"。'},
    C11:{high:'对语音或视频不排斥，切换沟通媒介时很自然。',low:'不必勉强，可以从一条短语音开始；逐步适应比硬撑更舒服。'},
    C12:{high:'面对冷淡能体面收住，这份松弛本身就很加分。',low:'对方明显冷淡时，一句"好的，那不打扰啦"就够了；不追问原因，也是给自己留余地。'}
  };

  /* ---------- 初始化短标签与序号 ---------- */
  var counter={};
  DATA.questions.forEach(function(q){
    if(q.scored){
      var n=counter[q.dim]||0;counter[q.dim]=n+1;q.pos=n;
      q.short=(SHORTS[q.dim]||[])[n]||q.stem.slice(0,7);
    }else{
      q.short=q.stem.replace(/（.*?）/g,'').replace(/\s/g,'').slice(0,10);
    }
  });
  var ARCHIVE_GROUPS=[
    {name:'年龄与外形',prefixes:['F1','F2']},{name:'学历与工作',prefixes:['F3','F4']},
    {name:'财务与城市',prefixes:['F5','F6']},{name:'家庭与婚育',prefixes:['F7','F8']},
    {name:'健康与兼容约束',prefixes:['F9','F10']},{name:'民俗偏好',prefixes:['F11']}
  ];
  function prefixOf(qid){var m=/^([A-Z]+\d+)/.exec(qid);return m?m[1]:qid}
  function archiveGroupOf(q){var p=prefixOf(q.qid);for(var i=0;i<ARCHIVE_GROUPS.length;i++){if(ARCHIVE_GROUPS[i].prefixes.indexOf(p)>=0)return ARCHIVE_GROUPS[i].name}return '其他'}

  /* ---------- 状态 ---------- */
  var nickname='',mode='ALL',QS=[],ans={},idx=0,locked=false,R=null,autoTimer=null,blobUrl=null,selected='ALL',isDemo=false;

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  function pad(n){return n<10?'0'+n:''+n}
  function dateStr(){var d=new Date();return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日'}
  function dateFile(){var d=new Date();return ''+d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())}
  function show(id){
    var list=document.querySelectorAll('.screen');
    for(var i=0;i<list.length;i++)list[i].classList.remove('active');
    $(id).classList.add('active');
    var dock=$('startDock');
    if(dock)dock.style.display=(id==='s-home')?'block':'none';
    window.scrollTo(0,0);
  }
  function minutes(n){return Math.max(1,Math.ceil(n*8/60))}

  /* ---------- 首页 ---------- */
  function renderHome(){
    var cards=[{id:'ALL',name:'全部题目',total:154,scored:80,desc:'一次做完七个维度，生成一份综合报告，看见整体轮廓。',badge:'完整版 · 推荐'}];
    cards=cards.concat(DATA.dims.map(function(d){
      return {id:d.id,name:d.name,total:d.total,scored:d.scored,desc:META[d.id].desc,badge:META[d.id].badge};
    }));
    function updateDock(){
      var pick=null;
      for(var n=0;n<cards.length;n++)if(cards[n].id===selected)pick=cards[n];
      if(!pick)return;
      $('dockLabel').textContent=pick.name+' · '+pick.total+' 题';
      $('dockTime').textContent='约 '+minutes(pick.total)+' 分钟';
    }
    var html='';
    for(var i=0;i<cards.length;i++){
      var c=cards[i],on=c.id===selected;
      html+='<div class="dim-card'+(c.id==='ALL'?' all':'')+(on?' on':'')+'" data-id="'+c.id+'">'+
        '<div class="dim-num">'+(c.id==='ALL'?'ALL':c.id)+'</div>'+
        '<div class="dim-main"><div class="dim-name">'+c.name+'<span class="dim-badge">'+c.badge+'</span></div>'+
        '<p class="dim-meta">'+c.total+' 题 · 约 '+minutes(c.total)+' 分钟 · '+c.scored+' 题计分</p>'+
        '<p class="dim-desc">'+esc(c.desc)+'</p></div>'+
        '<div class="dim-check">✓</div></div>';
    }
    $('dimList').innerHTML=html;
    var els=$('dimList').querySelectorAll('.dim-card');
    for(var j=0;j<els.length;j++)(function(el){
      el.addEventListener('click',function(){
        selected=el.getAttribute('data-id');
        for(var k=0;k<els.length;k++)els[k].classList.toggle('on',els[k]===el);
        updateDock();
      });
    })(els[j]);
    updateDock();
  }
  try{var saved=localStorage.getItem('bloom_nick');if(saved)$('nick').value=saved}catch(e){}
  $('nick').addEventListener('keydown',function(e){if(e.key==='Enter'){$('nick').blur();startQuiz()}});
  $('nick').addEventListener('input',function(){$('nickHint').textContent='只会出现在报告里，最多 12 个字';$('nickHint').classList.remove('err')});
  $('nick').addEventListener('focus',function(){var d=$('startDock');if(d)d.style.display='none'});
  $('nick').addEventListener('blur',function(){var d=$('startDock');if(d)d.style.display='block'});
  $('startBtn').addEventListener('click',startQuiz);

  function startQuiz(){
    var v=$('nick').value.trim();
    if(!v){
      $('nickHint').textContent='先写一个昵称吧，报告里会用上它';$('nickHint').classList.add('err');
      var box=$('nick').parentElement;box.classList.remove('shake');void box.offsetWidth;box.classList.add('shake');$('nick').focus();return;
    }
    nickname=v.slice(0,12);try{localStorage.setItem('bloom_nick',nickname)}catch(e){}
    mode=selected;ans={};idx=0;R=null;locked=false;
    QS=mode==='ALL'?DATA.questions.slice():DATA.questions.filter(function(q){return q.dim===mode});
    show('s-quiz');renderQuestion();
  }

  /* ---------- 问卷 ---------- */
  function renderQuestion(){
    var q=QS[idx],isScale=q.type==='量表5';
    $('qId').textContent=q.qid+(q.reverse?' · 反向计分':'')+(q.scored?'':' · 登记项');
    $('qText').textContent=q.stem;
    $('groupTag').textContent=q.dimName;
    $('qCount').textContent=pad(idx+1)+' / '+QS.length;
    $('progressFill').style.width=((idx+1)/QS.length*100)+'%';
    $('qTip').textContent=isScale
      ?('按最近 3–6 个月的真实状态选，凭第一感觉就好'+(q.options.some(function(o){return o.v==='N'})?'；没有相关经历可选「不适用」':''))
      :'如实选一项即可，不想填可以选「不便填写」';
    $('prevBtn').disabled=(idx===0);$('prevBtn').style.opacity=(idx===0?'.45':'1');
    var html='';
    for(var i=0;i<q.options.length;i++){
      var o=q.options[i],on=ans[q.qid]===o.v;
      var num=isScale?(o.v==='N'?'N':o.v):(i+1);
      html+='<button type="button" class="opt'+(isScale?'':' reg')+(o.v==='N'?' n-opt':'')+(on?' on':'')+'">'+
        '<span class="opt-num">'+num+'</span><span class="opt-label">'+esc(o.label)+'</span><span class="opt-check">✓</span></button>';
    }
    $('options').innerHTML=html;
    var btns=$('options').querySelectorAll('.opt');
    for(var j=0;j<btns.length;j++)(function(k){
      btns[k].addEventListener('click',function(){choose(q.options[k].v)});
    })(j);
    $('nextBtn').disabled=(ans[q.qid]===undefined);
    locked=false;
  }
  function choose(v){
    if(locked)return;locked=true;
    var q=QS[idx];ans[q.qid]=v;
    var btns=$('options').querySelectorAll('.opt');
    for(var i=0;i<btns.length;i++)btns[i].classList.toggle('on',q.options[i].v===v);
    $('nextBtn').disabled=false;
    clearTimeout(autoTimer);
    autoTimer=setTimeout(function(){
      if(idx<QS.length-1){idx++;renderQuestion()}else finishQuiz();
    },360);
  }
  function goNext(){
    clearTimeout(autoTimer);
    if(ans[QS[idx].qid]===undefined)return;
    if(idx<QS.length-1){idx++;renderQuestion()}else finishQuiz();
  }
  $('prevBtn').addEventListener('click',function(){clearTimeout(autoTimer);if(idx>0){idx--;renderQuestion()}});
  $('nextBtn').addEventListener('click',goNext);
  $('exitBtn').addEventListener('click',function(){clearTimeout(autoTimer);show('s-home')});

  /* ---------- 等待 5 秒 ---------- */
  var WAIT_MSGS=['正在整理你的回答…','正在换算反向计分题…','正在汇总各维度表现…','正在写下适合你的建议…','报告马上就好'];
  function finishQuiz(){
    clearTimeout(autoTimer);R=compute();show('s-wait');
    $('countdown').textContent='5';$('waitMsg').textContent=WAIT_MSGS[0];
    var fg=document.querySelector('.ring-fg');
    fg.style.animation='none';void fg.getBoundingClientRect();fg.style.animation='drain 5s linear forwards';
    var elapsed=0;
    var timer=setInterval(function(){
      elapsed++;$('countdown').textContent=String(Math.max(0,5-elapsed));
      if(elapsed<5)$('waitMsg').textContent=WAIT_MSGS[elapsed];
      if(elapsed>=5){clearInterval(timer);setTimeout(renderReport,180)}
    },1000);
  }

  /* ---------- 计分 ---------- */
  /* ---------- D1 基本客观条件：中性解读 ---------- */
  function archiveAnalysis(r,denom){
    var A=ans,totalReg=denom||r.regQs.length;
    var has=function(id){var v=A[id];return v!==undefined&&v!=='不便填写'};
    var g=function(id){return has(id)?String(A[id]):''};
    var inSet=function(id,arr){return arr.indexOf(g(id))>=0};
    var S=[],T=[],must=[],add=function(arr,h,p){arr.push({h:h,p:p})};

    var steady=(inSet('F4b',['体制内','国企'])||inSet('F4f',['几乎无']))&&!inSet('F4e',['高'])&&!inSet('F4d',['是']);
    var busy=inSet('F4e',['高'])||inSet('F4f',['经常'])||inSet('F4d',['是']);
    if(steady)add(S,'工作节奏稳定','单位性质、加班与出差都比较规律，固定相处和约见面的时间更容易安排。');
    if(busy)add(T,'时间需要提前协调','轮班、加班或高频出差会占用固定时段，建议在关系早期就把"什么时候方便见"说清楚。');
    if(inSet('F4c',['5-10年','10年以上']))add(S,'职业阶段可预期','在同一条路径上积累较久，生活节奏一般不太会突然大幅变动。');

    if(g('F5d')==='无负债'&&g('F5e')==='否')add(S,'财务负担轻','没有需要固定偿还的负债、征信无异常，婚后财务怎么安排有更大的商量空间。');
    if(inSet('F5d',['月还款占收入30%以上','有房贷/车贷'])||g('F5e')==='是')add(T,'财务情况适合主动说明','负债与征信这类信息，在谈婚论嫁前由自己先讲清楚，比被问到时再解释更从容。');
    if(inSet('F5c',['有房','两者都有']))add(S,'居住资产已独立','名下已有房或车，居住安排上受外部条件牵制较少。');
    if(inSet('F5a',['10000-20000','20000以上']))add(S,'收入可覆盖自身开销','日常开销不依赖他人，进入关系时更容易保持自己的节奏。');

    if(has('F6a')&&has('F6b')&&g('F6a')===g('F6b')&&inSet('F6c',['5-10年','10年以上']))
      add(S,'定居地清晰稳定','户籍与常住一致、居住年限较长，"以后在哪生活"这一项不太需要反复协商。');
    if(has('F6a')&&has('F6b')&&g('F6a')!==g('F6b'))
      add(T,'长期定居地需要对齐','户籍与常住分属不同层级城市，建议把长期定居地放到关系早期议题里。');
    if(g('F6c')==='1年以内')add(T,'仍在新城市适应期','刚到一座城市不久，生活节奏还在建立，给关系留一点弹性会更轻松。');

    if(g('F7b')==='是'&&inSet('F7c',['无','轻'])&&/健康/.test(g('F7a')))
      add(S,'家庭支持较完整','父母保障较完整、需要你投入的照护较轻，长期安排里可自己支配的时间更多。');
    if(inSet('F7c',['中','重']))add(T,'照护时间需要预留','家里有比较实际的照护需求，提前把每周能投入的时间说清楚，比后期临时调整更稳。');
    if(g('F7f')==='父母')add(T,'家庭决策先对齐边界','家里重大决定多由父母定，建议在推进关系前先和家里把"谁做主"聊清楚。');
    if(g('F7e')==='独生女')add(T,'赡养与节日分配要早聊','家庭结构比较集中，未来赡养安排和节日怎么分，适合提前有个共识。');

    if(g('F8a')==='未婚'&&g('F8b')==='无')add(S,'关系起点简单','没有需要同步协调的抚养安排，进入新关系时节奏更自由。');
    if(g('F8b')==='有')add(T,'抚养安排需要提前说清楚','把现有抚养安排与时间分配在关系稳定前讲清楚，能减少后期误会。');
    if(inSet('F8d',['3个月内','3-12个月']))add(T,'给自己留出整理期','上一段结束时间不算长，按自己的节奏来，不必被外部时间表推着走。');
    if(g('F9d')==='是')add(S,'有定期体检习惯','对自己的健康状态有持续了解，长期生活里更容易做具体安排。');

    /* 敏感项只提示沟通节奏，不作为优劣判断 */
    var health=(g('F9a')==='是'||(has('F9b')&&g('F9b')!=='无')||(has('F9c')&&g('F9c')!=='无')||
      (has('F9e')&&g('F9e')!=='无明显家族病史'&&g('F9e')!=='不清楚'));
    if(health)add(T,'健康信息按信任节奏分享','需要长期管理或需告知的健康情况，适合在信任建立后主动说明；不必第一次见面就交代，也不建议一直不提。');
    if((has('F10b')&&g('F10b')!=='无')||(has('F10c')&&g('F10c')!=='无')||(has('F10d')&&g('F10d')!=='无特别要求'))
      add(T,'生活习惯兼容项','饮食、信仰或节庆方面有明确要求，提前说清楚比后期磨合更省力。');
    if(g('F11')==='明确有')add(T,'家人有民俗讲究','家里对属相、星座等有明确讲究时，早点让对方知道，能避免临门一脚的来回拉扯。');

    if(!S.length)add(S,'把条件写得更具体','目前没有明显落在"占优"规则里的条件；可以挑一两项自己最有把握的客观条件，在资料里写得更清楚一些。');
    if(!T.length)add(T,'继续保持信息透明','目前没有需要特别提前说明的客观约束；关系推进时按熟悉程度逐步分享就好。');

    var pace=inSet('F1',['22岁以下','22-25岁'])
      ?'时间窗口比较宽，可以先把自己的标准和底线想清楚，再决定推进速度。'
      :(inSet('F1',['26-29岁','30-33岁'])
        ?'如果希望近两年成婚，建议把"见面—确认关系—见家长"的节奏早些对齐，别只靠自然发展。'
        :(inSet('F1',['34-37岁','38岁以上'])
          ?'时间线更值得主动管理：把不可妥协的条件压缩到三条以内，推进效率会明显提高。'
          :'按自己的节奏推进就好，时间表只是参考，不需要和别人比较。'));

    if(has('F6a')&&has('F6b')&&g('F6a')!==g('F6b'))must.push('未来两三年在哪个城市长期生活');
    if(inSet('F7c',['中','重']))must.push('赡养投入与照护时间怎么分');
    if(busy)must.push('一周能稳定留出哪些相处时段');
    if(inSet('F5d',['月还款占收入30%以上','有房贷/车贷'])||g('F5e')==='是')must.push('负债与婚后财务安排');
    if(g('F8b')==='有')must.push('现有子女的时间与抚养安排');
    if((has('F10b')&&g('F10b')!=='无')||(has('F10c')&&g('F10c')!=='无'))must.push('饮食、信仰与节庆的具体要求');
    if(g('F7f')==='父母')must.push('父母介入到什么程度、由谁做最终决定');
    var defaults=['生育与育儿分工','婚前财产与共同账户怎么安排','与双方父母的边界和节日分配'];
    for(var di=0;di<defaults.length&&must.length<3;di++)if(must.indexOf(defaults[di])<0)must.push(defaults[di]);

    var ecoState=!has('F5d')?'资料待补充':((g('F5d')==='无负债'&&g('F5e')==='否')?'负担较轻':'需要对齐');
    var cityState=!has('F6a')||!has('F6b')?'资料待补充':(g('F6a')!==g('F6b')?'需要对齐':'基本一致');
    var famState=!has('F7c')?'资料待补充':(inSet('F7c',['中','重'])?'需预留时间':'支持较完整');
    var signals=[
      {name:'工作与作息',state:busy?'需要协调':(steady?'稳定清晰':'资料待补充'),note:busy?'固定相处时段需提前约':'约见与相处容易安排'},
      {name:'经济与居住',state:ecoState,note:'婚后财务安排建议早期聊清'},
      {name:'定居一致性',state:cityState,note:'长期定居地是关键议题'},
      {name:'家庭支持与负担',state:famState,note:'照护与节日分配提前商量'},
      {name:'健康与兼容约束',state:'仅作兼容项',note:'不评优劣，只提示沟通节奏'},
      {name:'资料完整度',state:r.filled.length>=totalReg*0.75?'信息较完整':'可再补充',note:'已填 '+r.filled.length+' / '+totalReg+' 项'}
    ];

    return {
      strengths:S.slice(0,5),attentions:T.slice(0,5),signals:signals,must:must.slice(0,4),
      flex:['见面形式与频率','聊天由谁先发起、回复快慢','婚礼形式与规模','兴趣爱好是否重合','日常琐事由谁安排'],
      talks:['把长期生活的城市和大致时间线先说定','把一周能稳定相处的时段、加班与出差节奏说清楚','把婚后住哪里、节日怎么分、父母介入到什么程度摆到桌面上'],
      intro:'这里的"门当户对"不是条件攀比，而是指那些会反复出现在日常里的客观议题，双方能不能对得上；对得上的部分越多，长期需要磨合的成本越低。下面只讲需要对齐的议题，不评价任何一方的条件。',
      pace:pace
    };
  }

  /* ---------- 154 题合成总分（仅「全部题目」模式） ---------- */
  var SCORE_CONFIG={
    base:5,              // 单题满分基数
    scaleWeight:2,       // 自评量表题权重
    registerWeight:1,    // 单选登记题权重
    boostDims:{D5:3},    // D5 的自评题权重提升
    byQid:{}             // 逐题覆盖权重，例如 {'V10':4,'F1':2}
  };
  function weightOf(q){
    if(SCORE_CONFIG.byQid[q.qid])return SCORE_CONFIG.byQid[q.qid];
    if(q.type==='量表5')return SCORE_CONFIG.boostDims[q.dim]||SCORE_CONFIG.scaleWeight;
    return SCORE_CONFIG.registerWeight;
  }
  /* 隐私项（不便填写 / 不适用）整题不计入：分子与分母同时剔除 */
  function totalScore(){
    var maxSum=0,gotSum=0,privacyCount=0,dimMap={};
    QS.forEach(function(q){
      var w=weightOf(q),max=SCORE_CONFIG.base*w,got=0,privacy=false;
      if(q.scored){
        var a=ans[q.qid];
        if(a==='N'||a==='不便填写'||a===undefined)privacy=true;
        else got=(q.reverse?6-a:a)*w;
      }else{
        var v=ans[q.qid];
        if(v===undefined||v==='不便填写'||v==='N')privacy=true;
        else got=max;
      }
      if(privacy)privacyCount++;
      else{maxSum+=max;gotSum+=got}
      if(!dimMap[q.dim])dimMap[q.dim]={max:0,got:0,privacy:0};
      var d=dimMap[q.dim];
      if(privacy)d.privacy++;
      else{d.max+=max;d.got+=got}
    });
    var dims={};
    Object.keys(dimMap).forEach(function(k){
      var d=dimMap[k];
      dims[k]={score:d.max?Math.round(d.got/d.max*100):0,max:d.max,got:d.got,privacy:d.privacy};
    });
    return {score:maxSum?Math.round(gotSum/maxSum*100):0,maxSum:maxSum,gotSum:gotSum,privacyCount:privacyCount,dims:dims};
  }

  function compute(){
    var scoreMap={},valid=[],scoredQs=QS.filter(function(q){return q.scored});
    scoredQs.forEach(function(q){
      var a=ans[q.qid],sc=(a==='N'||a===undefined)?null:(q.reverse?6-a:a);
      scoreMap[q.qid]=sc;
      if(sc!==null)valid.push({q:q,s:sc,pos:q.pos});
    });
    var sum=0;valid.forEach(function(x){sum+=x.s});
    var avg=valid.length?sum/valid.length:0;
    var rank=valid.slice().sort(function(a,b){return b.s-a.s});
    var maxScore=rank.length?rank[0].s:0,minScore=rank.length?rank[rank.length-1].s:0;
    var bottom=rank.slice(-3).reverse();
    var regQs=QS.filter(function(q){return !q.scored});
    var filled=regQs.filter(function(q){return ans[q.qid]!==undefined&&ans[q.qid]!=='不便填写'});
    var r={
      type:mode==='ALL'?'all':(DATA.dims.filter(function(d){return d.id===mode})[0].scored===0?'archive':'dim'),
      mode:mode,questions:QS,scoredQs:scoredQs,scoreMap:scoreMap,valid:valid,avg:avg,
      index:Math.round(avg/5*100),rank:rank,bottom:bottom,maxScore:maxScore,minScore:minScore,
      regQs:regQs,filled:filled,skipped:regQs.length-filled.length
    };
    r.level=levelName(r.index);r.desc=levelDesc(r.type==='all'?'全部维度':DATA.dims.filter(function(d){return d.id===mode})[0].name,r.index,r.type);
    if(r.type==='dim')r.segments=segmentsOf(mode,scoredQs,scoreMap);
    if(r.type==='all'){
      r.dimScores=DATA.dims.map(function(d){
        var qs=QS.filter(function(q){return q.dim===d.id&&q.scored});
        var vals=qs.map(function(q){return scoreMap[q.qid]}).filter(function(v){return v!==null&&v!==undefined});
        var s=0;vals.forEach(function(v){s+=v});
        var av=vals.length?s/vals.length:0;
        var low=qs.map(function(q){return {q:q,s:scoreMap[q.qid]}}).filter(function(x){return x.s!==null&&x.s!==undefined}).sort(function(a,b){return a.s-b.s})[0];
        return {id:d.id,name:d.name,total:d.total,scored:d.scored,avg:av,index:Math.round(av/5*100),count:vals.length,lowest:low?low.q.short:'—'};
      });
      r.totalScore=totalScore();
      r.dimScores.forEach(function(d){
        var x=r.totalScore.dims[d.id];
        d.score=x?x.score:0;d.maxScore=x?x.max:0;d.gotScore=x?x.got:0;d.privacyCount=x?x.privacy:0;
        d.index=d.score;
      });
      r.overallIndex=r.totalScore.score;
      r.level=levelName(r.overallIndex);
      r.desc=levelDesc('全部维度',r.overallIndex,'all');
      r.dimReports=buildDimReports(r);
      var d1reg=QS.filter(function(q){return q.dim==='D1'});
      var d1filled=d1reg.filter(function(q){return ans[q.qid]!==undefined&&ans[q.qid]!=='不便填写'});
      r.archive=archiveAnalysis({filled:d1filled,regQs:d1reg},40);
    }
    if(r.type==='archive')r.analysis=archiveAnalysis(r);
    r.advice=adviceFor(r);
    return r;
  }
  /* ---------- 综合报告：七份维度详报的数据 ---------- */
  function dimensionAdvice(dim,valid,scoredQs,rank){
    if(!valid.length)return META.D1.archiveTips.map(function(t,i){return {h:'梳理 '+(i+1),p:t}});
    if(rank[rank.length-1].s>=4)return ADVANCED.slice(0,3);
    var bottom=rank.slice(-3).reverse();
    if(dim==='D2')return bottom.map(function(x){return {h:x.q.short+' · 从这里开始',p:D2TIPS[x.q.qid].low}});
    var m=META[dim],n=m.advice.length,list=[],used={},per=scoredQs.length/n;
    bottom.forEach(function(x){
      var seg=Math.min(n-1,Math.floor(x.pos/per));
      if(!used[seg]){used[seg]=1;list.push({h:x.q.short+' · 从这里开始',p:m.advice[seg]})}
    });
    for(var i=0;i<n&&list.length<3;i++)if(!used[i]){used[i]=1;list.push({h:'再看一件事',p:m.advice[i]})}
    return list.slice(0,3);
  }
  function buildDimReports(r){
    return DATA.dims.map(function(d){
      var qs=QS.filter(function(q){return q.dim===d.id});
      var scoredQs=qs.filter(function(q){return q.scored});
      var regQs=qs.filter(function(q){return !q.scored});
      var valid=scoredQs.map(function(q){return {q:q,s:r.scoreMap[q.qid],pos:q.pos}})
        .filter(function(x){return x.s!==null&&x.s!==undefined});
      var rank=valid.slice().sort(function(a,b){return b.s-a.s});
      var segments;
      if(d.scored===0){
        segments=ARCHIVE_GROUPS.map(function(g){
          var gq=regQs.filter(function(q){return archiveGroupOf(q)===g.name});
          var f=gq.filter(function(q){return regValue(q)!=='未填写'&&regValue(q)!=='未作答'}).length;
          var ratio=gq.length?f/gq.length:0;
          return {name:g.name,avg:ratio*5,ratio:ratio};
        });
      }else segments=segmentsOf(d.id,scoredQs,r.scoreMap);
      var row=r.dimScores.filter(function(x){return x.id===d.id})[0];
      var index=row?row.index:0;
      return {
        id:d.id,name:d.name,total:d.total,scored:d.scored,index:index,
        level:levelName(index),desc:levelDesc(d.name,index,'dim'),
        scoredQs:scoredQs,regQs:regQs,valid:valid,rank:rank,segments:segments,
        strengths:rank.slice(0,2).map(function(x){
          var t=D2TIPS[x.q.qid];
          return {h:x.q.short,p:t?t.high:'这一项相对更顺手，可以从这里继续建立自己的节奏。'};
        }),
        advice:dimensionAdvice(d.id,valid,scoredQs,rank),
        gotScore:row?row.gotScore:0,maxScore:row?row.maxScore:0,privacyCount:row?row.privacyCount:0,
        lowest:rank.length?rank[rank.length-1].q.short:'—'
      };
    });
  }
  function levelName(i){return i>=85?'从容稳定型':i>=70?'稳步顺畅型':i>=55?'蓄力成长型':'先慢下来型'}
  function levelDesc(name,i,type){
    if(type==='archive')return '';
    if(i>=85)return '你在「'+name+'」这一面很稳，几乎不用刻意调整，把注意力放在其他更想看的维度上就好。';
    if(i>=70)return '「'+name+'」整体顺畅，只有个别环节稍微用力，按下面的建议微调一下就会更省力。';
    if(i>=55)return '「'+name+'」有自己的节奏，先把最影响体验的两三个环节练顺，变化会比较明显。';
    return '先不用急着推进，把「'+name+'」里最基础的两件事稳住，比一次改很多更有效。';
  }
  function segmentsOf(mode,scoredQs,sm){
    var m=META[mode],out=[],avgOf=function(ids){
      var v=ids.map(function(id){return sm[id]}).filter(function(x){return x!==null&&x!==undefined});
      var s=0;v.forEach(function(x){s+=x});return v.length?s/v.length:0;
    };
    if(m.segIds)return m.segIds.map(function(g){return {name:g.name,avg:avgOf(g.ids)}});
    var p=0;
    m.segCounts.forEach(function(c,i){
      var ids=scoredQs.slice(p,p+c).map(function(q){return q.qid});p+=c;
      out.push({name:m.segNames[i],avg:avgOf(ids)});
    });
    return out;
  }
  function adviceFor(r){
    if(r.type==='archive')return META.D1.archiveTips.map(function(t,i){return {h:'梳理 '+(i+1),p:t}});
    if(r.minScore>=4)return ADVANCED.slice(0,3);
    if(r.type==='all'){
      var lowDims=r.dimScores.filter(function(d){return d.scored>0}).sort(function(a,b){return a.score-b.score}).slice(0,2),out=[];
      lowDims.forEach(function(d){
        var a=META[d.id].advice;
        out.push({h:d.name+' · 先练这里',p:a[0]},{h:d.name+' · 再看一件',p:a[1]});
      });
      return out.slice(0,3);
    }
    if(r.mode==='D2'){
      return r.bottom.slice(0,3).map(function(x){return {h:x.q.short+' · 从这里开始',p:D2TIPS[x.q.qid].low}});
    }
    var m=META[r.mode],n=m.advice.length,list=[],used={},per=r.scoredQs.length/n;
    r.bottom.forEach(function(x){
      var seg=Math.min(n-1,Math.floor(x.pos/per));
      if(!used[seg]){used[seg]=1;list.push({h:x.q.short+' · 从这里开始',p:m.advice[seg]})}
    });
    for(var i=0;i<n&&list.length<3;i++)if(!used[i]){used[i]=1;list.push({h:'再看一件事',p:m.advice[i]})}
    return list.slice(0,3);
  }
  function strengthNotes(r){
    var out=[];
    r.rank.slice(0,2).forEach(function(x){
      var t=D2TIPS[x.q.qid];
      out.push({h:x.q.short,p:t?t.high:'这一项相对更顺手，可以从这里继续建立自己的节奏。'});
    });
    return out;
  }
  function groupWord(a){return a>=4.2?'很稳，几乎不用刻意调整':a>=3.2?'基本顺畅，还有一点提升空间':'值得先练，改善会很明显'}
  function regValue(q){
    var v=ans[q.qid];
    if(v===undefined)return '未作答';
    if(v==='不便填写')return '未填写';
    return String(v);
  }

  /* ---------- 报告 DOM ---------- */
  function renderReport(){
    var name=mode==='ALL'?'全部维度综合':DATA.dims.filter(function(d){return d.id===mode})[0].name;
    $('repTitle').textContent=nickname+' · '+name+'报告';
    $('repDate').textContent=dateStr()+' · '+QS.length+' 题 · '+(R.type==='archive'?'不计分档案':(R.type==='all'?'七维度综合':'单维度自评'))+(isDemo?' · 示例数据':'');
    var html=R.type==='archive'?archiveHTML():R.type==='all'?allHTML():dimHTML();
    $('reportBody').innerHTML=html;
    show('s-report');
  }
  function disclaimerHTML(extra){
    return '<div class="disclaimer">'+(extra||'')+'本测评用于自我复盘，<b>不评判个人价值</b>，也不把群体统计特征当作对具体个人的定性判断。分数只反映所选维度内的自评状态；所有数据只留在这台设备上。报告图片含个人登记信息，请自行保管。</div>';
  }
  function scoreHTML(cap,index,level,desc){
    return '<div class="card rep-card score-card"><div class="cap">'+cap+'</div>'+
      '<div class="score-ring" style="--p:'+index+'%"><div class="score-ring-in"><b>'+index+'</b><small>/ 100</small></div></div>'+
      '<div class="level">'+level+'</div><p class="score-desc">'+esc(desc)+'</p></div>';
  }
  function notesHTML(list,tip){
    var h='';
    list.forEach(function(n){h+='<div class="note-card'+(tip?' tip-card':'')+'"><div class="note-h"><i></i>'+esc(n.h)+'</div><p>'+esc(n.p)+'</p></div>'});
    return h;
  }
  function dimHTML(){
    var h='',d=DATA.dims.filter(function(x){return x.id===mode})[0];
    h+=scoreHTML(d.name+' · 自评指数',R.index,R.level,R.desc);
    h+='<div class="card rep-card"><h3 class="rep-sec-title">三段能力</h3><p class="rep-sec-sub">'+esc(META[mode].segNames?META[mode].segNames.join(' · '):'回应与节奏 · 话题与温度 · 边界与推进')+'</p>';
    R.segments.forEach(function(g){
      h+='<div class="bar-row"><div class="bar-top"><b>'+g.name+'</b><em>'+g.avg.toFixed(1)+' / 5</em></div>'+
        '<div class="bar-track"><div class="bar-fill" style="width:'+Math.round(g.avg/5*100)+'%"></div></div>'+
        '<p class="bar-note">'+groupWord(g.avg)+'</p></div>';
    });
    h+='</div>';
    h+='<div class="card rep-card"><h3 class="rep-sec-title">'+R.valid.length+' 题明细</h3><p class="rep-sec-sub">分数越高，代表这一项越接近顺畅状态</p>';
    R.scoredQs.forEach(function(q){
      var s=R.scoreMap[q.qid];
      h+='<div class="item-row"><span class="item-name">'+esc(q.short)+'</span>'+
        (s===null?'<div class="item-track"></div><span class="item-score na">—</span>':
          '<div class="item-track"><i style="width:'+Math.round(s/5*100)+'%"></i></div><span class="item-score">'+s+'</span>')+'</div>';
    });
    var rev=R.scoredQs.filter(function(q){return q.reverse}).map(function(q){return q.qid});
    h+='<p class="mini-note">'+(rev.length?'反向题 '+rev.join('、')+' 已按 6 − 原始分换算；':'')+'选「不适用」的题不计入均分。维度得分 = 有效题均分 ÷ 5 × 100。</p>';
    if(R.regQs.length){
      h+='<details class="fold"><summary>查看 '+R.regQs.length+' 项登记信息（不计分）</summary><div class="fold-body">';
      R.regQs.forEach(function(q){
        var v=regValue(q),muted=(v==='未填写'||v==='未作答');
        h+='<div class="arch-row'+(muted?' muted':'')+'"><span>'+esc(q.short)+'</span><span>'+esc(v)+'</span></div>';
      });
      h+='</div></details>';
    }
    h+='</div>';
    h+='<div class="card rep-card"><h3 class="rep-sec-title">'+(R.maxScore>=4?'你已经做得很好的地方':'相对更顺手的地方')+'</h3><p class="rep-sec-sub">这些是可以继续依靠的部分</p>'+notesHTML(strengthNotes(R))+'</div>';
    h+='<div class="card rep-card"><h3 class="rep-sec-title">'+(R.minScore>=4?'想更进一步':'可以练习的事')+'</h3><p class="rep-sec-sub">'+(R.minScore>=4?'状态已经很稳，这几件小事能让你更从容':'挑一两件先试就好，不用一次全部改完')+'</p>'+notesHTML(R.advice,true)+'</div>';
    h+=disclaimerHTML('这份报告只覆盖「'+d.name+'」一个维度，不代表你在相亲市场的整体价值。');
    return h;
  }
  function archiveHTML(){
    var A=R.analysis,h='';
    h+='<div class="card rep-card"><h3 class="rep-sec-title">资料完成度</h3><p class="rep-sec-sub">这一维度只登记基本客观条件，不打分、不排名，也不需要"做得更好"</p>'+
      '<div class="stat-grid"><div class="stat-box"><b>'+R.filled.length+'</b><small>已填写</small></div>'+
      '<div class="stat-box"><b>'+R.skipped+'</b><small>未填写</small></div>'+
      '<div class="stat-box"><b>'+ARCHIVE_GROUPS.length+'</b><small>信息分组</small></div></div>'+
      '<p class="mini-note">把散落的信息集中到一处，是为了看清自己的现实约束，以及在关系里什么时候、以什么节奏分享它们。</p></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">这份解读怎么看</h3>'+
      '<p class="rep-sec-sub">下面把常说的「优势 / 劣势」换成更中性的说法：资料页上会被快速扫到的客观信号，以及它们可能带来的匹配成本。只看条件怎么影响相处，不评价人，也不评价任何一方的条件。</p></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">六组客观条件速览</h3><p class="rep-sec-sub">只描述状态，不做好坏评级</p>';
    A.signals.forEach(function(s){
      h+='<div class="arch-row"><span>'+esc(s.name)+'</span><span>'+esc(s.state)+' · '+esc(s.note)+'</span></div>';
    });
    h+='</div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">相对占优的地方</h3><p class="rep-sec-sub">让相处更省力、也更容易被看到的客观信号</p>'+notesHTML(A.strengths)+'</div>';
    h+='<div class="card rep-card"><h3 class="rep-sec-title">需要提前说清楚的</h3><p class="rep-sec-sub">不是缺点，只是会占用沟通成本的客观条件</p>'+notesHTML(A.attentions,true)+'</div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">门当户对 · 怎么对齐更省力</h3><p class="rep-sec-sub">'+esc(A.intro)+'</p>';
    h+='<div class="arch-gname">建议提前对齐</div>';
    A.must.forEach(function(x,i){h+='<div class="arch-row"><span>必谈 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
    h+='<div class="arch-gname">可以商量，不必一开始就一致</div>';
    A.flex.forEach(function(x,i){h+='<div class="arch-row"><span>弹性 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
    h+='<div class="arch-gname">可以先聊清的三件事</div>';
    A.talks.forEach(function(x,i){h+='<div class="arch-row"><span>话题 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
    h+='<p class="mini-note">'+esc(A.pace)+'</p></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">全部登记明细</h3><p class="rep-sec-sub">'+R.regQs.length+' 项，按组查看；未填写项以浅色标出</p>'+
      '<details class="fold"><summary>展开查看 '+R.regQs.length+' 项明细</summary><div class="fold-body">';
    ARCHIVE_GROUPS.forEach(function(g){
      var qs=R.regQs.filter(function(q){return archiveGroupOf(q)===g.name});
      if(!qs.length)return;
      h+='<div class="arch-group"><div class="arch-gname">'+g.name+' · '+qs.length+' 项</div>';
      qs.forEach(function(q){
        var v=regValue(q),muted=(v==='未填写'||v==='未作答');
        h+='<div class="arch-row'+(muted?' muted':'')+'"><span>'+esc(q.short)+'</span><span>'+esc(v)+'</span></div>';
      });
      h+='</div>';
    });
    h+='</div></details></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">可以拿来对照的四件事</h3><p class="rep-sec-sub">不是任务清单，只是几个容易漏掉的角度</p>'+notesHTML(R.advice,true)+'</div>';
    h+=disclaimerHTML('本页的「占优 / 留意」指客观信号与匹配成本，<b>不是对个人打分或排高低</b>；健康、民族、信仰、婚育等仅作为需要沟通的兼容项，不作优劣判断，也不评价任何一方的条件。档案含个人敏感信息，<b>下载图片后请自行保管</b>。');
    return h;
  }
  function dimBlockHTML(dr){
    var isD1=dr.scored===0,h='';
    h+='<div class="card rep-card dim-block"><div class="dim-block-head">'+
      '<div class="dim-block-id">'+dr.id+'</div><div class="dim-block-main"><h3>'+dr.name+'</h3>'+
      '<p class="rep-sec-sub">'+dr.total+' 题 · 实得 '+dr.gotScore+' / '+dr.maxScore+' · 得分 '+dr.index+' / 100 · '+dr.level+'</p></div></div>'+
      '<p class="dim-block-desc">'+esc(dr.desc)+'</p>';
    h+='<div class="arch-gname">'+(isD1?'六组信息填写情况':'三段能力')+'</div>';
    dr.segments.forEach(function(g){
      if(isD1){
        h+='<div class="bar-row"><div class="bar-top"><b>'+g.name+'</b><em>'+Math.round(g.ratio*100)+'%</em></div>'+
          '<div class="bar-track"><div class="bar-fill" style="width:'+Math.round(g.ratio*100)+'%"></div></div></div>';
      }else{
        h+='<div class="bar-row"><div class="bar-top"><b>'+g.name+'</b><em>'+g.avg.toFixed(1)+' / 5</em></div>'+
          '<div class="bar-track"><div class="bar-fill" style="width:'+Math.round(g.avg/5*100)+'%"></div></div>'+
          '<p class="bar-note">'+groupWord(g.avg)+'</p></div>';
      }
    });
    if(!isD1){
      h+='<div class="arch-gname">'+dr.scoredQs.length+' 题逐题明细</div>';
      dr.scoredQs.forEach(function(q){
        var s=R.scoreMap[q.qid];
        h+='<div class="item-row"><span class="item-name">'+esc(q.short)+'</span>'+
          ((s===null||s===undefined)?'<div class="item-track"></div><span class="item-score na">—</span>':
          '<div class="item-track"><i style="width:'+Math.round(s/5*100)+'%"></i></div><span class="item-score">'+s+'</span>')+'</div>';
      });
      h+='<p class="mini-note">反向题已按 6 − 原始分换算；选「不适用」的题不计入均分。本维度最需练习：'+esc(dr.lowest)+'。</p>';
      h+='<div class="arch-gname">相对占优的地方</div>'+notesHTML(dr.strengths);
      h+='<div class="arch-gname">'+(dr.rank.length&&dr.rank[dr.rank.length-1].s>=4?'想更进一步':'可以练习的事')+'</div>'+notesHTML(dr.advice,true);
    }else if(R.archive){
      var A=R.archive;
      h+='<div class="arch-gname">六组客观条件速览</div>';
      A.signals.forEach(function(s){h+='<div class="arch-row"><span>'+esc(s.name)+'</span><span>'+esc(s.state)+' · '+esc(s.note)+'</span></div>'});
      h+='<div class="arch-gname">相对占优的地方</div>'+notesHTML(A.strengths);
      h+='<div class="arch-gname">需要提前说清楚的</div>'+notesHTML(A.attentions,true);
      h+='<div class="arch-gname">门当户对 · 怎么对齐更省力</div><p class="mini-note">'+esc(A.intro)+'</p>';
      A.must.forEach(function(x,i){h+='<div class="arch-row"><span>必谈 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
      A.flex.forEach(function(x,i){h+='<div class="arch-row"><span>弹性 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
      A.talks.forEach(function(x,i){h+='<div class="arch-row"><span>话题 '+(i+1)+'</span><span>'+esc(x)+'</span></div>'});
      h+='<p class="mini-note">'+esc(A.pace)+'</p>';
      h+='<div class="arch-gname">可以拿来对照的四件事</div>'+notesHTML(dr.advice,true);
    }
    if(dr.regQs.length){
      h+='<details class="fold"><summary>查看本维度 '+dr.regQs.length+' 项登记明细</summary><div class="fold-body">';
      dr.regQs.forEach(function(q){
        var v=regValue(q),muted=(v==='未填写'||v==='未作答');
        h+='<div class="arch-row'+(muted?' muted':'')+'"><span>'+esc(q.short)+'</span><span>'+esc(v)+'</span></div>';
      });
      h+='</div></details>';
    }
    h+='</div>';
    return h;
  }
  function allHTML(){
    var T=R.totalScore,h='';
    h+=scoreHTML('154 题合成总分',R.overallIndex,R.level,R.desc);

    h+='<div class="card rep-card"><h3 class="rep-sec-title">这个总分怎么来的</h3>'+
      '<p class="rep-sec-sub">154 道题作答后按单题分值加权汇总；隐私项不计入，其余归一化到 100 分</p>'+
      '<div class="stat-grid">'+
      '<div class="stat-box"><b>'+T.gotSum+'</b><small>实得 / '+T.maxSum+' 分</small></div>'+
      '<div class="stat-box"><b>'+T.privacyCount+'</b><small>隐私项不计入</small></div>'+
      '<div class="stat-box"><b>154</b><small>参与题数</small></div></div>'+
      '<div class="arch-gname">计分规则</div>'+
      '<div class="arch-row"><span>自评量表题 80 道</span><span>1–5 分 × 权重 2；反向题按 6 − 原始分</span></div>'+
      '<div class="arch-row"><span>D5 自评题 6 道</span><span>权重提升至 3</span></div>'+
      '<div class="arch-row"><span>单选登记题 74 道</span><span>满分 5 分，按信息是否明确计分</span></div>'+
      '<div class="arch-row"><span>选「不便填写」/「不适用」</span><span>该题为隐私项，不计入总分</span></div>'+
      '<p class="mini-note">登记题只判断"这一项有没有明确答案"，不按年龄、健康、民族、收入等答案内容评高低；D5 的 31 项登记题现已纳入计分。</p></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">七个维度得分</h3><p class="rep-sec-sub">同一套单题规则在维度内汇总，换算为 100 分制</p>';
    R.dimScores.forEach(function(d){
      h+='<div class="bar-row"><div class="bar-top"><b>'+d.id+' '+d.name+'</b><em>'+d.index+' / 100</em></div>'+
        '<div class="bar-track"><div class="bar-fill" style="width:'+d.index+'%"></div></div>'+
        '<p class="bar-note">'+d.total+' 题 · 实得 '+d.gotScore+' / '+d.maxScore+(d.privacyCount?' · '+d.privacyCount+' 项隐私不计入':'')+(d.lowest&&d.lowest!=='—'?' · 最需练习：'+esc(d.lowest):'')+'</p></div>';
    });
    h+='</div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">全局速览</h3><p class="rep-sec-sub">跨七个维度，看最顺手和最值得练的具体能力项</p>'+
      '<div class="stat-grid"><div class="stat-box"><b>'+R.valid.length+'</b><small>有效计分题</small></div>'+
      '<div class="stat-box"><b>'+T.privacyCount+'</b><small>隐私项</small></div>'+
      '<div class="stat-box"><b>'+R.filled.length+'</b><small>已填登记项</small></div></div>'+
      '<div class="arch-gname">全局最顺手的三项</div>';
    R.rank.slice(0,3).forEach(function(x,i){
      h+='<div class="arch-row"><span>'+(i+1)+'. '+esc(x.q.short)+'（'+x.q.dim+'）</span><span>'+x.s+' / 5</span></div>';
    });
    h+='<div class="arch-gname">全局最值得练的三项</div>';
    R.rank.slice(-3).reverse().forEach(function(x,i){
      h+='<div class="arch-row"><span>'+(i+1)+'. '+esc(x.q.short)+'（'+x.q.dim+'）</span><span>'+x.s+' / 5</span></div>';
    });
    h+='</div>';

    h+='<div class="report-divider"><span>七份维度详报</span><small>每一维度都按单维度测评的完整结构展开</small></div>';
    R.dimReports.forEach(function(dr){h+=dimBlockHTML(dr)});

    h+='<div class="card rep-card"><h3 class="rep-sec-title">全部登记明细</h3><p class="rep-sec-sub">74 项客观与偏好登记，按维度分组；未填写项以浅色标出</p>'+
      '<details class="fold"><summary>展开查看 74 项登记明细</summary><div class="fold-body">';
    DATA.dims.forEach(function(d){
      var qs=QS.filter(function(q){return q.dim===d.id&&!q.scored});
      if(!qs.length)return;
      h+='<div class="arch-group"><div class="arch-gname">'+d.id+' '+d.name+' · '+qs.length+' 项</div>';
      qs.forEach(function(q){
        var v=regValue(q),muted=(v==='未填写'||v==='未作答');
        h+='<div class="arch-row'+(muted?' muted':'')+'"><span>'+esc(q.short)+'</span><span>'+esc(v)+'</span></div>';
      });
      h+='</div>';
    });
    h+='</div></details></div>';

    h+='<div class="card rep-card"><h3 class="rep-sec-title">最值得先做的三件事</h3><p class="rep-sec-sub">取自得分最低的两个维度</p>'+notesHTML(R.advice,true)+'</div>';
    h+=disclaimerHTML('总分由 154 题加权合成，用于自我复盘，<b>不代表你在相亲市场的整体价值</b>；登记题不按答案内容评高低，客观条件请结合 D1 档案报告一起看。');
    return h;
  }

  /* ---------- 报告长图 ---------- */
  var FONT='-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';
  function font(ctx,size,weight){ctx.font=(weight||400)+' '+size+'px '+FONT}
  function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
  function fillRR(ctx,x,y,w,h,r,color){rr(ctx,x,y,w,h,r);ctx.fillStyle=color;ctx.fill()}
  function line(ctx,str,x,y,size,color,weight){font(ctx,size,weight);ctx.fillStyle=color;ctx.fillText(str,x,y);return y}
  function wrap(ctx,str,x,y,maxW,size,lh,color,weight){
    font(ctx,size,weight);ctx.fillStyle=color;
    var buf='',yy=y;
    for(var i=0;i<str.length;i++){
      var test=buf+str.charAt(i);
      if(ctx.measureText(test).width>maxW&&buf){ctx.fillText(buf,x,yy);yy+=lh;buf=str.charAt(i)}else buf=test;
    }
    if(buf){ctx.fillText(buf,x,yy);yy+=lh}
    return yy;
  }
  function gradBar(ctx,x,y,w,h,ratio){
    fillRR(ctx,x,y,w,h,h/2,'#f6e9ee');
    var fw=Math.max(h,w*Math.min(1,Math.max(0,ratio)));
    var g=ctx.createLinearGradient(x,y,x+fw,y);g.addColorStop(0,'#ffb9a9');g.addColorStop(.55,'#e9759c');g.addColorStop(1,'#c3a2e3');
    fillRR(ctx,x,y,fw,h,h/2,g);
  }
  function card(ctx,x,y,w,h){
    ctx.save();ctx.shadowColor='rgba(203,132,158,.13)';ctx.shadowBlur=22;ctx.shadowOffsetY=8;
    fillRR(ctx,x,y,w,h,28,'#ffffff');ctx.restore();
  }
  function cut(ctx,str,maxW,size){
    font(ctx,size,400);var out='';
    for(var i=0;i<str.length;i++){if(ctx.measureText(out+str.charAt(i)).width>maxW)break;out+=str.charAt(i)}
    return out===''?'':(out.length<str.length?out.slice(0,-1)+'…':out);
  }
  function paintGrid(ctx,x,y,w,rows,cols,rowH,size,color){
    if(!rows.length)return y;
    var colW=w/cols;
    rows.forEach(function(t,i){
      line(ctx,cut(ctx,String(t),colW-12,size),x+(i%cols)*colW,y+Math.floor(i/cols)*rowH,size,color,400);
    });
    return y+Math.ceil(rows.length/cols)*rowH;
  }
  function paint(ctx,W,H){
    var bg=ctx.createLinearGradient(0,0,0,H);
    bg.addColorStop(0,'#fff0f4');bg.addColorStop(.42,'#fff8f6');bg.addColorStop(1,'#fdf1f8');
    ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
    ctx.save();ctx.globalAlpha=.5;
    var halo=ctx.createRadialGradient(80,40,10,80,40,300);
    halo.addColorStop(0,'rgba(255,183,205,.55)');halo.addColorStop(1,'rgba(255,183,205,0)');
    ctx.fillStyle=halo;ctx.fillRect(0,0,420,340);ctx.restore();
    var X=48,CW=W-96,y=72;
    var name=R.type==='all'?'全部维度综合':DATA.dims.filter(function(d){return d.id===mode})[0].name;
    y=line(ctx,'BLOOM LAB  ·  自评报告',X,y,21,'#a18b95',600)+34;
    y=line(ctx,cut(ctx,name+'报告',CW,42),X,y,42,'#3d2f36',700)+38;
    y=line(ctx,nickname+'  ·  '+dateStr()+'  ·  '+QS.length+' 题',X,y,22,'#8a7680',400)+40;

    /* 主卡 */
    var ch=330;card(ctx,X,y,CW,ch);
    var iy=y+44;
    if(R.type==='archive'){
      iy=line(ctx,'自我档案完成度',X+36,iy,22,'#a18b95',600)+72;
      iy=line(ctx,String(R.filled.length)+' / '+R.regQs.length,X+36,iy,76,'#e9759c',700)+16;
      iy=line(ctx,'已填写 '+R.filled.length+' 项 · 未填写 '+R.skipped+' 项 · 共 '+ARCHIVE_GROUPS.length+' 组',X+36,iy,23,'#6f5b64',400)+38;
      iy=wrap(ctx,'这一维度只做客观情况登记，不打分、不排名，用来看清自己的现实约束与分享节奏。',X+36,iy,CW-72,23,36,'#6f5b64',400);
    }else{
      var mainIndex=R.type==='all'?R.overallIndex:R.index;
      iy=line(ctx,R.type==='all'?'154 题合成总分':name+' · 自评指数',X+36,iy,22,'#a18b95',600)+76;
      var ig=ctx.createLinearGradient(X+36,iy-60,X+230,iy-60);ig.addColorStop(0,'#e9759c');ig.addColorStop(1,'#c3a2e3');
      font(ctx,100,700);ctx.fillStyle=ig;ctx.fillText(String(mainIndex),X+36,iy);
      var nw=ctx.measureText(String(mainIndex)).width;
      line(ctx,'/ 100',X+42+nw,iy,25,'#a18b95',400);
      font(ctx,24,700);var lw=ctx.measureText(R.level).width+44;
      fillRR(ctx,X+36,iy+34,lw,46,23,'#fff0f5');
      line(ctx,R.level,X+58,iy+65,23,'#e9759c',700);
      iy=wrap(ctx,R.desc,X+36,iy+118,CW-72,23,36,'#6f5b64',400);
    }
    y+=ch+30;

    /* 条形区 */
    var bars=[];
    if(R.type==='dim')R.segments.forEach(function(g){bars.push({label:g.name,value:g.avg.toFixed(1)+' / 5',ratio:g.avg/5,note:groupWord(g.avg)})});
    else if(R.type==='all')R.dimScores.forEach(function(d){
      bars.push({label:d.id+' '+d.name,value:d.index+' / 100',ratio:d.index/100,
        note:'实得 '+d.gotScore+' / '+d.maxScore+(d.privacyCount?' · '+d.privacyCount+' 项隐私不计入':'')+(d.scored>0?' · 最需练习：'+d.lowest:' · 信息明确度')});
    });
    else ARCHIVE_GROUPS.forEach(function(g){
      var qs=R.regQs.filter(function(q){return archiveGroupOf(q)===g.name});
      var f=qs.filter(function(q){return regValue(q)!=='未填写'&&regValue(q)!=='未作答'}).length;
      bars.push({label:g.name,value:f+' / '+qs.length,ratio:qs.length?f/qs.length:0,note:'已填写 '+f+' 项'});
    });
    var bh=64+bars.length*98;card(ctx,X,y,CW,bh);
    var gy=y+50;
    gy=line(ctx,R.type==='archive'?'六组信息':(R.type==='all'?'七个维度得分':'能力分段'),X+36,gy,27,'#3d2f36',700)+16;
    var barSub=R.type==='archive'?'每组的填写情况':(R.type==='all'?('154 题加权合成 · 总实得 '+R.totalScore.gotSum+' / '+R.totalScore.maxSum):'从整体到细节，看看哪一段最需要留意');
    gy=line(ctx,barSub,X+36,gy,20,'#a18b95',400)+32;
    bars.forEach(function(b){
      line(ctx,b.label,X+36,gy,23,'#3d2f36',600);
      font(ctx,23,700);var tw=ctx.measureText(b.value).width;
      line(ctx,b.value,X+CW-36-tw,gy,23,'#e9759c',700);
      gradBar(ctx,X+36,gy+16,CW-72,13,b.ratio);
      wrap(ctx,b.note,X+36,gy+52,CW-72,19,28,'#a18b95',400);
      gy+=98;
    });
    y+=bh+30;

    /* 明细区 */
    var rows=[],step=R.type==='archive'?34:(R.type==='all'?116:46);
    if(R.type==='dim')R.scoredQs.forEach(function(q){
      var s=R.scoreMap[q.qid];rows.push({label:q.short,value:s===null?'—':String(s),ratio:s===null?0:s/5,note:''});
    });
    else if(R.type==='archive')R.regQs.forEach(function(q){
      var v=regValue(q),ok=(v!=='未填写'&&v!=='未作答');
      rows.push({label:q.short,value:cut(ctx,v,250,20),ratio:ok?1:0,note:''});
    });
    else R.dimScores.forEach(function(d){
      rows.push({label:d.id+' '+d.name,value:d.index+' / 100',ratio:d.index/100,
        note:d.scored>0?levelDesc(d.name,d.index,'dim'):'客观登记项，分数反映信息明确程度，不评条件好坏'});
    });
    var lh=64+rows.length*step+40;card(ctx,X,y,CW,lh);
    var jy=y+50;
    jy=line(ctx,R.type==='archive'?'登记明细':'维度明细',X+36,jy,27,'#3d2f36',700)+16;
    var listSub=R.type==='archive'?'未填写项以浅色标出':(R.type==='all'?'同一套单题规则在维度内汇总，换算为 100 分制':('分数越高，代表这一项越接近顺畅状态'+(R.regQs.length?' · 另有 '+R.regQs.length+' 项登记信息见页面报告':'')));
    jy=line(ctx,listSub,X+36,jy,20,'#a18b95',400)+30;
    rows.forEach(function(rw){
      if(R.type==='all'){
        line(ctx,rw.label,X+36,jy,23,'#3d2f36',700);
        font(ctx,22,700);var vw=ctx.measureText(rw.value).width;
        line(ctx,rw.value,X+CW-36-vw,jy,22,'#e9759c',700);
        gradBar(ctx,X+36,jy+14,CW-72,10,rw.ratio);
        wrap(ctx,rw.note,X+36,jy+50,CW-72,19,27,'#8a7680',400);
      }else{
        line(ctx,cut(ctx,rw.label,190,21),X+36,jy,21,'#6f5b64',400);
        gradBar(ctx,X+250,jy-13,300,10,rw.ratio);
        font(ctx,21,700);var sw=ctx.measureText(rw.value).width;
        line(ctx,rw.value,X+CW-36-sw,jy,21,rw.ratio===0?'#b9a3ad':'#e9759c',700);
      }
      jy+=step;
    });
    y+=lh+30;

    /* 综合报告：七维度能力摘要（长图精简版） */
    if(R.type==='all'){
      var sumLines=[];
      R.dimReports.forEach(function(dr){
        if(dr.scored>0)sumLines.push(dr.id+' '+dr.name+' · '+dr.segments.map(function(g){return g.name+' '+g.avg.toFixed(1)}).join(' / '));
      });
      sumLines.push('全局占优：'+R.rank.slice(0,3).map(function(x){return x.q.short+' '+x.s}).join('、'));
      sumLines.push('待提升：'+R.rank.slice(-3).reverse().map(function(x){return x.q.short+' '+x.s}).join('、'));
      var sh=64+sumLines.length*40+40;card(ctx,X,y,CW,sh);
      var sy=y+50;
      sy=line(ctx,'七维度能力摘要',X+36,sy,27,'#3d2f36',700)+16;
      sy=line(ctx,'各维度三段能力与全局高低项；完整逐题明细见页面报告',X+36,sy,19,'#a18b95',400)+28;
      sumLines.forEach(function(t){line(ctx,cut(ctx,t,CW-72,19),X+36,sy,19,'#6f5b64',400);sy+=40});
      y+=sh+30;
    }

    /* D1 客观条件解读（长图精简版） */
    if(R.type==='archive'){
      var aRows=[];
      R.analysis.signals.forEach(function(s){aRows.push(s.name+' · '+s.state)});
      R.analysis.strengths.slice(0,3).forEach(function(s,i){aRows.push('占优 '+(i+1)+' · '+s.h)});
      R.analysis.attentions.slice(0,3).forEach(function(t,i){aRows.push('留意 '+(i+1)+' · '+t.h)});
      R.analysis.must.slice(0,3).forEach(function(m,i){aRows.push('对齐 '+(i+1)+' · '+m)});
      var qh=64+aRows.length*34+130;card(ctx,X,y,CW,qh);
      var qy=y+50;
      qy=line(ctx,'客观条件解读',X+36,qy,27,'#3d2f36',700)+16;
      qy=line(ctx,'六组速览 · 占优 · 留意 · 条件对齐',X+36,qy,20,'#a18b95',400)+30;
      aRows.forEach(function(t){line(ctx,cut(ctx,t,CW-72,20),X+36,qy,20,'#6f5b64',400);qy+=34});
      wrap(ctx,R.analysis.pace,X+36,qy+12,CW-72,20,30,'#8a7680',400);
      y+=qh+30;
    }

    /* 建议 */
    var ah=64+R.advice.length*150;card(ctx,X,y,CW,ah);
    var ay=y+50;
    ay=line(ctx,R.type==='archive'?'可以拿来对照的事':(R.minScore>=4?'想更进一步':'可以练习的事'),X+36,ay,27,'#3d2f36',700)+42;
    R.advice.forEach(function(a){
      fillRR(ctx,X+36,ay-30,CW-72,136,20,'#fff8fb');
      line(ctx,a.h,X+56,ay,23,'#3d2f36',700);
      wrap(ctx,a.p,X+56,ay+34,CW-112,21,32,'#6f5b64',400);
      ay+=150;
    });
    y+=ah+30;

    /* 综合报告：完整报告明细，与页面七份维度详报一一对应 */
    if(R.type==='all'){
      y=line(ctx,'完整报告明细 · 七份维度详报',X+6,y+18,27,'#3d2f36',700)+24;
      R.dimReports.forEach(function(dr){
        var isD1=dr.scored===0;
        var segRows=dr.segments.map(function(g){return g.name+' '+(isD1?Math.round(g.ratio*100)+'%':g.avg.toFixed(1))});
        var itemRows=dr.scoredQs.map(function(q){
          var s=R.scoreMap[q.qid];
          return q.short+' '+(s===null||s===undefined?'—':s+'/5');
        });
        var tipRows=[];
        dr.strengths.slice(0,1).forEach(function(t){tipRows.push('占优 '+t.h)});
        dr.advice.slice(0,2).forEach(function(t){tipRows.push('建议 '+t.h)});
        var extraRows=[];
        if(isD1&&R.archive){
          R.archive.strengths.slice(0,2).forEach(function(t){extraRows.push('占优 '+t.h)});
          R.archive.attentions.slice(0,2).forEach(function(t){extraRows.push('留意 '+t.h)});
          R.archive.must.slice(0,2).forEach(function(t){extraRows.push('对齐 '+t.h)});
        }
        var regRows=dr.regQs.map(function(q){return q.short+'：'+cut(ctx,regValue(q),110,18)});
        var nRows=Math.ceil(segRows.length/3)+Math.ceil(itemRows.length/3)+Math.ceil(tipRows.length/3)+
                  Math.ceil(extraRows.length/3)+Math.ceil(regRows.length/3);
        var gh=90+nRows*24;card(ctx,X,y,CW,gh);
        var gy=y+44;
        gy=line(ctx,dr.id+' '+dr.name+'  ·  '+dr.index+'/100  ·  '+dr.total+' 题',X+36,gy,23,'#3d2f36',700)+26;
        gy=paintGrid(ctx,X+36,gy,CW-72,segRows,3,24,18,'#6f5b64');
        gy=paintGrid(ctx,X+36,gy,CW-72,itemRows,3,24,18,'#e9759c');
        gy=paintGrid(ctx,X+36,gy,CW-72,tipRows,3,24,18,'#8a7680');
        gy=paintGrid(ctx,X+36,gy,CW-72,extraRows,3,24,18,'#8a7680');
        gy=paintGrid(ctx,X+36,gy,CW-72,regRows,3,24,18,'#8a7680');
        y+=gh+26;
      });
    }

    /* 说明 */
    var dh=235;card(ctx,X,y,CW,dh);
    var dy=y+48;
    dy=line(ctx,'关于这份报告',X+36,dy,24,'#3d2f36',700)+38;
    var note=R.type==='archive'
      ?'只覆盖「基本客观条件」一个维度，为客观情况登记与条件解读，不打分、不排名，不评价任何一方的条件，也不代表你在相亲市场的整体价值。报告含个人敏感信息，请自行保管。'
      :(R.type==='all'
        ?'总分由 154 题加权合成；登记题按信息是否明确计分，不按答案内容评高低，隐私项不计入总分。结果用于自我复盘，不代表整体价值。'
        :'只覆盖所选的一个维度，反映的是该维度内的自评状态，不代表你在相亲市场的整体价值。');
    wrap(ctx,note+'分数用于看见自己的习惯，不做好坏评判。',X+36,dy,CW-72,20,32,'#8a7680',400);
    y+=dh+34;
    line(ctx,'BLOOM LAB  ·  给自己的一次温柔观察',X,y,19,'#b9a3ad',400);
    return y+30;
  }
  function isWeChat(){return /MicroMessenger/i.test((typeof navigator!=='undefined'&&navigator.userAgent)||'')}
  var saveLabel=isWeChat()?'生成报告图片':'下载报告图片';
  function buildCanvas(small){
    var W=750;
    var tmp=document.createElement('canvas');tmp.width=W;tmp.height=7500;
    var tc=tmp.getContext('2d');
    var endY=paint(tc,W,7500),H=Math.ceil(endY)+20;
    var cap=small?8000000:14000000,maxS=small?1.5:2;
    var S=Math.max(1,Math.min(maxS,Math.sqrt(cap/(W*H)),7000/H));
    var c=document.createElement('canvas');c.width=Math.round(W*S);c.height=Math.round(H*S);
    var ctx=c.getContext('2d');ctx.scale(S,S);
    paint(ctx,W,H);
    return c;
  }
  function triggerDownload(){
    if(isWeChat()||!blobUrl)return;
    var a=document.createElement('a');a.href=blobUrl;
    a.download='自我观察报告_'+(mode==='ALL'?'全部维度':mode)+'_'+nickname+'_'+dateFile()+'.png';
    document.body.appendChild(a);a.click();document.body.removeChild(a);
  }
  $('saveBtn').addEventListener('click',function(){
    var btn=this;btn.disabled=true;btn.textContent='正在生成图片…';
    setTimeout(function(){
      try{
        var wx=isWeChat(),canvas=buildCanvas(wx);
        if(wx){
          var dataUrl=canvas.toDataURL('image/png');
          if(dataUrl.length>4000000){
            var jpg=canvas.toDataURL('image/jpeg',0.9);
            if(jpg&&jpg.length>100)dataUrl=jpg;
          }
          if(!dataUrl||dataUrl.length<100)throw new Error('empty image');
          if(blobUrl){try{URL.revokeObjectURL(blobUrl)}catch(e){}blobUrl=null}
          $('reportImg').src=dataUrl;
          $('modalTitle').textContent='长按图片保存到相册';
          $('modalHint').innerHTML='微信内置浏览器不支持直接下载。请<b>长按下方图片</b> → 选择「保存图片」；<br>或点右上角 ··· → 「在浏览器打开」后重新下载。';
          $('dlAgain').style.display='none';
          $('imgModal').classList.add('on');
          btn.disabled=false;btn.textContent=saveLabel;
          return;
        }
        if(blobUrl){try{URL.revokeObjectURL(blobUrl)}catch(e){}}
        var finish=function(url){
          blobUrl=url;$('reportImg').src=url;
          $('modalTitle').textContent='报告图片已生成';
          $('modalHint').innerHTML='若下载没有自动开始，长按下方图片即可保存到相册';
          $('dlAgain').style.display='';
          $('imgModal').classList.add('on');
          triggerDownload();btn.disabled=false;btn.textContent=saveLabel;
        };
        if(canvas.toBlob)canvas.toBlob(function(b){if(b)finish(URL.createObjectURL(b));else finish(canvas.toDataURL('image/png'))},'image/png');
        else finish(canvas.toDataURL('image/png'));
      }catch(err){
        btn.disabled=false;btn.textContent=saveLabel;
        alert(isWeChat()?'图片生成失败，请重试，或用右上角菜单在浏览器中打开':'图片生成失败，请再试一次');
      }
    },60);
  });
  $('dlAgain').addEventListener('click',triggerDownload);
  function closeModal(){$('imgModal').classList.remove('on')}
  $('closeModal').addEventListener('click',closeModal);
  $('modalMask').addEventListener('click',closeModal);
  $('againBtn').addEventListener('click',function(){ans={};idx=0;R=null;locked=false;show('s-quiz');renderQuestion()});
  $('homeBtn').addEventListener('click',function(){show('s-home');$('nick').value=nickname});

  /* ---------- 示例报告：模拟填完 154 题 ---------- */
  function runDemo(){
    if(typeof location==='undefined'||!/(?:\?|&)demo=1(?:&|$)/.test(location.search))return false;
    nickname='小满';mode='ALL';selected='ALL';QS=DATA.questions.slice();ans={};idx=0;R=null;
    var pattern=[5,4,5,3,4,5,2,4,5,3,4,2];
    QS.forEach(function(q,i){
      if(q.scored){
        var v=pattern[i%pattern.length];
        if(q.reverse)v=(i%3===0)?2:4;
        if(q.options.some(function(o){return o.v==='N'}))v=(i%4===0)?'N':v;
        ans[q.qid]=v;
      }else if(i%9===0)ans[q.qid]='不便填写';
      else{
        var opts=q.options.filter(function(o){return o.v!=='不便填写'});
        ans[q.qid]=opts[Math.floor(opts.length/2)].v;
      }
    });
    var fix={
      F1:'26-29岁',F4b:'体制内',F4c:'5-10年',F4d:'否',F4e:'低',F4f:'几乎无',
      F5a:'10000-20000',F5b:'20-50万',F5c:'有房',F5d:'无负债',F5e:'否',
      F6a:'一线城市',F6b:'新一线/省会',F6c:'5-10年',
      F7a:'均60岁以下且健康',F7b:'是',F7c:'中',F7d:'有自住房及储蓄',F7e:'独生女',F7f:'共同商量',
      F8a:'未婚',F8b:'无',F8d:'1-2年',
      F9a:'否',F9b:'无',F9c:'无',F9d:'是',F9e:'无明显家族病史',
      F10a:'汉族',F10b:'无',F10c:'无',F10d:'无特别要求',F11:'无'
    };
    Object.keys(fix).forEach(function(k){ans[k]=fix[k]});
    isDemo=true;R=compute();renderReport();
    return true;
  }
  $('saveBtn').textContent=saveLabel;
  if(!runDemo())renderHome();
})();
