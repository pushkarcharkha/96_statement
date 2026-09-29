export const knowledgeGraphData = {
  nodes: [
    {
      id: "aoc",
      label: "Annihilation of Caste",
      category: "Treatise",
      year: 1936,
      size: 32,
      color: "#2563EB",
      citation: "BAWS Vol. 1, pp. 23-96",
      summary: "Seminal undelivered speech demolishing the moral and scriptural legitimacy of graded caste inequality."
    },
    {
      id: "art17",
      label: "Article 17",
      category: "Constitution",
      year: 1949,
      size: 28,
      color: "#F59E0B",
      citation: "Constitution of India, Part III",
      summary: "Constitutional abolition of 'Untouchability' and forbidding its practice in any form."
    },
    {
      id: "mahad",
      label: "Mahad Satyagraha",
      category: "Movement",
      year: 1927,
      size: 30,
      color: "#10B981",
      citation: "BAWS Vol. 17 (Pt 1)",
      summary: "Historic nonviolent struggle at Chhadar Tank declaring water and public spaces as universal human rights."
    },
    {
      id: "poona",
      label: "Poona Pact",
      category: "Treatise",
      year: 1932,
      size: 26,
      color: "#8B5CF6",
      citation: "Yerwada Central Jail Agreement, 1932",
      summary: "Pact with Mahatma Gandhi securing reserved legislative seats in place of separate electorates."
    },
    {
      id: "cad",
      label: "Constituent Assembly",
      category: "Constitution",
      year: 1946,
      size: 36,
      color: "#0B1F5C",
      citation: "CAD Vols. I - XII",
      summary: "Chaired the Drafting Committee, forging the Constitution of the Republic of India."
    },
    {
      id: "buddhism",
      label: "Navayana Buddhism",
      category: "Philosophy",
      year: 1956,
      size: 34,
      color: "#EC4899",
      citation: "The Buddha and His Dhamma, 1956",
      summary: "Reinterpretation of Dhamma anchored in reason, science, and the eradication of social misery."
    },
    {
      id: "columbia",
      label: "Columbia University",
      category: "Education",
      year: 1913,
      size: 24,
      color: "#06B6D4",
      citation: "Ph.D. Dissertation, 1916",
      summary: "Earned M.A. and Ph.D. in Economics, mentored by John Dewey, Edwin Seligman, and Alexander Goldenweiser."
    },
    {
      id: "lse",
      label: "London School of Economics",
      category: "Education",
      year: 1923,
      size: 24,
      color: "#14B8A6",
      citation: "D.Sc. Economics, 1923",
      summary: "Awarded D.Sc. for 'The Problem of the Rupee' and called to the Bar at Gray's Inn."
    },
    {
      id: "rbi",
      label: "Reserve Bank of India",
      category: "Economics",
      year: 1935,
      size: 24,
      color: "#6366F1",
      citation: "Hilton Young Commission Report, 1926",
      summary: "Conceptualized through Dr. Ambedkar's currency and central banking economic theorems."
    },
    {
      id: "art32",
      label: "Article 32",
      category: "Constitution",
      year: 1949,
      size: 26,
      color: "#F59E0B",
      citation: "CAD Dec 9, 1948",
      summary: "Termed by Dr. Ambedkar as 'the very soul of the Constitution and the very heart of it'."
    },
    {
      id: "hindu_code",
      label: "Hindu Code Bill",
      category: "Legislation",
      year: 1951,
      size: 26,
      color: "#F43F5E",
      citation: "BAWS Vol. 14",
      summary: "Pioneering codification granting Hindu women rights to inheritance, divorce, and monogamy."
    },
    {
      id: "bahishkrit",
      label: "Bahishkrit Hitakarini Sabha",
      category: "Movement",
      year: 1924,
      size: 24,
      color: "#10B981",
      citation: "Bombay Presidency Gazette, 1924",
      summary: "Founded under the motto 'Educate, Agitate, Organize' to foster socio-cultural awakening."
    }
  ],
  links: [
    { source: "aoc", target: "art17", relationship: "Ideological Foundation" },
    { source: "mahad", target: "art17", relationship: "Civil Rights Catalyst" },
    { source: "bahishkrit", target: "mahad", relationship: "Organizing Body" },
    { source: "poona", target: "cad", relationship: "Representation Accord" },
    { source: "cad", target: "art17", relationship: "Drafted & Enacted" },
    { source: "cad", target: "art32", relationship: "Constitutional Remedy" },
    { source: "columbia", target: "aoc", relationship: "Social Methodologies" },
    { source: "columbia", target: "lse", relationship: "Academic Trajectory" },
    { source: "lse", target: "rbi", relationship: "Monetary Doctrine" },
    { source: "cad", target: "hindu_code", relationship: "Legislative Reform" },
    { source: "aoc", target: "buddhism", relationship: "Spiritual Culmination" },
    { source: "buddhism", target: "cad", relationship: "Fraternity Principle" },
    { source: "bahishkrit", target: "aoc", relationship: "Emancipation Discourse" },
    { source: "art17", target: "art32", relationship: "Judicial Enforcement" }
  ]
};
