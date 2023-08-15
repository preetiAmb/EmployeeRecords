describe("Examine the creation of employees", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/#/create");
  });

  it("displays 'Create new employee' when creating a new employee", () => {
    cy.get("[data-cy=header]").should("contain", "Create new employee");
  });

  it("validates empty submitted fields properly", () => {
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=firstNameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=surnameErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=emailErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=birthDateErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=statusErrorMessage]").should("contain", "Required");
    cy.get("[data-cy=jobTitleErrorMessage]").should("contain", "Required");
  });

  it("validates too long submitted values properly", () => {
    cy.get("[data-cy=firstNameInput]").type(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn"
    );
    cy.get("[data-cy=surnameInput]").type(
      "DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe"
    );
    cy.get("[data-cy=emailInput]").type(
      "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn.doe@example.com"
    );
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=firstNameErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
    cy.get("[data-cy=surnameErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
    cy.get("[data-cy=emailErrorMessage]").should(
      "contain",
      "The maximum number of characters is 255"
    );
  });

  it("validates invalid email address properly", () => {
    cy.get("[data-cy=emailInput]").type("john.doe.example.com");
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=emailErrorMessage]").should(
      "contain",
      "Invalid email address"
    );
  });

  it("validates invalid birthDate format properly", () => {
    cy.get("[data-cy=birthDateInput]").type("invalid-date-format");
    cy.get("[data-cy=saveButton]").click();
    cy.get("[data-cy=birthDateErrorMessage]").should(
      "contain",
      "Date must be in the format YYYY-MM-DD"
    );
  });
  
  it("created employee details successfully", () => {

    cy.get("[data-cy=firstNameInput]").type("Abe");
    cy.get("[data-cy=surnameInput]").type("Simpson");
    cy.get("[data-cy=emailInput]").type("abe.simpson@springfield.com");
    cy.get("[data-cy=birthDateInput]").type("1907-05-25");
    cy.get("[data-cy=statusInput]").type("ACTIVE");
    cy.get("[data-cy=jobTitleInput]").type("Work grouch");
    
    cy.get("[data-cy=saveButton]").click();
  });
});