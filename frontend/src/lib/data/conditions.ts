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
  },
  {
    id: "hypertension",
    name: "Hypertension",
    description: "High blood pressure that can lead to severe health complications.",
    symptoms: ["headache", "shortness of breath", "nosebleeds", "dizziness", "chest pain"]
  },
  {
    id: "diabetes-type-2",
    name: "Type 2 Diabetes",
    description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
    symptoms: ["increased thirst", "frequent urination", "increased hunger", "fatigue", "blurred vision"]
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "An infection that inflames the air sacs in one or both lungs.",
    symptoms: ["cough", "fever", "chills", "difficulty breathing", "chest pain"]
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    description: "Inflammation of the lining of your bronchial tubes.",
    symptoms: ["cough", "mucus production", "fatigue", "shortness of breath", "chest discomfort"]
  },
  {
    id: "uti",
    name: "Urinary Tract Infection (UTI)",
    description: "An infection in any part of your urinary system.",
    symptoms: ["frequent urination", "painful urination", "cloudy urine", "pelvic pain"]
  },
  {
    id: "kidney-stones",
    name: "Kidney Stones",
    description: "Hard deposits made of minerals and salts that form inside your kidneys.",
    symptoms: ["severe pain", "painful urination", "nausea", "vomiting", "frequent urination"]
  },
  {
    id: "appendicitis",
    name: "Appendicitis",
    description: "An inflammation of the appendix.",
    symptoms: ["abdominal pain", "nausea", "vomiting", "loss of appetite", "fever"]
  },
  {
    id: "arthritis",
    name: "Arthritis",
    description: "Inflammation of one or more of your joints.",
    symptoms: ["joint pain", "stiffness", "swelling", "redness", "decreased range of motion"]
  },
  {
    id: "chickenpox",
    name: "Chickenpox",
    description: "A highly contagious viral infection causing an itchy, blister-like rash.",
    symptoms: ["itchy rash", "fever", "fatigue", "loss of appetite"]
  },
  {
    id: "measles",
    name: "Measles",
    description: "A viral infection that's serious for small children but is easily preventable by a vaccine.",
    symptoms: ["fever", "dry cough", "runny nose", "sore throat", "inflamed eyes", "rash"]
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    description: "A potentially serious infectious bacterial disease that mainly affects the lungs.",
    symptoms: ["coughing up blood", "chest pain", "fatigue", "fever", "night sweats"]
  },
  {
    id: "malaria",
    name: "Malaria",
    description: "A disease caused by a plasmodium parasite, transmitted by the bite of infected mosquitoes.",
    symptoms: ["fever", "chills", "sweating", "headache", "nausea", "muscle aches"]
  },
  {
    id: "dengue-fever",
    name: "Dengue Fever",
    description: "A mosquito-borne viral disease occurring in tropical and subtropical areas.",
    symptoms: ["high fever", "severe headache", "pain behind eyes", "joint pain", "muscle pain", "rash"]
  },
  {
    id: "typhoid",
    name: "Typhoid",
    description: "A bacterial infection that can lead to a high fever, diarrhea, and vomiting.",
    symptoms: ["prolonged fever", "fatigue", "headache", "nausea", "abdominal pain", "constipation"]
  },
  {
    id: "cholera",
    name: "Cholera",
    description: "A bacterial disease causing severe diarrhea and dehydration.",
    symptoms: ["diarrhea", "nausea", "vomiting", "dehydration", "muscle cramps"]
  },
  {
    id: "peptic-ulcer",
    name: "Peptic Ulcer",
    description: "A sore that develops on the lining of the esophagus, stomach, or small intestine.",
    symptoms: ["burning stomach pain", "feeling of fullness", "bloating", "heartburn", "nausea"]
  },
  {
    id: "gerd",
    name: "GERD (Acid Reflux)",
    description: "A digestive disease in which stomach acid or bile irritates the food pipe lining.",
    symptoms: ["heartburn", "chest pain", "difficulty swallowing", "regurgitation of food"]
  },
  {
    id: "celiac-disease",
    name: "Celiac Disease",
    description: "An immune reaction to eating gluten, a protein found in wheat, barley, and rye.",
    symptoms: ["diarrhea", "fatigue", "weight loss", "bloating", "gas", "abdominal pain"]
  },
  {
    id: "crohns-disease",
    name: "Crohn's Disease",
    description: "A type of inflammatory bowel disease (IBD).",
    symptoms: ["diarrhea", "fever", "fatigue", "abdominal pain", "cramping", "blood in stool"]
  },
  {
    id: "ulcerative-colitis",
    name: "Ulcerative Colitis",
    description: "An inflammatory bowel disease (IBD) that causes inflammation and ulcers in your digestive tract.",
    symptoms: ["diarrhea", "abdominal pain", "cramping", "rectal pain", "rectal bleeding", "weight loss"]
  },
  {
    id: "osteoporosis",
    name: "Osteoporosis",
    description: "A condition in which bones become weak and brittle.",
    symptoms: ["back pain", "loss of height", "stooped posture", "bone fracture"]
  },
  {
    id: "gout",
    name: "Gout",
    description: "A common and complex form of arthritis that can affect anyone.",
    symptoms: ["intense joint pain", "lingering discomfort", "inflammation", "redness", "limited range of motion"]
  },
  {
    id: "fibromyalgia",
    name: "Fibromyalgia",
    description: "A disorder characterized by widespread musculoskeletal pain.",
    symptoms: ["widespread pain", "fatigue", "cognitive difficulties", "sleep problems"]
  },
  {
    id: "lupus",
    name: "Lupus",
    description: "An inflammatory disease caused when the immune system attacks its own tissues.",
    symptoms: ["fatigue", "fever", "joint pain", "stiffness", "butterfly rash", "skin lesions"]
  },
  {
    id: "multiple-sclerosis",
    name: "Multiple Sclerosis (MS)",
    description: "A disease in which the immune system eats away at the protective covering of nerves.",
    symptoms: ["numbness", "weakness", "tingling", "electric-shock sensations", "tremor", "lack of coordination"]
  },
  {
    id: "parkinsons-disease",
    name: "Parkinson's Disease",
    description: "A progressive nervous system disorder that affects movement.",
    symptoms: ["tremor", "slowed movement", "rigid muscles", "impaired posture", "balance problems", "speech changes"]
  },
  {
    id: "alzheimers-disease",
    name: "Alzheimer's Disease",
    description: "A progressive disease that destroys memory and other important mental functions.",
    symptoms: ["memory loss", "confusion", "difficulty concentrating", "difficulty making decisions", "personality changes"]
  },
  {
    id: "depression",
    name: "Depression",
    description: "A mood disorder that causes a persistent feeling of sadness and loss of interest.",
    symptoms: ["sadness", "loss of interest", "changes in appetite", "sleep problems", "fatigue", "feelings of worthlessness"]
  },
  {
    id: "anxiety-disorder",
    name: "Anxiety Disorder",
    description: "A mental health disorder characterized by feelings of worry, anxiety, or fear that are strong enough to interfere with one's daily activities.",
    symptoms: ["feeling restless", "fatigue", "difficulty concentrating", "irritability", "muscle tension", "sleep problems"]
  },
  {
    id: "bipolar-disorder",
    name: "Bipolar Disorder",
    description: "A disorder associated with episodes of mood swings ranging from depressive lows to manic highs.",
    symptoms: ["mood swings", "euphoria", "irritability", "decreased need for sleep", "racing thoughts", "sadness", "fatigue"]
  },
  {
    id: "schizophrenia",
    name: "Schizophrenia",
    description: "A disorder that affects a person's ability to think, feel, and behave clearly.",
    symptoms: ["delusions", "hallucinations", "disorganized thinking", "abnormal motor behavior", "negative symptoms"]
  },
  {
    id: "psoriasis",
    name: "Psoriasis",
    description: "A condition in which skin cells build up and form scales and itchy, dry patches.",
    symptoms: ["red patches of skin", "silvery scales", "dry skin", "cracked skin", "itching", "burning", "soreness"]
  },
  {
    id: "eczema",
    name: "Eczema (Atopic Dermatitis)",
    description: "A condition that makes your skin red and itchy.",
    symptoms: ["dry skin", "itching", "red patches", "small bumps", "thickened skin", "scaly skin"]
  },
  {
    id: "acne",
    name: "Acne",
    description: "A skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.",
    symptoms: ["whiteheads", "blackheads", "pimples", "papules", "pustules", "nodules", "cystic lesions"]
  },
  {
    id: "rosacea",
    name: "Rosacea",
    description: "A common skin condition that causes blushing or flushing and visible blood vessels in your face.",
    symptoms: ["facial blushing", "swollen bumps", "eye problems", "enlarged nose"]
  },
  {
    id: "glaucoma",
    name: "Glaucoma",
    description: "A group of eye conditions that damage the optic nerve.",
    symptoms: ["patchy blind spots", "tunnel vision", "severe headache", "eye pain", "nausea", "blurred vision"]
  },
  {
    id: "cataracts",
    name: "Cataracts",
    description: "A clouding of the normally clear lens of your eye.",
    symptoms: ["clouded vision", "difficulty with vision at night", "sensitivity to light", "glare", "seeing halos around lights"]
  },
  {
    id: "macular-degeneration",
    name: "Macular Degeneration",
    description: "An eye disease that can blur your central vision.",
    symptoms: ["reduced central vision", "visual distortions", "need for brighter light", "difficulty recognizing faces"]
  }
];

// Generate a unique list of all symptoms across all conditions for autocomplete
export const ALL_SYMPTOMS: string[] = Array.from(
  new Set(CONDITIONS_DATA.flatMap(c => c.symptoms.map(s => s.toLowerCase())))
).sort();
