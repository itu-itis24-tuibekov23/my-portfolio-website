import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      education: Model,
      skill: Model,
    },

    seeds(server) {
      server.create('education', {
        date: '2024-2028',
        title: 'Istanbul Technical University',
        description: 'Bachelors, AI and Data Engineering',
        additional: '1st place in International Robotics Competition', // Using the additional field
      });
      server.create('education', {
        date: '2020-2024',
        title: 'Another University',
        description: 'Bachelor of Computer Science',
      });
      // Add more education data based on your UI screenshot

      server.create('skill', { name: 'HTML', range: 100 });
      server.create('skill', { name: 'CSS / Tailwind CSS', range: 85 });
      server.create('skill', { name: 'JavaScript (ES6+)', range: 90 });
      server.create('skill', { name: 'React', range: 75 });
      server.create('skill', { name: 'Git & GitHub', range: 90 });
      server.create('skill', { name: 'Figma', range: 90 });
      // Add more skills based on your UI screenshot
    },

    routes() {
      this.namespace = 'api'; // All routes will be prefixed with /api
      this.timing = 3000; // Global timing for all routes (3000 ms = 3 seconds)

      this.get('/educations', (schema, request) => {
        return schema.educations.all();
      });

      this.get('/skills', (schema, request) => {
        return schema.skills.all();
      });

      this.post('/skills', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        // Basic validation for the POST request if needed, but Formik will handle frontend validation
        if (typeof attrs.name !== 'string' || typeof attrs.range !== 'number') {
            return new Response(400, {}, { errors: ['Invalid skill data'] });
        }
        const newSkill = schema.skills.create(attrs);
        return newSkill; // Mirage usually returns the created model directly
      });
    },
  });

  return server;
}

// Start the server only in development environment
if (process.env.NODE_ENV === 'development') {
  makeServer();
}