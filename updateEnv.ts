const { execSync } = require("child_process");
const fs = require("fs");

// Check if .env file exists
if (fs.existsSync(".env")) {
  const existingEnv = fs
    .readFileSync(".env", "utf-8")
    .split("\n")
    .reduce((env, line) => {
      const [key, value] = line.split("=");
      if (key) env[key] = value;
      return env;
    }, {});

  const yandexOAuthToken = existingEnv.OAUTH_TOKEN;

  if (yandexOAuthToken) {
    try {
      const curlCommand = `curl -d "{\"yandexPassportOauthToken\":\"${yandexOAuthToken}\"}" "https://iam.api.cloud.yandex.net/iam/v1/tokens"`;
      const response = execSync(curlCommand, { encoding: "utf-8" });

      // Parse the JSON response
      const jsonResponse = JSON.parse(response);

      if (jsonResponse.iamToken && jsonResponse.expiresAt) {
        // Update iamToken and expiresAt while leaving other variables unchanged
        existingEnv.iamToken = jsonResponse.iamToken;
        existingEnv.expiresAt = jsonResponse.expiresAt;

        // Rebuild the .env content
        const envFileContent = Object.entries(existingEnv)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n");

        fs.writeFileSync(".env", envFileContent);

        console.log(".env file updated with iamToken and expiresAt values.");
      } else {
        console.error(
          "Failed to retrieve iamToken and expiresAt from the response."
        );
      }
    } catch (error) {
      console.error("Error while executing curl command:", error.message);
    }
  } else {
    console.error("OAUTH_TOKEN is not defined in the .env file.");
  }
} else {
  console.error(".env file not found.");
}
