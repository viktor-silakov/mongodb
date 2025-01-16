Feature: Regex pattern test
    This feature tests the ability to handle both exact string matches (/^lorem ipsum$/) and regex patterns
    in page titles using custom Cucumber parameter types. In both cases use backticks instead double quotes

    Rule: Text
        Scenario: Just text without regex literal, ex: '/^lorem ipsum$/'
            When I open url "/?component=filling"
            Then the page title should not be 'Filling & Keys - Playwright-bdd boilerplate test ap'
            Then the page title should be 'Filling & Keys - Playwright-bdd boilerplate test app'

            When I click on the button with name "Login page"
            Then the page title should be 'Login Page - Playwright-bdd boilerplate test app'

    Rule: Regexp
        Scenario: Simple regex, ex: '/lorem ips/'
            When I open url "/?component=filling"
            Then the page title should not be '/Filling & Keys AAAA/'
            Then the page title should be '/Filling & Keys/'

        Scenario: Complex regex with modifiers, ex: '/lorem ips/im'
            When I open url "/?component=filling"
            Then the page title should not be '/filling & keys AAAA/i'
            Then the page title should be '/filling & keys/i'

