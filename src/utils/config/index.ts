interface Config{
    apiBaseUrl: string,
    googleClientId: string,
    googleClientSecret: string,
    githubId: string,
    githubSecret: string,
}

export const config: Config = {
    apiBaseUrl: process.env.NEXTAUTH_URL || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    githubId: process.env.GITHUB_ID || "",
    githubSecret: process.env.GITHUB_SECRET || "",
}