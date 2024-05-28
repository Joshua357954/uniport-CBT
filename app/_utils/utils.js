
// Function to add data to localStorage
export const addUser = (name, userId, email, department, level, photoURL) => {
    const userData = {
      name,
      userId,
      email,
      department,
      level,
      photoURL
    };
    console.log("Added User")
  
    localStorage.setItem('userData', JSON.stringify(userData));
    return 'Done xoscdvodjv'
};

  
// Function to get data from localStorage
export const getUser = () => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        return JSON.parse(storedUserData);
    } else {
        return null;
    }
};
  
// Function to clear data from localStorage
export const clearUser = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('scoreboard');
};

// Function to update the scoreboard with a new entry
export const updateScoreBoard = (time, score, course) => {
    // Get existing scoreboard data from localStorage
    const scoreboardData = JSON.parse(localStorage.getItem('scoreboard')) || [];
  
    // Add new entry to scoreboard data
    scoreboardData.push({ time, score, course });
  
    // Store updated scoreboard data back to localStorage
    localStorage.setItem('scoreboard', JSON.stringify(scoreboardData));
  };
  
  // Function to retrieve the scoreboard data from localStorage
  export const getScoreboard = () => {
    // Retrieve scoreboard data from localStorage
    const scoreboardData = localStorage.getItem('scoreboard');
  
    // If scoreboard data exists, parse it from JSON and return; otherwise, return an empty array
    return scoreboardData ? JSON.parse(scoreboardData) : [];
  };
  
  // Function to clear all scoreboard data from localStorage
  export const clearScoreboard = () => {
    // Clear all scoreboard data from localStorage
    localStorage.removeItem('scoreboard');
  };
  

export const courseShortForms = {
    "accounting": "Accounting",
    "adult and non-formal education": "ANFE",
    "adult education": "AE",
    "agriculture economics and extension": "AEE",
    "agriculture": "Agric",
    "anatomy": "Anatomy",
    "animal and environmental biology": "AEB",
    "animal science": "AS",
    "banking and finance": "B & F",
    "biochemistry": "Biochem",
    "botany": "Bot",
    "business education": "Bus Ed",
    "business management": "BM",
    "chemical engineering": "Chem Eng",
    "chemistry": "Chem",
    "civil engineering": "CE",
    "computer science": "CSC",
    "computer science and mathematics": "CSM",
    "computer with statistics": "CwS",
    "creative arts": "CA",
    "dentistry and dental surgery": "DDS",
    "drama / dramatic / performing arts": "Drama / PA",
    "early childhood education": "ECE",
    "economics": "Econ",
    "education and fine art": "Edu / FA",
    "education accounting": "Edu Acc",
    "education and biology": "Edu / Bio",
    "education and chemistry": "Edu / Chem",
    "education and computer science": "Edu / CS",
    "education and economics": "Edu / Econ",
    "education and english language": "Edu / Eng",
    "education and french": "Edu / Fr",
    "education and geography": "Edu / Geo",
    "education and history": "Edu / His",
    "education and mathematics": "Edu / Math",
    "education and physics": "Edu / Phys",
    "education and political science": "Edu / Pol Sci",
    "education and religious studies": "Edu / Rel Stud",
    "education and social science": "Edu / Soc Sci",
    "education and social studies": "Edu / Soc St",
    "education arts": "Edu Arts",
    "education foundation and management": "Edu F & M",
    // "educational / psychology, guidance and counseling": "Edu Psy",
    "electrical and electronics engineering": "EE Eng",
    "electrical engineering": "EE",
    "electronics engineering": "E Eng",
    "english language": "Eng Lang",
    "environmental education": "Env Edu",
    "environmental engineering": "Env Eng",
    "environmental technology": "Env Tech",
    "fine arts and design": "FAD",
    "fisheries": "Fish",
    "food science and technology": "Food Sci & Tech",
    "forestry and wildlife": "FWL",
    "french": "Fr",
    // "geography and environmental management": "Geo & Env Mgmt",
    "geology": "Geo",
    "history": "Hist",
    "home science": "HS",
    "hospitality and tourism management": "HTM",
    "human kinetics and health education": "HKHE",
    "industrial chemistry": "Ind Chem",
    "law": "Law",
    "library and information science": "LIS",
    "marketing": "Mkt",
    "mathematics": "Math",
    "mathematics and statistics": "Math & Stats",
    "mathematics with computer science": "Math & CS",
    "mechanical engineering": "MECH ENG",
    "mechatronics engineering": "Mec Eng",
    "medicine and surgery": "Med & Surg",
    "microbiology": "Microbio",
    "music": "Music",
    "nursing": "Nursing",
    "petroleum and gas engineering": "P & GE",
    "pharmacy": "Pharm",
    "philosophy": "Phil",
    "physical education": "PE",
    "physics": "Phys",
    "physics with electronics": "Phys w/ E",
    "physiology": "Physio",
    "plant science and biotechnology": "Plant Sci & Biotech",
    "political and administrative studies": "Pol & Adm Stud",
    "primary education studies": "PES",
    "public administration": "Pub Admin",
    "pure and applied mathematics": "Pure / Appl Math",
    "pure and industrial chemistry": "Pure & Ind Chem",
    "religious and cultural studies": "Rel & Culture Stud",
    "science education": "Sci Edu",
    "science laboratory technology": "SLT",
    "social works": "SW",
    "sociology": "Soc",
    "teacher education science": "TEd Sci",
    "theatre and film studies": "Theatre / Film",
    "zoology": "Zoo",
    "linguistics and nigerian languages": "Ling & NL",
    "linguistics and communication studies": "Ling & CS",
    "natural gas engineering": "NGE"
  };
  
  
  