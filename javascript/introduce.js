
  /*----------------------------------------- coverPage -----------------------------------------*/
  /*----- coverPage 背景 canvas -----*/
  let canvas = document.getElementById("canvas");
  canvas.height = 1000;
  canvas.width = 750;

  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;

  function draw() {

    function drawRect() {
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(204, 204, 189, 0)";
      ctx.fill();
    };

    drawRect();
    let x, y, r;
    let pi = Math.PI;
    function cos(theta, r) {
      return x = r*Math.cos(theta);
    };

    function sin(theta, r) {
      return x = r*Math.sin(theta);
    };

    function drawCircle(rotateAngle, xlocation, ylocation) {
      ctx.save();
      ctx.translate(xlocation, ylocation);
      ctx.rotate(rotateAngle);
      ctx.beginPath();
        ctx.ellipse(0, 0 , 60, 60, 0, 1*pi/3, 2*pi/3, true);
        ctx.moveTo( cos(pi/3, 60), sin(pi/3, 60));
        ctx.quadraticCurveTo( 0, sin(pi/3, 60)+15, 0, 120);
        ctx.quadraticCurveTo( 0, sin(2*pi/3, 60)+15, cos(2*pi/3, 60), sin(2*pi/3, 60));
      ctx.closePath();
        ctx.shadowColor = 'rgba(188, 186, 184, 1)';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 20;
      ctx.fill();

      let lgTail = ctx.createLinearGradient(0, 0, 50, 60);
        lgTail.addColorStop(0.6, "rgba(0, 0, 0, 1)");
        lgTail.addColorStop(1, "rgba(100, 100, 117, 1)");
      ctx.fillStyle = lgTail;
      ctx.fill();

      let lg = ctx.createLinearGradient(60, 0, 80, 0);
        lg.addColorStop(0.5, "rgba(238, 236, 234, 0.2)");
        lg.addColorStop(1, "rgba(204, 200, 201, 0.8)");
      ctx.fillStyle = lg;
      ctx.fill();

      let lg2 = ctx.createLinearGradient(0, -80, -110, 120);
        lg2.addColorStop(0.1, "rgba(238, 236, 234, 0.9)");
        lg2.addColorStop(1, "rgba(150, 155, 150, 0.5)");
      ctx.fillStyle = lg2;
      ctx.fill();
    ctx.restore();
    };
    let bw = document.body.clientWidth;
    let bh = document.getElementById("head").getBoundingClientRect().height;
    if (bw > 768 && bh > 1024) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRect();
      for(let i=0; i<2; i++) {
        for(let j=0; j<3; j++) {
          drawCircle(-45*pi/180, 150+287*i, 120+292*j);
          drawCircle(135*pi/180, 315+287*i, 285+292*j);
          drawCircle(-135*pi/180, 290+287*i, 140+292*j);
          drawCircle(45*pi/180, 170+287*i, 265+292*j);
          }
        }
      } else if (bh <= 1024 && bw > 530) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect();
        for(let i=0; i<2; i++) {
          drawCircle(-45*pi/180, 150+287*i, 120+292);
          drawCircle(135*pi/180, 315+287*i, 285+292);
          drawCircle(-135*pi/180, 290+287*i, 140+292);
          drawCircle(45*pi/180, 170+287*i, 265+292);
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRect();
        drawCircle(-45*pi/180, 150+143, 120+292);
        drawCircle(135*pi/180, 315+143, 285+292);
        drawCircle(-135*pi/180, 290+143, 140+292);
        drawCircle(45*pi/180, 170+143, 265+292);
      }
  };

  /*----- coverPage 背景 canvas 使用在 id="headImg" -----*/
  let dataUrl = canvas.toDataURL();
  function  applyToDiv() {
  document.getElementById("headImg").style.background = "url(" + canvas.toDataURL() + ") center/auto no-repeat";
  };

  /*----- 取得 logo 字樣, 及 Rect stroke 長度, 並將隱藏 -----*/
  function getLogoPath() {
    let pathLength = [];
    let pathArray = Array.from(document.querySelectorAll("#logo path"));
    let cornerPathArray = Array.from(document.querySelectorAll(".corner"));
    let base = document.getElementById("baseBorder");
    base.setAttribute("stroke-dasharray", "720");
    base.setAttribute("stroke-dashoffset", "-720");

    pathArray.map(function (v, i) {
      pathLength.push(v.getTotalLength());
      v.setAttribute("stroke-dasharray", pathLength[i]);
      v.setAttribute("stroke-dashoffset", -pathLength[i]);
    });
    cornerPathArray.map(function (v, i) {
      v.setAttribute("stroke-dasharray", "76");
      v.setAttribute("stroke-dashoffset", "-76");
    });
  };

  /*----- 劃出 logo 字樣, 及 Rect stroke -----*/
  function drawLogoPath() {
    let ts = d3.transition()
               .duration(1000)
               .ease(d3.easeLinear);
    d3.selectAll("#logo path").transition(ts)
                              .attr("stroke-dashoffset", 0);
    d3.selectAll(".corner").transition(ts)
                           .attr("stroke-dashoffset", 0);
    d3.select("#baseBorder").transition(ts)
                            .attr("stroke-dashoffset", 0);
  };

  /*----- 整個 coverPage 的出場動畫 -----*/
  function coverPageTs() {
    // d3.select("#headerImg").transition()
    //                        .duration(500)
    //                        .style("opacity", 1);
    let ts = d3.transition()
               .delay(500);

    d3.select("#base").transition(ts)
                      .duration(800)
                      .attr("height", 240)
                      .on("end", drawLogoPath);

    d3.select(".best text").transition()
                           .delay(1000)
                           .duration(800)
                           .style("opacity", 1);

    d3.select(".rectL").transition(ts)
                       .duration(1000)
                       .attr("width", 101)
                       .transition()
                       .duration(1200)
                       .attr("y", 60);

    d3.select(".rectR").transition(ts)
                       .duration(1000)
                       .attr("x", 101)
                       .transition()
                       .duration(1200)
                       .attr("y", 60);
  };

  /*----- 當滑鼠滑入 logo 字樣時的動畫 -----*/
  document.getElementById("logo").addEventListener("mouseover", function (e) {
    getLogoPath();
    drawLogoPath();
  });

  /*----- 定位 nav -----*/
  function navLocated() {
    let navPosition = document.getElementById("head").getBoundingClientRect();

    let nav = document.getElementById("nav");
    let navSwitch = document.getElementById("navSwitch");
    nav.style.left = `${navPosition.left}px`;
    navSwitch.style.left = `${navPosition.left}px`;
  };

  /*----- nav 開關 -----*/
  d3.select("#navSwitch").on("click", function () {
    let ts = d3.transition()
               .duration(500)
               .ease(d3.easeCubicIn);
    function show() {
      d3.select("#navBg rect").transition(ts).attr("width", "320");
      d3.select("#nav ul").transition(ts).style("opacity", 1);
      d3.selectAll("#pathV1, #pathV2, #navSwitch text").transition(ts).style("opacity", 0);
      d3.select("#pathH1").transition(ts).attr("d", "M20 20 L40 40");
      d3.select("#pathH2").transition(ts).attr("d", "M40 20 L20 40");
      d3.select("#navSwitch rect").transition(ts).attr("width", "60");
    };

    function hide() {
      d3.select("#navBg rect").transition(ts).attr("width", "0");
      d3.select("#nav ul").transition(ts).style("opacity", 0);
      d3.select("#navSwitch rect").transition(ts).attr("width", "120");
      d3.selectAll("#pathV1, #pathV2, #navSwitch text").transition(ts).style("opacity", 1);
      d3.select("#pathH1").transition(ts).attr("d", "M5 5 L90 5");
      d3.select("#pathH2").transition(ts).attr("d", "M115 55 L30 55");
    };

    let rectWidth = d3.select("#navBg rect").attr("width");
    rectWidth == 0 ? show() : hide();
  });

  let chefCheck = true;
  function showChef() {
    d3.select(".chefImg").transition()
                         .duration(1200)
                         .ease(d3.easeLinear)
                         .style("opacity", "1");

    d3.select("#chef").transition()
                      .duration(1000)
                      .ease(d3.easeLinear)
                      .style("opacity", 1);

    d3.select("#chef p").transition()
                        .delay(500)
                        .duration(500)
                        .ease(d3.easeCubicInOut)
                        .style("opacity", "1");

    drawH2Rect("#chef");
    drawPath("#chefInfo article path");
    chefCheck = false;
  };

  let resumeCheck = true;
  function resume() {
    let ts2 = d3.transition().delay(300).ease(d3.easeElastic);
    d3.selectAll(".cin").transition(ts2).duration(800).attr("r", 5);
    d3.selectAll(".cout").transition(ts2).duration(700).attr("r", 13);
    d3.select("#resume").selectAll("text").transition(ts2).duration(1000).attr("opacity", 1);
  };

  let freshCheck = true;
  function drawFresh() {
    drawH2Rect("#fresh");
    drawPath("#fresh path");
    d3.select(".freshBg").transition().duration(1300).style("height", "400px");
    d3.select("#freshWrap").transition().duration(1800).style("opacity", "1");
    d3.select("#fresh p").transition().duration(1300).style("opacity", "1");
    freshCheck = false;
  };

  let evaluateCheck = true;
  function drawEvaluate() {
    drawH2Rect("#evaluate");
    drawPath("#evaluate path");
    d3.select(".evaluateBg").transition().duration(1300).style("width", "90%");
    evaluateCheck = false;
  }

  calculatePath("#resume path");
  calculatePath("#createCompany path");
  calculatePath("#chefInfo article path");
  calculatePath("#fresh path");
  calculatePath("#evaluate path");

  window.addEventListener("scroll", function (e) {
    let chef = document.getElementById("chef");
    let fresh = document.getElementById("fresh");
    let evaluate = document.getElementById("evaluate");

    if( window.innerHeight - chef.getBoundingClientRect().top > (chef.getBoundingClientRect().height/10) && chefCheck == true && resumeCheck == true) {
      showChef();
      d3.select(".chefBg").transition().duration(800).style("width", "80%")
                                                      .on("end", function () {
                                                        drawPath("#resume path");
                                                        resume();
                                                        resumeCheck = false;
                                                      });
    };

    if( window.innerHeight - fresh.getBoundingClientRect().top > (fresh.getBoundingClientRect().height/10) && freshCheck == true) {
      drawFresh()
    };

    if( window.innerHeight - evaluate.getBoundingClientRect().top > (evaluate.getBoundingClientRect().height/10) && evaluateCheck == true) {
      drawEvaluate();
    };

    if (document.body.clientWidth > 769) {
      let companyPosition = document.getElementsByClassName("chefImg")[0].getBoundingClientRect();
      let h = (window.innerHeight - companyPosition.top);
      if (h < 0) {
        h = 0;
      } else if (h > 50) {
        h = 50;
      }
      d3.select(".companyImg").transition().duration(800).ease(d3.easeLinear).style("transform", `translateY(${h/2}px)`)
                                                                             .style("background-position", `0 ${100-h/15}%`);

      let foodImgUp = Array.from(document.querySelectorAll(".foodImgUp"));
      foodImgUp.forEach(function (v, i) {
        let h = (window.innerHeight - v.getBoundingClientRect().top)*(-1);
        if (h < 0) {
          h = -25;
        } else if (h > 0) {
          h = 25;
        }

        d3.selectAll(".foodImgUp").transition().duration(800).ease(d3.easeLinear).style("transform", `translateY(${h}px)`);
      });

      let foodImgDown = Array.from(document.querySelectorAll(".foodImgDown"));
      foodImgDown.forEach(function (v, i) {
        let h = (window.innerHeight - v.getBoundingClientRect().top);
        if (h < 0) {
          h = 0;
        } else if (h > 0) {
          h = 25;
        }

        d3.selectAll(".foodImgDown").transition().duration(800).ease(d3.easeLinear).style("transform", `translateY(${h}px)`);
      });
    }
  });

  function calculatePath(selector) {
    let target = document.querySelectorAll(selector);
    let pathArray = Array.from(target);
    let pathLength = [];
    pathArray.forEach(function (v, i) {
      pathLength.push(v.getTotalLength());
      v.setAttribute("stroke-dasharray", pathLength[i]);
      v.setAttribute("stroke-dashoffset", pathLength[i]);
    });
  };

  function drawPath(selector) {
    let ts = d3.transition()
               .delay(500)
               .duration(1000)
               .ease(d3.easeLinear);
    d3.selectAll(selector).transition(ts).attr("stroke-dashoffset", 0);
  };

  function drawH2Rect(selector) {
    d3.selectAll(`${selector} rect`).transition()
                                    .duration(1000)
                                    .ease(d3.easeLinear)
                                    .attr("height", "80")
                                    .attr("width", "70");
  };

  /*----- 輪播 -----*/
  let arr = Array.from(document.querySelectorAll("#freshWrap div"));

  function imgSlide() {
    // let off = arr.splice(0, 1).values().next().value;
    let off = arr.splice(0, 1)[0];
    arr.push(off);
    arr.map((v, i) => {
      v.style.left = `${(i-1)*100}%`;
      if(i == 2) {
        v.style.opacity = 0
      } else {
        v.style.opacity = 1
      }
    });
  };

  setInterval(imgSlide, 5000);


  /*----- 當視窗改變大小 -----*/
  window.addEventListener("resize", function () {
    draw();
    applyToDiv();
    navLocated();
    d3.select("#navSwitch").transition()
                          .duration(900)
                          .style("opacity", 1);
  });

  /*----- 當檔案開啟時載入畫面 -----*/
  function load() {
    window.addEventListener("load", function (e) {
      getLogoPath();
      draw();
      applyToDiv();
      coverPageTs();
      navLocated();
      d3.select("#navSwitch").transition()
                            .duration(900)
                            .style("opacity", 1);
      d3.select("#headImg").transition()
                           .duration(1800)
                           .style("opacity", 1);

      drawPath("#createCompany path");
      drawH2Rect("#createCompany");
      d3.select("#createCompany").transition().duration(1000).style("opacity", "1");
      d3.select(".description .h2Bg").transition().delay(800).duration(1300).style("width", "200%");
    });
  };

  let content = document.getElementById("contentWrap").getBoundingClientRect();
  let head = document.getElementById("head");

  let checkDrawHead = true;
  function drawHead() {
    head.style.height = "474px";
    headImg.style.height = "474px";
    draw();
    applyToDiv();
    drawPath("#createCompany path");
    drawH2Rect("#createCompany");
    d3.select("#createCompany").transition().duration(1000).style("opacity", "1");
    d3.select(".description .h2Bg").transition().delay(800).duration(1300).style("width", "200%");
    d3.select("#navSwitch").transition()
                          .duration(900)
                          .style("opacity", 1);
    checkDrawHead = false;
  }

  if(content.width > 1024) {
    getLogoPath();
    draw();
    applyToDiv();
    coverPageTs();
    navLocated();
    d3.select("#headImg").transition()
                           .duration(900)
                           .style("opacity", "1");

    head.style.height = content.width;

    window.addEventListener("scroll", function (e) {
      if (checkDrawHead == true) {
        drawHead();
      };
    });
  } else {
    let head = document.getElementById("head");
    head.style.height = "100vh";
    load();
  }
