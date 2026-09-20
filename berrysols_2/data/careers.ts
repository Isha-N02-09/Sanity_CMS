export type CareerRole = {
  slug: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const careerRoles: CareerRole[] = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    dept: "Engineering",
    location: "Sialkot / Onsite",
    type: "Full-time",
    summary: "Build clear, fast, and thoughtful interfaces that turn complex product ideas into useful experiences.",
    responsibilities: [
      "Build responsive web interfaces from designs and product requirements.",
      "Work closely with designers and backend engineers to ship polished features.",
      "Improve performance, accessibility, and maintainability across client projects.",
      "Review code and contribute to frontend standards and reusable components.",
    ],
    requirements: [
      "Strong HTML, CSS, and JavaScript fundamentals.",
      "Hands-on experience with React and modern frontend workflows.",
      "Comfort working with responsive layouts, APIs, and Git.",
      "A practical eye for detail and a willingness to learn in public.",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    dept: "Engineering",
    location: "Sialkot / Onsite",
    type: "Full-time",
    summary: "Turn emerging AI capabilities into dependable tools that solve real problems for real teams.",
    responsibilities: [
      "Design and prototype AI-powered product features with measurable outcomes.",
      "Integrate language models, retrieval, and automation into production workflows.",
      "Evaluate model quality, reliability, cost, and user experience.",
      "Collaborate with product and engineering teams to take experiments to launch.",
    ],
    requirements: [
      "Strong Python or JavaScript skills and solid software engineering habits.",
      "Working understanding of APIs, data flows, and modern AI tooling.",
      "Ability to evaluate outputs critically and communicate tradeoffs clearly.",
      "Curiosity about new models balanced with practical product judgment.",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    dept: "Design",
    location: "Sialkot / Onsite",
    type: "Part-time",
    summary: "Shape digital products that feel simple to use, distinctive to remember, and grounded in user needs.",
    responsibilities: [
      "Turn product goals and user needs into clear flows, wireframes, and interfaces.",
      "Create visual systems that stay consistent across screens and products.",
      "Present design decisions, collect feedback, and iterate with the team.",
      "Support developers with practical specs and thoughtful handoff details.",
    ],
    requirements: [
      "A portfolio showing web or product design work from idea to interface.",
      "Comfort with Figma or a comparable interface design tool.",
      "Understanding of typography, layout, interaction, and responsive design.",
      "Clear communication and a willingness to work closely with engineers.",
    ],
  },
];

export function getCareerRole(slug: string) {
  return careerRoles.find((role) => role.slug === slug);
}
