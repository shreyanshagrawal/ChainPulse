/**
 * ChainPulse Rule-Based Prediction Engine
 * A modular, explainable algorithm for calculating shipment delay probabilities.
 */

const RISK_WEIGHTS = {
  TRAFFIC: 0.25,
  WEATHER: 0.35,
  SUPPLIER_HISTORY: 0.20,
  ROUTE_HISTORY: 0.20
};

/**
 * Normalizes an input score to a 0-100 scale.
 */
function normalize(value, min = 0, max = 100) {
  return Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
}

/**
 * Calculates the exact delay probability percentage based on weighted inputs.
 * 
 * @param {Object} inputs
 * @param {number} inputs.trafficRisk - Current traffic congestion level (0-100)
 * @param {number} inputs.weatherRisk - Current weather severity level (0-100)
 * @param {number} inputs.supplierReliability - Supplier's on-time rating (0-100, higher is better)
 * @param {number} inputs.historicalDelays - Historical delay frequency for this route (0-100)
 * @returns {number} Delay probability (0-100)
 */
export function calculateDelayProbability({ trafficRisk, weatherRisk, supplierReliability, historicalDelays }) {
  // Invert supplier reliability since lower reliability means higher risk
  const invertedSupplierRisk = 100 - supplierReliability;

  const rawProbability = (
    (trafficRisk * RISK_WEIGHTS.TRAFFIC) +
    (weatherRisk * RISK_WEIGHTS.WEATHER) +
    (invertedSupplierRisk * RISK_WEIGHTS.SUPPLIER_HISTORY) +
    (historicalDelays * RISK_WEIGHTS.ROUTE_HISTORY)
  );

  return Math.round(normalize(rawProbability));
}

/**
 * Derives the operational risk level string based on probability.
 */
export function determineRiskLevel(delayProbability) {
  if (delayProbability >= 75) return 'Critical';
  if (delayProbability >= 50) return 'High';
  if (delayProbability >= 25) return 'Medium';
  return 'Low';
}

/**
 * Predicts the new ETA in hours based on the delay probability.
 * Hackathon logic: Base delay is exponential based on probability.
 * 
 * @param {Date} originalEta - The scheduled delivery date
 * @param {number} delayProbability - The calculated probability (0-100)
 * @returns {Object} Object containing new Date and delay in hours
 */
export function predictNewETA(originalEta, delayProbability) {
  if (delayProbability < 25) {
    return { predictedEta: originalEta, addedDelayHours: 0 };
  }

  // Simple rule: For every 10% probability over 20%, add 12 hours of delay
  const probabilityOverThreshold = delayProbability - 20;
  const addedDelayHours = Math.round((probabilityOverThreshold / 10) * 12);
  
  const predictedEta = new Date(originalEta);
  predictedEta.setHours(predictedEta.getHours() + addedDelayHours);

  return { predictedEta, addedDelayHours };
}

/**
 * Main wrapper function to generate a full prediction report.
 */
export function generatePredictionReport(inputs, originalEta) {
  const probability = calculateDelayProbability(inputs);
  const riskLevel = determineRiskLevel(probability);
  const etaData = predictNewETA(originalEta, probability);

  // Generate an explainable insight for the UI
  let insight = "Shipment is operating nominally.";
  if (riskLevel === 'Critical') {
    if (inputs.weatherRisk > 80) insight = "Critical delay highly likely due to severe weather conditions.";
    else if (inputs.trafficRisk > 80) insight = "Critical delay highly likely due to severe infrastructure/traffic congestion.";
    else insight = "Critical delay expected due to compounding supplier and historical route failures.";
  } else if (riskLevel === 'High') {
    insight = "High risk of delay detected. Consider alternative mitigation strategies.";
  }

  return {
    delayProbability: probability,
    riskLevel,
    predictedEta: etaData.predictedEta,
    addedDelayHours: etaData.addedDelayHours,
    insight,
    rawInputs: inputs // Included for transparency/debugging
  };
}
