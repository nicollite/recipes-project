module.exports = {
  apps: [
    {
      name: "frontend",
      script: "yarn start",
      cwd: "./frontend/recipes-fontend",
      combine_logs: true,
      log_file: "../../logs/frontend.log"
    },
    {
      name: "backend",
      script: "yarn start",
      cwd: "./backend/cloud-run",
      combine_logs: true,
      log_file: "../../logs/backend.log",
      env: {
        GOOGLE_APPLICATION_CREDENTIALS: "./credentials/credentials-dev.json"
      }
    }
  ]
};
