Feature: E2E test for standard user

    Scenario: Login with standard_user login and password

        Given I am on the login page
        When I login as standard_user
        Then My page's URL equals https://www.saucedemo.com/inventory.html

    Scenario: Once on the Inventory page, validate that all add to cart buttons have 'Add to Cart' label

        Given I am on the inventory page
        Then On each button I see the label Add to Cart

    Scenario: Validate that each item has a non-empty description

        Then Each item has a non-empty description

    Scenario: Validate that all items have price

        Then On each item I see price greater than zero

    Scenario:  Validate that all items have names
    
        Then  On each item I see name