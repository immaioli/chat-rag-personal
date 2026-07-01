// DATA STRUCTURE: Comprehensive knowledge base chunks for the RAG system
export const resumeChunks = [
    {
        id: 'profile_intro',
        content: `My name is Irineu Marcelo Maioli. 
        I am a highly skilled Full Stack Developer with over 15 years of experience in software engineering and technology solutions. 
        Born in Brazil and raised in Paraguay until the age of 15, I possess a strong multicultural background and adaptability. 
        Currently based in Campo Mourão, Paraná, Brazil, I combine deep technical expertise with strategic business thinking to deliver impactful software. 
        Family is my core foundation; I am happily married and a proud father to my daughter, Isis.`,
        metadata: { category: 'Personal Profile', priority: 1 }
    },
    {
        id: 'academic_background',
        content: `My academic background uniquely bridges technology and business strategy. 
        I hold a Technologist degree in Analysis and Systems Development, establishing my core engineering foundation. 
        To align technical execution with market demands and leadership, I earned an MBA in Strategic Management of National and International Sales. 
        Furthermore, keeping pace with mobile-first trends, I completed a Postgraduate degree in Mobile Application Development.`,
        metadata: { category: 'Education', priority: 2 }
    },
    {
        id: 'core_competencies',
        content: `My technical expertise is deeply rooted in the modern JavaScript and TypeScript ecosystems. 
        On the front-end, I build scalable interfaces using React.js and Next.js. 
        For mobile, I am proficient in React Native and Expo. 
        My back-end architecture relies on Node.js, Prisma ORM, and PostgreSQL. 
        Recently, I have heavily focused on Artificial Intelligence, mastering the Vercel AI SDK, LangChain.js, and Retrieval-Augmented Generation (RAG) pipelines using vector databases like pgvector. 
        I also ensure code quality and security using Docker, Auth.js, Vitest, and Playwright for End-to-End testing.`,
        metadata: { category: 'Technical Skills', priority: 1 }
    },
    {
        id: 'portfolio_projects',
        content: `My GitHub portfolio (immaioli) highlights my focus on AI and modern web/mobile development. 
        My main projects, in order of relevance, include: 
        1) 'chat-rag-personal' (maioli.dev), a sophisticated Next.js App Router portfolio featuring a custom AI assistant powered by a 
        native RAG pipeline (pgvector/PostgreSQL), multi-language support, and comprehensive testing (Vitest/Playwright). 
        2) 'optics-idp', an Intelligent Document Processing solution. 
        3) 'langchain-js-genai-projects', a showcase of Generative AI applications built with LangChain in the JavaScript ecosystem. 
        4) 'fullstackRecipeApp', a complete mobile solution developed with React Native, Expo, and a robust Node.js backend.`,
        metadata: { category: 'Projects', priority: 2 }
    },
    {
        id: 'hobbies_lifestyle',
        content: `Outside the professional realm, I maintain an active and fulfilling lifestyle. 
        I regularly practice CrossFit to maintain physical and mental resilience. 
        I am also learning to play the guitar, focusing particularly on English rock songs with chords. 
        Sports-wise, I am a passionate supporter of the Corinthians soccer club. 
        Above all, my absolute favorite leisure activity is spending quality time with my family, especially taking my daughter, Isis, to play and have fun in local parks.`,
        metadata: { category: 'Hobbies', priority: 3 }
    }
]

export default resumeChunks