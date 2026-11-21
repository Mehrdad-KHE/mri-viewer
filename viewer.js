'use strict';
const words={
 en:{eyebrow:'Public imaging research',heading:'Compare tumour outlines',intro:'Explore three recorded public glioma studies. Each view shows the same FLAIR slice.',study:'Study',plane:'Plane',region:'Region',axial:'Axial',coronal:'Coronal',sagittal:'Sagittal',WT:'Whole tumour',TC:'Tumour core',ET:'Enhancing tumour',reference:'Dataset reference',model:'MONAI prediction',overlay:'Overlay',centre:'Centre view',slice:'Sampled slices',focus:'Find a review slice',volume:'Volume comparison',full:'Measured across the entire 3D region.',difference:'Model minus reference',boundary:'Recorded research outputs. Images and measurements are displayed from completed runs. For research review only.',source:'Image source and methods',attribution:'Source: Medical Segmentation Decathlon, Task 01 Brain Tumour (BraTS). Adaptations include intensity windowing, 2D slice rendering, and traces of the reference and recorded model boundaries. These figures are licensed under CC BY-SA 4.0. The reference is used for evaluation.',unit:'mL',slicenum:'Slice',of:'of',loading:'Loading images…',fail:'Could not load this study. Reload the page to retry.',ready:'Recorded result',none:'No outline for this region in the saved study.',
 resultsHeading:'Results — 3D Dice by case and region',resultsSummary:'Three public brain MRI scans. For each scan, the model\u2019s tumour outline is compared with the expert reference annotation of the same scan. The scores below are whole-volume (3D) overlap scores with the measured volumes. Three scans are a research demonstration, not a validation study.',resultsFail:'The results file could not be loaded, so the scores are not shown here.',howTitle:'How to read these scores',howText:'Dice runs from 0 (no overlap) to 1 (identical regions). It is an overlap score, not a percentage of correctness. Smaller regions — the enhancing tumour is the smallest — normally score lower and vary more. For background: when experts have outlined the same brain tumours independently, their agreement with each other has historically been around Dice 0.74–0.85 (Menze et al., 2015). That is context about the task, not a target or a grade for this demo.',provenance:'Dataset: Medical Segmentation Decathlon Task01 (BraTS), public data, CC BY-SA 4.0 · Cases: BRATS_001–003 · n = 3 · Metric: 3D voxel-wise Dice per region, recomputed from the published masks · Model outputs: recorded runs.',caseLabel:'Case',refShort:'Ref',modelShort:'Model',rangePrefix:'Range across the 3 cases:',diceLabel:'3D Dice — whole volume',defWT:'Whole tumour: every tumour label together — oedema, core and enhancing parts. The regions nest: the enhancing tumour sits inside the tumour core, and the core sits inside the whole tumour.',defTC:'Tumour core: the necrotic / non-enhancing core plus the enhancing tumour.',defET:'Enhancing tumour: the part that enhances after contrast.',opacityLabel:'Prediction opacity',openViewer:'Open in viewer',disagreeHeading:'Where the model disagrees most',card1Text:'The model\u2019s whole-tumour outline is larger than the reference: 133.6 mL marked where the reference marks 111.7 mL (+19.6%). The model outlines the tumour region, but draws its outer boundary too generously. This is the weakest whole-tumour score of the three.',card2Text:'The enhancing tumour is the hardest region in this case and the lowest single score on the page: the model marks more enhancing tissue than the reference (34.4 mL against 31.5 mL).',card3Text:'This case\u2019s core and enhancing regions are small (9.3 and 8.2 mL). At this size, a small absolute difference moves the score more than it would in a large region. The model marks slightly less than the reference in both.',card4Tag:'Closest agreement',card4Text:'The closest agreement of the three: whole-tumour volumes differ by only −1.3%, and the enhancing-tumour Dice (0.922) is the highest of the three cases.',modelCardHeading:'Model card',mcModelLabel:'Model',mcModel:'MONAI-based segmentation model — recorded outputs, published in data/masks.',mcUseLabel:'Intended use',mcUse:'Research demonstration: comparing recorded model predictions with expert reference annotation on public data.',mcScopeLabel:'Out of scope',mcScope:'Not a clinical product. Not for diagnosis, treatment planning, or patient care.',mcDataLabel:'Data',mcData:'Medical Segmentation Decathlon Task01 (BraTS), public, CC BY-SA 4.0. Cases BRATS_001–003 (n = 3).',mcRefLabel:'Reference standard',mcRef:'The dataset\u2019s expert reference annotation, used for evaluation only.',mcMetricsLabel:'Metrics',mcMetrics:'3D voxel-wise Dice per region (WT / TC / ET) and reference vs prediction volumes in mL, recomputed from the published masks.',mcLimitsLabel:'Limitations',mcLimits:'Three cases only — no generalisation. No live inference: outputs are recorded runs. Whether the model was trained on these cases cannot be determined from public data and is not claimed.',mcAvailLabel:'Availability',mcAvail:'Masks, recompute script and source:',verifyHeading:'Verify it yourself',verifyStep1:'Open the published masks folder (data/masks) — it holds the reference and prediction mask for each case.',verifyStep2:'Run:',verifyStep3:'Compare your output with the values below — they are the same numbers this page displays.',verifyClosing:'These scores were computed by us from the published masks; anyone can recompute them the same way.'},
 fa:{eyebrow:'پژوهش روی تصاویر عمومی',heading:'مقایسهٔ مرزهای تومور',intro:'سه مطالعهٔ عمومی گلیوما از اجراهای ثبت‌شده. هر سه نما همان برش فلیر را نشان می‌دهند.',study:'مطالعه',plane:'صفحهٔ برش',region:'ناحیه',axial:'عرضی',coronal:'تاجی',sagittal:'سهمی',WT:'کل تومور',TC:'هستهٔ تومور',ET:'بخش تقویت‌شونده',reference:'مرز مرجع مجموعه‌داده',model:'مرز پیشنهادی مونای',overlay:'هم‌پوشانی',centre:'نمای وسط',slice:'برش‌های نمونه',focus:'یافتن برش برای مقایسه',volume:'مقایسهٔ حجم',full:'اندازه‌گیری در کل ناحیهٔ سه‌بعدی مطالعه.',difference:'مدل منهای مرجع',boundary:'تصاویر و اندازه‌گیری‌ها خروجی اجرای پژوهشی ثبت‌شده‌اند. فقط برای بازبینی پژوهشی.',source:'منشأ تصاویر و روش',attribution:'منبع، مجموعهٔ عمومی دکاتلون تصویربرداری پزشکی، مسئلهٔ یک (تومور مغز، براتس) است. تصاویر با تنظیم شدت، نمایش برش دوبعدی و ترسیم مرزهای مرجع و مدل تهیه شده‌اند. این تصاویر تحت مجوز CC BY-SA 4.0 ارائه می‌شوند. مرجع برای ارزیابی است.',unit:'میلی‌لیتر',slicenum:'برش',of:'از',loading:'در حال دریافت تصویر…',fail:'دریافت مطالعه ناموفق بود. صفحه را دوباره باز کنید.',ready:'نتیجهٔ ثبت‌شده',none:'برای این ناحیه در مطالعهٔ ثبت‌شده مرزی وجود ندارد.',
 resultsHeading:'نتایج — Dice سه‌بعدی به‌ازای هر مطالعه و ناحیه',resultsSummary:'سه اسکن عمومی MRI مغز. برای هر اسکن، مرز تومورِ مدل با نشانه‌گذاری مرجعِ متخصصِ همان اسکن مقایسه شده است. امتیازهای زیر امتیاز هم‌پوشانی کل حجم (سه‌بعدی) همراه با حجم‌های اندازه‌گیری‌شده‌اند. سه اسکن یک نمایش پژوهشی است، نه مطالعهٔ اعتبارسنجی.',resultsFail:'فایل نتایج بارگذاری نشد، بنابراین امتیازها اینجا نشان داده نمی‌شوند.',howTitle:'چطور این امتیازها را بخوانیم',howText:'Dice از ۰ (بدون هم‌پوشانی) تا ۱ (ناحیه‌های یکسان) است. امتیاز هم‌پوشانی است، نه درصدِ درستی. ناحیه‌های کوچک‌تر — بخش تقویت‌شونده کوچک‌ترین است — معمولاً امتیاز پایین‌تر و نوسان بیشتری دارند. برای زمینه: وقتی متخصص‌ها همان تومورهای مغز را مستقل از هم نشانه‌گذاری کرده‌اند، توافق خودشان با یکدیگر در تاریخ حدود Dice ‏۰٫۷۴ تا ۰٫۸۵ بوده است (Menze et al., 2015). این فقط زمینه‌ای دربارهٔ دشواری کار است، نه هدف یا نمره‌ای برای این دمو.',provenance:'داده: مجموعهٔ عمومی Medical Segmentation Decathlon، مسئلهٔ ۰۱ (BraTS)، مجوز CC BY-SA 4.0 · مطالعات: BRATS_001 تا BRATS_003 · ‏n = 3 · معیار: Dice سه‌بعدیِ وکسل‌به‌ وکسل برای هر ناحیه، بازمحاسبه‌شده از ماسک‌های منتشرشده · خروجی مدل: اجراهای ثبت‌شده.',caseLabel:'مطالعه',refShort:'مرجع',modelShort:'مدل',rangePrefix:'بازه در هر سه مطالعه:',diceLabel:'Dice سه‌بعدی — کل حجم',defWT:'کل تومور: همهٔ برچسب‌های تومور با هم — ادم، هسته و بخش تقویت‌شونده. ناحیه‌ها تو در تو هستند: بخش تقویت‌شونده داخل هستهٔ تومور است و هسته داخل کل تومور.',defTC:'هستهٔ تومور: هستهٔ نکروتیک/تقویت‌نشونده به‌همراه بخش تقویت‌شونده.',defET:'بخش تقویت‌شونده: بخشی که پس از تزریق مادهٔ حاجب تقویت می‌شود.',opacityLabel:'شفافیت پیش‌بینی',openViewer:'باز کردن در نمایشگر',disagreeHeading:'مدل کجا بیشتر اختلاف دارد',card1Text:'مرز کل تومورِ مدل از مرجع بزرگ‌تر است: ۱۳۳٫۶ میلی‌لیتر نشانه‌گذاری شده، جایی که مرجع ۱۱۱٫۷ میلی‌لیتر است (‎+۱۹٫۶٪). مدل ناحیهٔ تومور را نشانه‌گذاری می‌کند، اما مرز بیرونی‌اش را بیش از حد باز می‌کشد. این ضعیف‌ترین امتیاز کل تومور در هر سه مطالعه است.',card2Text:'بخش تقویت‌شونده سخت‌ترین ناحیهٔ این مطالعه و پایین‌ترین امتیاز منفرد این صفحه است: مدل بافت تقویت‌شوندهٔ بیشتری از مرجع نشانه‌گذاری کرده است (۳۴٫۴ در برابر ۳۱٫۵ میلی‌لیتر).',card3Text:'ناحیه‌های هسته و تقویت‌شوندهٔ این مطالعه کوچک‌اند (۹٫۳ و ۸٫۲ میلی‌لیتر). در این اندازه، اختلافی کوچک از نظر مطلق امتیاز را بیشتر از یک ناحیهٔ بزرگ جابه‌جا می‌کند. مدل در هر دو کمی کمتر از مرجع نشانه‌گذاری کرده است.',card4Tag:'نزدیک‌ترین توافق',card4Text:'نزدیک‌ترین توافق در هر سه مطالعه: حجم کل تومور فقط ‎−۱٫۳٪ اختلاف دارد و Dice بخش تقویت‌شونده (۰٫۹۲۲) بالاترین در هر سه مطالعه است.',modelCardHeading:'کارت مدل',mcModelLabel:'مدل',mcModel:'مدل سگمنتیشن مبتنی بر MONAI — خروجی‌های ثبت‌شده، منتشرشده در data/masks.',mcUseLabel:'کاربرد موردنظر',mcUse:'نمایش پژوهشی: مقایسهٔ پیش‌بینی‌های ثبت‌شدهٔ مدل با نشانه‌گذاری مرجع متخصص روی دادهٔ عمومی.',mcScopeLabel:'خارج از دامنه',mcScope:'محصول بالینی نیست. برای تشخیص، برنامه‌ریزی درمان یا مراقبت از بیمار نیست.',mcDataLabel:'داده',mcData:'Medical Segmentation Decathlon، مسئلهٔ ۰۱ (BraTS)، عمومی، CC BY-SA 4.0. مطالعات BRATS_001 تا BRATS_003 ‏(n = 3).',mcRefLabel:'استاندارد مرجع',mcRef:'نشانه‌گذاری مرجع متخصصِ خود مجموعه‌داده، فقط برای ارزیابی.',mcMetricsLabel:'معیارها',mcMetrics:'Dice سه‌بعدی وکسل‌به‌ وکسل برای هر ناحیه (WT / TC / ET) و حجم مرجع در برابر پیش‌بینی به میلی‌لیتر، بازمحاسبه‌شده از ماسک‌های منتشرشده.',mcLimitsLabel:'محدودیت‌ها',mcLimits:'فقط سه مطالعه — هیچ تعمیمی مجاز نیست. استنتاج زنده وجود ندارد: خروجی‌ها اجراهای ثبت‌شده‌اند. آموزش دیدن یا ندیدن مدل روی همین مطالعات از دادهٔ عمومی قابل تعیین نیست و ادعا نشده است.',mcAvailLabel:'دسترسی',mcAvail:'ماسک‌ها، اسکریپت بازمحاسبه و سورس:',verifyHeading:'خودت راستی‌آزمایی کن',verifyStep1:'پوشهٔ ماسک‌های منتشرشده (data/masks) را باز کن — ماسک مرجع و پیش‌بینی هر مطالعه آنجاست.',verifyStep2:'اجرا کن:',verifyStep3:'خروجی‌ات را با مقادیر زیر مقایسه کن — همان عددهایی‌اند که این صفحه نشان می‌دهد.',verifyClosing:'این امتیازها را ما از ماسک‌های منتشرشده محاسبه کرده‌ایم؛ هر کسی می‌تواند همان‌طور بازمحاسبه‌شان کند.'}
};
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg';
let language='en',data=null,generation=0,paint=0,resultsData=null,resultsFailed=false;
const CASES=['BRATS_001','BRATS_002','BRATS_003'],REGIONS=['WT','TC','ET'];
const tr=k=>words[language][k];
const number=(n,digits=0)=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en-CA',{maximumFractionDigits:digits}).format(n);
const fmt=(n,digits)=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en-CA',{minimumFractionDigits:digits,maximumFractionDigits:digits}).format(n);
const signed=(n,digits)=>{const s=fmt(Math.abs(n),digits);return (n>0?'+':n<0?'−':'')+s;};
const pctText=(delta,ref)=>signed(ref?delta/ref*100:0,1)+(language==='fa'?'٪':'%');
function resultFor(caseId,region){const c=resultsData&&resultsData[caseId];const r=c&&c.regions&&c.regions[region];if(!r)return null;const dice=r.dice_3d,ref=r.reference_ml,pred=r.prediction_ml;if(typeof dice!=='number'||typeof ref!=='number'||typeof pred!=='number')return null;return{dice,ref,pred};}
function controls(on){for(const id of ['plane','region','ref','pred','slice','focus','opacity'])$(id).disabled=!on;}
function updateRegionDef(){const el=$('regionDef');if(el)el.textContent=tr('def'+$('region').value);}
function updateDice(){const el=$('diceVal');if(!el)return;const r=data?resultFor($('study').value,$('region').value):null;el.textContent=r?fmt(r.dice,3):'—';}
function translate(){
 language=$('language').value;
 document.documentElement.lang=language;document.documentElement.dir=language==='fa'?'rtl':'ltr';
 document.querySelectorAll('[data-t]').forEach(n=>n.textContent=tr(n.dataset.t));document.title=tr('heading')+' · MRI';
 $('opacityVal').textContent=number(Number($('opacity').value))+(language==='fa'?'٪':'%');
 renderResults();updateRegionDef();
 if(data)render();else $('feedback').textContent=tr('loading');
}
function svgElement(tag,attributes){const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attributes))n.setAttribute(k,String(v));return n;}
function renderResults(){
 const wrap=$('matrixWrap'),dot=$('dotWrap'),ranges=$('rangeWrap'),fail=$('resultsFail');
 if(!wrap)return;
 if(resultsFailed){fail.hidden=false;wrap.replaceChildren();dot.replaceChildren();ranges.replaceChildren();return;}
 fail.hidden=true;
 if(!resultsData){wrap.replaceChildren();dot.replaceChildren();ranges.replaceChildren();return;}
 const table=document.createElement('table');table.className='results-matrix';
 const thead=document.createElement('thead'),hr=document.createElement('tr');
 const th0=document.createElement('th');th0.textContent=tr('caseLabel');hr.append(th0);
 for(const region of REGIONS){const th=document.createElement('th');th.textContent=tr(region)+' ('+region+')';hr.append(th);}
 thead.append(hr);table.append(thead);
 const tbody=document.createElement('tbody');
 for(const caseId of CASES){
  const row=document.createElement('tr');const rh=document.createElement('th');rh.textContent=caseId;row.append(rh);
  for(const region of REGIONS){
   const r=resultFor(caseId,region),td=document.createElement('td');
   if(r){const delta=r.pred-r.ref,btn=document.createElement('button');btn.type='button';btn.className='cell-btn';
    const d=document.createElement('span');d.className='cell-dice';d.textContent=fmt(r.dice,3);
    const v=document.createElement('span');v.className='cell-vols';v.textContent=tr('refShort')+' '+fmt(r.ref,1)+' '+tr('unit')+' · '+tr('modelShort')+' '+fmt(r.pred,1)+' '+tr('unit')+' · Δ '+signed(delta,1)+' '+tr('unit')+' ('+pctText(delta,r.ref)+')';
    btn.append(d,v);btn.addEventListener('click',()=>openInViewer(caseId,region));td.append(btn);
   }
   row.append(td);
  }
  tbody.append(row);
 }
 table.append(tbody);wrap.replaceChildren(table);
 const W=760,H=244,left=52,right=18,plotW=W-left-right,x=v=>left+v*plotW;
 const svg=svgElement('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':tr('resultsHeading'),class:'dotplot'});
 const groupY={WT:44,TC:110,ET:176},labelDy={'BRATS_001':-27,'BRATS_002':26,'BRATS_003':-13};
 for(const region of REGIONS){
  const y=groupY[region];
  const lab=svgElement('text',{x:0,y:y+4,'font-size':14,'font-weight':700,fill:'#183d40'});lab.textContent=region;svg.append(lab);
  svg.append(svgElement('line',{x1:x(0),y1:y,x2:x(1),y2:y,stroke:'#b2ccc4','stroke-width':1}));
  for(const tick of [0,0.25,0.5,0.75,1])svg.append(svgElement('line',{x1:x(tick),y1:y-5,x2:x(tick),y2:y+5,stroke:'#b2ccc4','stroke-width':1}));
  for(const caseId of CASES){
   const r=resultFor(caseId,region);if(!r)continue;
   svg.append(svgElement('circle',{cx:x(r.dice),cy:y,r:7,fill:'#155b51',stroke:'#fff','stroke-width':1.5}));
   const t=svgElement('text',{x:x(r.dice),y:y+labelDy[caseId],'text-anchor':'middle','font-size':11,fill:'#35534e'});t.textContent=caseId.slice(-3);svg.append(t);
  }
 }
 for(const tick of [0,0.25,0.5,0.75,1]){const t=svgElement('text',{x:x(tick),y:228,'text-anchor':'middle','font-size':11,fill:'#526965'});t.textContent=fmt(tick,tick===0||tick===1?0:2);svg.append(t);}
 dot.replaceChildren(svg);
 const rangePs=REGIONS.map(region=>{
  const vals=CASES.map(c=>resultFor(c,region)).filter(Boolean).map(r=>r.dice);
  const p=document.createElement('p');p.className='range-line';
  p.textContent=region+': '+tr('rangePrefix')+' '+fmt(Math.min(...vals),3)+'–'+fmt(Math.max(...vals),3);return p;
 });
 ranges.replaceChildren(...rangePs);
}
async function loadResults(){
 try{const response=await fetch('data/masks/recompute3d-results.json');if(!response.ok)throw Error('results');
  const json=await response.json();
  for(const c of CASES)for(const r of REGIONS){const cell=json&&json[c]&&json[c].regions&&json[c].regions[r];if(!cell||typeof cell.dice_3d!=='number')throw Error('shape');}
  resultsData=json;
 }catch{resultsFailed=true;}
 renderResults();updateDice();
}
function openInViewer(caseId,region){
 $('study').value=caseId;$('region').value=region;updateRegionDef();
 selectStudy();
 $('viewerSection').scrollIntoView({behavior:'smooth',block:'start'});
}
function panel(kind,frame,plane,region){
 const fig=document.createElement('figure');fig.className=kind;
 const caption=document.createElement('figcaption');
 if(kind!=='overlay'){const swatch=document.createElement('i');swatch.className=kind==='prediction'?'stroke dash':'stroke';caption.append(swatch);}
 caption.append(document.createTextNode(tr(kind==='prediction'?'model':kind)));
 const graphic=svgElement('svg',{viewBox:'0 0 '+plane.width+' '+plane.height,preserveAspectRatio:'xMidYMid meet',role:'img','aria-label':caption.textContent});
 graphic.append(svgElement('image',{href:frame.file,x:0,y:0,width:plane.width,height:plane.height}));
 const masks=frame.paths[region];
 for(const [i,visible] of [[0,kind==='reference'||(kind==='overlay'&&$('ref').checked)],[1,kind==='prediction'||(kind==='overlay'&&$('pred').checked)]]){
  if(!visible||!masks[i])continue;
  const path=svgElement('path',{d:masks[i],fill:'none',stroke:i?'#ffad52':'#45e0cd','stroke-width':1.2,'stroke-linejoin':'round','stroke-linecap':'round'});
  if(i)path.setAttribute('stroke-dasharray','3.3 2.1');
  if(i&&kind==='overlay')path.setAttribute('opacity',String(Number($('opacity').value)/100));
  graphic.append(path);
 }
 fig.append(caption,graphic);return fig;
}
function render(){
 if(!data)return;
 const my=++paint,axis=$('plane').value,region=$('region').value;
 const plane=data.planes[axis],frame=plane.frames[Number($('slice').value)];
 const label=tr('slicenum')+' '+number(frame.index+1)+' '+tr('of')+' '+number(plane.total);
 $('index').textContent=label;$('slice').setAttribute('aria-valuetext',label);
 const [rv,mv]=data.volumes[region],delta=mv-rv;
 $('rv').textContent=number(rv,1)+' '+tr('unit');$('mv').textContent=number(mv,1)+' '+tr('unit');$('dv').textContent=signed(delta,1)+' '+tr('unit')+' ('+pctText(delta,rv)+')';
 updateDice();updateRegionDef();
 $('panels').replaceChildren();$('panels').setAttribute('aria-busy','true');$('feedback').textContent=tr('loading');
 const image=new Image();
 image.onload=()=>{
  if(my!==paint)return;
  $('panels').replaceChildren(...['reference','overlay','prediction'].map(k=>panel(k,frame,plane,region)));
  $('panels').setAttribute('aria-busy','false');$('feedback').textContent=(plane.focus[region]===null?tr('none'):tr('ready'))+' · '+data.case+' · FLAIR';
 };
 image.onerror=()=>{if(my===paint){$('panels').setAttribute('aria-busy','false');$('feedback').textContent=tr('fail');}};
 image.src=frame.file;
}
function focus(){
 if(!data)return;
 const plane=data.planes[$('plane').value];$('slice').max=plane.frames.length-1;
 $('slice').value=plane.focus[$('region').value]??Math.floor(plane.frames.length/2);render();
}
async function selectStudy(){
 const ticket=++generation;++paint;data=null;controls(false);$('panels').replaceChildren();$('feedback').textContent=tr('loading');
 for(const id of ['rv','mv','dv','diceVal','index'])$(id).textContent='—';
 const id=$('study').value;
 try{const response=await fetch(id+'.json');if(!response.ok)throw Error('study');
  const study=await response.json();if(ticket!==generation)return;
  if(study.case!==id)throw Error('case');data=study;controls(true);focus();
 }catch{if(ticket===generation)$('feedback').textContent=tr('fail');}
}
$('language').addEventListener('change',translate);$('study').addEventListener('change',selectStudy);$('focus').addEventListener('click',focus);
for(const id of ['plane','region'])$(id).addEventListener('change',focus);
for(const id of ['ref','pred'])$(id).addEventListener('change',render);
$('opacity').addEventListener('input',()=>{$('opacityVal').textContent=number(Number($('opacity').value))+(language==='fa'?'٪':'%');render();});
document.querySelectorAll('[data-open-case]').forEach(b=>b.addEventListener('click',()=>openInViewer(b.dataset.openCase,b.dataset.openRegion)));
$('slice').addEventListener('input',render);translate();selectStudy();loadResults();
