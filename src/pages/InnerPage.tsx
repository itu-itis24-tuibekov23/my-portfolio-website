// src/components/InnerPage.tsx
import { useState, useEffect, useRef } from 'react';
import '../styles/InnerPage.scss';

// Import profile image for InnerPage
import sanzharProfileImage from '/Sanzhar_Tuibekovv.jpg'; // Path to profile image in public folder

// Define types for your data for better TypeScript checking
interface Education {
  date: string;
  title: string;
  description: string;
  additional?: string; // Optional field for "1st place..."
}

interface Skill {
  name: string;
  range: number;
}

// Define type for portfolio items
interface PortfolioItem {
  title: string;
  description: string;
  link: string;
  category: string;
}

function InnerPage() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  // State for fetched data, explicitly typed
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingEducations, setLoadingEducations] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [errorEducations, setErrorEducations] = useState<string | null>(null);
  const [errorSkills, setErrorSkills] = useState<string | null>(null);

  // New state for showing/hiding skills form
  const [showSkillsForm, setShowSkillsForm] = useState(false);

  // State for form inputs (no Formik yet)
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillRange, setNewSkillRange] = useState('');


  // Memoize sectionRefs to prevent the useEffect dependency warning
  const sectionRefs = useRef({
    about: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    contacts: useRef<HTMLElement>(null),
    feedback: useRef<HTMLElement>(null),
  }).current;

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Handler for adding a new skill (basic for now)
  const handleAddSkill = async () => {
    // Basic validation
    if (!newSkillName.trim() || !newSkillRange.trim()) {
      alert('Skill name and range are required!'); // Using alert temporarily, will replace with modal later
      return;
    }
    const rangeAsNumber = parseInt(newSkillRange);
    if (isNaN(rangeAsNumber) || rangeAsNumber < 0 || rangeAsNumber > 100) {
      alert('Skill range must be a number between 0 and 100!'); // Using alert temporarily
      return;
    }

    setLoadingSkills(true); // Indicate loading while adding skill
    setErrorSkills(null);

    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newSkillName, range: rangeAsNumber }),
      });

      if (!response.ok) {
        // Attempt to read error message from response
        const errorData = await response.json();
        throw new Error(errorData.errors ? errorData.errors.join(', ') : `HTTP error! status: ${response.status}`);
      }

      // Re-fetch skills to update the list after adding
      const updatedData = await fetch('/api/skills').then(res => res.json());
      setSkills(updatedData.skills);
      setNewSkillName(''); // Clear form fields
      setNewSkillRange('');
      setShowSkillsForm(false); // Hide form after successful submission
    } catch (error) {
      console.error("Error adding skill:", error);
      setErrorSkills(error.message);
    } finally {
      setLoadingSkills(false);
    }
  };


  // Fetch Educations
  useEffect(() => {
    setLoadingEducations(true);
    setErrorEducations(null);
    fetch("/api/educations")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setEducations(data.educations);
      })
      .catch((error) => {
        console.error("Error fetching educations:", error);
        setErrorEducations(error.message);
      })
      .finally(() => {
        setLoadingEducations(false);
      });
  }, []);

  // Fetch Skills
  useEffect(() => {
    setLoadingSkills(true);
    setErrorSkills(null);
    fetch("/api/skills")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSkills(data.skills);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
        setErrorSkills(error.message);
      })
      .finally(() => {
        setLoadingSkills(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Adjusted threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const portfolioItems: PortfolioItem[] = [
    {
      title: 'React SPA for Course Management',
      description: 'Developed a Single-Page Application (SPA) for course management using React. This project features a robust authentication system, allowing users to register, log in, and manage courses. Implemented full CRUD (Create, Read, Update, Delete) operations for courses, interacting seamlessly with a RESTful API. Focused on a responsive user interface and efficient state management for a smooth user experience.',
      link: 'https://gitlab.com/me1493243/courses-app',
      category: 'Code',
    },
    {
      title: 'JavaScript Utilities & Archive',
      description: 'A collection of small tasks and practical utilities built entirely with vanilla JavaScript. This archive demonstrates proficiency in core JavaScript concepts, including DOM manipulation, event handling, asynchronous operations, and data structures. Each utility is designed to solve a specific problem, showcasing clean and efficient code.',
      link: 'https://gitlab.com/me1493243/zip-archive',
      category: 'Code',
    },
    {
      title: 'Interactive JavaScript Practice Projects',
      description: 'A comprehensive collection of interactive exercises and projects built using pure JavaScript, without reliance on external libraries. This repository highlights a strong understanding of fundamental JavaScript concepts, including working with the Document Object Model (DOM), handling various events, and implementing dynamic user interfaces. Each project focuses on practical application of learned concepts.',
      link: 'https://github.com/itu-itis24-tuibekov23/info-systems-project',
      category: 'Code',
    },
    {
      title: 'Canvas-based Mini Game in JS',
      description: 'A simple yet engaging mini-game developed using vanilla JavaScript, leveraging the HTML Canvas API for graphics rendering. This project demonstrates understanding of game development principles suchs as collision detection, animation loops, and timer management. It’s a clean implementation focusing on core JavaScript mechanics without external frameworks.',
      link: 'https://github.com/itu-itis24-tuibekov23/info-systems-project',
      category: 'Code',
    },
    {
      title: 'Cross-Platform News Application (Web & Mobile)',
      description: 'Developed a comprehensive news application as a test assignment, targeting both web and mobile platforms. Key features include biometric authentication for secure access, file upload capabilities, and integrated WebView for displaying external content. The application also includes robust analytics and statistics tracking. Built with a focus on modern development practices for a seamless cross-platform experience.',
      link: 'https://github.com/itu-itis24-tuibekov23/news-app-project',
      category: 'Code',
    },
  ];

  const filteredItems = filter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="inner-page-container">
      <button onClick={toggleSidebar}
      style={{
        backgroundColor: '#f8f9fa',
        color: '#333',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        borderRadius: '5px',
      }}>
        {isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <aside className={`sidebar ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
        <div className="profile-section">
          <div className="profile-image-container">
            <img
              src={sanzharProfileImage} // Use the imported image variable
              alt="Your Profile"
              className="profile-image"
            />
          </div>
          <h2>Sanzhar Tuibekov</h2>
        </div>
        <nav className="main-navigation">
          <ul>
            <li>
              <a href="#about" className={activeSection === 'about' ? 'active' : ''}>👤 About me</a>
            </li>
            <li>
              <a href="#education" className={activeSection === 'education' ? 'active' : ''}>🎓 Education</a>
            </li>
            <li>
              <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>💼 Experience</a>
            </li>
            <li>
              <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>📊 Skills</a>
            </li>
            <li>
              <a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''}>🖼️ Portfolio</a>
            </li>
            <li>
              <a href="#contacts" className={activeSection === 'contacts' ? 'active' : ''}>📞 Contacts</a>
            </li>
            <li>
              <a href="#feedback" className={activeSection === 'feedback' ? 'active' : ''}>💬 Feedback</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <section id="about" ref={sectionRefs.about}>
          <h2>About Me</h2>
          <p>
            Hello! I'm Sanzhar, a passionate programmer with a creative mindset
            and a drive for innovation. I enjoy tackling complex problems and
            building elegant, user-friendly solutions. With a background in
            Front-End Development and Data Engineering, I'm constantly learning
            and exploring new technologies. Outside of coding, I'm also an
            athlete and an active hiker, which keeps me energized and focused.
            I'm excited about the opportunity to bring my skills and enthusiasm
            to challenging projects.
          </p>
        </section>

        <section id="education" ref={sectionRefs.education}>
          <h2>Education</h2>
          {loadingEducations && <p>Loading educations...</p>}
          {errorEducations && <p style={{ color: 'red' }}>Error: {errorEducations}</p>}
          {!loadingEducations && !errorEducations && educations.length === 0 && <p>No education data found.</p>}
          {!loadingEducations && !errorEducations && educations.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.title}</h3>
              <p>{edu.description}</p>
              <p>{edu.date}</p>
              {edu.additional && <p>{edu.additional}</p>}
            </div>
          ))}
        </section>

        <section id="experience" ref={sectionRefs.experience}>
          <h2>Experience</h2>
          <div className="experience-item">
            <h3>Front-End Developer Intern</h3>
            <p>Bold Solutions</p>
            <p>June 2024 – August 2024</p>
            <ul>
              <li>
                Assisted in building and maintaining responsive web interfaces
                using React and Tailwind CSS.
              </li>
              <li>
                Collaborated with the design team to implement Figma-based UI
                layouts and animations.
              </li>
              <li>
                Optimized component rendering and improved app performance by
                20% through state management improvements.
              </li>
              <li>
                Participated in daily standups and sprint planning as part of an
                Agile development team.
              </li>
            </ul>
          </div>
        </section>

        <section id="skills" ref={sectionRefs.skills}>
          <h2>Skills</h2>
          <p>Proficiency scale: (1) Beginner to (5) Expert</p>
          {/* Open Edit button */}
          <div className="edit-skills-header">
            <h3>Manage Skills</h3>
            <button onClick={() => setShowSkillsForm(!showSkillsForm)} className="open-edit-button">
              {showSkillsForm ? 'Close Edit' : 'Open Edit'}
            </button>
          </div>

          {/* Skills Form (conditionally rendered) */}
          {showSkillsForm && (
            <div className="skills-form-container">
              <div className="form-group">
                <label htmlFor="skillName">Skill name</label>
                <input
                  type="text"
                  id="skillName"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Enter skill name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="skillRange">Skill range</label>
                <input
                  type="number"
                  id="skillRange"
                  value={newSkillRange}
                  onChange={(e) => setNewSkillRange(e.target.value)}
                  placeholder="Enter skill range (0-100)"
                />
              </div>
              <button onClick={handleAddSkill} className="add-skill-button">
                Add skill
              </button>
            </div>
          )}

          {loadingSkills && <p>Loading skills...</p>}
          {errorSkills && <p style={{ color: 'red' }}>Error: {errorSkills}</p>}
          {!loadingSkills && !errorSkills && skills.length === 0 && <p>No skills data found.</p>}
          {!loadingSkills && !errorSkills && (
            <div className="skills-display-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-label">
                    {skill.name} <span>{skill.range}%</span>
                  </span>
                  <div className="skill-level-bar">
                    <div className="skill-level-fill" style={{ width: `${skill.range}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="skill-scale">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </section>

        <section id="portfolio" ref={sectionRefs.portfolio}>
          <h2>Portfolio</h2>
          <div className="portfolio-filters">
            <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
            <button className={filter === 'Code' ? 'active' : ''} onClick={() => setFilter('Code')}>Code</button>
          </div>
          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className="portfolio-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><a href={item.link} target="_blank" rel="noopener noreferrer">Code Repository</a></p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacts" ref={sectionRefs.contacts}>
          <h2>Contacts</h2>
          <p>Feel free to reach out directly or use the form below:</p>
          <ul>
            <li>
              <strong>Phone:</strong> +7 705 388 5779 (WhatsApp)
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:tuybekov@bk.ru">tuybekov@bk.ru</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/sanzhar-tuibekov-92a097331" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/itu-itis24-tuibekov23" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
          </ul>

          <div className="contact-form-container">
            <h3>Send a Message</h3>
            <form action="https://formspree.io/f/mzzgzoyvv" method="POST" className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="_replyto" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </section>

        <section id="feedback" ref={sectionRefs.feedback}>
          <h2>Feedback</h2>
          <div className="feedback-item">
            <p>
              "Sanzhar is a highly dedicated and detail-oriented developer. His ability to quickly grasp complex concepts and deliver clean, efficient code is truly impressive. He was a valuable asset to our team."
            </p>
            <p>- A. Developer, Senior Software Engineer</p>
          </div>
          <div className="feedback-item">
            <p>
              "Working with Sanzhar on the [mention a type of project if you have a specific one in mind, e.g., 'front-end'] aspect of our project was a pleasure. He consistently delivered high-quality work and showed great initiative in solving challenges."
            </p>
            <p>- B. Project Lead, Tech Solutions Inc.</p>
          </div>
          <div className="feedback-item">
            <p>
              "Sanzhar's enthusiasm for learning and his strong problem-solving skills make him stand out. He's always eager to take on new challenges and contributes positively to any team environment."
            </p>
            <p>- C. Mentor, Front-End Development Program</p>
          </div>
        </section>

        {showBackToTop && (
          <button onClick={scrollToTop} className="back-to-top">
            ^ Back to Top
          </button>
        )}
      </main>
    </div>
  );
}

export default InnerPage;
