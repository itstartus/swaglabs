Feature: E2E test for standard user

    Scenario: Login with standard_user login and password

        Given I am on the login page
        When I login as standard_user
        Then My page's URL equals https://www.saucedemo.com/inventory.html

    Scenario: Validate all images on the page

        Given I am on the inventory page
        Then All images are displayed