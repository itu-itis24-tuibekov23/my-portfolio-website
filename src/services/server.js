// src/services/server.js
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  // Define and create the mock server
  let server = createServer({
    environment, // Sets environment (development, test, production)

    // Define data models for your mock API
    models: {
      education: Model, // Model for education entries
      skill: Model,     // Model for skill entries
    },

    // Seed initial data when the server starts
    seeds(server) {
      server.create("education", {
        date: "2024 - 2028",
        title: "Istanbul Technical University",
        description: "Bachelors, AI and Data Engineering",
        additional: "1st place in International Robotics Competition" // Add this if you want to use it
      });
      // Add more education entries if needed:
      // server.create("education", { date: "YYYY - YYYY", title: "Another Degree", description: "Another University" });

      server.create("skill", { name: "HTML", range: 100 });
      server.create("skill", { name: "CSS / Tailwind CSS", range: 85 });
      server.create("skill", { name: "JavaScript (ES6+)", range: 80 });
      server.create("skill", { name: "React", range: 75 });
      server.create("skill", { name: "Git & GitHub", range: 90 });
      server.create("skill", { name: "Figma", range: 90 });
      // Add more skills if needed
    },

    // Define API routes (endpoints)
    routes() {
      // Set the base API namespace
      this.namespace = "api";

      // GET all education entries
      this.get("/educations", (schema) => {
        return schema.educations.all();
      }, { timing: 3000 }); // Simulate network delay of 3 seconds

      // GET all skill entries
      this.get("/skills", (schema) => {
        return schema.skills.all();
      }, { timing: 3000 }); // Simulate network delay of 3 seconds

      // POST a new skill entry
      this.post("/skills", (schema, request) => {
        let attrs = JSON.parse(request.requestBody); // Parse incoming request body
        // Basic validation (Formik will do more later)
        if (!attrs.name || !attrs.range) {
          return new Response(400, {}, { errors: ["Skill name and range are required"] });
        }
        if (typeof attrs.range !== 'number' || attrs.range < 0 || attrs.range > 100) {
          return new Response(400, {}, { errors: ["Skill range must be a number between 0 and 100"] });
        }
        return schema.skills.create(attrs); // Create and return the new skill
      });
    },
  });

  return server;
}
