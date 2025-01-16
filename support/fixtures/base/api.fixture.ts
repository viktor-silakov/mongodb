import { test as baseTest } from "playwright-bdd";

export type FixtureApiOptions = {
    apiURL: string;
};

export type AuthResponse = Record<string, string> | null

export type ApiFixture = {
    api: AuthResponse;
};

export const api = baseTest.extend<FixtureApiOptions & ApiFixture>({
    apiURL: ["", { option: true }],
    api: async ({ apiURL, request }, use, testInfo,) => {

        let responseContent: AuthResponse = null;

        // ADD an authorization here
        // if (testInfo.tags.includes('@api-auth')) {
        //     const response = await request.post(`${apiURL}/...`, {
        //         data: {
        //             password: "...",
        //             user: "..."
        //         }
        //     });

        //     responseContent = await response.json();
        //     if (!responseContent?.content.token) throw new Error(`Cannot get response token, response content: ${JSON.stringify(responseContent)}`);
        // }

        await use(responseContent);
    }
});