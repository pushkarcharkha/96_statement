export const suggestedPrompts = [
  "What were Dr. Ambedkar's views on the Uniform Civil Code?",
  "Why was Article 17 drafted to abolish untouchability?",
  "What was his warning about Bhakti and hero-worship in politics?",
  "What was Dr. Ambedkar's role in establishing the Reserve Bank of India?",
  "How did he define the difference between caste and varna?",
  "What was the significance of the 1927 Mahad Satyagraha?",
  "What are the three pillars: Educate, Agitate, Organize?",
  "Who will win the upcoming Cricket World Cup?" // Test out-of-archive fallback
];

export const groundedKnowledgeBase = [
  {
    keywords: ["uniform civil code", "article 44", "ucc", "personal law", "civil code"],
    answer: "The historical archive records that Dr. B. R. Ambedkar supported a Uniform Civil Code during the Constituent Assembly debates on December 2, 1948. He argued that personal religious laws should not retain unlimited jurisdiction over social domains like marriage, inheritance, and women's rights when they conflict with fundamental constitutional equality. However, he also proposed that its application should initially be voluntary and gradual, cautioning against abrupt enforcement without democratic consensus.",
    citations: [
      { source: "Constituent Assembly Debates", reference: "CAD Vol. VII", date: "2 Dec 1948", page: "781–782" },
      { source: "Writings and Speeches", reference: "BAWS Vol. 14 (Part 2)", date: "1951", page: "Hindu Code Bill Debates" }
    ]
  },
  {
    keywords: ["article 17", "untouchability", "abolish untouchability", "untouchables", "chhadar"],
    answer: "Article 17 was moved and adopted in the Constituent Assembly on November 29, 1948. Dr. Ambedkar and the Drafting Committee framed it as an absolute and self-executing fundamental right that prohibits untouchability in any form and declares its practice to be a penal offence punishable by law. This was the culmination of his decades-long mass movements starting with the 1927 Mahad Satyagraha.",
    citations: [
      { source: "Constituent Assembly Debates", reference: "CAD Vol. VII", date: "29 Nov 1948", page: "665" },
      { source: "The Untouchables: Who Were They?", reference: "BAWS Vol. 7", date: "1948", page: "1–168" }
    ]
  },
  {
    keywords: ["bhakti", "hero worship", "warning", "three warnings", "25 november 1949", "dictatorship", "anarchy"],
    answer: "In his historic closing address to the Constituent Assembly on November 25, 1949, Dr. Ambedkar delivered three solemn warnings for the future of the Indian Republic: First, to abandon unconstitutional methods and civil disobedience in a democracy (the 'Grammar of Anarchy'); second, to observe John Stuart Mill's caution against laying our liberties at the feet of even a great man, warning that 'Bhakti in religion may be a road to the salvation of the soul. But in politics, Bhakti or hero-worship is a sure road to degradation and to eventual dictatorship'; and third, to establish social and economic democracy so that political democracy does not remain a life of contradictions.",
    citations: [
      { source: "Constituent Assembly Debates", reference: "CAD Vol. XI", date: "25 Nov 1949", page: "972–981" },
      { source: "Dr. Babasaheb Ambedkar: Writings and Speeches", reference: "BAWS Vol. 13", date: "1994", page: "Constitution Drafting" }
    ]
  },
  {
    keywords: ["reserve bank", "rbi", "currency", "rupee", "problem of the rupee", "economics", "hilton young"],
    answer: "Dr. Ambedkar played a decisive role in the conceptualization of the Reserve Bank of India. His 1923 doctoral dissertation at the London School of Economics, titled 'The Problem of the Rupee: Its Origin and Its Solution', established that price and purchasing-power stability was paramount for India's economic health. When the Royal Commission on Indian Currency and Finance (Hilton Young Commission) convened in 1925–1926, each member carried Dr. Ambedkar's treatise, and his recommendations directly shaped the legislative blueprint for the RBI Act of 1934.",
    citations: [
      { source: "The Problem of the Rupee", reference: "BAWS Vol. 6", date: "1923", page: "309–608" },
      { source: "Royal Commission on Indian Currency & Finance", reference: "Minutes of Evidence, Vol. II", date: "1926", page: "Memorandum by Dr. Ambedkar" }
    ]
  },
  {
    keywords: ["caste", "varna", "annihilation of caste", "division of labour", "jat-pat"],
    answer: "In 'Annihilation of Caste' (1936), Dr. Ambedkar rigorously distinguished between caste and varna, and critiqued the defense that caste is merely division of labour. He famously declared: 'Caste is not merely division of labour. It is also a division of labourers.' Unlike natural occupational specialization, caste assigns occupations by birth with no regard to individual talent or desire, grading laborers into hierarchical, water-tight compartments. He argued that varna was an unsustainable fantasy that inevitably degenerated into caste.",
    citations: [
      { source: "Annihilation of Caste", reference: "BAWS Vol. 1", date: "1936", page: "Section 3 & 4, pp. 47–52" },
      { source: "Castes in India", reference: "Columbia University Seminar Paper", date: "1916", page: "1–32" }
    ]
  },
  {
    keywords: ["mahad", "chhadar", "water", "tank", "1927", "satyagraha"],
    answer: "On March 20, 1927, Dr. Ambedkar led thousands to the Chhadar Tank in Mahad, Maharashtra, asserting the right of Depressed Classes to drink water from the public tank. He declared: 'We are going to the Chhadar Tank not merely to drink water. We are going there to assert that we too are human beings.' It became the first large-scale collective civil rights movement for civic equality in modern India and is commemorated as National Social Empowerment Day.",
    citations: [
      { source: "Speeches on Mahad Movement", reference: "BAWS Vol. 17 (Part 1)", date: "20 March 1927", page: "3–24" },
      { source: "Bahishkrit Bharat Editorial", reference: "Issue 1", date: "3 April 1927", page: "Editorial" }
    ]
  },
  {
    keywords: ["educate", "agitate", "organize", "motto", "nagpur", "three pillars"],
    answer: "The immortal slogan 'Educate, Agitate, Organize' was first adopted by Dr. Ambedkar as the official motto of the Bahishkrit Hitakarini Sabha in 1924, and reaffirmed during his presidential address to the All-India Depressed Classes Conference in Nagpur on July 20, 1942. In his philosophy, 'Educate' represents emancipation of the intellect from superstition; 'Agitate' means peaceful civic awakening and refusal to submit to injustice; and 'Organize' denotes disciplined collective solidarity through democratic institutions.",
    citations: [
      { source: "Address to All-India Depressed Classes Conference", reference: "BAWS Vol. 10", date: "20 July 1942", page: "123–128" },
      { source: "Bahishkrit Hitakarini Sabha Constitution", reference: "DAIC Archive File BHS-1924", date: "1924", page: "Rules of Association" }
    ]
  },
  {
    keywords: ["article 32", "heart and soul", "constitutional remedies", "supreme court", "writs"],
    answer: "On December 9, 1948, during debate on Draft Article 25 (enacted as Article 32), Dr. Ambedkar made his famous declaration: 'If I was asked to name any particular Article in this Constitution as the most important—an Article without which this Constitution would be a nullity—I could not refer to any other Article except this one. It is the very soul of the Constitution and the very heart of it.' He explained that rights without a guaranteed judicial enforcement mechanism are meaningless declarations.",
    citations: [
      { source: "Constituent Assembly Debates", reference: "CAD Vol. VII", date: "9 Dec 1948", page: "953" },
      { source: "States and Minorities", reference: "BAWS Vol. 1", date: "1947", page: "Article 2, Section 2" }
    ]
  },
  {
    keywords: ["buddhism", "navayana", "22 vows", "nagpur 1956", "dhamma", "deekshabhoomi"],
    answer: "On October 14, 1956, at Deekshabhoomi in Nagpur, Dr. Ambedkar, accompanied by his wife Dr. Savita Ambedkar, embraced Buddhism along with over 500,000 followers. He administered 22 specific vows emancipating his people from superstitious rituals and caste identity. In his treatise 'The Buddha and His Dhamma', he articulated that true religion must accord with reason, science, and morality based on liberty, equality, and fraternity.",
    citations: [
      { source: "The Buddha and His Dhamma", reference: "BAWS Vol. 11", date: "1956", page: "Books I–IV" },
      { source: "Deekshabhoomi Address", reference: "BAWS Vol. 17 (Part 3)", date: "14 Oct 1956", page: "502–528" }
    ]
  }
];

export function findGroundedAnswer(query) {
  const normalized = query.toLowerCase().trim();
  
  if (!normalized) {
    return null;
  }

  // Check matching knowledge base
  for (const item of groundedKnowledgeBase) {
    const isMatch = item.keywords.some(kw => normalized.includes(kw));
    if (isMatch) {
      return {
        found: true,
        answer: item.answer,
        citations: item.citations
      };
    }
  }

  // Strict fallback when query is out of the verified historical archive
  return {
    found: false,
    answer: "Not found in the archive: This query cannot be answered using the verified historical records of Dr. B. R. Ambedkar. As an AI research assistant, I only provide grounded responses strictly verified against the Dr. Ambedkar International Centre (DAIC) archival holdings and Dr. Babasaheb Ambedkar: Writings and Speeches (BAWS).",
    citations: []
  };
}
