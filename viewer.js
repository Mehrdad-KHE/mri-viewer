'use strict';
const words={
 en:{eyebrow:'Public imaging research',heading:'Compare tumour outlines',intro:'Explore three recorded public glioma studies. Each view shows the same FLAIR slice.',study:'Study',plane:'Plane',region:'Region',axial:'Axial',coronal:'Coronal',sagittal:'Sagittal',WT:'Whole tumour',TC:'Tumour core',ET:'Enhancing tumour',reference:'Dataset reference',model:'MONAI prediction',overlay:'Overlay',centre:'Centre view',slice:'Sampled slices',focus:'Find a review slice',volume:'Volume comparison',full:'Measured across the entire 3D region.',difference:'Model minus reference',boundary:'Recorded research outputs. Images and measurements are displayed from completed runs. For research review only.',source:'Image source and methods',attribution:'Source: Medical Segmentation Decathlon, Task 01 Brain Tumour (BraTS). Adaptations include intensity windowing, 2D slice rendering, and traces of the reference and recorded model boundaries. These figures are licensed under CC BY-SA 4.0. The reference is used for evaluation.',unit:'mL',slicenum:'Slice',of:'of',loading:'Loading images…',fail:'Could not load this study. Reload the page to retry.',ready:'Recorded result',none:'No outline for this region in the saved study.'},
 fa:{eyebrow:'پژوهش روی تصاویر عمومی',heading:'مقایسهٔ مرزهای تومور',intro:'سه مطالعهٔ عمومی گلیوما از اجراهای ثبت‌شده. هر سه نما همان برش فلیر را نشان می‌دهند.',study:'مطالعه',plane:'صفحهٔ برش',region:'ناحیه',axial:'عرضی',coronal:'تاجی',sagittal:'سهمی',WT:'کل تومور',TC:'هستهٔ تومور',ET:'بخش تقویت‌شونده',reference:'مرز مرجع مجموعه‌داده',model:'مرز پیشنهادی مونای',overlay:'هم‌پوشانی',centre:'نمای وسط',slice:'برش‌های نمونه',focus:'یافتن برش برای مقایسه',volume:'مقایسهٔ حجم',full:'اندازه‌گیری در کل ناحیهٔ سه‌بعدی مطالعه.',difference:'مدل منهای مرجع',boundary:'تصاویر و اندازه‌گیری‌ها خروجی اجرای پژوهشی ثبت‌شده‌اند. فقط برای بازبینی پژوهشی.',source:'منشأ تصاویر و روش',attribution:'منبع، مجموعهٔ عمومی دکاتلون تصویربرداری پزشکی، مسئلهٔ یک (تومور مغز، براتس) است. تصاویر با تنظیم شدت، نمایش برش دوبعدی و ترسیم مرزهای مرجع و مدل تهیه شده‌اند. این تصاویر تحت مجوز CC BY-SA 4.0 ارائه می‌شوند. مرجع برای ارزیابی است.',unit:'میلی‌لیتر',slicenum:'برش',of:'از',loading:'در حال دریافت تصویر…',fail:'دریافت مطالعه ناموفق بود. صفحه را دوباره باز کنید.',ready:'نتیجهٔ ثبت‌شده',none:'برای این ناحیه در مطالعهٔ ثبت‌شده مرزی وجود ندارد.'}
};
const $=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg';
let language='en',data=null,generation=0,paint=0;
const tr=k=>words[language][k];
const number=(n,digits=0)=>new Intl.NumberFormat(language==='fa'?'fa-IR':'en-CA',{maximumFractionDigits:digits}).format(n);
function controls(on){for(const id of ['plane','region','ref','pred','slice','focus'])$(id).disabled=!on;}
function translate(){
 language=$('language').value;
 document.documentElement.lang=language;document.documentElement.dir=language==='fa'?'rtl':'ltr';
 document.querySelectorAll('[data-t]').forEach(n=>n.textContent=tr(n.dataset.t));document.title=tr('heading')+' · MRI';
 if(data)render();else $('feedback').textContent=tr('loading');
}
function svgElement(tag,attributes){const n=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attributes))n.setAttribute(k,String(v));return n;}
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
  if(i)path.setAttribute('stroke-dasharray','3.3 2.1');graphic.append(path);
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
 $('rv').textContent=number(rv,1)+' '+tr('unit');$('mv').textContent=number(mv,1)+' '+tr('unit');$('dv').textContent=(delta>0?'+':'')+number(delta,1)+' '+tr('unit');
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
 for(const id of ['rv','mv','dv','index'])$(id).textContent='—';
 const id=$('study').value;
 try{const response=await fetch(id+'.json');if(!response.ok)throw Error('study');
  const study=await response.json();if(ticket!==generation)return;
  if(study.case!==id)throw Error('case');data=study;controls(true);focus();
 }catch{if(ticket===generation)$('feedback').textContent=tr('fail');}
}
$('language').addEventListener('change',translate);$('study').addEventListener('change',selectStudy);$('focus').addEventListener('click',focus);
for(const id of ['plane','region'])$(id).addEventListener('change',focus);
for(const id of ['ref','pred'])$(id).addEventListener('change',render);
$('slice').addEventListener('input',render);translate();selectStudy();
