// Development Economics (0388 21 DS 2201)
// Interactive Economics Calculators & Empirical Tools

const Calculators = {
  // 1. FOSTER-GREER-THORBECKE (FGT) POVERTY CALCULATOR
  // Includes preset for the Khulna class test question!
  calculateFGT: function(incomes, povertyLine) {
    if (!incomes || incomes.length === 0 || povertyLine <= 0) {
      return null;
    }

    const N = incomes.length;
    const sorted = [...incomes].sort((a, b) => a - b);
    const poorHouseholds = [];
    let sumGap0 = 0; // Headcount q
    let sumGap1 = 0; // Normalized gap
    let sumGap2 = 0; // Squared normalized gap
    let totalMonetaryShortfall = 0;

    sorted.forEach((inc, idx) => {
      if (inc < povertyLine) {
        const shortfall = povertyLine - inc;
        const normalizedGap = shortfall / povertyLine;
        poorHouseholds.push({
          index: idx + 1,
          income: inc,
          shortfall: shortfall,
          normalizedGap: normalizedGap
        });
        sumGap0 += 1;
        sumGap1 += normalizedGap;
        sumGap2 += Math.pow(normalizedGap, 2);
        totalMonetaryShortfall += shortfall;
      }
    });

    const q = sumGap0;
    const P0 = q / N; // Headcount ratio
    const P1 = sumGap1 / N; // Poverty gap index
    const P2 = sumGap2 / N; // Squared poverty gap (severity)
    const incomeGapRatio = q > 0 ? (sumGap1 / q) : 0;

    return {
      N: N,
      q: q,
      povertyLine: povertyLine,
      incomes: sorted,
      poorHouseholds: poorHouseholds,
      headcountRatio: P0,
      headcountPercent: (P0 * 100).toFixed(2),
      povertyGap: P1,
      povertyGapPercent: (P1 * 100).toFixed(2),
      severityP2: P2,
      severityP2Percent: (P2 * 100).toFixed(3),
      incomeGapRatio: incomeGapRatio.toFixed(3),
      totalMonetaryShortfall: totalMonetaryShortfall
    };
  },

  // 2. GINI COEFFICIENT & LORENZ CURVE CALCULATOR
  calculateGini: function(quintileShares) {
    // quintileShares: array of 5 numbers representing % share of total income for Q1..Q5
    const total = quintileShares.reduce((a, b) => a + b, 0);
    // Normalize to 100 if user input slightly off
    const shares = quintileShares.map(s => (s / total) * 100);

    const popShares = [0, 20, 40, 60, 80, 100];
    const cumInc = [0];
    let running = 0;
    for (let i = 0; i < shares.length; i++) {
      running += shares[i];
      cumInc.push(running);
    }

    // Discrete Gini formula using trapezoidal approximation of Area B:
    // Area of trapezoid i: 0.5 * (p_i - p_{i-1}) * (y_i + y_{i-1}) / 10000
    let areaB = 0;
    for (let i = 1; i < popShares.length; i++) {
      const pDiff = (popShares[i] - popShares[i - 1]) / 100; // 0.20
      const ySum = (cumInc[i] + cumInc[i - 1]) / 100;
      areaB += 0.5 * pDiff * ySum;
    }

    const areaA = 0.5 - areaB;
    const gini = areaA / 0.5; // G = 2A = 1 - 2B
    const kuznetsRatio = shares[0] + shares[1] > 0 ? (shares[4] / (shares[0] + shares[1])) : 0; // Q5 / (Q1+Q2)

    return {
      shares: shares,
      cumPop: popShares,
      cumInc: cumInc,
      areaA: areaA.toFixed(4),
      areaB: areaB.toFixed(4),
      gini: Math.max(0, Math.min(1, gini)).toFixed(4),
      kuznetsRatio: kuznetsRatio.toFixed(2)
    };
  },

  // 3. HARROD-DOMAR GROWTH & ICOR CALCULATOR
  calculateHarrodDomar: function(savingsRate, icor, targetGrowthRate) {
    // savingsRate and targetGrowthRate in % (e.g. 20 for 20%), icor as decimal (e.g. 4.0)
    const s = parseFloat(savingsRate);
    const c = parseFloat(icor);
    const targetG = parseFloat(targetGrowthRate);

    const actualGrowth = c > 0 ? (s / c) : 0;
    const requiredSavingsForTarget = targetG * c;
    const financingGap = Math.max(0, requiredSavingsForTarget - s);

    return {
      s: s,
      icor: c,
      targetGrowth: targetG,
      actualGrowthRate: actualGrowth.toFixed(2),
      requiredSavings: requiredSavingsForTarget.toFixed(2),
      financingGap: financingGap.toFixed(2),
      isDeficit: financingGap > 0
    };
  },

  // 4. HUMAN DEVELOPMENT INDEX (HDI) CALCULATOR
  calculateHDI: function(lifeExp, meanYears, expYears, gniPerCapita) {
    // Standard UNDP Goalposts
    const LE_MIN = 20, LE_MAX = 85;
    const MYS_MIN = 0, MYS_MAX = 15;
    const EYS_MIN = 0, EYS_MAX = 18;
    const GNI_MIN = 100, GNI_MAX = 75000;

    const le = Math.max(LE_MIN, Math.min(LE_MAX, parseFloat(lifeExp)));
    const mys = Math.max(MYS_MIN, Math.min(MYS_MAX, parseFloat(meanYears)));
    const eys = Math.max(EYS_MIN, Math.min(EYS_MAX, parseFloat(expYears)));
    const gni = Math.max(GNI_MIN, Math.min(GNI_MAX, parseFloat(gniPerCapita)));

    const iHealth = (le - LE_MIN) / (LE_MAX - LE_MIN);
    const iMYS = (mys - MYS_MIN) / (MYS_MAX - MYS_MIN);
    const iEYS = (eys - EYS_MIN) / (EYS_MAX - EYS_MIN);
    const iEdu = (iMYS + iEYS) / 2;
    const iIncome = (Math.log(gni) - Math.log(GNI_MIN)) / (Math.log(GNI_MAX) - Math.log(GNI_MIN));

    const hdi = Math.pow(iHealth * iEdu * iIncome, 1 / 3);

    let tier = "Low Human Development";
    if (hdi >= 0.800) tier = "Very High Human Development";
    else if (hdi >= 0.700) tier = "High Human Development";
    else if (hdi >= 0.550) tier = "Medium Human Development";

    return {
      lifeExp: le,
      meanYears: mys,
      expYears: eys,
      gni: gni,
      iHealth: iHealth.toFixed(3),
      iEdu: iEdu.toFixed(3),
      iIncome: iIncome.toFixed(3),
      hdi: hdi.toFixed(3),
      tier: tier
    };
  }
};
