Feature: The Internet SwagLabs Website

  Scenario Outline: As a user, I can log into website

    Given I am on the login page
    When I login with <username> and <password>
    Then My page's URL equals <URL>

    Examples:
      | username                | password     | URL                                      |
      | standard_user           | secret_sauce | https://www.saucedemo.com/inventory.html |
      | locked_out_user         | secret_sauce | https://www.saucedemo.com/inventory.html |
      | problem_user            | secret_sauce | https://www.saucedemo.com/inventory.html |
      | performance_glitch_user | secret_sauce | https://www.saucedemo.com/inventory.html |
