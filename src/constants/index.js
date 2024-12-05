import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    Tata,
    Accenture,
    jobit,
    tripguide,
    threejs,
    Java,
    Python,
    Postgresql,
    SecondHand,
    AIS,
    Waste,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Full Stack Developer",
      icon: mobile,
    },
    {
      title: "AI/ML Developer",
      icon: backend,
    },
    {
      title: "3D Visualization",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: Java,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: Python,
    },
    {
      name: "docker",
      icon: Postgresql,
    },
  ];
  
  const experiences = [
    {
      title: "Data Visualization Intern",
      company_name: "TATA Virtual Internship Program",
      icon: Tata,
      iconBg: "#383E56",
      date: "Ongoing",
      points: [
        "Gained expertise in data analysis and transforming complex data into visual insights.",
        "Developed skills in data visualization tools like Power BI and Tableau.",
        "Worked on creating interactive dashboards to help stakeholders make informed decisions.",
        "Collaborated with cross-functional teams to improve data-driven decision-making processes.",
      ],
     },
    {
      title: "Software Engineering Intern",
      company_name: "Accenture Virtual Internship Program",
      icon: Accenture,
      iconBg: "#E6DEDD",
      date: "About to begin",
      points: [
        "Developed skills in software architecture, working on scalable solutions.",
        "Gained hands-on experience with security practices and programming.",
        "Applied Agile methodologies in team-based development environments.",
        "Enhanced abilities in testing and debugging real-world software projects.",
      ],
    },
    // {
    //   title: "Web Developer",
    //   company_name: "Shopify",
    //   icon: shopify,
    //   iconBg: "#383E56",
    //   date: "Jan 2022 - Jan 2023",
    //   points: [
    //     "Developing and maintaining web applications using React.js and other related technologies.",
    //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
    //     "Implementing responsive design and ensuring cross-browser compatibility.",
    //     "Participating in code reviews and providing constructive feedback to other developers.",
    //   ],
    // },
    // {
    //   title: "Full stack Developer",
    //   company_name: "Meta",
    //   icon: meta,
    //   iconBg: "#E6DEDD",
    //   date: "Jan 2023 - Present",
    //   points: [
    //     "Developing and maintaining web applications using React.js and other related technologies.",
    //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
    //     "Implementing responsive design and ensuring cross-browser compatibility.",
    //     "Participating in code reviews and providing constructive feedback to other developers.",
    //   ],
    // },
  ];
  
  // const testimonials = [
  //   {
  //     testimonial:
  //       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
  //     name: "Sara Lee",
  //     designation: "CFO",
  //     company: "Acme Co",
  //     image: "https://randomuser.me/api/portraits/women/4.jpg",
  //   },
  //   {
  //     testimonial:
  //       "I've never met a web developer who truly cares about their clients' success like Rick does.",
  //     name: "Chris Brown",
  //     designation: "COO",
  //     company: "DEF Corp",
  //     image: "https://randomuser.me/api/portraits/men/5.jpg",
  //   },
  //   {
  //     testimonial:
  //       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
  //     name: "Lisa Wang",
  //     designation: "CTO",
  //     company: "456 Enterprises",
  //     image: "https://randomuser.me/api/portraits/women/6.jpg",
  //   },
  // ];
  
  const projects = [
    {
      name: "SecondHand Marketplace for Students",
      description:
        "Welcome to Second Hand, the eco-friendly e-commerce platform designed exclusively for college students! With our platform, students can buy and sell second-hand goods among themselves, creating a sustainable marketplace within their campus. This initiative not only promotes reusing products but also significantly reduces transportation costs as everything is exchanged within the campus itself.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Mongodb",
          color: "green-text-gradient",
        },
        {
          name: "Node",
          color: "pink-text-gradient",
        },
      ],
      image: SecondHand,
      source_code_link: "https://github.com/AdityaRathod10/SecondHand-Marketplace",
    },
    {
      name: "Early Oil spill detection",
      description:
        "The AIS and SAR-based Oil Spill Detection project combines AIS(Automatic Identification System) ship tracking data and SAR(Synthetic Aperture Radar) satellite imagery to detect and monitor oil spills in real-time. AIS data helps track ship locations, while SAR imagery identifies surface anomalies linked to spills. By correlating these data sources, the project identifies responsible ships and aids in rapid response to marine environmental hazards.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "Fastapi",
          color: "green-text-gradient",
        },
        {
          name: "React",
          color: "pink-text-gradient",
        },
        {
          name: "Node",
          color: "green-text-gradient",
        },
      ],
      image: AIS,
      source_code_link: "https://github.com/ChaitanyaRele/Oil-Spill-detection-esa_snappy",
    },
    {
      name: "Waste Detection",
      description:
        "The Waste Detection Project utilizes a YOLOv8 pretrained object detection model to identify waste in real-time. It uses OpenCV for accessing camera inputs and capturing images. Data is stored and managed through PostgreSQL, with a custom Tkinter GUI providing an interactive interface for visualizing the detected waste.The system efficiently combines machine learning, computer vision, and dbms to detect and track waste, providing a solution for real-time waste monitoring and management.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "OpenCV",
          color: "green-text-gradient",
        },
        {
          name: "PostgreSql",
          color: "pink-text-gradient",
        },
      ],
      image: Waste,
      source_code_link: "https://github.com/AdityaRathod10/Waste-Detection",
    },
  ];
  
  export { services, technologies, experiences, projects };