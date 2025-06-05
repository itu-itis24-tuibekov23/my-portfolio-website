import React, { useState, useEffect, createRef } from 'react';
import '../styles/InnerPage.scss';
import profileImage from '../assets/Sanzhar_Tuibekovv.jpg'; // Ensure this path is correct for your image

function InnerPage() {
  const sectionRefs = {
    feedback: createRef<HTMLElement>(),
    contacts: createRef<HTMLElement>(),
    skills: createRef<HTMLElement>(), // Added skills property
  };
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const portfolioItems = [
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
      link: 'https://gitlab.com/me1493243/set-up-a-project-and-its-dependencies',
      category: 'Code',
    },
    {
      title: 'Canvas-based Mini Game in JS',
      description: 'A simple yet engaging mini-game developed using vanilla JavaScript, leveraging the HTML Canvas API for graphics rendering. This project demonstrates understanding of game development principles such as collision detection, animation loops, and timer management. It’s a clean implementation focusing on core JavaScript mechanics without external frameworks.',
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
              src={profileImage}
              alt="Your Profile"
              className="profile-image"
            />
          </div>
          <h2>Sanzhar Tuibekov</h2>
        </div>
        <nav className="main-navigation">
          <ul>
            <li>
              <a href="#about">👤 About me</a>
            </li>
            <li>
              <a href="#education">🎓 Education</a>
            </li>
            <li>
              <a href="#experience">💼 Experience</a>
            </li>
            <li>
              <a href="#skills">📊 Skills</a>
            </li>
            <li>
              <a href="#portfolio">🖼️ Portfolio</a>
            </li>
            <li>
              <a href="#contacts">📞 Contacts</a>
            </li>
            <li>
              <a href="#feedback">💬 Feedback</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <section id="about">
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
        <section id="education">
          <h2>Education</h2>
          <div className="education-item">
            <h3>Istanbul Technical University</h3>
            <p>Bachelors, AI and Data Engineering</p>
            <p>2024 - 2028</p>
            <p>1st place in International Robotics Competition</p>
          </div>
        </section>
        <section id="experience">
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
          <div className="skills-container">
            <div className="skill-item">
              <div className="skill-label">HTML</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-label">CSS / Tailwind CSS</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-label">JavaScript (ES6+)</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-label">React</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-label">Git & GitHub</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="skill-item">
              <div className="skill-label">Figma</div>
              <div className="skill-level-bar">
                <div className="skill-level-fill" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          <div className="skill-scale">
            <span>Beginner</span>
            <span>Proficient</span>
            <span>Expert</span>
            <span>Master</span>
          </div>
        </section>


        <section id="portfolio">
          <h2>Portfolio</h2>
          <div className="portfolio-filters">
            <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
            <button className={filter === 'Code' ? 'active' : ''} onClick={() => setFilter('Code')}>Code</button>
            {/* If you have UI projects, add a UI button here */}
            {/* <button className={filter === 'UI' ? 'active' : ''} onClick={() => setFilter('UI')}>UI</button> */}
          </div>
          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className="portfolio-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><a href={item.link}>Code Repository</a></p> {/* Changed text to be more explicit */}
              </div>
            ))}
          </div>
        </section>

        <section id="contacts" ref={sectionRefs.contacts}>
          <h2>Contacts</h2>
          <p>Feel free to reach out!</p>
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
            {/* IMPORTANT: Replace 'YOUR_FORMSPREE_FORM_ID' with your actual Formspree form ID */}
            <form action="https://formspree.io/f/mrbkbjwd" method="POST" className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="_replyto" required /> {/* _replyto for Formspree */}
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
            "Sanzhar is a highly dedicated and detail-oriented developer. 
            His ability to quickly grasp complex concepts and deliver clean, efficient code is truly impressive. He was a valuable asset to our team."
            </p>
            <p>- Developer, Senior Software Engineer</p>
          </div>
          <div className="feedback-item">
            <p>
            "Working with Sanzhar on the front-end aspect of our project was a pleasure.
            He consistently delivered high-quality work and showed great initiative in solving challenges."
            </p>
            <p>- Project Lead, Tech Solutions Inc.</p>
          </div>
          <div className="feedback-item">
            <p>
              "Sanzhar's enthusiasm for learning and his strong problem-solving skills make him stand out. 
              He's always eager to take on new challenges and contributes positively to any team environment."
            </p>
            <p>- Mentor, Front-End Development Program</p>
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