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

        Then On each item I see name

    Scenario:  Click on each product and check that target page is valid

        Then I click on each item and I see correct item page

    Scenario: Validate that the side bar exists and is clickable

        Given The side drawer is hidden
        When I click on menu button
        Then The side drawer appears


    Scenario: Validate all images on the page

        Given I am on the inventory page
        Then All images are displayed

    Scenario Outline:  Click on ADD TO CART button and validate the amount of items in the cart has increased by one and the button changed its label to REMOVE

        When I add to cart <product>
        Then Add to cart button text changes to Remove for <product>
        Then Shopping cart badge number changes to <number>

        Examples:

            | product                           | number |
            | Sauce Labs Backpack               | 1      |
            | Sauce Labs Bike Light             | 2      |
            | Sauce Labs Bolt T-Shirt           | 3      |
            | Sauce Labs Fleece Jacket          | 4      |
            | Sauce Labs Onesie                 | 5      |
            | Test.allTheThings() T-Shirt (Red) | 6      |

    Scenario Outline: Click on Remove button and validate the amount of items in the cart reduced and label changed to Add to Cart

        When I remove from cart <product>
        Then Remove button text changes to Add to Cart for <product>
        Then Shopping cart badge number changes to <number>

        Examples:

            | product                           | number |
            | Sauce Labs Backpack               | 5      |
            | Sauce Labs Bike Light             | 4      |
            | Sauce Labs Bolt T-Shirt           | 3      |
            | Sauce Labs Fleece Jacket          | 2      |
            | Sauce Labs Onesie                 | 1      |
            | Test.allTheThings() T-Shirt (Red) | 0      |

    Scenario: Click on Cart button and validate that user gets directed to Your Cart page
        
        When I click on Cart icon
        Then I see correct https://www.saucedemo.com/cart.html
        Then I see QTY and Description labels
      
  


    Scenario Outline: Check that each menu item takes user to the correct page

        Given I am on the inventory page
        When I click on menu button
        When I click on <link>
        Then I see correct <page>


        Examples:

            | link     | page                                     |
            | allitems | https://www.saucedemo.com/inventory.html |
            | about    | https://saucelabs.com/                   |
            | logout   | https://www.saucedemo.com/               |


