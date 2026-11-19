/* Explicit TeX keeps mathematical meaning separate from prose and user input. */
(function(root){
'use strict';
const F=(tex,example=[])=>({tex:Array.isArray(tex)?tex:[tex],example:Array.isArray(example)?example:[example]});
const catalog={
2:[
 F([String.raw`f(\alpha)=0`,String.raw`r(x)=\lvert f(x)\rvert`],String.raw`f(x)=x^2-2,\qquad \alpha=\sqrt{2}\approx1.41421356`),
 F([String.raw`\begin{gathered}f\in C([a,b]),\quad f(a)f(b)<0\\\Longrightarrow\ \exists\,\alpha\in(a,b): f(\alpha)=0\end{gathered}`,String.raw`\begin{gathered}f'(x)>0\quad(a\le x\le b)\\\Longrightarrow\ f\text{ estrictamente creciente}\end{gathered}`],String.raw`f(1)=-2,\quad f(2)=4,\quad f'(x)=3x^2-1>0\ \ (1\le x\le2)`),
 F([String.raw`c_k=\frac{a_k+b_k}{2}`,String.raw`\lvert\alpha-c_k\rvert\le\frac{b_k-a_k}{2}`],String.raw`c_0=\frac{1+2}{2}=1.5,\qquad f(c_0)=0.25`),
 F(String.raw`c=b-\frac{f(b)(b-a)}{f(b)-f(a)}`,String.raw`c=2-\frac{2(2-1)}{2-(-1)}=\frac{4}{3}`),
 F(String.raw`x_{k+1}=x_k-\frac{f(x_k)}{f'(x_k)}`,String.raw`x_1=1.5-\frac{0.25}{3}\approx1.41666667`),
 F(String.raw`x_{k+1}=x_k-\frac{f(x_k)(x_k-x_{k-1})}{f(x_k)-f(x_{k-1})}`,String.raw`x_2=2-\frac{2(2-1)}{2-(-1)}=\frac43`),
 F([String.raw`x_{k+1}=g(x_k)`,String.raw`g([a,b])\subseteq[a,b],\qquad \sup_{x\in[a,b]}|g'(x)|\le q<1`],String.raw`g(x)=\sqrt{x+2},\qquad g'(x)=\frac{1}{2\sqrt{x+2}},\qquad g(2)=2`),
 F([String.raw`P(x)=(x^2-rx-s)Q(x)+R(x)`,String.raw`R(x)=0\ \Longrightarrow\ P(x)=(x^2-rx-s)Q(x)`],String.raw`x^4-3x^3+3x^2-3x+2=(x-1)(x-2)(x^2+1)`),
 F([String.raw`h_1=x_1-x_0,\qquad h_2=x_2-x_1`,String.raw`\delta_1=\frac{f(x_1)-f(x_0)}{h_1},\qquad\delta_2=\frac{f(x_2)-f(x_1)}{h_2}`,String.raw`a=\frac{\delta_2-\delta_1}{h_1+h_2},\quad b=\delta_2+h_2a,\quad c=f(x_2)`,String.raw`\Delta x=\frac{-2c}{b\pm\sqrt{b^2-4ac}}`],String.raw`x^2+1=0\quad\Longrightarrow\quad x=\pm i`),
 F(String.raw`x_{k+1}=x_k-m\frac{f(x_k)}{f'(x_k)}`,String.raw`f(x)=(x-2)^2,\quad m=2:\qquad x_1=3-2\frac12=2`),
 F([String.raw`J(\mathbf{x}_k)\,\Delta\mathbf{x}_k=-\mathbf{F}(\mathbf{x}_k)`,String.raw`\mathbf{x}_{k+1}=\mathbf{x}_k+\Delta\mathbf{x}_k`,String.raw`J=\begin{pmatrix}F_x&F_y\\G_x&G_y\end{pmatrix}`],String.raw`\begin{cases}x^2+y^2-5=0\\x-y-1=0\end{cases}\qquad (x,y)=(2,1)`),
 F(String.raw`B(h)=Q_{\mathrm{entrada}}-Q_{\mathrm{salida}}(h)=0`,String.raw`\sqrt h=2,\quad h\ge0\quad\Longrightarrow\quad h=4`)
],
3:[
 F([String.raw`(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}`,String.raw`(A^{\mathsf T})_{ij}=a_{ji}`],String.raw`\begin{pmatrix}2&1\\0&3\end{pmatrix}\begin{pmatrix}1\\2\end{pmatrix}=\begin{pmatrix}4\\6\end{pmatrix}`),
 F([String.raw`\begin{gathered}\|\mathbf v\|_\infty=\max_i|v_i|\\\|A\|_\infty=\max_i\sum_j|a_{ij}|\end{gathered}`,String.raw`\begin{gathered}\mathbf r=\mathbf b-A\mathbf x\\\kappa_\infty(A)=\|A\|_\infty\|A^{-1}\|_\infty\end{gathered}`],String.raw`A=\operatorname{diag}(1,10^{-3})\quad\Longrightarrow\quad\kappa_\infty(A)=1000`),
 F([String.raw`m_{ik}=\frac{a_{ik}}{a_{kk}}`,String.raw`F_i\leftarrow F_i-m_{ik}F_k`],String.raw`\begin{cases}2x+y=5\\x+3y=5\end{cases}\quad\Longrightarrow\quad (x,y)=(2,1)`),
 F([String.raw`\begin{gathered}\text{Jacobi}\\x_i^{(k+1)}=\frac{b_i-\sum_{j\ne i}a_{ij}x_j^{(k)}}{a_{ii}}\end{gathered}`,String.raw`\begin{gathered}\text{Gauss--Seidel}\\s_{<}=\sum_{j<i}a_{ij}x_j^{(k+1)},\quad s_{>}=\sum_{j>i}a_{ij}x_j^{(k)}\\x_i^{(k+1)}=\frac{b_i-s_{<}-s_{>}}{a_{ii}}\end{gathered}`,String.raw`\rho(B)<1\quad\text{para la matriz de iteración }B`],String.raw`(x^{(1)},y^{(1)})_{\mathrm{Jacobi}}=\left(\frac64,\frac73\right)`),
 F([String.raw`\begin{gathered}PA=LU\\L\mathbf y=P\mathbf b,\qquad U\mathbf x=\mathbf y\end{gathered}`,String.raw`A=LL^{\mathsf T},\qquad A=A^{\mathsf T},\quad A\succ0`],String.raw`\begin{pmatrix}4&2\\2&3\end{pmatrix}=\begin{pmatrix}2&0\\1&\sqrt2\end{pmatrix}\begin{pmatrix}2&1\\0&\sqrt2\end{pmatrix}`),
 F([String.raw`m_i=\frac{a_i}{\widetilde d_{i-1}},\qquad \widetilde d_i=d_i-m_i c_{i-1}`,String.raw`\widetilde b_i=b_i-m_i\widetilde b_{i-1}`],String.raw`\begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}\begin{pmatrix}1\\1\\1\end{pmatrix}=\begin{pmatrix}1\\0\\1\end{pmatrix}`),
 F([String.raw`A\mathbf v=\lambda\mathbf v,\qquad\mathbf v\ne\mathbf0`,String.raw`A_k=Q_kR_k,\qquad A_{k+1}=R_kQ_k`,String.raw`A=U\Sigma V^{\mathsf T},\qquad\sigma_i\ge0`],String.raw`A=\operatorname{diag}(3,1):\qquad\lambda_1=3,\quad\lambda_2=1`),
 F(String.raw`A\mathbf x=\mathbf b,\qquad\mathbf r=\mathbf b-A\mathbf x`,String.raw`\begin{cases}x+y=5\\2x-y=1\end{cases}\qquad(x,y)=(2,3)`)
],
4:[
 F([String.raw`e_i=y_i-\widehat y_i`,String.raw`\operatorname{SSE}=\sum_{i=1}^n e_i^2`],String.raw`(x_i,y_i)\in\{(0,1),(1,2.1),(2,2.9)\}`),
 F([String.raw`\overline y=\frac1n\sum_{i=1}^ny_i,\qquad s^2=\frac{\sum_{i=1}^n(y_i-\overline y)^2}{n-1}`,String.raw`R^2=1-\frac{\operatorname{SSE}}{\operatorname{SST}},\qquad\operatorname{SST}>0`],String.raw`y=(1,2,3):\quad\overline y=2,\quad s^2=1,\quad 1-\frac{0.5}{2}=0.75`),
 F([String.raw`\widehat y=a_0+a_1x`,String.raw`a_1=\frac{\sum_i(x_i-\overline x)(y_i-\overline y)}{\sum_i(x_i-\overline x)^2}`,String.raw`a_0=\overline y-a_1\overline x`],String.raw`a_0=1,\quad a_1=2\quad\Longrightarrow\quad\widehat y=1+2x`),
 F([String.raw`\widehat y=\sum_{j=0}^{d}c_jz^j`,String.raw`z=\frac{x-\mu}{s},\qquad s>0`],String.raw`\mu=0,\quad s=1,\quad \mathbf c=(1,0,1)\quad\Longrightarrow\quad\widehat y=1+x^2`),
 F([String.raw`y=\alpha e^{\beta x}\quad\Longrightarrow\quad\ln y=\ln\alpha+\beta x`,String.raw`y=\alpha x^\beta\quad\Longrightarrow\quad\ln y=\ln\alpha+\beta\ln x`],String.raw`y=2e^{0.5x}\quad\Longleftrightarrow\quad\ln y=\ln2+0.5x`),
 F([String.raw`\widehat y=\beta_0+\sum_{j=1}^{p}\beta_jx_j`,String.raw`\min_{\boldsymbol\beta}\|X\boldsymbol\beta-\mathbf y\|_2^2`,String.raw`X=QR,\qquad\boldsymbol\beta=X^{+}\mathbf y\ \text{(SVD)}`],String.raw`\widehat y=1+2x_1-x_2,\qquad\widehat y(3,2)=5`),
 F([String.raw`P(x)=c_0+\sum_{j=1}^{n-1}c_j\prod_{k=0}^{j-1}(x-x_k)`,String.raw`P(x)=\sum_{i=0}^{n-1}y_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}`,String.raw`S''(x_0)=S''(x_{n-1})=0\quad\text{(spline natural)}`],String.raw`P(x)=1+x+x(x-1)=1+x^2`),
 F(String.raw`e_{\text{validación}}=y_{\mathrm{observado}}-\widehat y`,String.raw`V=0.5+2T,\quad V(3)=6.5,\quad e=6.7-6.5=0.2`)
],
5:[
 F([String.raw`h=\frac{b-a}{n}`,String.raw`T_n=h\left[\frac{f_0+f_n}{2}+\sum_{i=1}^{n-1}f_i\right]`,String.raw`\begin{gathered}S_n=\frac h3\left[f_0+\sum_{i=1}^{n-1}w_if_i+f_n\right]\\w_i=\begin{cases}4,&i\text{ impar}\\2,&i\text{ par}\end{cases},\quad n\text{ par}\end{gathered}`],String.raw`\int_0^1x^2\,dx=\frac13,\qquad T_2=0.375,\qquad S_2=\frac13`),
 F([String.raw`R_{k,j}=R_{k,j-1}+\frac{R_{k,j-1}-R_{k-1,j-1}}{4^j-1}`,String.raw`R_{k,0}=T_{2^k}`],String.raw`\frac{4(0.375)-0.5}{3}=\frac13`),
 F([String.raw`I\approx\sum_{i=1}^{n}w_i g(x_i)`,String.raw`x=\frac{a+b}{2}+\frac{b-a}{2}t,\qquad dx=\frac{b-a}{2}\,dt`],String.raw`\int_{-1}^{1}x^2\,dx=\left(-\frac1{\sqrt3}\right)^2+\left(\frac1{\sqrt3}\right)^2=\frac23`),
 F(String.raw`\int_a^b\!\int_c^d f(x,y)\,dy\,dx\ \approx\ \sum_i\sum_j w_i v_j f(x_i,y_j)`,String.raw`\int_0^1\!\int_0^1(x+y)\,dy\,dx=1`),
 F([String.raw`f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}`,String.raw`f''(x)\approx\frac{f(x+h)-2f(x)+f(x-h)}{h^2}`],String.raw`f(x)=x^2:\qquad\frac{f(2.1)-f(1.9)}{0.2}=4`),
 F(String.raw`P'(x)=f[x_0,x_1]+f[x_0,x_1,x_2](2x-x_0-x_1)`,String.raw`P'(1)=1+1(2-0-1)=2`),
 F(String.raw`I\approx\sum_{i=0}^{n-1}(x_{i+1}-x_i)\frac{y_i+y_{i+1}}2`,String.raw`E=1\frac{2+4}{2}+2\frac{4+4}{2}=11\ \mathrm{kWh}`)
],
6:[
 F([String.raw`y'=f(x,y),\qquad y(x_0)=y_0`,String.raw`y(x)=Ce^x\quad\text{para }y'=y`],String.raw`y(0)=1\quad\Longrightarrow\quad C=1,\quad y(x)=e^x`),
 F(String.raw`E_i=\left|y_i-y_{\mathrm{referencia}}(x_i)\right|`,String.raw`y(x)=3e^{-2x},\qquad y(1)=3e^{-2}\approx0.40600585`),
 F([String.raw`\begin{gathered}\text{Euler}\\y_{n+1}=y_n+h f(x_n,y_n)\end{gathered}`,String.raw`\widetilde y_{n+1}=y_n+h f_n`,String.raw`\begin{gathered}\text{Heun}\\y_{n+1}=y_n+\frac h2\left[f_n+f(x_{n+1},\widetilde y_{n+1})\right]\end{gathered}`,String.raw`\begin{gathered}\text{Taylor 2}\\y_{n+1}=y_n+h f_n+\frac{h^2}{2}(f_x+f_y f)_n\end{gathered}`],String.raw`y'=y,\ y_0=1,\ h=0.1:\quad y_1^{\mathrm{Euler}}=1.1,\quad y_1^{\mathrm{Heun}}=1.105`),
 F([String.raw`\begin{gathered}\text{Adams--Bashforth 4}\\\begin{aligned}24p_n&=55f_n-59f_{n-1}\\&\quad+37f_{n-2}-9f_{n-3}\end{aligned}\\y_{n+1}^{\mathrm{pred}}=y_n+hp_n\end{gathered}`,String.raw`\begin{gathered}\text{Adams--Moulton 4}\\\begin{aligned}24c_n&=9f_{n+1}+19f_n\\&\quad-5f_{n-1}+f_{n-2}\end{aligned}\\y_{n+1}=y_n+hc_n\end{gathered}`,String.raw`\begin{gathered}\text{Euler implícito}\\y_{n+1}=y_n+h f(x_{n+1},y_{n+1})\end{gathered}`],String.raw`f(x,y)=y:\quad f_n=y_n\quad\text{y el arranque se obtiene con RK4}`),
 F([String.raw`y''(x_i)\approx\frac{y_{i-1}-2y_i+y_{i+1}}{h^2}`,String.raw`y(a)=y_a,\qquad y(b)=y_b`],String.raw`y''=-2,\quad y(0)=y(1)=0\quad\Longrightarrow\quad y=x(1-x),\quad y(0.5)=0.25`),
 F([String.raw`u_i^{n+1}=u_i^n+r(u_{i-1}^n-2u_i^n+u_{i+1}^n)`,String.raw`r=\frac{\alpha\Delta t}{(\Delta x)^2}\le\frac12\quad\text{(calor FTCS)}`,String.raw`\frac{c\Delta t}{\Delta x}\le1\quad\text{(onda explícita)}`],String.raw`u_{i,j}=\frac{u_{i-1,j}+u_{i+1,j}+u_{i,j-1}+u_{i,j+1}}4=\frac{0+0+1+1}{4}=0.5`),
 F(String.raw`T(t)=T_{\mathrm{amb}}+(T_0-T_{\mathrm{amb}})e^{-kt}`,String.raw`T(10)=20+60e^{-1}\approx42.0728`)
],
7:[
 F([String.raw`\nabla f(\mathbf x^*)=\mathbf0\quad\text{(mínimo interior diferenciable)}`,String.raw`\nabla^2f(\mathbf x^*)\succ0\quad\Longrightarrow\quad\text{mínimo local estricto}`],String.raw`f(x)=(x-2)^2+1:\quad f'(2)=0,\quad f''(2)=2>0,\quad f(2)=1`),
 F([String.raw`x_{k+1}=x_k-\frac{f'(x_k)}{f''(x_k)}`,String.raw`\tau=\frac{\sqrt5-1}{2}\quad\text{(sección dorada)}`],String.raw`x_1=4-\frac42=2`),
 F([String.raw`\mathbf x_{k+1}=\mathbf x_k+\alpha_k\mathbf p_k`,String.raw`\mathbf p_k=-\nabla f(\mathbf x_k)\quad\text{o}\quad H_k\mathbf p_k=-\nabla f(\mathbf x_k)`],String.raw`\nabla f=\begin{pmatrix}2(x-1)\\4(y+2)\end{pmatrix},\quad H=\begin{pmatrix}2&0\\0&4\end{pmatrix},\quad\mathbf x^*=\begin{pmatrix}1\\-2\end{pmatrix}`),
 F([String.raw`\min_{\Delta}\|J\Delta-\mathbf r\|_2^2\quad\text{(Gauss--Newton)}`,String.raw`\min_{\Delta}\left(\|J\Delta-\mathbf r\|_2^2+\lambda\|\Delta\|_2^2\right)\quad\text{(LM)}`],String.raw`m(x;a,b)=ae^{bx},\qquad\frac{\partial m}{\partial a}=e^{bx},\quad\frac{\partial m}{\partial b}=axe^{bx}`),
 F([String.raw`\max_{\mathbf x}\ \mathbf c^{\mathsf T}\mathbf x`,String.raw`A\mathbf x\le\mathbf b,\qquad\mathbf x\ge\mathbf0,\qquad\mathbf s=\mathbf b-A\mathbf x`],String.raw`\begin{aligned}\max\;&3x+2y\\x+y&\le4,\quad x\le2,\quad y\le3\end{aligned}\qquad (x^*,y^*)=(2,2),\quad z^*=10`),
 F([String.raw`\text{beneficio}=\mathbf c^{\mathsf T}\mathbf x`,String.raw`\text{uso de recursos}=A\mathbf x\le\mathbf b`],String.raw`3(2)+2(2)=10,\qquad\mathbf s=\begin{pmatrix}0\\0\\1\end{pmatrix}`)
],
8:[
 F([String.raw`\varepsilon=2^{-52},\qquad u=2^{-53}`,String.raw`\begin{gathered}\text{Normal binary64}\\x=(-1)^s(1.f)_2\,2^{E-1023}\end{gathered}`],String.raw`\operatorname{fl}(0.1+0.2)=0.30000000000000004\ne0.3`),
 F([String.raw`\text{Convergencia}\ \not\equiv\ \text{fin del bucle}`,String.raw`r=|f(x)|,\qquad\delta_k=|x_{k+1}-x_k|`],String.raw`10^{16}+1-10^{16}=1\quad\text{en aritmética exacta}`),
 F(String.raw`|a-r|\le\operatorname{atol}+\operatorname{rtol}|r|`,String.raw`r=2:\quad0.001+0.01|2|=0.021,\qquad|2.01-2|=0.01\le0.021`),
 F([String.raw`\widehat\pi=4\widehat p=4\frac{N_{\mathrm{aciertos}}}{N}`,String.raw`\widehat{\operatorname{SE}}=4\sqrt{\frac{\widehat p(1-\widehat p)}{N}}`],String.raw`\widehat\pi=4\frac{785}{1000}=3.14`)
]
};
function render(moduleId,index,kind='tex'){
 const topic=root.CourseData?.modules[moduleId]?.topics[index],entry=catalog[moduleId]?.[index];
 const container=document.createElement('div');container.className='course-equations';container.dataset.formulaTopic=moduleId+'.'+(index+1);container.dataset.formulaKind=kind;
 const lines=entry?.[kind]||[];
 if(!lines.length){container.textContent=topic?.formula||'';return container;}
 for(const source of lines){const line=document.createElement('div');line.className='course-equation';
  if(typeof root.katex!=='undefined')root.katex.render(source,line,{displayMode:true,throwOnError:true,trust:false,output:'htmlAndMathml',strict:'warn'});
  else line.textContent=topic?.formula||source;
  container.append(line);
 }
 return container;
}
function updateOverflow(scope=document){
 for(const line of scope.querySelectorAll('.course-equation')){
  const hint=line.nextElementSibling;
  const overflow=line.clientWidth>0&&line.scrollWidth>line.clientWidth+2;
  if(overflow){line.tabIndex=0;line.setAttribute('aria-label','Fórmula con desplazamiento horizontal');if(!hint?.classList.contains('equation-scroll-hint')){const note=document.createElement('small');note.className='equation-scroll-hint';note.textContent='Desliza para ver la fórmula completa.';line.after(note);}}
  else{line.removeAttribute('tabindex');line.removeAttribute('aria-label');if(hint?.classList.contains('equation-scroll-hint'))hint.remove();}
 }
}
const api={catalog,render,updateOverflow};if(typeof module==='object'&&module.exports)module.exports=api;else root.CourseFormulas=api;
})(globalThis);
