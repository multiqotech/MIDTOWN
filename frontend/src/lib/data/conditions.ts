export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
}

export const CONDITIONS_DATA: Condition[] = [
  {
    id: "common-cold",
    name: "Common Cold",
    description: "A viral infection of your nose and throat.",
    symptoms: ["runny nose", "sore throat", "cough", "congestion", "sneezing", "fever", "headache"]
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description: "A viral infection that attacks your respiratory system.",
    symptoms: ["fever", "chills", "muscle aches", "cough", "congestion", "runny nose", "headache", "fatigue"]
  },
  {
    id: "covid-19",
    name: "COVID-19",
    description: "A respiratory disease caused by SARS-CoV-2.",
    symptoms: ["fever", "cough", "shortness of breath", "fatigue", "loss of taste", "loss of smell", "sore throat"]
  },
  {
    id: "migraine",
    name: "Migraine",
    description: "A headache that can cause severe throbbing pain or a pulsing sensation.",
    symptoms: ["headache", "nausea", "vomiting", "sensitivity to light", "sensitivity to sound", "vision changes"]
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis (Stomach Flu)",
    description: "An intestinal infection marked by diarrhea, cramps, nausea, vomiting, and fever.",
    symptoms: ["diarrhea", "nausea", "vomiting", "stomach cramps", "fever", "chills"]
  },
  {
    id: "allergies",
    name: "Seasonal Allergies",
    description: "An allergic response causing itchy, watery eyes, sneezing, and other similar symptoms.",
    symptoms: ["sneezing", "runny nose", "itchy eyes", "watery eyes", "congestion", "fatigue"]
  },
  {
    id: "asthma",
    name: "Asthma",
    description: "A condition in which your airways narrow and swell and may produce extra mucus.",
    symptoms: ["shortness of breath", "chest tightness", "wheezing", "cough"]
  },
  {
    id: "strep-throat",
    name: "Strep Throat",
    description: "A bacterial infection that may make your throat feel sore and scratchy.",
    symptoms: ["sore throat", "fever", "swollen lymph nodes", "pain when swallowing", "headache"]
  },
  {
    id: "food-poisoning",
    name: "Food Poisoning",
    description: "Illness caused by eating contaminated food.",
    symptoms: ["nausea", "vomiting", "diarrhea", "stomach cramps", "fever", "weakness"]
  },
  {
    id: "anemia",
    name: "Anemia",
    description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
    symptoms: ["fatigue", "weakness", "pale skin", "chest pain", "cold hands and feet", "shortness of breath", "dizziness"]
  }
];

// Generate a unique list of all symptoms across all conditions for autocomplete
export const ALL_SYMPTOMS: string[] = Array.from(
  new Set(CONDITIONS_DATA.flatMap(c => c.symptoms.map(s => s.toLowerCase())))
).sort();
