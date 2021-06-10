Feature: This is how we process tables in cucumber

    Scenario: Login with standard_user login and password

        Given I am on the login page
        When I login as standard_user
        Then My page's URL equals https://www.saucedemo.com/inventory.html

    Scenario: Validate list of products and their prices on inventory page and adding a product to the cart

        Given I see the following products and their prices

            | product                           | price  |
            | Sauce Labs Backpack               | $29.99 |
            | Sauce Labs Bike Light             | $9.99  |
            | Sauce Labs Bolt T-Shirt           | $15.99 |
            | Sauce Labs Fleece Jacket          | $49.99 |
            | Sauce Labs Onesie                 | $7.99  |
            | Test.allTheThings() T-Shirt (Red) | $15.99 |

        When I add to cart Sauce Labs Backpack
        When I add to cart Sauce Labs Bike Light
        When I add to cart Sauce Labs Fleece Jacket
        When I click on Cart icon
        Then I see Sauce_Labs_Backpack in the cart with a price of $29.99
        Then I see Sauce_Labs_Bike_Light in the cart with a price of $9.99
        Then I see Sauce_Labs_Fleece_Jacket in the cart with a price of $49.99