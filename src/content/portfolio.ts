// All site copy and project data lives here — scenes only render it.

export const identity = {
  name: "Prakash Mannam",
  roles: ["Java Backend Engineer", "Full-Stack Developer"],
  statement: "I build backend systems and full-stack products with Java, Spring Boot, and React.",
  location: "Ongole, Andhra Pradesh",
};

export const education = {
  degree: "B.Tech — Computer Science & Engineering",
  college: "QIS College of Engineering and Technology",
  location: "Ongole, Andhra Pradesh",
  graduating: "Graduating 2027",
};

export const about =
  "I'm drawn to what happens beneath the interface — APIs, databases, and the systems that hold them together. I learn by building, and turn that understanding into working software.";

export const campusCoders = {
  title: "Campus Coders",
  tagline: "Student-led DSA & Community Platform",
  live: "https://campuscoders-theta.vercel.app",
  links: [
    { label: "Live", href: "https://campuscoders-theta.vercel.app" },
    { label: "GitHub", href: "https://github.com/PrakashMannam/Campuscoders" },
    { label: "API Docs", href: "https://campuscoders-backend-production.up.railway.app/swagger-ui.html" },
  ],
  // Request path through the stack. Notes stay short by design.
  layers: [
    { name: "React", note: "Frontend client, deployed on Vercel." },
    { name: "REST API", note: "JSON endpoints, documented with Swagger UI." },
    { name: "Spring Security", note: "Guards endpoints before they reach application code." },
    { name: "Controller", note: "Maps HTTP requests to application operations." },
    { name: "Service", note: "Holds the application logic." },
    { name: "JPA / Hibernate", note: "Maps Java entities to relational tables." },
    { name: "MySQL", note: "Relational persistence for the platform's data." },
  ],
};

export const miniRedis = {
  title: "MiniRedis",
  tagline: "In-memory database / networking experiment built in Java",
  path: ["Client", "TCP", "Server Socket", "Command Parser", "In-Memory Store", "Response"],
};

export const technologies = [
  "Java", "Spring Boot", "Spring Security", "React", "MySQL", "JPA / Hibernate",
  "JavaScript", "JUnit", "Docker", "Networking", "DSA",
];

export const contacts = [
  { label: "GitHub", href: "https://github.com/PrakashMannam" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prakash-mannam-19326b374" },
  { label: "Codolio", href: "https://codolio.com/profile/Prakash%20Mannam1" },
  { label: "Email", href: "mailto:prakashmannam8@gmail.com" },
];
