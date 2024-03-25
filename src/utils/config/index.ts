interface Config{
    apiBaseUrl: string,
    googleClientId: string,
    googleClientSecret: string,
    githubId: string,
    githubSecret: string,
    sanityId: string,
    sanityDataset: string,
    sanityApitoken:string,
}

export const config: Config = {
    apiBaseUrl: process.env.NEXTAUTH_URL || "",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    githubId: process.env.GITHUB_ID || "",
    githubSecret: process.env.GITHUB_SECRET || "",
    sanityId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    sanityApitoken: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!,
}