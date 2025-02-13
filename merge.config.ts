export default {
    reporter: [
        ['html', {
            open: process.env.CI ? "never" : "on-failure",
            outputFolder: 'reports/merged-html'
        }],
    ]
}