(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{10:function(e,n,t){},15:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t.n(r),a=t(4),i=t.n(a),o=(t(9),t(10),t(3)),u=t(11);var l=function(){var e=[],n=[];return{board:function(){var e=u.range(1,11),n=u.range(65,75).map((function(e){return String.fromCharCode(e)}));return e.map((function(e){return n.map((function(n){return"".concat(n).concat(e)}))}))}(),placeShip:function(n,t){return e.push([t,n]),e},receiveAttack:function(t){e.forEach((function(e){if(e[1].includes(t)){var r=e[1].findIndex((function(e){return e===t}));e[0].hit(r)}else n.push(t)}))},occupiedCoords:e,missedAttacks:n,allShipsSunk:function(){var n=0;return e.forEach((function(e){e[0].isSunk()&&(n+=1)})),10===n}}};var s=function(e){var n=Array.from({length:e}).map((function(){return""}));return{hull:n,hit:function(e){n[e]="X"},isSunk:function(){return n.every((function(e){return"X"===e}))}}},d=t(0);var f=function(e){var n=Object(r.useState)(l()),t=Object(o.a)(n,2),c=t[0],a=t[1],i=Object(r.useState)(l()),u=Object(o.a)(i,2),f=u[0],h=u[1],j=[["A1","A2","A3","A4"],["B1","B2","B3"],["C1","C2","C3"],["D1","D2"],["E1","E2"],["F1","F2"],["G1"],["H1"],["I1"],["J1"]],p=[["J7","J8","J9","J10"],["I8","I9","I10"],["H8","H9","H10"],["G9","G10"],["F9","F10"],["E9","E10"],["D10"],["C10"],["B10"],["A10"]],m=function(e,n){"Player"===e?n.forEach((function(e){c.placeShip(e,s(e.length)),a(c)})):n.forEach((function(e){f.placeShip(e,s(e.length)),h(f)}))};Object(r.useEffect)((function(){console.log("Board effect"),m("Player",j),m("Computer",p)}));var b=function(n){e.onClick(n.target.textContent)};return Object(d.jsxs)("div",{className:"Boards",children:[Object(d.jsx)("h2",{className:"PlayerBoardHeader",children:"Player Board"}),Object(d.jsx)("div",{className:"PlayerBoard",children:c.board.map((function(e){return e.map((function(e){return j.flat().includes(e)?Object(d.jsx)("div",{className:"PlayerCell",onClick:b,children:"S"},e):Object(d.jsx)("div",{className:"PlayerCell",onClick:b,children:e},e)}))}))}),Object(d.jsx)("h2",{className:"ComputerBoardHeader",children:"Computer Board"}),Object(d.jsx)("div",{className:"ComputerBoard",children:f.board.map((function(e){return e.map((function(e){return p.flat().includes(e)?Object(d.jsx)("div",{className:"ComputerCell",onClick:b,children:"S"},e):Object(d.jsx)("div",{className:"ComputerCell",onClick:b,children:e},e)}))}))})]})};var h=function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{className:"Header",children:Object(d.jsx)("h1",{children:"Battleship"})}),Object(d.jsx)(f,{onClick:function(e){console.log(e)}})]})};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(h,{})}),document.getElementById("root"))},9:function(e,n,t){}},[[15,1,2]]]);
//# sourceMappingURL=main.5cba37f7.chunk.js.map