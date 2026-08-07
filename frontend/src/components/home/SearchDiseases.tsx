'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Search, ChevronRight, AlertCircle } from 'lucide-react';
import styles from './SearchDiseases.module.css';
import { CONDITIONS_DATA, ALL_SYMPTOMS, Condition } from '../../lib/data/conditions';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

interface MatchedCondition extends Condition {
  score: number;
}

export default function SearchDiseases() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  
  // Symptom Search State
  const [inputValue, setInputValue] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<MatchedCondition[]>([]);
  const [isFuzzy, setIsFuzzy] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Parse natural language input for symptoms (comma, 'and', 'or', 'with')
  const parseInput = (val: string) => {
    return val.toLowerCase()
      .split(/,|\band\b|\bor\b|\bwith\b/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  };

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const words = inputValue.toLowerCase().split(/[,\s]+/);
    const lastWord = words[words.length - 1];

    if (lastWord.length >= 2) {
      const matches = ALL_SYMPTOMS.filter(s => 
        s.includes(lastWord) && !selectedSymptoms.includes(s)
      );
      setSuggestions(matches.slice(0, 5));
      setShowDropdown(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [inputValue, selectedSymptoms]);

  useEffect(() => {
    if (selectedSymptoms.length === 0) {
      setResults([]);
      setIsFuzzy(false);
      return;
    }

    // Scoring algorithm
    let matched: MatchedCondition[] = CONDITIONS_DATA.map(condition => {
      let score = 0;
      selectedSymptoms.forEach(symptom => {
        if (condition.symptoms.includes(symptom)) {
          score += 2; // Exact match
        } else if (condition.symptoms.some(s => s.includes(symptom) || symptom.includes(s))) {
          score += 1; // Partial match
        }
      });
      return { ...condition, score };
    }).filter(c => c.score > 0);

    let fuzzy = false;
    // Fallback: If no matches, do a looser check
    if (matched.length === 0) {
      fuzzy = true;
      matched = CONDITIONS_DATA.map(condition => {
        let score = 0;
        selectedSymptoms.forEach(symptom => {
          // Check if any word in symptom matches any word in condition symptoms
          const symptomWords = symptom.split(' ');
          condition.symptoms.forEach(cs => {
            symptomWords.forEach(sw => {
              if (sw.length > 3 && cs.includes(sw)) score += 0.5;
            });
          });
        });
        return { ...condition, score };
      }).filter(c => c.score > 0);
    }

    // Sort by score descending
    matched.sort((a, b) => b.score - a.score);

    setResults(matched);
    setIsFuzzy(fuzzy);
    setActiveLetter(null); // Clear alphabet selection when searching
  }, [selectedSymptoms]);

  const handleSelectSuggestion = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setInputValue('');
    setSuggestions([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newSymptoms = parseInput(inputValue).filter(s => !selectedSymptoms.includes(s));
      if (newSymptoms.length > 0) {
        setSelectedSymptoms([...selectedSymptoms, ...newSymptoms]);
        setInputValue('');
        setSuggestions([]);
        setShowDropdown(false);
      }
    } else if (e.key === 'Backspace' && inputValue === '' && selectedSymptoms.length > 0) {
      removeSymptom(selectedSymptoms[selectedSymptoms.length - 1]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const isSearching = selectedSymptoms.length > 0 || inputValue.length > 0;

  return (
    <section id="health-library" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            <Image
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop"
              alt="Scientist looking through microscope"
              fill
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.imageOverlay}>
              <h3 className={styles.imageTitle}>Personalized Care. Transformed</h3>
              <p className={styles.imageSubtitle}>Learn how we tailor treatments</p>
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.title}>Search diseases & conditions</h2>
          <p className={styles.subtitle}>
            Enter your symptoms (e.g., "fever and cough") to find possible conditions.
          </p>
          
          {/* Search Box */}
          <div style={{ position: 'relative', marginTop: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '0.5rem', 
              backgroundColor: '#fff', 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              padding: '0.75rem 1rem',
            }}>
              <Search color="#666" size={20} />
              
              {selectedSymptoms.map(symptom => (
                <span key={symptom} style={{ 
                  backgroundColor: '#e6f6f1', 
                  color: '#008a62', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '20px', 
                  fontSize: '0.9rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem' 
                }}>
                  {symptom}
                  <X size={14} style={{ cursor: 'pointer' }} onClick={() => removeSymptom(symptom)} />
                </span>
              ))}

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={selectedSymptoms.length === 0 ? "Search diseases & symptoms..." : "Add another symptom..."}
                style={{ flex: 1, minWidth: '150px', border: 'none', outline: 'none', fontSize: '1rem', color: '#333' }}
              />
            </div>

            {/* Autocomplete Dropdown */}
            {showDropdown && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: 0, 
                right: 0, 
                backgroundColor: '#fff', 
                borderRadius: '8px', 
                marginTop: '0.5rem', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                zIndex: 10,
                overflow: 'hidden'
              }}>
                {suggestions.map(suggestion => (
                  <div 
                    key={suggestion} 
                    onClick={() => handleSelectSuggestion(suggestion)}
                    style={{ padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: '1px solid #eee', color: '#444' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results Area */}
          {selectedSymptoms.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#003b5c', marginBottom: '1rem' }}>
                Possible Conditions {isFuzzy && <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'normal' }}>(Showing closest matches)</span>}
              </h3>
              
              {results.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {results.map((condition) => (
                    <div key={condition.id} style={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      padding: '1.25rem', 
                      border: '1px solid #eaeaea', 
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#111' }}>{condition.name}</h4>
                          <p style={{ margin: '0 0 0.75rem', color: '#555', fontSize: '0.9rem' }}>{condition.description}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {condition.symptoms.map(s => {
                              const isMatch = selectedSymptoms.some(ss => s.includes(ss) || ss.includes(s));
                              return (
                                <span key={s} style={{ 
                                  fontSize: '0.75rem', 
                                  padding: '0.15rem 0.4rem', 
                                  borderRadius: '4px',
                                  backgroundColor: isMatch ? '#e6f6f1' : '#f5f5f5',
                                  color: isMatch ? '#008a62' : '#777',
                                  fontWeight: isMatch ? '600' : 'normal'
                                }}>
                                  {s}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        {/* <button style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          background: 'transparent', 
                          border: 'none', 
                          color: '#00A676', 
                          fontWeight: '600',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          fontSize: '0.9rem'
                        }}>
                          Learn More
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eaeaea' }}>
                  <p style={{ color: '#666' }}>No matching conditions found for these symptoms.</p>
                </div>
              )}

              {/* Disclaimer */}
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1rem', 
                backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                borderLeft: '4px solid #FFC107',
                borderRadius: '0 4px 4px 0',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start'
              }}>
                <AlertCircle color="#d39e00" size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#665000', lineHeight: '1.4' }}>
                  <strong>Disclaimer:</strong> These are possible conditions based on the symptoms entered and are not a medical diagnosis. Please consult a qualified healthcare professional.
                </p>
              </div>
            </div>
          )}

          {/* Fallback Alphabet Grid if not searching */}
          {!isSearching && (
            <div style={{ marginTop: '2rem' }}>
              <div className={styles.alphabetGrid}>
                {ALPHABET.map((letter) => (
                  <button
                    key={letter}
                    className={`${styles.letterBtn} ${activeLetter === letter ? styles.active : ''}`}
                    onClick={() => setActiveLetter(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
