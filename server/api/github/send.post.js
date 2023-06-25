import { Octokit } from "octokit";

export default defineEventHandler(async (e) => {
  const { token, markdown } = await readBody(e);
  const owner = "blogcreator6109";
  const repo = "blog-comment";
  const issueNumber = 1;

  const octokit = new Octokit({ auth: token });
  try {
    const { status } = await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
      {
        owner,
        repo,
        issue_number: issueNumber,
        body: markdown,
      }
    );
    return status;
  } catch {
    return 500;
  }
});
