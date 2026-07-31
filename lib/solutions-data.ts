export type SolutionProjectImage = {
  src: string;
  alt: string;
};

export type SolutionProject = {
  title: string;
  description: string;
  partner: string;
  photoDescription: string;
  partnerRecommendation: string;
  partnerComment: string;
  tags: string[];
  images: SolutionProjectImage[];
};

export const solutionProjects: SolutionProject[] = [
  {
    title: "AI Customer Support Assistant",
    description:
      "An AI-powered support platform that automates customer conversations and reduces response times by 80%.",
    partner: "Acme Corporation",
    photoDescription:
      "Dashboard views of the AI support console — conversation threads, automated routing, and agent handoff panels built for high-volume customer teams.",
    partnerRecommendation:
      "DHAKAA understood our support workflows on day one and delivered a platform our agents actually enjoy using.",
    partnerComment:
      "Response times dropped within the first month. The interface feels tailored to how we work, not a generic helpdesk template.",
    tags: ["AI", "Automation", "Customer Service"],
    images: [
      {
        src: "https://i.pinimg.com/736x/9c/5a/c4/9c5ac40c6ee70117c5ae86769de863f9.jpg",
        alt: "AI customer support agent dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/65/46/d6/6546d63b1172f4c1523c617b1b4b25c8.jpg",
        alt: "Support ticket management interface",
      },
      {
        src: "https://i.pinimg.com/736x/28/bc/46/28bc468b98b038a3073dd36305aa60b4.jpg",
        alt: "Live chat conversation panel",
      },
      {
        src: "https://i.pinimg.com/736x/29/08/b3/2908b329430b03bd3c0509e5ea8cf630.jpg",
        alt: "Multi-channel support inbox view",
      },
      {
        src: "https://i.pinimg.com/736x/3c/73/8b/3c738b19c24ca8ea2e733685eb61a641.jpg",
        alt: "Customer service analytics dashboard",
      },
    ],
  },
  {
    title: "Manufacturing Analytics Platform",
    description:
      "Real-time production monitoring and predictive maintenance dashboard for industrial operations.",
    partner: "Tech Factory",
    photoDescription:
      "Screens from the production floor analytics suite — live line monitoring, downtime alerts, and predictive maintenance views for plant managers.",
    partnerRecommendation:
      "We finally have one place to see what is happening on the floor without chasing data across five systems.",
    partnerComment:
      "The team adopted it quickly because every screen maps to a real decision our supervisors make every shift.",
    tags: ["Analytics", "Industry 4.0", "Dashboard"],
    images: [
      {
        src: "https://i.pinimg.com/736x/4c/ee/81/4cee811c1bb81e8ea977b6449c50d294.jpg",
        alt: "Production line analytics dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/0d/dc/31/0ddc3155361c5a88caf62f591ceeb8a1.jpg",
        alt: "Factory monitoring system overview",
      },
      {
        src: "https://i.pinimg.com/736x/87/d3/bf/87d3bfecadee71b9d0bcdfe666a6bd61.jpg",
        alt: "Manufacturing performance analytics dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/4c/e0/bb/4ce0bb27d8795a53d31b156af98fa488.jpg",
        alt: "Manufacturing quality control dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/10/c4/cd/10c4cd6308e9527ade560974f0c457a8.jpg",
        alt: "Industrial production monitoring screen",
      },
    ],
  },
  {
    title: "Custom SaaS Platform",
    description:
      "End-to-end product development — from discovery and architecture to launch and iteration.",
    partner: "Northline Group",
    photoDescription:
      "Product screens from the custom SaaS build — client portal, CRM modules, and admin settings shaped around Northline's sales and account workflows.",
    partnerRecommendation:
      "DHAKAA replaced three tools with one platform that fits how our team sells and supports clients.",
    partnerComment:
      "Discovery was thorough, delivery was steady, and the product still evolves with us instead of fighting our process.",
    tags: ["Web App", "SaaS", "CRM"],
    images: [
      {
        src: "https://i.pinimg.com/736x/2f/b6/d0/2fb6d04ad583e42d99c1763c7fd882be.jpg",
        alt: "Custom CRM dashboard home screen",
      },
      {
        src: "https://i.pinimg.com/736x/05/6e/8f/056e8f6d11d6f6fb3bd90dd0aef35541.jpg",
        alt: "SaaS admin analytics dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/df/36/2b/df362be42e81795110712d76d0c02cad.jpg",
        alt: "Client management CRM module",
      },
      {
        src: "https://i.pinimg.com/736x/1a/93/9f/1a939f6fbd3fe95cf976fecd3db20c01.jpg",
        alt: "CRM contact list dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/48/ac/d1/48acd1c2a8a97fd990b63cc97a0b0a74.jpg",
        alt: "SaaS product screen overview",
      },
    ],
  },
  {
    title: "Internal Operations Suite",
    description:
      "Replace spreadsheets and duct-taped workflows with software your team actually wants to use.",
    partner: "Meridian Logistics",
    photoDescription:
      "Operations suite previews — dispatch boards, workflow automation views, and reporting modules designed to replace spreadsheet-driven processes.",
    partnerRecommendation:
      "Our ops team stopped working around the software and started working inside it.",
    partnerComment:
      "Onboarding was smooth because every workflow mirrors what we already did — just faster and with fewer errors.",
    tags: ["ERP", "Automation", "Operations"],
    images: [
      {
        src: "https://i.pinimg.com/736x/47/1f/2f/471f2f719a22fff7a6926762299bf2f7.jpg",
        alt: "Supply chain operations dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/62/7f/de/627fde49ff1d9a80656d9f04c3ab2d44.jpg",
        alt: "Project management workflow board",
      },
      {
        src: "https://i.pinimg.com/736x/e4/b5/8c/e4b58c5d1c363d3a7223476d657d0f79.jpg",
        alt: "Operations KPI reporting dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/7b/0a/b3/7b0ab319433c9d46f3e28d1ffab3d439.jpg",
        alt: "Team KPI tracking dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/5f/36/79/5f367981700644b3cbd787564e1748bf.jpg",
        alt: "Workflow analytics overview",
      },
    ],
  },
  {
    title: "Legacy Modernization",
    description:
      "Migrate aging systems to modern stacks without disrupting the business that depends on them.",
    partner: "Heritage Financial",
    photoDescription:
      "Before-and-after platform views — modernized client dashboards, migration status panels, and data reconciliation tools for regulated financial operations.",
    partnerRecommendation:
      "DHAKAA modernized our core systems without the downtime or disruption we were afraid of.",
    partnerComment:
      "They treated migration like an operational risk problem, not just a technical rewrite. That made all the difference.",
    tags: ["Modernization", "Data Analytics", "Web App"],
    images: [
      {
        src: "https://i.pinimg.com/736x/99/95/71/99957101559063892f92a5f9b05f66ef.jpg",
        alt: "Legacy and modern platform comparison screens",
      },
      {
        src: "https://i.pinimg.com/736x/c8/41/78/c8417847c38d44e8c26aee3a7a91c761.jpg",
        alt: "Data migration analytics dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/a4/00/81/a4008174238eb2f2920e90d654c507c9.jpg",
        alt: "Modernized financial client dashboard",
      },
      {
        src: "https://i.pinimg.com/736x/a9/c2/70/a9c2700c62c0066d01e90457ed67be7c.jpg",
        alt: "Modern analytics platform overview",
      },
      {
        src: "https://i.pinimg.com/736x/49/ef/0d/49ef0df44ee6ac5488668f0f33349dc5.jpg",
        alt: "Migration status reporting dashboard",
      },
    ],
  },
];
