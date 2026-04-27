export interface Professor {
    id: number;
    name: string;
    title: string;
    email: string;
    university: string;
    universityId: number;
    country: string;
    flag: string;
    department: string;
    researchAreas: string[];
    recentPublications: string[];
    labName?: string;
    profileUrl?: string;
    acceptingStudents: boolean;
}

export interface EmailTemplate {
    id: string;
    name: string;
    category: "research-interest" | "phd-inquiry" | "masters-inquiry" | "funding-question" | "follow-up";
    subject: string;
    body: string;
}

export interface TrackedEmail {
    id: string;
    professorId: number;
    professorName: string;
    university: string;
    templateUsed: string;
    subject: string;
    body: string;
    status: "draft" | "sent" | "delivered" | "opened" | "replied" | "no-response";
    sentAt: string;
    openedAt?: string;
    repliedAt?: string;
}

export const professors: Professor[] = [
    {
        id: 1,
        name: "Dr. Sarah Mitchell",
        title: "Associate Professor",
        email: "s.mitchell@manchester.ac.uk",
        university: "University of Manchester",
        universityId: 1,
        country: "United Kingdom",
        flag: "🇬🇧",
        department: "Computer Science",
        researchAreas: ["Machine Learning", "Natural Language Processing"],
        recentPublications: [
            "Attention Mechanisms in Low-Resource NLP (2025)",
            "Efficient Fine-Tuning for Domain Adaptation (2024)",
        ],
        labName: "Manchester NLP Lab",
        profileUrl: "https://manchester.ac.uk/staff/s-mitchell",
        acceptingStudents: true,
    },
    {
        id: 2,
        name: "Prof. James Okonkwo",
        title: "Professor",
        email: "j.okonkwo@utoronto.ca",
        university: "University of Toronto",
        universityId: 2,
        country: "Canada",
        flag: "🇨🇦",
        department: "Public Health",
        researchAreas: ["Global Health Policy", "Epidemiology", "Health Equity"],
        recentPublications: [
            "Health Systems Resilience in Sub-Saharan Africa (2025)",
            "Pandemic Preparedness Frameworks: Lessons Learned (2024)",
        ],
        labName: "Global Health Equity Lab",
        acceptingStudents: true,
    },
    {
        id: 3,
        name: "Dr. Lena Brandt",
        title: "Junior Professor",
        email: "l.brandt@tum.de",
        university: "Technical University of Munich",
        universityId: 3,
        country: "Germany",
        flag: "🇩🇪",
        department: "Informatics",
        researchAreas: ["Computer Vision", "Autonomous Systems"],
        recentPublications: [
            "Real-Time Object Detection in Adverse Weather (2025)",
            "LiDAR-Camera Fusion for Urban Navigation (2024)",
        ],
        labName: "Perception & Robotics Group",
        acceptingStudents: true,
    },
    {
        id: 4,
        name: "Prof. Hannah Clarke",
        title: "Professor",
        email: "h.clarke@unimelb.edu.au",
        university: "University of Melbourne",
        universityId: 4,
        country: "Australia",
        flag: "🇦🇺",
        department: "Environmental Science",
        researchAreas: ["Climate Modelling", "Marine Ecology"],
        recentPublications: [
            "Coral Bleaching Prediction Using Ensemble Models (2025)",
            "Pacific Ocean Warming Trends: A Decadal Review (2024)",
        ],
        acceptingStudents: false,
    },
    {
        id: 5,
        name: "Dr. Kwame Asante",
        title: "Senior Lecturer",
        email: "k.asante@uct.ac.za",
        university: "University of Cape Town",
        universityId: 5,
        country: "South Africa",
        flag: "🇿🇦",
        department: "Engineering",
        researchAreas: ["Renewable Energy", "Power Systems", "Smart Grids"],
        recentPublications: [
            "Mini-Grid Optimization for Rural Electrification (2025)",
            "Solar-Wind Hybrid Systems in Southern Africa (2024)",
        ],
        labName: "Energy Systems Research Group",
        acceptingStudents: true,
    },
    {
        id: 6,
        name: "Prof. Emily Zhang",
        title: "Associate Professor",
        email: "e.zhang@ubc.ca",
        university: "University of British Columbia",
        universityId: 6,
        country: "Canada",
        flag: "🇨🇦",
        department: "Computer Science",
        researchAreas: ["Human-Computer Interaction", "Accessibility", "UX Research"],
        recentPublications: [
            "Inclusive Design Patterns for Mobile Interfaces (2025)",
            "Voice Interaction for Aging Populations (2024)",
        ],
        labName: "Inclusive Design Lab",
        acceptingStudents: true,
    },
    {
        id: 7,
        name: "Dr. Richard Owusu",
        title: "Lecturer",
        email: "r.owusu@leeds.ac.uk",
        university: "University of Leeds",
        universityId: 7,
        country: "United Kingdom",
        flag: "🇬🇧",
        department: "Civil Engineering",
        researchAreas: ["Structural Analysis", "Sustainable Construction"],
        recentPublications: [
            "Bamboo-Reinforced Concrete: Feasibility Studies (2025)",
            "Low-Carbon Building Materials for Developing Economies (2024)",
        ],
        acceptingStudents: false,
    },
    {
        id: 8,
        name: "Prof. Anna Müller",
        title: "Professor",
        email: "a.mueller@rwth-aachen.de",
        university: "RWTH Aachen University",
        universityId: 8,
        country: "Germany",
        flag: "🇩🇪",
        department: "Electrical Engineering",
        researchAreas: ["Semiconductor Physics", "Quantum Computing"],
        recentPublications: [
            "Error Correction in Superconducting Qubits (2025)",
            "Scalable Quantum Gate Architectures (2024)",
        ],
        labName: "Quantum Systems Lab",
        acceptingStudents: true,
    },
    {
        id: 9,
        name: "Dr. Michael Torres",
        title: "Associate Professor",
        email: "m.torres@sydney.edu.au",
        university: "University of Sydney",
        universityId: 9,
        country: "Australia",
        flag: "🇦🇺",
        department: "Data Analytics",
        researchAreas: ["Bayesian Statistics", "Computational Biology"],
        recentPublications: [
            "Probabilistic Models for Gene Expression (2025)",
            "Bayesian Optimization in Drug Discovery (2024)",
        ],
        acceptingStudents: true,
    },
    {
        id: 10,
        name: "Prof. Diane Foster",
        title: "Professor",
        email: "d.foster@asu.edu",
        university: "Arizona State University",
        universityId: 10,
        country: "United States",
        flag: "🇺🇸",
        department: "Sustainability",
        researchAreas: ["Urban Sustainability", "Circular Economy", "Policy Design"],
        recentPublications: [
            "Urban Heat Island Mitigation Strategies (2025)",
            "Waste-to-Energy Policy Frameworks in US Cities (2024)",
        ],
        labName: "Sustainable Futures Lab",
        acceptingStudents: true,
    },
    {
        id: 11,
        name: "Dr. Thomas Whitfield",
        title: "Assistant Professor",
        email: "t.whitfield@warwick.ac.uk",
        university: "University of Warwick",
        universityId: 11,
        country: "United Kingdom",
        flag: "🇬🇧",
        department: "Mathematics",
        researchAreas: ["Algebraic Geometry", "Number Theory"],
        recentPublications: [
            "Rational Points on Elliptic Curves (2025)",
            "Modular Forms and Arithmetic Invariants (2024)",
        ],
        acceptingStudents: true,
    },
    {
        id: 12,
        name: "Prof. Linda Cheng",
        title: "Professor",
        email: "l.cheng@uwaterloo.ca",
        university: "University of Waterloo",
        universityId: 12,
        country: "Canada",
        flag: "🇨🇦",
        department: "Software Engineering",
        researchAreas: ["Software Reliability", "Formal Verification", "DevOps"],
        recentPublications: [
            "Automated Test Generation for Microservices (2025)",
            "Formal Methods in Continuous Deployment Pipelines (2024)",
        ],
        labName: "Reliable Software Lab",
        acceptingStudents: false,
    },
    {
        id: 13,
        name: "Dr. Fatima Al-Rashid",
        title: "Associate Professor",
        email: "f.alrashid@manchester.ac.uk",
        university: "University of Manchester",
        universityId: 1,
        country: "United Kingdom",
        flag: "🇬🇧",
        department: "Data Science",
        researchAreas: ["Deep Learning", "Time Series Analysis", "Healthcare AI"],
        recentPublications: [
            "Transformer Models for Clinical Event Prediction (2025)",
            "Federated Learning in Hospital Networks (2024)",
        ],
        labName: "Health Informatics Lab",
        acceptingStudents: true,
    },
    {
        id: 14,
        name: "Prof. David Nakamura",
        title: "Professor",
        email: "d.nakamura@utoronto.ca",
        university: "University of Toronto",
        universityId: 2,
        country: "Canada",
        flag: "🇨🇦",
        department: "Engineering",
        researchAreas: ["Robotics", "Control Systems", "Mechatronics"],
        recentPublications: [
            "Soft Robotics for Minimally Invasive Surgery (2025)",
            "Adaptive Control of Multi-Agent Systems (2024)",
        ],
        labName: "Autonomous Systems Lab",
        acceptingStudents: true,
    },
    {
        id: 15,
        name: "Dr. Ingrid Svensson",
        title: "Junior Professor",
        email: "i.svensson@tum.de",
        university: "Technical University of Munich",
        universityId: 3,
        country: "Germany",
        flag: "🇩🇪",
        department: "Physics",
        researchAreas: ["Condensed Matter Physics", "Material Science"],
        recentPublications: [
            "Topological Insulators for Energy Harvesting (2025)",
            "2D Materials Beyond Graphene: A Review (2024)",
        ],
        acceptingStudents: true,
    },
    {
        id: 16,
        name: "Prof. Abena Mensah",
        title: "Associate Professor",
        email: "a.mensah@uct.ac.za",
        university: "University of Cape Town",
        universityId: 5,
        country: "South Africa",
        flag: "🇿🇦",
        department: "Business",
        researchAreas: ["Development Economics", "Entrepreneurship", "Microfinance"],
        recentPublications: [
            "Fintech Adoption Among Informal Traders (2025)",
            "Women-Led Enterprises in Emerging Markets (2024)",
        ],
        acceptingStudents: true,
    },
    {
        id: 17,
        name: "Dr. Robert Kim",
        title: "Assistant Professor",
        email: "r.kim@asu.edu",
        university: "Arizona State University",
        universityId: 10,
        country: "United States",
        flag: "🇺🇸",
        department: "Journalism",
        researchAreas: ["Computational Journalism", "Misinformation Detection"],
        recentPublications: [
            "LLMs for Fact-Checking at Scale (2025)",
            "Social Media Bot Detection During Elections (2024)",
        ],
        acceptingStudents: false,
    },
    {
        id: 18,
        name: "Prof. Catherine Liu",
        title: "Professor",
        email: "c.liu@sydney.edu.au",
        university: "University of Sydney",
        universityId: 9,
        country: "Australia",
        flag: "🇦🇺",
        department: "Pharmacy",
        researchAreas: ["Drug Delivery Systems", "Nanomedicine"],
        recentPublications: [
            "Lipid Nanoparticles for mRNA Therapeutics (2025)",
            "Targeted Drug Release in Tumour Microenvironments (2024)",
        ],
        labName: "Advanced Therapeutics Lab",
        acceptingStudents: true,
    },
];

export const emailTemplates: EmailTemplate[] = [
    {
        id: "research-interest",
        name: "Research Interest Introduction",
        category: "research-interest",
        subject: "Prospective {{level}} Student: Interest in {{researchArea}}",
        body: `Dear {{professorTitle}} {{professorLastName}},

I am writing to express my strong interest in your research on {{researchArea}} at {{university}}. I recently read your paper "{{publication}}" and found the approach to {{researchArea}} particularly compelling.

My name is {{userName}}, and I am currently {{userBackground}}. I hold a degree in {{userField}} and have experience in {{userSkills}}.

I am keen to pursue a {{level}} in {{department}} and believe your {{labName}} would be an excellent fit for my research interests. I would be grateful for the opportunity to discuss potential supervision or collaboration.

I have attached my CV and transcripts for your reference.

Thank you for your time and consideration.

Best regards,
{{userName}}`,
    },
    {
        id: "phd-inquiry",
        name: "PhD Position Inquiry",
        category: "phd-inquiry",
        subject: "PhD Opportunity Inquiry: {{department}} at {{university}}",
        body: `Dear {{professorTitle}} {{professorLastName}},

I am a prospective PhD applicant interested in joining {{university}}'s {{department}} department. Your work on {{researchArea}}, especially "{{publication}}", aligns closely with my research goals.

My background includes {{userBackground}}, with particular focus on {{userSkills}}. I am eager to contribute to {{labName}} and develop my expertise under your supervision.

Could you let me know if you are accepting new PhD students for the upcoming cycle? I would welcome any guidance on the application process or funding opportunities.

I am happy to share my CV, research proposal, or any other materials at your convenience.

Kind regards,
{{userName}}`,
    },
    {
        id: "masters-inquiry",
        name: "Masters Supervision Request",
        category: "masters-inquiry",
        subject: "Masters Research Supervision: {{researchArea}}",
        body: `Dear {{professorTitle}} {{professorLastName}},

I am applying to the {{level}} programme in {{department}} at {{university}} and am looking for a research supervisor whose interests align with mine.

Your research on {{researchArea}} is exactly the direction I hope to pursue. My background in {{userField}} and experience with {{userSkills}} have prepared me to contribute meaningfully to research in this area.

Would you be open to a brief conversation about potential supervision? I am flexible on project scope and happy to align with your current research priorities.

Thank you for considering my request.

Best regards,
{{userName}}`,
    },
    {
        id: "follow-up",
        name: "Follow-Up Email",
        category: "follow-up",
        subject: "Re: {{previousSubject}}",
        body: `Dear {{professorTitle}} {{professorLastName}},

I hope this message finds you well. I wrote to you on {{previousDate}} regarding my interest in {{researchArea}} and potential {{level}} opportunities in your group.

I understand you have a busy schedule, so I wanted to follow up briefly. My interest in {{labName}} remains strong, and I would be grateful for any guidance you could offer, even if there are no current openings.

Thank you again for your time.

Best regards,
{{userName}}`,
    },
    {
        id: "funding-question",
        name: "Funding Availability Inquiry",
        category: "funding-question",
        subject: "Funding Inquiry: {{level}} in {{department}}",
        body: `Dear {{professorTitle}} {{professorLastName}},

I am a prospective {{level}} student interested in {{researchArea}} at {{university}}. Before I submit my formal application, I wanted to ask about funding availability.

Are there currently funded positions in {{labName}}, or could you recommend any scholarships or assistantships I should apply for alongside my programme application?

My background is in {{userField}}, and I have experience in {{userSkills}}. I believe I could be a strong candidate for any research-related funding.

I appreciate any information you can share.

Kind regards,
{{userName}}`,
    },
];

export const researchAreaOptions = [
    "All areas",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Robotics",
    "Quantum Computing",
    "Data Analytics",
    "Public Health",
    "Environmental Science",
    "Renewable Energy",
    "Software Engineering",
    "Mathematics",
    "Drug Delivery Systems",
    "Development Economics",
    "Sustainability",
];
