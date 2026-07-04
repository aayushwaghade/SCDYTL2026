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
    name: "Dr. Ananya Sharma",
    designation: "AWS Hero & Principal Serverless Architect",
    company: "CloudCore Solutions",
    sessionTitle: "Architecting Next-Gen Event-Driven Serverless Systems on AWS",
    sessionCategory: "Cloud",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/ananya-sharma-demo",
    twitter: "https://twitter.com/ananyasharma_demo",
    github: "https://github.com/ananyasharma-demo",
    featured: true,
    displayOrder: 1,
    bio: "Dr. Ananya Sharma is an AWS Hero with over 12 years of experience in distributed cloud architectures. She has helped transition dozens of enterprise architectures to fully serverless and event-driven patterns, reducing operational overhead and scaling seamlessly to millions of requests.",
    sessionAbstract: "This deep-dive session covers the latest design patterns for building resilient, event-driven serverless architectures. We will explore advanced Amazon EventBridge routing, AWS Lambda performance tuning with LLRT, DynamoDB single-table design under high concurrency, and how to maintain observability using AWS X-Ray and CloudWatch Container Insights."
  },
  {
    id: "spk-2",
    name: "Vikram Malhotra",
    designation: "Head of AI Research & Startup Founder",
    company: "CognitiveLabs",
    sessionTitle: "Demystifying GenAI: Building Production-Ready Apps with Amazon Bedrock",
    sessionCategory: "AI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/vikram-malhotra-demo",
    twitter: "https://twitter.com/vikram_demo",
    github: "https://github.com/vikram-demo",
    featured: true,
    displayOrder: 2,
    bio: "Vikram Malhotra is the founder of CognitiveLabs, an AI-first startup focused on bringing large language models to enterprise workflows. As a former AWS Machine Learning Specialist, he brings deep expertise in leveraging cloud-native GenAI services safely and efficiently.",
    sessionAbstract: "Learn how to go from prototype to production with Generative AI using Amazon Bedrock. This session will demonstrate Retrieval-Augmented Generation (RAG) pipelines, guardrails for security and privacy, cost optimization models, and how to fine-tune foundational models using your own AWS-hosted datasets."
  },
  {
    id: "spk-3",
    name: "Sarah Jenkins",
    designation: "Principal Security Guard & AWS Community Builder",
    company: "SecureCloud Inc.",
    sessionTitle: "Zero Trust Architecture on AWS: Implementation & Guardrails",
    sessionCategory: "Security",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/sarah-jenkins-demo",
    twitter: "https://twitter.com/sarahsec_demo",
    github: "https://github.com/sarahsec-demo",
    featured: true,
    displayOrder: 3,
    bio: "Sarah Jenkins is an AWS Community Builder in the Security track and Principal SecOps lead at SecureCloud. She has authored multiple cloud compliance whitepapers and is a frequent speaker at Re:Inforce and local AWS meetups.",
    sessionAbstract: "Zero Trust is no longer just a buzzword; it is a necessity. In this presentation, we will dissect how to implement true Zero Trust principles on AWS using IAM Policy Boundaries, AWS Verified Access, AWS KMS envelope encryption, and automated compliance auditing using AWS Security Hub."
  },
  {
    id: "spk-4",
    name: "Rohan Deshmukh",
    designation: "Lead DevOps Engineer",
    company: "Yotta Technologies",
    sessionTitle: "GitOps in Action: Scaling EKS Deployments with ArgoCD",
    sessionCategory: "DevOps",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/rohan-deshmukh-demo",
    github: "https://github.com/rohand-demo",
    featured: false,
    displayOrder: 4,
    bio: "Rohan leads the platform engineering division at Yotta Technologies, focusing on infrastructure automation, Kubernetes orchestration, and continuous delivery pipelines.",
    sessionAbstract: "Deploying applications to Amazon EKS should be declarative and self-healing. This session walks through setting up a GitOps pipeline from scratch using ArgoCD, configuring multi-cluster deployments, managing secrets securely, and rollback strategies."
  },
  {
    id: "spk-5",
    name: "Michael Chen",
    designation: "Staff Developer Relations Engineer",
    company: "DevStream",
    sessionTitle: "High-Performance API Design: REST vs. GraphQL vs. gRPC on AWS",
    sessionCategory: "Backend",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/michael-chen-demo",
    twitter: "https://twitter.com/mchen_demo",
    github: "https://github.com/mchen-demo",
    featured: false,
    displayOrder: 5,
    bio: "Michael is a backend enthusiast and developer advocate who loves benchmarking API protocols. He helps developer communities write high-throughput code with minimal footprint.",
    sessionAbstract: "Explore the architectural trade-offs between REST (API Gateway), GraphQL (AppSync), and gRPC (running on Fargate). We'll review performance benchmarks under load, protocol sizes, network overhead, and select the best tool for the job."
  },
  {
    id: "spk-6",
    name: "Elena Rostova",
    designation: "Staff Frontend Architect",
    company: "PixelPerfect Labs",
    sessionTitle: "Next-Gen Web Experiences: Next.js & AWS Amplify Hosting",
    sessionCategory: "Frontend",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/elena-rostova-demo",
    github: "https://github.com/elena-demo",
    featured: false,
    displayOrder: 6,
    bio: "Elena specializes in design systems, micro-frontends, and server-side rendering performance. She's a passionate advocate for web accessibility and responsive UX.",
    sessionAbstract: "Delivering fast first-contentful paint is critical. This session explores deploying Next.js App Router applications to AWS Amplify Hosting, configuring CDN caching rules, ISR strategies, and optimizing images dynamically."
  },
  {
    id: "spk-7",
    name: "Kabir Mehta",
    designation: "Cloud Career Strategist & Tech Educator",
    company: "CloudAcademy India",
    sessionTitle: "Navigating Your Career in the Cloud: Certifications vs. Projects",
    sessionCategory: "Career",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/kabir-mehta-demo",
    twitter: "https://twitter.com/kabir_educator",
    featured: false,
    displayOrder: 7,
    bio: "Kabir is an educator who has mentored over 50,000 students transitioning to cloud careers. He creates structured bootcamps and hands-on laboratory experiences.",
    sessionAbstract: "How do you land your first cloud role? We will analyze the real value of certifications versus hands-on community projects, build portfolios that stand out to recruiters, and discuss top networking strategies."
  },
  {
    id: "spk-8",
    name: "Tanya Sen",
    designation: "Senior Cloud Engineer",
    company: "InnoTech Ventures",
    sessionTitle: "Deploying Jamstack Applications with Serverless Framework",
    sessionCategory: "Frontend",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com/in/tanya-sen-demo",
    github: "https://github.com/tanya-demo",
    featured: false,
    displayOrder: 8,
    bio: "Tanya is a full-stack developer who loves the simplicity of Jamstack. She designs modular APIs and serverless microservices for fast-paced startups.",
    sessionAbstract: "An overview of leveraging Serverless Framework to deploy full-stack Jamstack projects utilizing AWS S3, CloudFront, Lambda, and DynamoDB. We'll deploy a live application during this hands-on showcase."
  }
];
