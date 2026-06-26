// src/main.ts

// 1. 物理パラメータの定義
const laser = { power: 5000, spotArea: 0.0001, absorption: 0.7 };
const target = { mass: 0.05, specificHeat: 460, lossRate: 0.5 }; // 鉄の特性に近い値

let currentTemp = 25.0; // 初期温度（室温）
const ambientTemp = 25.0;
const meltingPoint = 1500.0; // 鉄の融点

// 2. 画面へのHTML要素の追加
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>レーザー兵器シミュレーター コアロジック</h2>
    <p>レーザー出力: <strong>${laser.power} W</strong></p>
    <div id="status" style="font-size: 24px; margin-top: 20px;">現在の温度: 25.0 °C</div>
    <div id="log" style="color: red; font-weight: bold; margin-top: 10px;"></div>
  </div>
`;

const statusEl = document.getElementById('status')!;
const logEl = document.getElementById('log')!;

// 3. ループ処理（毎秒60回計算）
function simulate() {
  if (currentTemp >= meltingPoint) {
    statusEl.innerHTML = `ターゲット温度: <span style="color: red;">${meltingPoint.toFixed(1)} °C</span>`;
    logEl.innerText = "💥 ターゲットが融点に達し、貫通しました！";
    return; // 貫通したらストップ
  }

  // deltaTimeは 1/60 秒
  const deltaTime = 1 / 60;
  
  // 熱量計算
  const energyIn = laser.power * laser.absorption * deltaTime;
  const energyOut = target.lossRate * (currentTemp - ambientTemp) * deltaTime;
  const netEnergy = energyIn - energyOut;
  const deltaTemp = netEnergy / (target.mass * target.specificHeat);
  
  currentTemp += deltaTemp;

  // 画面更新
  statusEl.innerText = `現在の温度: ${currentTemp.toFixed(1)} °C`;

  requestAnimationFrame(simulate);
}

// シミュレーション開始
simulate();