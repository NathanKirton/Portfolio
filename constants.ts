/**
 * Portfolio Projects & Skills Data
 * Central data store for all expedition (project) information
 * 
 * Each project includes:
 * - Basic metadata (id, date, tag, title)
 * - Description: Brief overview of the project
 * - Tools: Technologies and frameworks used (organized by category)
 * - Overview: Detailed project description (supports both string and array)
 * 
 * To edit project content: Update the description or overview.sections fields below
 */

import { Expedition } from './types';

export const EXPEDITIONS: Expedition[] = [
  {
    id: 1,
    date: 'OCT 2025',
    tag: 'Project 01',
    title: 'Parcel Management System',
    description: 'A fully containerised reactive parcel‑tracking system using Node.js, MongoDB and RabbitMQ, with asynchronous status updates and decoupled microservices. It provides real‑time parcel creation, querying and updates through a web interface backed by an event‑driven architecture.',
    imageUrl: '/Project Screenshots/Parcel Tracking.jpg',
    side: 'right',
    tools: [
      {
        name: 'Frontend',
        items: ['HTML', 'CSS', 'JavaScript', 'AJAX (asynchronous API communication)']
      },
      {
        name: 'Backend',
        items: ['Node.js', 'Express.js', 'RxJS (reactive programming, retry logic)', 'REST API architecture', 'Mongoose (MongoDB object modelling)']
      },
      {
        name: 'Deployment',
        items: ['Docker', 'Docker Compose (service orchestration, networking, health checks)']
      },
      {
        name: 'Additional / Infrastructure',
        items: ['MongoDB (database)', 'RabbitMQ (message broker using AMQP)', 'Prometheus-compatible metrics endpoint (/metrics)', 'CORS configuration', 'Health checks for container startup reliability']
      }
    ],
    overview: {
      sections: 'Add your overview text here. You can paste any text you want into this section.'
    }
  },
  {
    id: 3,
    date: 'JAN 2026',
    tag: 'Move2Earn Project • Project 03',
    title: 'Move2Earn Mobile App',
    description: 'Move2Earn is a gamified fitness and screen-time management system that converts real physical activity into earned gaming minutes. Parents manage limits, rewards, and streak settings through a dedicated dashboard, while children track their progress, start timers, and upload activities. The platform integrates with Strava, uses Flask and MongoDB on the backend, and encourages healthier habits by linking movement to meaningful digital rewards.',
    imageUrl: '/Icons/Move2EarnLogo.png',
    side: 'left',
    tools: [
      {
        name: 'Frontend',
        items: ['HTML5 – structure of all pages', 'CSS3 – styling, layout, responsive design', 'JavaScript (Vanilla JS) – dynamic updates, timer logic, auto‑refresh', 'Figma – initial UI/UX design and wireframes']
      },
      {
        name: 'Backend',
        items: ['Python – core programming language', 'Flask – web framework for routing, sessions, authentication, API endpoints', 'Gunicorn – WSGI server for production', 'Flask‑Session – secure server‑side session management', 'bcrypt – password hashing and authentication security']
      },
      {
        name: 'Database',
        items: ['MongoDB Atlas – cloud‑hosted NoSQL database', 'PyMongo – Python driver for MongoDB', 'Document‑based schema for users, activities, streaks, timers, messages']
      },
      {
        name: 'External Integrations',
        items: ['Strava API – OAuth authentication and activity data retrieval', 'OAuth 2.0 – secure token‑based login for Strava']
      },
      {
        name: 'Deployment & DevOps',
        items: ['Docker – containerisation for consistent runtime environment', 'Render – cloud hosting, auto‑deploy, SSL, health checks', 'GitHub – version control and repository management', 'GitHub Webhooks – automated CI/CD deployment to Render']
      },
      {
        name: 'Additional Tools',
        items: ['VS Code – primary development environment', 'Postman / Thunder Client – API testing', 'Python Virtual Environment (venv) – dependency isolation', 'Browser DevTools – debugging frontend behaviour', 'Agile tools – sprint planning, retrospectives, Gantt charts, time tracking']
      }
    ],
  overview: {
      sections: 'Move2Earn is a gamified fitness and screen‑time management platform designed to encourage healthier habits in children by linking physical activity to earned gaming time. The system allows parents to set daily limits, reward positive behaviour, and monitor progress, while children earn minutes through real‑world movement tracked either manually or via Strava. By converting activity into meaningful digital rewards, Move2Earn promotes a balanced lifestyle and supports families in managing screen time more effectively.\n\nThe platform is built using a Flask backend, MongoDB Atlas for data storage, and a lightweight HTML, CSS, and JavaScript frontend. This architecture enables secure authentication, real‑time updates, and flexible data handling for activities, streaks, timers, and parent‑child relationships. Integration with the Strava API allows verified fitness data to be imported directly into the system, ensuring accuracy and reducing manual input. Docker and Render are used for deployment, providing a consistent runtime environment and automated CI/CD pipeline.\n\nMove2Earn supports two distinct user roles: parents and children. Parents can create and manage child accounts, set daily screen‑time limits, grant bonus minutes, configure streak rewards, and view real‑time usage. Children can track their earned minutes, start and stop gameplay timers, upload activities, and build streaks through consistent movement. The system\'s earned‑minutes algorithm processes distance, duration, intensity, and pace to calculate fair rewards, while streak logic encourages ongoing engagement.\n\nThe project was developed using agile methodology, with weekly sprints, retrospectives, and continuous refinement of both design and functionality. Initial Figma wireframes guided the layout of dashboards and forms, while the final implementation prioritised clarity, usability, and seamless integration with backend logic. Throughout development, emphasis was placed on security, maintainability, and user‑centred design.\n\nOverall, Move2Earn delivers a practical and engaging solution to a modern challenge: helping families balance digital entertainment with physical wellbeing. By transforming movement into a rewarding experience, the system supports healthier routines and empowers parents with meaningful tools to guide their children\'s screen‑time habits.'
    }
  },
  {
    id: 4,
    date: 'FEB 2026',
    tag: 'Project 04 • Website Redesign',
    title: 'Irongate Locksmiths Modern Redesign',
    description: 'Complete redesign of the Irongate Locksmiths website with modern UI/UX, responsive design, smooth animations, and enhanced functionality. Transformed a dated website into a professional, mobile-friendly platform that maintains all original information while improving user experience and conversion rates.',
    imageUrl: '/Project Screenshots/IrongateLocksmiths-LiveDemo.png',
    imageAlt: 'Irongate Locksmiths redesigned homepage showing the live demo hero section and navigation.',
    cardImageUrl: '/Project Screenshots/IrongateLocksmiths-LiveDemo.png',
    cardImageAlt: 'Irongate Locksmiths live demo screenshot.',
    cardImageFit: 'cover',
    galleryImages: [
      {
        src: '/projects/project-4/Irongate Locksmiths/public/branding/irongate-logo-full.svg',
        alt: 'Irongate Locksmiths full company wordmark and shield branding.',
        fit: 'contain',
      },
      {
        src: '/projects/project-4/Irongate Locksmiths/public/branding/irongate-logo-mark.svg',
        alt: 'Irongate Locksmiths shield logo mark used in the redesign.',
        fit: 'contain',
      },
    ],
    side: 'right',
    tools: [
      {
        name: 'Frontend',
        items: ['HTML5 – semantic markup', 'CSS3 – advanced animations, gradients, responsive design', 'Vanilla JavaScript – no dependencies, smooth interactions', 'Font Awesome 6 – professional icon library']
      },
      {
        name: 'Design & UX',
        items: ['Responsive mobile-first design', 'Professional color scheme (Navy, Gold, Red)', 'Smooth scroll animations', 'Interactive hover effects', 'Accessible design principles']
      },
      {
        name: 'Features',
        items: ['Mobile hamburger navigation', 'Service showcase cards', 'Transparent pricing tiers', 'Contact form with validation', 'Testimonials section', 'Call-to-action optimization']
      },
      {
        name: 'Performance',
        items: ['Single-page application', 'Optimized CSS and JavaScript', 'Fast loading times', 'Smooth animations using CSS transforms', 'Intersection Observer for scroll animations']
      }
    ],
    overview: {
      sections: 'Irongate Locksmiths is a 24/7 emergency locksmith service in South Shields, North East England. Their original website, while functional, lacked modern design and user experience elements. This complete redesign transforms the platform into a professional, engaging, and conversion-focused website.\n\nThe new design features a modern aesthetic with a professional color scheme (Dark Navy, Gold accents, and Red CTAs). The layout is fully responsive, working seamlessly on mobile, tablet, and desktop devices. All key information is preserved and presented in a more accessible, visually appealing manner.\n\nKey improvements include: Interactive service cards showcasing the six main service areas, a clear pricing section with featured options, customer testimonials building trust, multiple contact options (phone, email, form, address), and prominent emergency call buttons throughout. The mobile navigation includes a smooth hamburger menu with animated transitions.\n\nAnimations are subtle but effective – elements fade in as you scroll, cards lift on hover, buttons provide visual feedback, and the emergency badge pulses to draw attention. These animations enhance user engagement without being distracting.\n\nThe contact form includes validation and provides immediate feedback. The pricing section clearly displays services and pricing, with the most popular option highlighted. Testimonials from satisfied customers build credibility and trust.\n\nTechnically, the site uses vanilla JavaScript with no external dependencies, ensuring fast loading and minimal overhead. CSS animations use transforms and opacity for optimal performance. The code is well-organized, maintainable, and easily customizable for future updates.\n\nAll original information has been preserved and enhanced: service listings, pricing, company information, contact details, and customer testimonials. The new design transforms this information into an engaging, professional presentation that encourages visitors to take action and contact Irongate Locksmiths for their locksmith needs.'
    }
  },
  {
    id: 5,
    date: 'MAR 2026',
    tag: 'Project 05 • Healthcare Platform',
    title: 'Alderwell Pharmaceuticals Campaign Portal',
    description: 'A role-based pharmaceutical operations platform built with React and Supabase. The application provides authenticated entry into multiple dashboards for compliance review, campaign management, marketing and sales, liaison activity, and broader operational workflows.',
    imageUrl: '/Project Screenshots/Alderwell-Compliance-Portal.svg',
    imageAlt: 'Alderwell Pharmaceuticals compliance reviewer dashboard screenshot.',
    cardImageUrl: '/Project Screenshots/Alderwell-Compliance-Portal.svg',
    cardImageAlt: 'Alderwell Pharmaceuticals compliance reviewer dashboard screenshot.',
    cardImageFit: 'cover',
    demoUrl: 'https://alderwell-pharmaceutical.onrender.com/#/login',
    demoMode: 'iframe',
    demoCredentials: {
      email: 'admin@alderwell.com',
      password: 'AdminAdmin'
    },
    githubRepoUrl: 'https://github.com/NathanKirton/Alderwell-Pharmaceutical',
    side: 'left',
    tools: [
      {
        name: 'Frontend',
        items: ['React', 'React Router with hash-based routing', 'Role-based dashboard architecture', 'Modular CSS component styling']
      },
      {
        name: 'Backend & Data',
        items: ['Supabase authentication', 'Supabase database workflows', 'Protected role routes', 'Live dashboard data and CRUD flows']
      },
      {
        name: 'Platform Experience',
        items: ['Compliance Reviewer dashboard', 'Campaign Management dashboard', 'Marketing & Sales workspace', 'Liaison Officer workflows', 'Authenticated multi-role access control']
      },
      {
        name: 'Deployment',
        items: ['Hosted on Render', 'Public live login environment', 'GitHub source repository', 'Deployed React single-page app']
      }
    ],
    overview: {
      sections: [
        'Alderwell Pharmaceuticals is a role-based web platform designed around day-to-day pharmaceutical operations. From the repository and deployed application, the product includes dedicated dashboard experiences for compliance reviewers, campaign managers, marketing and sales users, liaison officers, and other authenticated roles.',
        'The frontend is built as a React single-page application using hash-based routing, with Supabase supporting authentication and data-driven workflows. The codebase shows live operational features such as material approvals, audit logs, flagged interactions, campaign management, task handling, and reporting views rather than a single static marketing page.',
        'For the portfolio, the demo is now embedded directly inside the project detail page so visitors can interact with the live application in place. The linked repository is also exposed alongside the demo so employers and collaborators can inspect the source structure, role routing, and implementation details.'
      ]
    }
  }
];



// Social links used across the site. Replace these with your real profile URLs.
export const SOCIALS = {
  github: 'https://github.com/NathanKirton',
  linkedin: 'https://www.linkedin.com/in/nathan-kirton-473621352/'
};



