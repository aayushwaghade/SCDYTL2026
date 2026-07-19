export interface Speaker {
  id: string;
  name: string;
  designation?: string;
  company?: string;
  sessionTitle?: string;
  sessionCategory?: "Cloud" | "AI" | "DevOps" | "Security" | "Career" | "Frontend" | "Backend";
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  featured: boolean;
  displayOrder: number;
  bio?: string;
  sessionAbstract?: string;
  
  // Migrated source project fields
  role?: string;
  talkTitle?: string;
  talkDescription?: string;
  talkTime?: string;
  isKeynote: boolean;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

// Speaker image map — maps speaker names to their image filenames in /speakers/
// This enables intelligent matching even when filenames differ slightly from names
const SPEAKER_IMAGE_MAP: Record<string, string> = {
  "Toshal Khawale": "Toshal Khawale.png",
  "Ameya Vaidya": "Amey Vaidya.jpg",
  "Akashdeep Thanda": "Akashdeep Thanda.png",
  "Ashutosh Bhakare": "Ashutosh Bhakare.jpg",
  "Anand Mehta": "Anand Mehta.jpg",
  "Mohit Dharmadhikari": "Mohit Dharmadhikari.jpg",
  "Jyoti Notani": "Jyoti Notani.jpg",
  "Naresh Waswani": "Naresh Waswani.jpg",
};

function getSpeakerImage(name: string): string {
  const filename = SPEAKER_IMAGE_MAP[name];
  if (filename) {
    return `/speakers/${encodeURIComponent(filename)}`;
  }
  // Fallback: default avatar (PersonSilhouette in ProfileCard handles missing images)
  return "";
}

export const SPEAKERS: Speaker[] = [
  {
    id: "spk-1",
    name: "Toshal Khawale",
    designation: "AWS Hero | Engineering Leader",
    company: "JPMorgan Chase & Co.",
    image: getSpeakerImage("Toshal Khawale"),
    linkedin: "https://www.linkedin.com/in/toshal-khawale/",
    featured: true,
    displayOrder: 1,
    bio: "AWS Hero and technology leader with 22+ years of experience in engineering leadership, cloud transformation, and application modernization. Holds 12 AWS certifications and leads the AWS User Group Pune. Previously served as Managing Director at PwC.",
    role: "AWS Hero | Engineering Leader",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/toshal-khawale/",
      website: "https://sessionize.com/toshal-khawale",
    },
  },
  {
    id: "spk-2",
    name: "Ameya Vaidya",
    designation: "Cloud & Information Security Leader",
    company: "AWS Community Builder",
    image: getSpeakerImage("Ameya Vaidya"),
    linkedin: "https://www.linkedin.com/in/ameya-vaidya-9a164317/",
    featured: true,
    displayOrder: 2,
    bio: "AWS Community Builder and leader of the AWS User Group Pune with 15+ years of expertise in cybersecurity, cloud infrastructure, and DevOps. Specializes in vulnerability management, cloud compliance, and secure architecture design. Frequent speaker and trainer at AWS Community Day events.",
    role: "Cloud & Information Security Leader",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/ameya-vaidya-9a164317/",
    },
  },
  {
    id: "spk-3",
    name: "Akashdeep Thanda",
    designation: "Tech Creator & Developer Influencer",
    company: "Community Leader",
    image: getSpeakerImage("Akashdeep Thanda"),
    linkedin: "https://www.linkedin.com/in/akashthanda14/",
    featured: true,
    displayOrder: 3,
    bio: "Tech creator and developer influencer with a community of 150K+ Instagram followers and 145K+ tech community members. Specializes in DSA, MERN stack development, and inspiring the next generation of developers through content and public speaking.",
    role: "Tech Creator & Developer Influencer",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/akashthanda14/",
      website: "https://www.akashthanda.tech",
    },
  },
  {
    id: "spk-4",
    name: "Ashutosh Bhakare",
    designation: "CEO & Docker Captain",
    company: "Unnati Development & Training Centre",
    image: getSpeakerImage("Ashutosh Bhakare"),
    linkedin: "https://www.linkedin.com/in/abhakare/",
    featured: true,
    displayOrder: 4,
    bio: "CEO of Unnati Development and Training Centre with nearly two decades of experience in Linux, Cloud Computing, DevOps, and open-source technologies. Red Hat Certified Instructor, SUSE Certified Instructor, Google Authorized Instructor, Docker Captain, and active Fedora Project contributor.",
    role: "CEO & Docker Captain",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/abhakare/",
      website: "https://unnatidevelopment.in",
    },
  },
  {
    id: "spk-5",
    name: "Anand Mehta",
    designation: "Senior FinOps & AI Specialist",
    company: "Nasdaq",
    image: getSpeakerImage("Anand Mehta"),
    linkedin: "https://www.linkedin.com/in/anandmehtafinops/",
    featured: false,
    displayOrder: 5,
    bio: "Senior FinOps & AI Specialist at Nasdaq and AWS Community Builder. Multi-cloud certified hybrid solution enterprise architect and certified FinOps practitioner. Specializes in cloud cost optimization, AI-driven financial governance, and enterprise cloud economics.",
    role: "Senior FinOps & AI Specialist",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/anandmehtafinops/",
      website: "https://anandmehta.me",
    },
  },
  {
    id: "spk-6",
    name: "Mohit Dharmadhikari",
    designation: "Head of Engineering",
    company: "Dentsu",
    image: getSpeakerImage("Mohit Dharmadhikari"),
    linkedin: "https://www.linkedin.com/in/mohitdharmadhikari/",
    featured: false,
    displayOrder: 6,
    bio: "Head of Engineering at Dentsu and experienced software architect with expertise in Cloud Computing (AWS, Azure, GCP), DevOps, containerization (Docker, Kubernetes), and software engineering. Active mentor, technical blogger, and YouTube creator (@voiddevops).",
    role: "Head of Engineering",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/mohitdharmadhikari/",
      website: "https://mohitdharmadhikari.com",
    },
  },
  {
    id: "spk-7",
    name: "Jyoti Notani",
    designation: "Architect",
    company: "Persistent Systems",
    image: getSpeakerImage("Jyoti Notani"),
    linkedin: "https://www.linkedin.com/in/jyoti-notani-05780522/",
    featured: false,
    displayOrder: 7,
    bio: "Architect at Persistent Systems and organizer of the AWS User Group Nagpur. Expertise spans cloud architecture, AWS EKS security, and enterprise AI agent governance. Frequent speaker at AWS Community Day Bengaluru and other major tech events.",
    role: "Architect",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/jyoti-notani-05780522/",
    },
  },
  {
    id: "spk-8",
    name: "Naresh Waswani",
    designation: "Senior Architect",
    company: "Simpplr Inc.",
    image: getSpeakerImage("Naresh Waswani"),
    linkedin: "https://www.linkedin.com/in/nwaswani/",
    featured: false,
    displayOrder: 8,
    bio: "Senior Architect at Simpplr Inc. and AWS Community Builder. Specializes in AWS cloud migration, microservices architecture, event-driven architecture, Kubernetes, and DevOps. Leads the AWS User Group Nagpur and holds multiple AWS and Kubernetes certifications.",
    role: "Senior Architect",
    isKeynote: false,
    socials: {
      linkedin: "https://www.linkedin.com/in/nwaswani/",
    },
  },
];
