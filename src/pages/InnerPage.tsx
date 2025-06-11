// InnerPage.tsx — Final version with Formik validation for Skills Form
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchEducations } from '../store/educationSlice';
import { fetchSkills } from '../store/skillsSlice';
import sanzharProfileImage from '/Sanzhar_Tuibekovv.jpg';
import '../styles/InnerPage.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function InnerPage() {
  const dispatch = useDispatch();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showSkillsForm, setShowSkillsForm] = useState(false);

  const educations = useSelector((state: RootState) => state.education.items);
  const loadingEducations = useSelector((state: RootState) => state.education.status === 'loading');
  const errorEducations = useSelector((state: RootState) => state.education.error);

  const skills = useSelector((state: RootState) => state.skills.items);
  const loadingSkills = useSelector((state: RootState) => state.skills.status === 'loading');
  const errorSkills = useSelector((state: RootState) => state.skills.error);

  const sectionRefs = useRef({
    about: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    contacts: useRef<HTMLElement>(null),
    feedback: useRef<HTMLElement>(null),
  }).current;

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  useEffect(() => {
    dispatch(fetchEducations());
    dispatch(fetchSkills());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: { name: '', range: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Skill name is required'),
      range: Yup.number()
        .typeError('Skill range must be a number')
        .min(10, 'Skill range must be greater than or equal to 10')
        .max(100, 'Skill range must be less than or equal to 100')
        .required('Skill range is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: values.name, range: Number(values.range) }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.errors ? errorData.errors.join(', ') : `HTTP error! status: ${response.status}`);
        }
        dispatch(fetchSkills());
        resetForm();
        setShowSkillsForm(false);
      } catch (err: any) {
        alert(err.message);
      }
    },
  });

  const portfolioItems = [];
  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(i => i.category === filter);

  return (
    <div className="inner-page-container">
      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills}>
        <h2>Skills</h2>
        <p>Proficiency scale: (1) Beginner to (5) Expert</p>
        <div className="edit-skills-header">
          <h3>Manage Skills</h3>
          <button onClick={() => setShowSkillsForm(!showSkillsForm)} className="open-edit-button">
            {showSkillsForm ? 'Close Edit' : 'Open Edit'}
          </button>
        </div>

        {showSkillsForm && (
          <form onSubmit={formik.handleSubmit} className="skills-form-container">
            <div className="form-group">
              <label htmlFor="name">Skill name</label>
              <input
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="range">Skill range</label>
              <input
                id="range"
                type="number"
                {...formik.getFieldProps('range')}
              />
              {formik.touched.range && formik.errors.range && (
                <div className="error">{formik.errors.range}</div>
              )}
            </div>

            <button type="submit" disabled={!formik.isValid || !formik.dirty} className="add-skill-button">
              Add skill
            </button>
          </form>
        )}

        {loadingSkills && <p>Loading skills...</p>}
        {errorSkills && <p style={{ color: 'red' }}>Error: {errorSkills}</p>}
        {!loadingSkills && !errorSkills && (
          <div className="skills-display-container">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-label">{skill.name} <span>{skill.range}%</span></span>
                <div className="skill-level-bar">
                  <div className="skill-level-fill" style={{ width: `${skill.range}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default InnerPage;
