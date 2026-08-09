import { execSync } from "child_process";

export type GitInfo = { branch: string; log: string };

export function getGitInfo(max = 10): GitInfo {
  let branch = "main";
  let log = "";
  try {
    branch = execSync("git branch --show-current").toString().trim();
    log = execSync(
      `git log -n ${max} --pretty=format:%h%x1f%d%x1f%s%x1f%at`
    ).toString().trimEnd();
  } catch {
    // not a git repo — keep placeholders
  }
  return { branch, log };
}
