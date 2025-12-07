import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const username = "nitij-taneja";

    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch GitHub user data");
    }

    const userData = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-App",
      },
    });

    let totalStars = 0;
    let languages: Record<string, number> = {};

    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      for (const repo of repos) {
        totalStars += repo.stargazers_count || 0;
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      }
    }

    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return res.json({
      username: userData.login,
      avatarUrl: userData.avatar_url,
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
      topLanguages,
      profileUrl: userData.html_url,
      bio: userData.bio,
      company: userData.company,
      location: userData.location,
    });
  } catch (error) {
    console.error("GitHub stats error:", error);
    return res.status(500).json({
      error: "Failed to fetch GitHub stats",
      username: "nitij-taneja",
      publicRepos: 20,
      followers: 50,
      totalStars: 100,
      topLanguages: [
        { name: "Python", count: 15 },
        { name: "JavaScript", count: 5 },
      ],
    });
  }
}
