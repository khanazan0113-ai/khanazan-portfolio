// Ambient floating particles, matching the reference's subtle colorful motion.
const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let w=0,h=0,particles=[];const colors=["#19d9e8","#a49bff","#ffbd66","#f28bbd","#75e8bd"];
function resize(){const d=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*d;canvas.height=h*d;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(d,0,0,d,0,0);particles=Array.from({length:Math.min(65,Math.floor(w/18))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.3,r:1+Math.random()*2.2,c:colors[Math.floor(Math.random()*colors.length)]}));}
function animate(){ctx.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.globalAlpha=.25+Math.random()*.35;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;requestAnimationFrame(animate);}
resize();addEventListener("resize",resize);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)animate();

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");revealObserver.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".appear").forEach(el=>revealObserver.observe(el));

const menu=document.querySelector(".menu"),nav=document.querySelector(".nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));

const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll(".nav a").forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id));}}),{rootMargin:"-35% 0px -55% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>sectionObserver.observe(s));

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".project-card").forEach(card=>card.classList.toggle("hidden",btn.dataset.filter!=="all"&&card.dataset.kind!==btn.dataset.filter));}));

const stages=[
{tag:"FOUNDATION",title:"Web Development Foundations",desc:"Learning the building blocks of the web: structuring pages, styling interfaces and adding useful interactions with JavaScript.",tags:["HTML","CSS","JavaScript"]},
{tag:"CREATIVE PRACTICE",title:"Creative & Responsive Interfaces",desc:"Exploring layouts that adapt to different screens, accessible interactions, typography and motion that makes a website feel alive.",tags:["Responsive Design","UI Design","CSS Animation"]},
{tag:"PROJECT BUILDING",title:"Learning Through Projects",desc:"Turning practice into complete websites, improving code organization and learning how to preview, refine and deploy projects.",tags:["VS Code","Git & GitHub","Netlify"]},
{tag:"FUTURE DIRECTION",title:"Cybersecurity Learning Path",desc:"Building a responsible foundation in web security, digital safety and defensive security concepts through ethical learning environments.",tags:["Web Security","Networking Basics","Ethics"]}];
document.querySelectorAll(".milestone").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".milestone").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");const s=stages[Number(btn.dataset.stage)];document.getElementById("stageNo").textContent="STAGE 0"+(Number(btn.dataset.stage)+1);document.getElementById("stageTag").textContent=s.tag;document.getElementById("stageTitle").textContent=s.title;document.getElementById("stageDesc").textContent=s.desc;document.getElementById("focusTags").innerHTML=s.tags.map(t=>`<span>${t}</span>`).join("");}));

document.querySelectorAll(".skill-tab").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".skill-tab").forEach(b=>b.classList.remove("active"));btn.classList.add("active");document.querySelectorAll(".tech").forEach(t=>t.style.display=btn.dataset.group==="all"||t.dataset.group===btn.dataset.group?"grid":"none");document.getElementById("techCaption").textContent=btn.dataset.group==="all"?"SELECT A SYMBOL TO INSPECT THE TECHNOLOGY":btn.textContent+" / SELECT A SYMBOL";}));
document.querySelectorAll(".tech").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll(".tech").forEach(x=>x.classList.remove("active"));t.classList.add("active");document.getElementById("techCaption").textContent=t.dataset.name.toUpperCase()+" — "+t.dataset.group.toUpperCase();}));

document.getElementById("messageForm").addEventListener("submit",e=>{e.preventDefault();const name=document.getElementById("visitorName").value.trim();const message=document.getElementById("visitorMessage").value.trim();const text=encodeURIComponent("Hi Khanazan, I'm "+name+". "+message);window.open("https://www.instagram.com/khanazan._/","_blank","noopener");alert("Instagram opened in a new tab. You can paste your message there.");});


// App-like opening screen: show the animated KHANAZAN mark, then reveal the site.
const intro = document.getElementById("introScreen");
const introBar = intro?.querySelector(".intro-loader span");
const introPercent = document.getElementById("introPercent");
if (intro) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    introBar.style.width = "100%";
    introPercent.textContent = "100%";
    setTimeout(() => {
      intro.classList.add("exit");
      document.body.classList.remove("loading");
      setTimeout(() => intro.remove(), 900);
    }, 250);
  } else {
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(100, progress + Math.ceil(Math.random() * 8));
      introBar.style.width = progress + "%";
      introPercent.textContent = String(progress).padStart(2, "0") + "%";
      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          intro.classList.add("exit");
          document.body.classList.remove("loading");
          setTimeout(() => intro.remove(), 950);
        }, 300);
      }
    }, 95);
  }
}
