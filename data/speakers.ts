export interface Speaker {
  id: string;
  name: string;
  designation: string;
  company: string;
  sessionTitle: string;
  sessionCategory: "Cloud" | "AI" | "DevOps" | "Security" | "Career" | "Frontend" | "Backend";
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  featured: boolean;
  displayOrder: number;
  bio?: string;
  sessionAbstract?: string;
}

export const SPEAKERS: Speaker[] = [
  {
    id: "spk-1",
    name: "Jigar Halani",
    designation: "Sr. Director Of Enterprise Solutions Architecture & Engineering",
    company: "NVIDIA South Asia",
    sessionTitle: "Agentic AI & Super Agents: Next-Gen AI Infrastructure",
    sessionCategory: "AI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/jigarhalani",
    featured: true,
    displayOrder: 1,
    bio: "Jigar Halani is the Senior Director – Solution Architect & Engineering at NVIDIA South Asia. With over 21 years of experience, he leads high-performance computing (HPC), AI infrastructure, and Generative AI (GenAI) solutions across the region, guiding enterprises and governments on token economics and deploying Sovereign AI.",
    sessionAbstract: "Explore the evolution of autonomous AI systems from single-purpose tools to collaborative 'super agents.' This session breaks down the critical hardware infrastructure, model orchestration, and cost optimization strategies needed to deploy scalable, production-grade agentic workflows on NVIDIA platforms."
  },
  {
    id: "spk-2",
    name: "Arsh Goyal",
    designation: "AI & Engineering Creator",
    company: "ThoughtSpot",
    sessionTitle: "Navigating an AI-Driven World: Thinking Beyond Coding",
    sessionCategory: "Career",
    image: "https://github.com/arshgoyal.png",
    linkedin: "https://linkedin.com/in/arshgoyal",
    featured: true,
    displayOrder: 2,
    bio: "Arsh Goyal is an AI and engineering creator, developer advocate, and tech educator. A Gold Medalist from NIT Jalandhar, he has worked at Samsung and ISRO. He commands a large following on YouTube and LinkedIn (named a LinkedIn Top Voice), sharing knowledge on DSA, system design, and AI applications.",
    sessionAbstract: "How does the role of a software developer evolve in the age of generative AI and coding agents? We'll examine the shifting paradigm of software engineering, strategies for developers to level up beyond writing syntax, and how to build high-impact products using AI APIs."
  },
  {
    id: "spk-3",
    name: "Tanu Garg",
    designation: "AI Service Delivery Transformation Leader",
    company: "EY GDS",
    sessionTitle: "Embedding AI into Enterprise Service Delivery Operating Models",
    sessionCategory: "AI",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/tanu-garg-eygds",
    featured: true,
    displayOrder: 3,
    bio: "Tanu Garg is a Partner and AI Service Delivery Transformation Leader at EY Global Delivery Services (GDS). She has over 14 years of experience guiding financial institutions, risk groups, and compliance frameworks through AI-powered digital transformations and digital service delivery models.",
    sessionAbstract: "An in-depth look at how large enterprises embed AI and automation directly into their service delivery pipelines. Tanu will share framework designs, risk mitigation policies, compliance guidelines, and organizational change strategies for scaling AI solutions safely."
  },
  {
    id: "spk-4",
    name: "Praful Bagai",
    designation: "Head of Developer Relations – India & South Asia",
    company: "AWS",
    sessionTitle: "The Evolution of AI Systems: From GenAI to Agentic AI on AWS",
    sessionCategory: "Cloud",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/prafulbagai",
    featured: true,
    displayOrder: 4,
    bio: "Praful Bagai is the Head of Developer Relations for India & South Asia at AWS. A seasoned engineering leader with background at Wayfair and Abnormal Security, he helps developers learn and leverage cloud-native services, GenAI architectures, and agentic integrations on AWS.",
    sessionAbstract: "From simple text completion to complex, multi-step agentic execution. In this keynote, we will explore AWS Bedrock Agents, LangChain integrations, event-driven scaling using serverless workflows, and how to design stateful agentic systems in the cloud."
  },
  {
    id: "spk-5",
    name: "Ramprakash Ramamoorthy",
    designation: "Director of AI Research",
    company: "Zoho Corp",
    sessionTitle: "The Power of Open-Weight Models in Enterprise AI",
    sessionCategory: "AI",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/ramprakashr",
    featured: false,
    displayOrder: 5,
    bio: "Ramprakash leads AI research and development at Zoho Corp, specializing in natural language processing, computer vision, and model deployment optimization. He is a strong advocate for open-weight model integration for cost and privacy efficiency.",
    sessionAbstract: "Why open-weight models are changing the landscape of enterprise software. This session explores deploying Llama, Mistral, and local models on AWS EC2/SageMaker, optimizing inference speeds, and building self-hosted, private RAG pipelines."
  },
  {
    id: "spk-6",
    name: "Kamesh Sampath",
    designation: "Lead Developer Advocate",
    company: "Snowflake",
    sessionTitle: "Building Intelligent Applications with Snowflake and AWS",
    sessionCategory: "DevOps",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/kamesh-sampath",
    featured: false,
    displayOrder: 6,
    bio: "Kamesh is the Lead Developer Advocate at Snowflake. He focuses on data engineering, Kubernetes pipelines, and integration architectures, helping developers build secure data-intensive applications.",
    sessionAbstract: "Learn how to build a unified data and AI app architecture. This session will show how to securely ingest data into Snowflake, apply LLM reasoning using Snowflake Cortex, and connect to AWS serverless APIs for downstream application integration."
  },
  {
    id: "spk-7",
    name: "Anupam Mishra",
    designation: "Director of Developer Programs",
    company: "AWS India & South Asia",
    sessionTitle: "Scaling AWS Developer Communities and Ecosystems",
    sessionCategory: "Cloud",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/anupammishra",
    featured: false,
    displayOrder: 7,
    bio: "Anupam Mishra leads the AWS Developer Programs across India and South Asia, supporting community groups, user groups, and student builders in learning, building, and scaling their cloud-native skills.",
    sessionAbstract: "A session detailing the programs, grants, and learning pathways available to students and developers in the AWS ecosystem. Learn how to leverage AWS User Groups, Community Builders, and local meetups to boost your cloud career."
  },
  {
    id: "spk-8",
    name: "Dale Vaz",
    designation: "Founder & CEO, ex-CTO Swiggy",
    company: "Sahi.com",
    sessionTitle: "Lessons from Scaling Swiggy and Building the Future of Search",
    sessionCategory: "Backend",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/dalevaz",
    featured: false,
    displayOrder: 8,
    bio: "Dale Vaz is the founder and CEO of Sahi.com. He was previously the Chief Technology Officer (CTO) at Swiggy, where he scaled the technology stack to support millions of daily orders, and has also spent over 11 years leading engineering teams at Amazon.",
    sessionAbstract: "Scale is both a feature and a challenge. Dale will share fundamental system design principles learned from leading Swiggy's massive growth, building hyper-scale microservices, and how AI is changing the landscape of search and discovery engines."
  }
];
